/* Create */

-- Table: public.tblpresentacion

-- DROP TABLE public.tblpresentacion;

    CREATE TABLE public.tblpresentacion
    (
      id_presentacion bigint NOT NULL DEFAULT nextval('tblpresentacion_id_presentacion_seq'::regclass),
      descripcion character varying(50),
      fraccionable boolean,
      estado integer,
      id_grupo integer,
      fecha_creacion date,
      fecha_modificacion date
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblpresentacion
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblpresentacion_id_presentacion_seq

    -- DROP SEQUENCE public.tblpresentacion_id_presentacion_seq;

    CREATE SEQUENCE public.tblpresentacion_id_presentacion_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblpresentacion_id_presentacion_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblpresentacion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('Galon','true',1,4,current_date);
INSERT INTO public.tblpresentacion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('1/32 Gln','true',1,3,current_date);
