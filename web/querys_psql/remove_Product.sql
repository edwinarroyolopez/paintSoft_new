-- Function: public.spd_remove_product(integer)

-- DROP FUNCTION public.spd_remove_product(integer);

CREATE OR REPLACE FUNCTION public.spd_remove_product(
    IN pmt_id_producto integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$
DECLARE
    BEGIN /* Remove customer*/

	UPDATE tblproducto
	SET estado = 2,
	    fecha_modificacion = current_date
	WHERE id_producto = pmt_id_producto;/* Cambia estado: 2 -> "Elimina producto" */

	SELECT count(*) FROM tblproducto
	WHERE id_producto = pmt_id_producto and estado = 2
	INTO out_result;/* retorna un 1 si elimina un 0 sino */

    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_remove_product(integer)
  OWNER TO postgres;
