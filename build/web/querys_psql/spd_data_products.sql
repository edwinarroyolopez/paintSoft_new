--drop  FUNCTION spd_data_products(integer)

CREATE FUNCTION spd_data_products(
	pmt_id_producto integer,
	OUT out_id_producto_presentacion bigint,
	OUT out_id_producto integer,
	OUT out_presentaciones jsonb,
	OUT out_estado integer) RETURNS SETOF record
    LANGUAGE plpgsql
    AS $$
    DECLARE
    BEGIN
		return query select
			id_producto_presentacion,
			id_producto,
			presentaciones,
			estado
		from tblproducto_presentacion where id_producto = pmt_id_producto;

     RETURN;

    END;

$$;
