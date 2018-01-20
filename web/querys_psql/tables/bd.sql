-- Database: "paintSoft"

-- DROP DATABASE "paintSoft";

CREATE DATABASE "paintSoft"
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;

-------------
Sequences
--------------

-- Sequence: public.tblcliente_id_cliente_seq

-- DROP SEQUENCE public.tblcliente_id_cliente_seq;

CREATE SEQUENCE public.tblcliente_id_cliente_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9999999999
  START 1
  CACHE 1;
ALTER TABLE public.tblcliente_id_cliente_seq
  OWNER TO postgres;


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


    -- Sequence: public.tblgrupo_id_grupo_seq

    -- DROP SEQUENCE public.tblgrupo_id_grupo_seq;

    CREATE SEQUENCE public.tblgrupo_id_grupo_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblgrupo_id_grupo_seq
      OWNER TO postgres;


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


    -- Sequence: public.tblprovedor_id_proveedor_seq

    -- DROP SEQUENCE public.tblprovedor_id_proveedor_seq;

    CREATE SEQUENCE public.tblprovedor_id_proveedor_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9999999999
      START 1
      CACHE 1;
    ALTER TABLE public.tblprovedor_id_proveedor_seq
      OWNER TO postgres;




-------------
Tablas
--------------

- Table: public.tblcliente

-- DROP TABLE public.tblcliente;

CREATE TABLE public.tblcliente
(
  id_cliente bigint NOT NULL DEFAULT nextval('tblcliente_id_cliente_seq'::regclass),
  nombre character varying(100),
  documento character varying(20),
  telefono character varying(100),
  direccion character varying(100),
  ciudad character varying(100),
  email character varying(100),
  estado integer,
  fecha_creacion date,
  fecha_modificacion date
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.tblcliente
  OWNER TO postgres;

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


    -- Table: public.tblgrupo

    -- DROP TABLE public.tblgrupo;

    CREATE TABLE public.tblgrupo
    (
      id_grupo bigint NOT NULL DEFAULT nextval('tblgrupo_id_grupo_seq'::regclass),
      descripcion character varying(100),
      gramo boolean,
      estado integer,
      fecha_creacion date
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblgrupo
      OWNER TO postgres;

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



  -- Table: public.tblproveedor

  -- DROP TABLE public.tblproveedor;

  CREATE TABLE public.tblproveedor
  (
    id_proveedor bigint NOT NULL DEFAULT nextval('tblprovedor_id_proveedor_seq'::regclass),
    razon_social character varying(100),
    nit character varying(20),
    contacto character varying(100),
    ciudad character varying(50),
    direccion character varying(100),
    telefono_1 character varying(20),
    telefono_2 character varying(20),
    email character varying(100),
    banco character varying(50),
    tipo_cuenta character varying(20),
    numero_cuenta character varying(20),
    titular_cuenta character varying(100),
    estado integer,
    fecha_creacion date,
    fecha_modificacion date
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.tblproveedor
    OWNER TO postgres;
