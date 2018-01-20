/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

public class MedidaVO {
    
    private int id;
    private String medida;

    public MedidaVO(){
    }
    public MedidaVO(int id, String medida){
        this.id = id;
        this.medida = medida;
    }
    
    /* Setters */
    public void setId(int id){this.id = id;}
    public void setMedida(String medida){this.medida = medida;}
    /* Getters */
    public int getId(){return this.id;}
    public String getMedida(){return this.medida;}
    
}
