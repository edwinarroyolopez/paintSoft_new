

/* Create */

-- Table: public.tblfactura_venta

-- DROP TABLE public.tblfactura_venta;

    CREATE TABLE public.tblfactura_venta
    (
       id_factura_venta bigint NOT NULL DEFAULT nextval('tblfactura_venta_id_factura_venta_seq'::regclass),
       id_cliente int,
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
    ALTER TABLE public.tblfactura_venta
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblfactura_venta_id_factura_venta_seq

    -- DROP SEQUENCE public.tblfactura_venta_id_factura_venta_seq;

    CREATE SEQUENCE public.tblfactura_venta_id_factura_venta_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblfactura_venta_id_factura_venta_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblfactura_venta(id_producto,cantidad,fecha_ingreso,fecha_vencimiento,fecha_hora_ultima_venta,id_ultima_gestion,id_factura) values (1,1,current_date,current_date,now(),1,1);
