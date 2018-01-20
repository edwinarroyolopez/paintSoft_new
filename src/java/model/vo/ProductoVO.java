/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

public class ProductoVO {

private int id;
private int id_grupo;
private int id_marca;
private String codigo;
private String descripcion;

private String marca;
private String grupo;
private int id_medida;


public ProductoVO(){}
public ProductoVO(int id, int id_grupo, int id_marca , String codigo, String descripcion, String marca){
    this.id = id;
    this.id_grupo = id_grupo;
    this.id_marca = id_marca;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.marca = marca; 
}
public ProductoVO(int id, int id_grupo, int id_marca , String codigo, String descripcion, String marca,String grupo){
    this.id = id;
    this.id_grupo = id_grupo;
    this.id_marca = id_marca;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.marca = marca; 
    this.grupo = grupo; 
}

/* Setter */
public void setId(int id){this.id=id;}
public void setId_Grupo(int id_grupo){this.id_grupo=id_grupo;}
public void setId_Marca(int id_marca){this.id_marca=id_marca;}
public void setCodigo(String codigo){this.codigo=codigo;}
public void setDescripcion(String descripcion){this.descripcion=descripcion;}

public void setMarca(String marca){this.marca=marca;}
public void setGrupo(String grupo){this.grupo=grupo;}
public void setId_medida(int id_medida){this.id_medida=id_medida;}

/* Getter */
public int getId(){return this.id;}
public int getId_Grupo(){return this.id_grupo;}
public int getId_Marca(){return this.id_marca;}
public String getCodigo(){return this.codigo;}
public String getDescripcion(){return this.descripcion;}

public String getMarca(){return this.marca;}
public String getGrupo(){return this.grupo;}
public int getId_medida(){return this.id_medida;}

}
