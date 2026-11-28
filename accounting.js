const pesos = new Intl.NumberFormat('es-DO', {style:'currency', currency:'DOP'});
const saleCollator = new Intl.Collator('es', {sensitivity:'base', numeric:true});
const saleSearchKey = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const saleCategory = product => product.category?.trim() || 'Otros';
const today = () => new Intl.DateTimeFormat('en-CA', {
  timeZone:'America/Santo_Domingo', year:'numeric', month:'2-digit', day:'2-digit'
}).format(new Date());

export function setupAccounting(db, getProducts, refreshInventory) {
  const $ = id => document.getElementById(id);
  const soldOn = $('saleDate');
  const productSelect = $('saleProduct');
  productSelect.parentElement.insertAdjacentHTML('beforebegin', `
    <div><label for="saleCategory">Categoría</label>
      <select id="saleCategory"></select>
    </div>
    <div><label for="saleSearch">Buscar por nombre o categoría</label>
      <input id="saleSearch" type="search" placeholder="Ej. Corona, cepillo o higiene" autocomplete="off">
    </div>
  `);
  const categorySelect = $('saleCategory');
  const productSearch = $('saleSearch');
  const from = $('salesFrom');
  const to = $('salesTo');
  const date = today();
  soldOn.value = soldOn.max = to.value = date;
  from.value = date.slice(0, 7) + '-01';
  let pendingSale;
  let saving = false;
  let generation = 0;
  let entryRequest = 0;

  function updateSalePrices() {
    const product = getProducts().find(item => String(item.id) === $('saleProduct').value);
    const cost = product?.purchaseCost;
    const quantity = Number(product?.quantity || 0);
    $('salePrices').textContent = product
      ? 'Quedan ' + quantity + (quantity === 1 ? ' unidad' : ' unidades') + ' · Venta por unidad: ' + pesos.format(Number(product.price)) +
        (cost == null ? ' · Guarda el costo en Inventario.' : ' · Costo por unidad: ' + pesos.format(Number(cost)))
      : '';
    $('saleUnits').max = quantity;
    $('recordSale').disabled = saving || cost == null || quantity <= 0;
  }

  function renderSaleProducts() {
    const selected = productSelect.value;
    const category = categorySelect.value;
    const terms = saleSearchKey(productSearch.value.trim()).split(/\s+/);
    const groups = new Map();

    for (const product of getProducts()) {
      const label = saleCategory(product);
      const searchable = saleSearchKey(`${product.name} ${label}`);
      if ((category && label !== category) || !terms.every(term => searchable.includes(term))) continue;
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label).push(product);
    }

    productSelect.replaceChildren(new Option(groups.size ? 'Selecciona un producto' : 'No hay productos que coincidan', ''));
    for (const [label, products] of [...groups].sort(([first], [second]) => saleCollator.compare(first, second))) {
      const group = document.createElement('optgroup');
      group.label = label;
      products.sort((first, second) => saleCollator.compare(first.name, second.name));
      group.append(...products.map(product => new Option(product.name, String(product.id))));
      productSelect.append(group);
    }
    if (selected && [...productSelect.options].some(option => option.value === selected)) {
      productSelect.value = selected;
    }
    if (!productSelect.value && productSearch.value.trim() && productSelect.options.length === 2) {
      productSelect.selectedIndex = 1;
    }
    updateSalePrices();
  }

  productSelect.onchange = updateSalePrices;
  categorySelect.onchange = renderSaleProducts;
  productSearch.oninput = renderSaleProducts;
  productSearch.onkeydown = event => {
    if (event.key === 'Enter') event.preventDefault();
  };

  function status(text) {
    $('accountingStatus').textContent = text;
  }

  function fillTable(id, rows) {
    $(id).replaceChildren(...rows.map(values => {
      const row = document.createElement('tr');
      for (const value of values) row.insertCell().textContent = value;
      return row;
    }));
  }

  async function report() {
    const request = ++generation;
    const start = from.value;
    const end = to.value;
    fillTable('salesSummary', []);
    fillTable('salesHistory', []);
    if (!start || !end || start > end) {
      status('Selecciona un período válido.');
      return;
    }
    status('Cargando ventas…');
    const sales = [];
    const pageSize = 200;
    for (let offset = 0; ; offset += pageSize) {
      const {data, error} = await db.from('market_sales')
        .select('id,product_id,product_name,sold_on,units,unit_cost,unit_price')
        .gte('sold_on', start).lte('sold_on', end)
        .order('sold_on', {ascending:false})
        .order('recorded_at', {ascending:false, nullsFirst:false}).order('id')
        .range(offset, offset + pageSize - 1);
      if (request !== generation) return;
      if (error) {
        status('No se pudo cargar Contabilidad. Verifica que esté configurada en Supabase.');
        return;
      }
      sales.push(...data);
      if (data.length < pageSize) break;
    }
    const byProduct = new Map();
    const total = {units:0, income:0, cost:0};
    const history = sales.map(sale => {
      const income = Math.round(Number(sale.unit_price) * 100) * sale.units;
      const cost = Math.round(Number(sale.unit_cost) * 100) * sale.units;
      const summary = byProduct.get(sale.product_id) || {
        name:sale.product_name, units:0, income:0, cost:0
      };
      byProduct.set(sale.product_id, summary);
      for (const row of [summary, total]) {
        row.units += sale.units;
        row.income += income;
        row.cost += cost;
      }
      return [sale.sold_on, sale.product_name, sale.units + (sale.units === 1 ? ' unidad' : ' unidades'), ...amounts(income, cost)];
    });
    fillTable('salesSummary', [
      ['Total', total.units, ...amounts(total.income, total.cost)],
      ...[...byProduct.values()].map(row => [row.name, row.units, ...amounts(row.income, row.cost)])
    ]);
    fillTable('salesHistory', history);
    status(sales.length ? '' : 'No hay ventas registradas en este período.');
  }

  function amounts(income, cost) {
    return [income, cost, income - cost].map(cents => pesos.format(cents / 100));
  }

  $('salesFilter').onsubmit = event => {
    event.preventDefault();
    report();
  };
  $('saleForm').onsubmit = async event => {
    event.preventDefault();
    if (saving) return;
    saving = true;
    const button = $('recordSale');
    button.disabled = true;
    const sale = {
      item_id: $('saleProduct').value,
      sale_day: soldOn.value,
      unit_count: Number($('saleUnits').value)
    };
    const productName = productSelect.selectedOptions[0]?.textContent;
    const fingerprint = JSON.stringify(sale);
    if (pendingSale?.fingerprint !== fingerprint) {
      pendingSale = {fingerprint, id:crypto.randomUUID()};
    }
    try {
      const {error} = await db.rpc('market_record_sale', {...sale, sale_id:pendingSale.id});
      if (error) throw error;
      pendingSale = null;
      $('saleUnits').value = '1';
      $('saleStatus').textContent = 'Venta registrada. ' + productName + ' · ' + sale.unit_count +
        (sale.unit_count === 1 ? ' unidad vendida.' : ' unidades vendidas.');
      if (sale.sale_day < from.value || sale.sale_day > to.value) {
        from.value = sale.sale_day.slice(0, 7) + '-01';
        to.value = today();
      }
      await Promise.all([report(),refreshInventory()]);
    } catch (error) {
      $('saleStatus').textContent = error.message || 'No se pudo registrar la venta.';
    } finally {
      saving = false;
      updateSalePrices();
    }
  };

  return {
    async open() {
      const request = ++entryRequest;
      soldOn.value = soldOn.max = today();
      const selectedCategory = categorySelect.value;
      const categories = [...new Set(getProducts().map(saleCategory))].sort(saleCollator.compare);
      categorySelect.replaceChildren(new Option('Todas las categorías', ''), ...categories.map(category =>
        new Option(category, category)));
      if (categories.includes(selectedCategory)) categorySelect.value = selectedCategory;
      renderSaleProducts();
      const reportResult = report();
      const {data, error} = await db.from('market_stock_entries')
        .select('entered_at,product_name,units,unit_cost')
        .order('entered_at', {ascending:false}).order('id').limit(100);
      if (request !== entryRequest) return;
      $('stockEntriesStatus').textContent = error ? 'No se pudieron cargar las entradas.' :
        data.length ? 'Últimas 100 entradas' : 'Todavía no hay entradas registradas.';
      const dateFormat = new Intl.DateTimeFormat('es-DO', {
        dateStyle:'short', timeZone:'America/Santo_Domingo'
      });
      fillTable('stockEntries', (data||[]).map(entry => [
        dateFormat.format(new Date(entry.entered_at)), entry.product_name, entry.units,
        pesos.format(Number(entry.unit_cost)), pesos.format(Number(entry.unit_cost)*entry.units)
      ]));
      return reportResult;
    },
    clear() {
      generation++;
      entryRequest++;
      fillTable('stockEntries', []);
      $('stockEntriesStatus').textContent = '';
      pendingSale = null;
      fillTable('salesSummary', []);
      fillTable('salesHistory', []);
      productSelect.replaceChildren();
      categorySelect.replaceChildren();
      productSearch.value = '';
      $('saleUnits').value = '1';
      $('saleStatus').textContent = '';
      updateSalePrices();
      status('');
    }
  };
}
