const pesos = new Intl.NumberFormat('es-DO', {style:'currency', currency:'DOP'});
const today = () => new Intl.DateTimeFormat('en-CA', {
  timeZone:'America/Santo_Domingo', year:'numeric', month:'2-digit', day:'2-digit'
}).format(new Date());

export function setupAccounting(db, getProducts) {
  const $ = id => document.getElementById(id);
  const soldOn = $('saleDate');
  const from = $('salesFrom');
  const to = $('salesTo');
  const date = today();
  soldOn.value = soldOn.max = to.value = date;
  from.value = date.slice(0, 7) + '-01';
  let pendingSale;
  let generation = 0;
  let costs = new Map();
  let costRequest = 0;

  function updateSalePrices() {
    const product = getProducts().find(item => String(item.id) === $('saleProduct').value);
    const cost = product && costs.get(String(product.id));
    $('salePrices').textContent = product
      ? 'Precio de venta actual: ' + pesos.format(Number(product.price)) +
        (cost == null ? ' · Falta guardar el costo.' : ' · Costo actual: ' + pesos.format(Number(cost)))
      : '';
    $('recordSale').disabled = cost == null;
  }

  $('saleProduct').onchange = updateSalePrices;
  $('costProduct').onchange = () => {
    $('unitCost').value = costs.get($('costProduct').value) ?? '';
    $('costStatus').textContent = '';
  };
  $('costForm').onsubmit = async event => {
    event.preventDefault();
    const button = $('saveCost');
    const id = $('costProduct').value;
    const unitCost = Number($('unitCost').value);
    button.disabled = true;
    try {
      const {error} = await db.from('market_product_costs')
        .upsert({product_id:id, unit_cost:unitCost});
      if (error) throw error;
      costs.set(id, unitCost);
      $('costStatus').textContent = 'Costo guardado.';
      updateSalePrices();
    } catch {
      $('costStatus').textContent = 'No se pudo guardar el costo. Verifica la configuración de Contabilidad.';
    } finally {
      button.disabled = false;
    }
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
      await report();
    } catch (error) {
      $('saleStatus').textContent = error.message || 'No se pudo registrar la venta.';
    } finally {
      updateSalePrices();
    }
  };

  return {
    async open() {
      const request = ++costRequest;
      const products = getProducts();
      for (const id of ['saleProduct', 'costProduct']) {
        const select = $(id);
        const selected = select.value;
        select.replaceChildren(new Option('Selecciona un producto', ''), ...products.map(product =>
          new Option(product.name, String(product.id))));
        if (products.some(product => String(product.id) === selected)) select.value = selected;
      }
      updateSalePrices();
      const reportResult = report();
      const {data, error} = await db.from('market_product_costs').select('product_id,unit_cost');
      if (request !== costRequest) return;
      if (error) {
        $('costStatus').textContent = 'Los costos requieren la configuración de Contabilidad en Supabase.';
      } else {
        costs = new Map(data.map(row => [row.product_id, row.unit_cost]));
        $('costProduct').onchange();
      }
      updateSalePrices();
      return reportResult;
    },
    clear() {
      generation++;
      costRequest++;
      costs.clear();
      $('costProduct').replaceChildren();
      $('unitCost').value = '';
      $('costStatus').textContent = '';
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
