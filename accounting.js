const pesos = new Intl.NumberFormat('es-DO', {style:'currency', currency:'DOP'});
const today = () => new Intl.DateTimeFormat('en-CA', {
  timeZone:'America/Santo_Domingo', year:'numeric', month:'2-digit', day:'2-digit'
}).format(new Date());

export function setupAccounting(db, getProducts, refreshInventory) {
  const $ = id => document.getElementById(id);
  const soldOn = $('saleDate');
  const from = $('salesFrom');
  const to = $('salesTo');
  const date = today();
  soldOn.value = soldOn.max = to.value = date;
  from.value = date.slice(0, 7) + '-01';
  let pendingSale;
  let generation = 0;
  let entryRequest = 0;

  function updateSalePrices() {
    const product = getProducts().find(item => String(item.id) === $('saleProduct').value);
    const cost = product?.purchaseCost;
    const quantity = Number(product?.quantity || 0);
    $('salePrices').textContent = product
      ? 'Existencias: ' + quantity + ' · Venta por unidad: ' + pesos.format(Number(product.price)) +
        (cost == null ? ' · Guarda el costo en Inventario.' : ' · Costo por unidad: ' + pesos.format(Number(cost)))
      : '';
    $('saleUnits').max = quantity;
    $('recordSale').disabled = cost == null || quantity <= 0;
  }

  $('saleProduct').onchange = updateSalePrices;

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
        .order('sold_on', {ascending:false}).order('id')
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
      return [sale.sold_on, sale.product_name, sale.units, ...amounts(income, cost)];
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
    const button = $('recordSale');
    button.disabled = true;
    const sale = {
      item_id: $('saleProduct').value,
      sale_day: soldOn.value,
      unit_count: Number($('saleUnits').value)
    };
    const fingerprint = JSON.stringify(sale);
    if (pendingSale?.fingerprint !== fingerprint) {
      pendingSale = {fingerprint, id:crypto.randomUUID()};
    }
    try {
      const {error} = await db.rpc('market_record_sale', {...sale, sale_id:pendingSale.id});
      if (error) throw error;
      pendingSale = null;
      $('saleUnits').value = '';
      $('saleStatus').textContent = 'Venta registrada.';
      if (sale.sale_day < from.value || sale.sale_day > to.value) {
        from.value = sale.sale_day.slice(0, 7) + '-01';
        to.value = today();
      }
      await Promise.all([report(),refreshInventory()]);
    } catch (error) {
      $('saleStatus').textContent = error.message || 'No se pudo registrar la venta.';
    } finally {
      updateSalePrices();
    }
  };

  return {
    async open() {
      const request = ++entryRequest;
      const select = $('saleProduct');
      const selected = select.value;
      const products = getProducts();
      select.replaceChildren(new Option('Selecciona un producto', ''), ...products.map(product =>
        new Option(product.name, String(product.id))));
      if (products.some(product => String(product.id) === selected)) select.value = selected;
      updateSalePrices();
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
      $('saleProduct').replaceChildren();
      $('saleUnits').value = '';
      $('saleStatus').textContent = '';
      updateSalePrices();
      status('');
    }
  };
}
