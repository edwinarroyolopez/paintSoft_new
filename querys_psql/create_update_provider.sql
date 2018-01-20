

CREATE OR REPLACE FUNCTION public.spd_create_update_provider(
    IN pmt_id_proveedor integer,
    IN pmt_razon_social character varying,
    IN pmt_nit character varying,
    IN pmt_contacto character varying,
    IN pmt_ciudad character varying,
    IN pmt_direccion character varying,
    IN pmt_telefono_1 character varying,
    IN pmt_telefono_2 character varying,
    IN pmt_email character varying,
    IN pmt_banco character varying,
    IN pmt_tipo_cuenta character varying,
    IN pmt_numero_cuenta character varying,
    IN pmt_titular_cuenta character varying,
    IN pmt_estado integer,
    OUT out_result integer)
  RETURNS integer
  LANGUAGE plpgsql
  AS $$
DECLARE
	v_repeat_nit integer;
        v_result_user integer;
    BEGIN

            /* Create or Update */
            IF pmt_id_proveedor > 0 THEN
            	-- Update provider
                                UPDATE tblproveedor
                                SET razon_social = pmt_razon_social,
                                    nit = pmt_nit,
                                    contacto = pmt_contacto,
                                    ciudad = pmt_ciudad,
                                    direccion = pmt_direccion,
                                    telefono_1 = pmt_telefono_1,
                                    telefono_2 = pmt_telefono_2,
                                    email = pmt_email,
                                    banco = pmt_banco,
                                    tipo_cuenta = pmt_tipo_cuenta,
                                    numero_cuenta = pmt_numero_cuenta,
                                    titular_cuenta = pmt_titular_cuenta,
                                    estado = pmt_estado,
                                    fecha_modificacion = current_date
                                 WHERE id_proveedor = pmt_id_proveedor;

                            -- Select this id_provider
                                SELECT pmt_id_proveedor INTO out_result;
            ELSE

                        -- Verify that the nit is not repeated
                        select count(*) from tblproveedor where
                        nit = pmt_nit into v_repeat_nit;

                        IF v_repeat_nit > 0 THEN /* Repeat nit */
							-- Error is repeat
                                out_result = -1;
                        ELSE
                        	-- Create new provider
                				  INSERT INTO public.tblproveedor(razon_social,nit,contacto,ciudad,direccion,telefono_1,telefono_2,email,banco,tipo_cuenta,numero_cuenta,titular_cuenta,estado,fecha_creacion)
                				  VALUES (pmt_razon_social,pmt_nit,pmt_contacto,pmt_ciudad,pmt_direccion,pmt_telefono_1,pmt_telefono_2,pmt_email,pmt_banco,pmt_tipo_cuenta,pmt_numero_cuenta,pmt_titular_cuenta,pmt_estado,current_date);

                        END IF;/* repeat identification number */

            END IF; /* pmt_id_proveedor > 0 */



    END;
$$;



CREATE TABLE public.tblgrupo
(
  id_grupo bigint NOT NULL DEFAULT nextval('tblgrupo_id_grupo_seq'::regclass),
  descripcion character varying(100),
  gramo integer,
  estado integer,
  fecha_creacion date
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.tblgrupo
  OWNER TO postgres;
  INSERT INTO public.tblgrupo(id_grupo, descripcion, gramo, estado, fecha_creacion) VALUES

  INSERT INTO public.tblgrupo(descripcion, gramo, estado, fecha_creacion) VALUES ('Poliuretano',false,1,current_date);
  INSERT INTO public.tblgrupo(descripcion, gramo, estado, fecha_creacion) VALUES ('Esmalte',false,1,current_date);
  INSERT INTO public.tblgrupo(descripcion, gramo, estado, fecha_creacion) VALUES ('Poliester',true,1,current_date);



  -- Function: public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer)

  -- DROP FUNCTION public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer);

  CREATE OR REPLACE FUNCTION public.spd_create_update_group(
      IN pmt_id_grupo integer,
      IN pmt_descripcion character varying,
      IN pmt_gramo boolean,
      IN pmt_estado integer,
      OUT out_result integer)
    RETURNS integer AS
  $BODY$
  DECLARE
      BEGIN

              /* Create or Update */
              IF pmt_id_grupo > 0 THEN
              	-- Update group
                              UPDATE tblgrupo
                              SET descripcion = pmt_descripcion,
                                  gramo = pmt_gramo,
                                  estado = pmt_estado
                               WHERE id_grupo = pmt_id_grupo;

                          -- Select this id_grupo
                              SELECT pmt_id_grupo INTO out_result;
              ELSE
                  INSERT INTO public.tblgrupo(descripcion, gramo, estado, fecha_creacion) VALUES (pmt_descripcion,pmt_gramo,pmt_estado,current_date);
              END IF; /* pmt_id_grupo > 0 */



      END;
  $BODY$
    LANGUAGE plpgsql VOLATILE
    COST 100;
  ALTER FUNCTION public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer)
    OWNER TO postgres;
