CREATE OR REPLACE FUNCTION public.spd_create_update_marca(
    IN pmt_id_marca integer,
    IN pmt_descripcion character varying,
    IN pmt_estado integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$

DECLARE
    BEGIN

            /* Create or Update */
            IF pmt_id_marca > 0 THEN
            	-- Update marca
                                UPDATE tblmarca
                                SET descripcion = pmt_descripcion,
                                    estado = pmt_estado,
                                    fecha_modificacion = current_date
                                 WHERE id_marca = pmt_id_marca;

                            -- Select this id marca
                                SELECT pmt_id_marca INTO out_result;
            ELSE
                        	-- Create new marca
                				  INSERT INTO public.tblmarca(descripcion, estado,fecha_creacion)
                				  VALUES (pmt_descripcion,pmt_estado,current_date);
            END IF; /* pmt_id_marca > 0 */

    END;

$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
