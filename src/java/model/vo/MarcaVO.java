
package model.vo;


public class MarcaVO {
    
    private int id;
    private String  marca;
    
    
    public MarcaVO(){}
    
    public MarcaVO(int id, String marca){
        this.id = id;
        this.marca = marca;
    }
    
    /* Setter */
    public void setId(int id){this.id = id;}
    public void setMarca(String marca){this.marca = marca;}
    /* Getter */
    public int getId(){return this.id;}
    public String getMarca(){return this.marca;}
    
    
    
}
