

/* Create */

-- Table: public.tblgestion

-- DROP TABLE public.tblgestion;

    CREATE TABLE public.tblgestion
    (
       id_gestion bigint NOT NULL DEFAULT nextval('tblgestion_id_gestion_seq'::regclass),
       id_final int,
       id_externo int,
       tipo_externo int,
       fecha_hora timestamp,
       observaciones character varying(200)
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblgestion
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblgestion_id_gestion_seq

    -- DROP SEQUENCE public.tblgestion_id_gestion_seq;

    CREATE SEQUENCE public.tblgestion_id_gestion_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblgestion_id_gestion_seq
      OWNER TO postgres;


/* Insert */
INSERT INTO public.tblgestion(id_final,id_externo,tipo_externo,fecha_hora,observaciones) values (1,1,1,now(),'Observacion - prueba');
