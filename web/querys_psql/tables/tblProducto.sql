CREATE TABLE "dbo"."tblProducto"
(
   Id int NOT NULL,
   Descripcion varchar(50) NOT NULL,
   Codigo varchar(50) NOT NULL,
   Id_grupo int NOT NULL,
   Id_marca int NOT NULL,
   Estado int,
   Fecha_creacion datetime,
   Fecha_modificacion datetime
)
GO



/* Create */

-- Table: public.tblproducto

-- DROP TABLE public.tblproducto;

    CREATE TABLE public.tblproducto
    (
       id_producto bigint NOT NULL DEFAULT nextval('tblproducto_id_producto_seq'::regclass),
       descripcion character varying(100),
       id_grupo integer,
       id_marca integer,
       estado integer,
       fecha_creacion date,
       fecha_modificacion date
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.tblproducto
      OWNER TO postgres;

    /* sequence */
    -- Sequence: public.tblproducto_id_producto_seq

    -- DROP SEQUENCE public.tblproducto_id_producto_seq;

    CREATE SEQUENCE public.tblproducto_id_producto_seq
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
