
package model.vo;


public class FraccionVO {
    
    /*  */
    private int id;
    private int id_unidad_medida;
    private String fraccion;
    private Float proporcion;
    
    public FraccionVO(){}
    public FraccionVO(int id,int id_unidad_medida,String fraccion,Float proporcion){
            this.id = id;
            this.id_unidad_medida = id_unidad_medida;
            this.fraccion = fraccion;
            this.proporcion = proporcion;
    }
    
    /* Setters */
        public void setId(int id){ this.id = id;}
        public void setId_unidad_medida(int id_unidad_medida){ this.id_unidad_medida = id_unidad_medida;}
        public void setFraccion(String fraccion){this.fraccion = fraccion;}
        public void setPorporcion(Float proporcion){this.proporcion = proporcion;}
        
    /* Getters */
    public int getId(){return this.id;}
    public int getId_unidad_medida(){return this.id_unidad_medida;}
    public String getFraccion(){return this.fraccion;}
    public Float getProporcion(){return this.proporcion;}
}
