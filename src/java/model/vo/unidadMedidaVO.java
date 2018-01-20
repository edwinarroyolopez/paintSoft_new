
package model.vo;


public class unidadMedidaVO {
    
    private int id;
    private int id_medida;
    private int id_grupo;
    private String unidad_medida;
    private String medida;
    private String grupo;
    
    
    public  unidadMedidaVO(){}
    
    public  unidadMedidaVO(int id, int id_medida, int id_grupo, String unidad_medida){
        this.id =id;
        this.id_medida=id_medida;
        this.unidad_medida = unidad_medida;
        this.id_grupo = id_grupo;
    }
    
    /* Setters */
    public void setId(int id){this.id=id;}
    public void setId_medida(int id_medida){this.id_medida=id_medida;}
    public void setId_grupo(int id_grupo){this.id_grupo=id_grupo;}
    public void setUnidad_medida(String unidad_medida){this.unidad_medida=unidad_medida;}
    public void setMedida(String medida){this.medida=medida;}
    public void setGrupo(String grupo){this.grupo=grupo;}

    /* Getters */
    public int getId(){return this.id;}
    public int getId_medida(){return this.id_medida;}
    public int getId_grupo(){return this.id_grupo;}
    public String getUnidad_medida(){return this.unidad_medida;}
    public String getMedida(){return this.medida;}
    public String getGrupo(){return this.grupo;}
}
