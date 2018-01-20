-- Table: public.tblproducto_presentacion

-- DROP TABLE public.tblproducto_presentacion;

CREATE TABLE public.tblproducto_presentacion
(
  id_producto_presentacion bigint NOT NULL DEFAULT nextval('tblproducto_presentacion_id_producto_presentacion_seq'::regclass),
  id_producto integer,
  presentaciones jsonb,
  estado integer
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.tblproducto_presentacion
  OWNER TO postgres;

delete from tblproducto_presentacion

select * from tblproducto_presentacion

INSERT INTO tblproducto_presentacion (id_producto, presentaciones,estado)
SELECT 10, rec ,1  FROM
json_array_elements('{ "data": [ { "presentaciones": [{"id_presentacion":11},{"id_presentacion":13}]}, { "id_presentacion": 17} ] }'::json->'data' ) rec



INSERT INTO tablajsonb

SELECT row_to_json(consulta)::JSONB FROM (SELECT 'Nombre'||round((random() * 100)::numeric,0)::text||' Apellido'||round((random() * 100)::numeric,0)::text as nombre_apellidos,

round((random() * 100)::numeric,0) as edad,round((random() * 9)::numeric ,2)as porciento FROM generate_series(1,100000) ) consulta;

INSERT INTO tablajson

SELECT row_to_json(consulta)::json FROM (SELECT 'Nombre'||round((random() * 100)::numeric,0)::text||' Apellido'||round((random() * 100)::numeric,0)::text as nombre_apellidos,

round((random() * 100)::numeric,0) as edad,round((random() * 9)::numeric ,2)as porciento FROM generate_series(1,100000) ) consulta;


select atributo->'edad'::text,atributo->'nombre_apellidos' from tablajsonb where atributo->'edad'::text='0'



CREATE FUNCTION insert_from_json(in_json_txt json) RETURNS void AS
$BODY$
  INSERT INTO table_name (name, age)
  SELECT (rec->>'name')::text , (rec->>'age')::integer  FROM
  json_array_elements(in_json_txt->'data') rec
$BODY$
  LANGUAGE sql 
