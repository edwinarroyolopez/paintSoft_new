-- Function: public.spd_create_update_customer(integer, character varying, character varying, character varying, character varying, character varying, character varying, integer)

-- DROP FUNCTION public.spd_create_update_customer(integer, character varying, character varying, character varying, character varying, character varying, character varying, integer);

CREATE OR REPLACE FUNCTION public.spd_create_update_customer(
    IN pmt_id_cliente integer,
    IN pmt_nombre character varying,
    IN pmt_documento character varying,
    IN pmt_telefono character varying,
    IN pmt_direccion character varying,
    IN pmt_ciudad character varying,
    IN pmt_email character varying,
    IN pmt_estado integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$

DECLARE
	v_repeat_documento integer;
        v_result_user integer;
    BEGIN

            /* Create or Update */
            IF pmt_id_cliente > 0 THEN
            	-- Update customer
                                UPDATE tblcliente
                                SET nombre = pmt_nombre,
                                    documento = pmt_documento,
                                    telefono = pmt_telefono,
                                    direccion = pmt_direccion,
                                    ciudad = pmt_ciudad,
                                    email = pmt_email,
                                    estado = pmt_estado,
                                    fecha_modificacion = current_date
                                 WHERE id_cliente = pmt_id_cliente;

                            -- Select this id_customer
                                SELECT pmt_id_cliente INTO out_result;
            ELSE

                        -- Verify that the nit is not repeated
                        select count(*) from tblcliente where
                        documento = pmt_documento into v_repeat_documento;

                        IF v_repeat_documento > 0 THEN /* Repeat nit */
							-- Error is repeat
                                out_result = -1;
                        ELSE
                        	-- Create new customer
                				  INSERT INTO public.tblcliente(nombre, documento, telefono, direccion, ciudad, email,estado, fecha_creacion)
                				  VALUES (pmt_nombre,pmt_documento,pmt_telefono,pmt_direccion,pmt_ciudad,pmt_email,pmt_estado,current_date);


                        END IF;/* repeat identification number */

            END IF; /* pmt_id_customer > 0 */



    END;

$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_create_update_customer(integer, character varying, character varying, character varying, character varying, character varying, character varying, integer)
  OWNER TO postgres;










----------------------



-- Function: public.spd_create_update_group(integer, character varying, boolean, integer)

-- DROP FUNCTION public.spd_create_update_group(integer, character varying, boolean, integer);

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
ALTER FUNCTION public.spd_create_update_group(integer, character varying, boolean, integer)
  OWNER TO postgres;



---------------------------



-- Function: public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer)

-- DROP FUNCTION public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer);

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
  RETURNS integer AS
$BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_create_update_provider(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer)
  OWNER TO postgres;



-------------------


-- Function: public.spd_remove_customer(integer)

-- DROP FUNCTION public.spd_remove_customer(integer);

CREATE OR REPLACE FUNCTION public.spd_remove_customer(
    IN pmt_id_cliente integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$
DECLARE
    BEGIN /* Remove customer*/

	UPDATE tblcliente
	SET estado = 2,
	    fecha_modificacion = current_date
	WHERE id_cliente = pmt_id_cliente;/* Cambia estado: 2 -> "Elimina cliente" */

	SELECT count(*) FROM tblcliente
	WHERE id_cliente = pmt_id_cliente and estado = 2
	INTO out_result;/* retorna un 1 si elimina un 0 sino */

    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_remove_customer(integer)
  OWNER TO postgres;



------------------


-- Function: public.spd_remove_group(integer)

-- DROP FUNCTION public.spd_remove_group(integer);

CREATE OR REPLACE FUNCTION public.spd_remove_group(
    IN pmt_id_grupo integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$
DECLARE
    BEGIN /* Remove customer*/

	UPDATE tblgrupo
	SET estado = 2
	WHERE id_grupo = pmt_id_grupo;/* Cambia estado: 2 -> "Elimina grupo" */

	SELECT count(*) FROM tblgrupo
	WHERE id_grupo = pmt_id_grupo and estado = 2
	INTO out_result;/* retorna un 1 si elimina un 0 sino */

    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_remove_group(integer)
  OWNER TO postgres;




-------------------------

-- Function: public.spd_remove_provider(integer)

-- DROP FUNCTION public.spd_remove_provider(integer);

CREATE OR REPLACE FUNCTION public.spd_remove_provider(
    IN pmt_id_proveedor integer,
    OUT out_result integer)
  RETURNS integer AS
$BODY$
DECLARE
    BEGIN /* Remove provider*/

	UPDATE tblproveedor
	SET estado = 2,
	    fecha_modificacion = current_date
	WHERE id_proveedor = pmt_id_proveedor;/* Cambia estado: 2 -> "Elimina proveedor" */

	SELECT count(*) FROM tblproveedor
	WHERE id_proveedor = pmt_id_proveedor and estado = 2
	INTO out_result;/* retorna un 1 si elimina un 0 sino */

    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.spd_remove_provider(integer)
  OWNER TO postgres;
