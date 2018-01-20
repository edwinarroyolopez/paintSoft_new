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
public class InventarioVO {
    
    
    private int id_producto;
    private int id_unidad_medida;
    private String unidad_medida;
    private int stock;
    
    public InventarioVO(){}
    
    /* Setter's */
    public void setId_producto(int id_producto){this.id_producto=id_producto;}
    public void setId_unidad_medida(int id_unidad_medida){this.id_unidad_medida=id_unidad_medida;}
    public void setUnidad_medida(String unidad_medida){this.unidad_medida=unidad_medida;}
    public void setStock(int stock){this.stock=stock;} 
    /* Getter's */
    public int getId_producto(){return this.id_producto;}
    public int getId_unidad_medida(){return this.id_unidad_medida;}
    public String getUnidad_medida(){return this.unidad_medida;}
    public int getStock(){return this.stock;}
    
    

}
