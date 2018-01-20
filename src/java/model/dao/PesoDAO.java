/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;

/**
 *
 * @author Zero
 */
public class PesoDAO {
    
    public PesoDAO(){}
    
    public String getPeso(int pmtId_producto, int pmtId_unidad_medida){
        
        String  json_peso = new String();
        
        Conexion sql = new Conexion();
        
        try{
        
            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_F_Peso(?,?)}",
                                      ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            pstmt.setInt(1, pmtId_producto);
            pstmt.setInt(2, pmtId_unidad_medida);
            
            ResultSet r = pstmt.executeQuery();
            
            while(r.next()){/* Qué recibo? */
                
                int precio_gramo = r.getInt("Precio_gramo");
                
                json_peso = "[{\"Id\":" +r.getInt("Id") +
                            ",\"Peso\":"+r.getInt("Peso")+",\"Precio_gramo\":"+precio_gramo+"}]";
            }
            
            
        }catch(SQLException e){ System.out.println(e.getMessage());}
        
        
        return json_peso;
    }
    
    public String Insert_peso(int pmtId_producto,int pmtId_unidad_medida,int pmtPeso){
    
        
        
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Peso(?,?,?)}"
                    ,ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros */
            pstmt.setInt(1, pmtId_producto);
            pstmt.setInt(2, pmtId_unidad_medida);
            pstmt.setInt(3, pmtPeso);
            
            ResultSet r = pstmt.executeQuery();
            
            while(r.next()){
                Id = r.getString("Id");
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return Id;
    }
    
    public String Insert_precio_gramo(int pmtId_producto ,int pmtPrecio_gramo){
        
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
                PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Precio_gramo(?,?)}",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                /* Parámetros */
                pstmt.setInt(1, pmtId_producto);
                pstmt.setInt(2, pmtPrecio_gramo);
                
                ResultSet r = pstmt.executeQuery();
                
                while(r.next()){
                    Id = String.valueOf(r.getInt("Id"));
                }
                
        
        }catch(SQLException e){System.out.println(e.getMessage());}
    
        return Id;
    }
    
    public String getSuficiente_producto(int pmtId_producto, int pmtPeso){
        

                    String suficiente = new String();
                    Conexion sql = new Conexion();

                    try{
                                PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_F_Suficiente_producto(?,?)}",
                                                          ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                                /* Parámetros */
                                pstmt.setInt(1,pmtId_producto);
                                pstmt.setInt(2,pmtPeso);

                                ResultSet r = pstmt.executeQuery();

                                while(r.next()){
                                    suficiente = r.getString("Suficiente");
                                }

                    }catch(SQLException e){System.out.println(e.getMessage());}
    
        return suficiente;
    }
    
}
