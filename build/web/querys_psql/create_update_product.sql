
CREATE FUNCTION spd_create_update_product(
        pmt_id_producto integer,
        pmt_id_grupo integer,
        pmt_id_marca integer,
        pmt_descripcion character varying,
        OUT out_result integer)
        RETURNS integer
    LANGUAGE plpgsql
    AS $$

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

            END IF; /* pmt_id_producto > 0 */

    END;

$$;/* End spd */
