

/* Create */

-- Table: public.tblstock

-- DROP TABLE public.tblstock;

    CREATE TABLE public.tblstock
    (
       id_stock bigint NOT NULL DEFAULT nextval('tblstock_id_stock_seq'::regclass),
       id_producto int,
       cantidad int,
       fecha_ingreso date,
       fecha_vencimiento date,
       fecha_hora_ultima_venta timestamp,
       id_ultima_gestion int,
       id_factura int
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblstock
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblstock_id_stock_seq

    -- DROP SEQUENCE public.tblstock_id_stock_seq;

    CREATE SEQUENCE public.tblstock_id_stock_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblstock_id_stock_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblstock(id_producto,cantidad,fecha_ingreso,fecha_vencimiento,fecha_hora_ultima_venta,id_ultima_gestion,id_factura) values (1,1,current_date,current_date,now(),1,1);
