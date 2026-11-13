begin;

create table if not exists public.market_product_costs (
  product_id text primary key,
  unit_cost numeric(12,2) not null check (unit_cost >= 0 and unit_cost <> 'NaN'::numeric)
);

create table if not exists public.market_sales (
  id uuid primary key,
  product_id text not null,
  product_name text not null,
  sold_on date not null,
  units integer not null check (units > 0),
  unit_cost numeric(12,2) not null,
  unit_price numeric(12,2) not null
);

create index if not exists market_sales_sold_on_idx on public.market_sales (sold_on, id);

alter table public.market_product_costs enable row level security;
alter table public.market_sales enable row level security;

revoke all on public.market_product_costs, public.market_sales from public, anon, authenticated;
grant select, insert, update on public.market_product_costs to authenticated;
grant select, insert on public.market_sales to authenticated;

drop policy if exists market_admin_costs on public.market_product_costs;
create policy market_admin_costs on public.market_product_costs
  for all to authenticated
  using (exists (select 1 from public.market_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.market_admins where user_id = (select auth.uid())));

drop policy if exists market_admin_sales_read on public.market_sales;
create policy market_admin_sales_read on public.market_sales
  for select to authenticated
  using (exists (select 1 from public.market_admins where user_id = (select auth.uid())));

drop policy if exists market_admin_sales_insert on public.market_sales;
create policy market_admin_sales_insert on public.market_sales
  for insert to authenticated
  with check (exists (select 1 from public.market_admins where user_id = (select auth.uid())));

create or replace function public.market_record_sale(
  sale_id uuid, item_id text, sale_day date, unit_count integer
) returns void
language plpgsql security invoker set search_path = ''
as $$
begin
  if not exists (select 1 from public.market_admins where user_id = (select auth.uid())) then
    raise exception 'Tu usuario no está autorizado.';
  end if;
  insert into public.market_sales (id, product_id, product_name, sold_on, units, unit_cost, unit_price)
  select sale_id, p.id::text, p.name, sale_day, unit_count, c.unit_cost, p.price
  from public.market_products p
  join public.market_product_costs c on c.product_id = p.id::text
  where p.id::text = item_id
  on conflict (id) do nothing;
  if not found and not exists (
    select 1 from public.market_sales s
    where s.id = sale_id and s.product_id = item_id and s.sold_on = sale_day and s.units = unit_count
  ) then
    raise exception 'Guarda el costo del producto antes de registrar la venta.';
  end if;
end;
$$;
revoke all on function public.market_record_sale(uuid, text, date, integer) from public, anon, authenticated;
grant execute on function public.market_record_sale(uuid, text, date, integer) to authenticated;

commit;
