/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

/**
 *
 * @author Zero
 */
public class GrupoMarcaVO {
    
    private int id;
    private int id_grupo;
    private int id_marca;
    private String grupo;
    private String marca;
    
     public GrupoMarcaVO(){}
    
    public GrupoMarcaVO(int id, int id_grupo, int id_marca){
        this.id = id;
        this.id_grupo = id_grupo;
        this.id_marca = id_marca;
    }
    
    /* Setters */
    public void setId(int id){this.id = id;}
    public void setId_grupo(int id_grupo){this.id_grupo = id_grupo;}
    public void setId_marca(int id_marca){this.id_marca = id_marca;}
    
    public void setGrupo(String grupo){this.grupo = grupo;}
     public void setMarca(String marca){this.marca = marca;}
     
    /* Getters */
    public int getId(){return this.id;}
    public int getId_grupo(){return this.id_grupo;}
    public int getId_marca(){return this.id_marca;}
    
    public String getMarca(){return this.marca;}
    public String getGrupo(){return this.grupo;}
    
}
