

/* Create */

-- Table: public.tblfinal

-- DROP TABLE public.tblfinal;

    CREATE TABLE public.tblfinal
    (
       id_final bigint NOT NULL DEFAULT nextval('tblfinal_id_final_seq'::regclass),
       descripcion character varying(100),
       observaciones character varying(200),
       estado int,
       fecha_creacion date,
       fecha_modificacion date
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblfinal
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblfinal_id_final_seq

    -- DROP SEQUENCE public.tblfinal_id_final_seq;

    CREATE SEQUENCE public.tblfinal_id_final_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblfinal_id_final_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblfinal(descripcion,observaciones,estado,fecha_creacion) values ('Venta','',1,current_date);
INSERT INTO public.tblfinal(descripcion,observaciones,estado,fecha_creacion) values ('Compra','',1,current_date);
INSERT INTO public.tblfinal(descripcion,observaciones,estado,fecha_creacion) values ('Devolucion','',1,current_date);
INSERT INTO public.tblfinal(descripcion,observaciones,estado,fecha_creacion) values ('Prestamo','',1,current_date);
INSERT INTO public.tblfinal(descripcion,observaciones,estado,fecha_creacion) values ('Abono','',1,current_date);
