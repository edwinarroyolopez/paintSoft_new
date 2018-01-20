-- Function: public.spd_create_update_product(integer, integer, integer, character varying)

-- DROP FUNCTION public.spd_create_update_product(integer, integer, integer, character varying);

CREATE OR REPLACE FUNCTION public.spd_create_update_product(
    IN pmt_id_producto integer,
    IN pmt_id_grupo integer,
    IN pmt_id_marca integer,
    IN pmt_descripcion character varying,
    IN pmt_list_presentaciones json,
    OUT out_result integer)
  RETURNS integer AS
$BODY$

DECLARE
    BEGIN

            /* Create or Update */
            IF pmt_id_producto > 0 THEN
            	-- Update producto
                                UPDATE tblproducto
                                SET descripcion = pmt_descripcion,
                                    id_grupo = pmt_id_grupo,
                                    id_marca = pmt_id_marca,
                                    fecha_modificacion = current_date
                                 WHERE id_producto = pmt_id_producto;

                            -- Select this id producto
                                SELECT pmt_id_producto INTO out_result;
            ELSE
                        	-- Create new producto
                				  INSERT INTO public.tblproducto(descripcion,id_grupo,id_marca,estado,fecha_creacion)
                				  VALUES (pmt_descripcion,pmt_id_grupo,pmt_id_marca,1,current_date);

					SELECT max(id_producto) from tblproducto INTO out_result;

				    /* Inserta presentaciones */
					INSERT INTO tblproducto_presentacion (id_producto, presentaciones,estado)
					SELECT out_result, rec ,1  FROM
					json_array_elements(list_presentaciones->'data' ) rec;

					SELECT out_result;


            END IF; /* pmt_id_producto > 0 */

    END;

$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_create_update_product(integer, integer, integer, character varying)
  OWNER TO postgres;
