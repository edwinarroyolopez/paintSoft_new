

/* Create */

-- Table: public.tblfraccion

-- DROP TABLE public.tblfraccion;

    CREATE TABLE public.tblfraccion
    (
       id_fraccion bigint NOT NULL DEFAULT nextval('tblfraccion_id_fraccion_seq'::regclass),
       id_presentacion integer,
       descripcion character varying(50),
       proporcion real
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblfraccion
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblfraccion_id_fraccion_seq

    -- DROP SEQUENCE public.tblfraccion_id_fraccion_seq;

    CREATE SEQUENCE public.tblfraccion_id_fraccion_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblfraccion_id_fraccion_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblfraccion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('Galon','true',1,4,current_date);
INSERT INTO public.tblfraccion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('1/32 Gln','true',1,3,current_date);
