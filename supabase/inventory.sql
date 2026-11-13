alter table public.market_products add column if not exists stock_paused boolean not null default false;

create or replace view public.market_catalog as
select id, name, category, description, price,
       case when quantity > 0 and not stock_paused then 1 else 0 end as quantity,
       image_url
from public.market_products where active = true;

create table public.market_stock_entries (
  id uuid primary key,
  product_id uuid not null,
  product_name text not null,
  units integer not null check (units > 0),
  unit_cost numeric(12,2) not null check (unit_cost >= 0 and unit_cost <> 'NaN'::numeric),
  entered_at timestamptz not null default now()
);
alter table public.market_stock_entries enable row level security;
revoke all on public.market_stock_entries from public, anon, authenticated;
grant select, insert on public.market_stock_entries to authenticated;
create policy market_admin_stock_entries on public.market_stock_entries
  for all to authenticated
  using (exists (select 1 from public.market_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.market_admins where user_id = (select auth.uid())));

create function public.market_save_inventory(item uuid, expected_quantity integer, entry_id uuid, details jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  product public.market_products%rowtype;
  next_quantity integer := (details->>'quantity')::integer;
  next_cost numeric(12,2) := (details->>'cost')::numeric;
  previous_quantity integer := 0;
begin
  if not exists (select 1 from public.market_admins where user_id = (select auth.uid())) then
    raise exception 'Tu usuario no está autorizado.';
  end if;
  if next_quantity is null or next_quantity < 0 or next_cost is null or next_cost < 0 or next_cost = 'NaN'::numeric then
    raise exception 'Indica una cantidad y un costo válidos.';
  end if;
  if expected_quantity is null then
    insert into public.market_products (id, name, category, description, price, quantity, cost, image_url)
    values (item, details->>'name', details->>'category', details->>'description', (details->>'price')::numeric, next_quantity, next_cost, details->>'image_url')
    on conflict (id) do nothing returning * into product;
    if not found then return; end if;
  else
    select * into product from public.market_products where id = item for update;
    if not found then raise exception 'No se encontró el producto.'; end if;
    if exists (select 1 from public.market_stock_entries where id = entry_id and product_id = item) then return; end if;
    previous_quantity := coalesce(product.quantity, 0);
    if previous_quantity <> expected_quantity then
      raise exception 'Las existencias cambiaron. Vuelve a abrir el producto antes de guardarlo.';
    end if;
    update public.market_products
    set name = details->>'name', category = details->>'category', description = details->>'description',
        price = (details->>'price')::numeric, quantity = next_quantity, cost = next_cost, image_url = details->>'image_url'
    where id = item returning * into product;
  end if;
  insert into public.market_product_costs (product_id, unit_cost) values (item::text, next_cost)
  on conflict (product_id) do update set unit_cost = excluded.unit_cost;
  if next_quantity > previous_quantity then
    insert into public.market_stock_entries (id, product_id, product_name, units, unit_cost)
    values (entry_id, item, product.name, next_quantity - previous_quantity, next_cost);
  end if;
end;
$$;
revoke all on function public.market_save_inventory(uuid, integer, uuid, jsonb) from public, anon, authenticated;
grant execute on function public.market_save_inventory(uuid, integer, uuid, jsonb) to authenticated;

create or replace function public.market_record_sale(sale_id uuid, item_id text, sale_day date, unit_count integer)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  product public.market_products%rowtype;
  purchase_cost numeric;
begin
  if not exists (select 1 from public.market_admins where user_id = (select auth.uid())) then
    raise exception 'Tu usuario no está autorizado.';
  end if;
  select * into product from public.market_products where id = item_id::uuid for update;
  if exists (select 1 from public.market_sales where id = sale_id) then return; end if;
  if unit_count is null or unit_count <= 0 or coalesce(product.quantity, 0) < unit_count then
    raise exception 'No hay suficientes unidades en inventario.';
  end if;
  select unit_cost into purchase_cost from public.market_product_costs where product_id = item_id;
   purchase_cost := coalesce(purchase_cost, nullif(product.cost, 0));
  if purchase_cost is null then raise exception 'Guarda el costo del producto antes de registrar la venta.'; end if;
  insert into public.market_sales (id, product_id, product_name, sold_on, units, unit_cost, unit_price)
  values (sale_id, item_id, product.name, sale_day, unit_count, purchase_cost, product.price);
  update public.market_products set quantity = quantity - unit_count where id = product.id;
end;
$$;
