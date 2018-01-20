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
public class MaquinaDAO {
    
    /* Constructor */
   public MaquinaDAO(){}
    
    public int insert_Marca(String marca){
    
       Conexion sql = new Conexion();
       int  max_Id_marca = 0;
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Maquina_marca(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setString(1,marca);
                 
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
               
                 
                 while (r.next()) {  
                     max_Id_marca = Integer.parseInt(r.getString("Id"));
                 }
                       
                cstmt.close();/* Cierro estamento */
                sql.getConexion().close();/* Cierro conexion */ 
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
            
        return max_Id_marca;
    } 
    
    public int insert_Maquina(int id_marca, int modelo, String descripcion){
    
        Conexion sql = new Conexion();
             int max_Id_maquina = 0;
             
             try{
                    PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Maquina(?,?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                    
                    /* Parámetros IN */
                    cstmt.setInt(1,id_marca);
                    cstmt.setInt(2,modelo);
                    cstmt.setString(3,descripcion);
                    
                    ResultSet r = cstmt.executeQuery();
                    
                    while(r.next()){
                        max_Id_maquina = r.getInt("Id");
                    }
                    
             }catch(SQLException e){System.out.println(e.getMessage());}
    
         return max_Id_maquina;
    }
    
    public String getMarcas(){
        
        Conexion sql = new Conexion();
        String json_marcas = "[";
        
        try{
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Maquina_marcas()}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                    
            /* Sin prámetros */
             
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                  json_marcas = json_marcas + "{ \"Id\":"+r.getInt("Id")+",\"Marca\":\""+ r.getString("Marca")+ "\"}";
                  
                  if(!r.isLast()){
                      json_marcas = json_marcas + ",";
                  }
            }
                json_marcas = json_marcas + "]";
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        return json_marcas;
    }
 
    public String getMaquinas_by_marca_and_modelo(int id_marca,int modelo){
        
           Conexion sql = new Conexion();
           String json_maquinas = new String();
    
           try{
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Maquina_by_marca_and_modelo(?,?)}",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                /* Parámetros IN */
                cstmt.setInt(1, id_marca);
                cstmt.setInt(2, modelo);
           
                ResultSet r = cstmt.executeQuery();
                
                while(r.next()){
                    
                    if(r.isFirst()){/* Control de concatenación */
                        json_maquinas = "[";
                    }
                    
                    /* Formación de cadena json */
                        json_maquinas = json_maquinas + "{"+"\"Id\":"+r.getInt("Id")+
                                ",\"Descripcion\":\""+r.getString("Descripcion")+
                                "\",\"Modelo\":"+r.getInt("Modelo")+
                                ",\"Id_marca\":"+ r.getInt("Id_marca")+"}";
                    
                    
                    if(!r.isLast()){/* Control de concatenación */
                        json_maquinas = json_maquinas + ",";
                    }
                     
                }
                  json_maquinas = json_maquinas + "]";/* Cierre de concatenación json */
                
           }catch(SQLException e){System.out.println(e.getMessage());}
           
           
    
        return json_maquinas;
    }    
    
    
    public String getMaquinas_by_formula(int id_formula){
    
        Conexion sql = new Conexion();
        String json_maquinas = new String();
        
        try{
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Maquinas_by_formula(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                    
            /* Parámetros IN */
            cstmt.setInt(1,id_formula);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                
                if(r.isFirst()){/* Concatenación inicial de json */
                    json_maquinas = "["; 
                }
                
                /* Estructura de json */
                json_maquinas = json_maquinas + "{" +"\"Id_maquina\":"+r.getInt("Id_maquina")+
                                                ",\"Descripcion\":\"" +r.getString("Descripcion")+
                                                "\",\"Modelo\":"+r.getInt("Modelo")+
                                                ",\"Id_marca\":"+r.getString("Id_marca")+"}";
                
                
                if(!r.isLast()){/* Concatenación inicial de json */
                    json_maquinas = json_maquinas + ","; 
                }
            }
            json_maquinas = json_maquinas + "]";
            
        
        }catch(SQLException e){System.err.println(e.getMessage());}
        
        return json_maquinas;
    }
    
   
    
}
