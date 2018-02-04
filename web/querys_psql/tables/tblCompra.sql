

/* Create */

-- Table: public.tblfactura_compra

-- DROP TABLE public.tblfactura_compra;

    CREATE TABLE public.tblfactura_compra
    (
       id_factura_compra bigint NOT NULL DEFAULT nextval('tblfactura_compra_id_factura_compra_seq'::regclass),
       id_proveedor int,
       numero_factura int,
       fecha date,
       forma_pago int,
       fecha_vencimiento date,
       estado timestamp,
       detalle json,
       tipo int,
       id_gestion int
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblfactura_compra
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblfactura_compra_id_factura_compra_seq

    -- DROP SEQUENCE public.tblfactura_compra_id_factura_compra_seq;

    CREATE SEQUENCE public.tblfactura_compra_id_factura_compra_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblfactura_compra_id_factura_compra_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblfactura_compra(id_producto,cantidad,fecha_ingreso,fecha_vencimiento,fecha_hora_ultima_venta,id_ultima_gestion,id_factura) values (1,1,current_date,current_date,now(),1,1);
