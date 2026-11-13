grant delete on public.market_product_costs to authenticated;

create function public.market_delete_product(item uuid)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (select 1 from public.market_admins where user_id = (select auth.uid())) then
    raise exception 'Tu usuario no está autorizado.';
  end if;

  delete from public.market_products where id = item;
  if not found then return false; end if;

  delete from public.market_product_costs where product_id = item::text;
  return true;
end;
$$;

revoke all on function public.market_delete_product(uuid) from public, anon, authenticated;
grant execute on function public.market_delete_product(uuid) to authenticated;
