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
public class productoGrupoVO {
    private int id;
    private String grupo;
    private int id_medida;
    private String medida;
    
    /* Constructor: 1 */
    public productoGrupoVO(){}
    /* Constructor: 2 */
    public productoGrupoVO(int id, String grupo, int id_medida){
        this.id = id;
        this.grupo = grupo;
        this.id_medida = id_medida;
    }
    /* Constructor: 3 */
    public productoGrupoVO(int id, String grupo, int id_medida, String medida){
        this.id = id;
        this.grupo = grupo;
        this.id_medida = id_medida;
        this.medida = medida;
    }
    
    /* Setter */
    public void setId(int id){this.id=id;}
    public void setGrupo(String grupo){this.grupo=grupo;}
    public void setId_medida(int id_medida){this.id_medida=id_medida;}
    public void setMedida(String medida){this.medida=medida;}
    /* Getter */
    public int getId(){return this.id;}
    public String getGrupo(){return this.grupo;}
    public int getId_medida(){return this.id_medida;}
    public String getMedida(){return this.medida;}
    
}
