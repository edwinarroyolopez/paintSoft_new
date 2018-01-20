
/* Create */

-- Table: public.tblproducto_presentacion

-- DROP TABLE public.public.tblproducto_presentacion;

-- Table: public.tblproducto_presentacion

-- DROP TABLE public.tblproducto_presentacion;

CREATE TABLE public.tblproducto_presentacion
(
id_producto_presentacion bigint NOT NULL DEFAULT nextval('tblproducto_presentacion_id_producto_presentacion_seq'::regclass),
id_producto integer,
id_presentacion integer,
estado integer
)
WITH (
OIDS=FALSE
);
ALTER TABLE public.tblproducto_presentacion
OWNER TO postgres;


    /* sequence */
    -- Sequence: public.tblproducto_presentacion_id_producto_presentacion_seq

    -- DROP SEQUENCE public.tblproducto_presentacion_id_producto_presentacion_seq;

    CREATE SEQUENCE public.tblproducto_presentacion_id_producto_presentacion_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblproducto_presentacion_id_producto_presentacion_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblfraccion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('Galon','true',1,4,current_date);
INSERT INTO public.tblfraccion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('1/32 Gln','true',1,3,current_date);
