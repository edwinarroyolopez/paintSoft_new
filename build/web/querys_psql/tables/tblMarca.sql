/* Create */

-- Table: public.tblpresentacion

-- DROP TABLE public.tblpresentacion;

    CREATE TABLE public.tblmarca
    (
      id_marca bigint NOT NULL DEFAULT nextval('tblmarca_id_marca_seq'::regclass),
      descripcion character varying(50),
      estado integer,
      fecha_creacion date,
      fecha_modificacion date
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblnarca
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblpresentacion_id_presentacion_seq

    -- DROP SEQUENCE public.tblpresentacion_id_presentacion_seq;

    CREATE SEQUENCE public.tblmarca_id_marca_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblmarca_id_marca_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblpresentacion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('Galon','true',1,4,current_date);
INSERT INTO public.tblpresentacion(descripcion,fraccionable,estado,id_grupo,fecha_creacion) values ('1/32 Gln','true',1,3,current_date);
