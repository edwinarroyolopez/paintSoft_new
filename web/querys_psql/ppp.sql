select * FROM spd_create_update_product(0,3,0,'Prueba presentaciones','{"data":[{"Id_presentacion":"2"},{"Id_presentacion":"1"}]}');

DROP FUNCTION public.spd_create_update_product(integer, integer, integer, character varying, json);

  CREATE FUNCTION spd_create_update_product(
          pmt_id_producto integer,
          pmt_id_grupo integer,
          pmt_id_marca integer,
          pmt_descripcion character varying,
          IN pmt_list_presentaciones json,
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

                              -- Select this id producto-- Function: public.spd_create_update_product(integer, integer, integer, character varying, json)

-- DROP FUNCTION public.spd_create_update_product(integer, integer, integer, character varying, json);

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
                  					SELECT pmt_id_producto, rec ,1  FROM
                  					json_array_elements(pmt_list_presentaciones->'data' ) rec;


                              SELECT  out_result;


              END IF; /* pmt_id_producto > 0 */

      END;

  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_create_update_product(integer, integer, integer, character varying, json)
  OWNER TO postgres;

                                  SELECT pmt_id_producto INTO out_result;
              ELSE
                          	-- Create new producto
                  				  INSERT INTO public.tblproducto(descripcion,id_grupo,id_marca,estado,fecha_creacion)
                  				  VALUES (pmt_descripcion,pmt_id_grupo,pmt_id_marca,1,current_date);

				  /* Inserta presentaciones */
					INSERT INTO tblproducto_presentacion (id_producto, presentaciones,estado)
					SELECT pmt_id_producto, rec ,1  FROM
					json_array_elements(pmt_list_presentaciones->'data' ) rec;


                              SELECT max(id_producto) from tblproducto INTO out_result;

              END IF; /* pmt_id_producto > 0 */

      END;

  $$;/* End spd */


  ---------------

  -- Function: public.spd_create_update_product(integer, integer, integer, character varying, json)
  -- DROP FUNCTION public.spd_create_update_product(integer, integer, integer, character varying, json);

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
  	max_id_producto  integer;
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
  					 max_id_producto = out_result;

  				  /* Inserta presentaciones */
  					INSERT INTO tblproducto_presentacion (id_producto,presentaciones,estado)
  					SELECT max_id_producto, rec ,1  FROM
  					json_array_elements(pmt_list_presentaciones->'data' ) rec;


                END IF; /* pmt_id_producto > 0 */

        END;

    $BODY$
    LANGUAGE plpgsql VOLATILE
    COST 100;
  ALTER FUNCTION public.spd_create_update_product(integer, integer, integer, character varying, json)
    OWNER TO postgres;
