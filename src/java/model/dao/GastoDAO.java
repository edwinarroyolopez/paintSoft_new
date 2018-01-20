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
public class GastoDAO {
    
    public GastoDAO(){}
    
    
    public String insert_Gasto(String pmtDescripcion,int pmtTipo, int pmtValor){
        
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Gasto(?,?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setString(1, pmtDescripcion);
            cstmt.setInt(2, pmtTipo);
            cstmt.setInt(3, pmtValor);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                Id = String.valueOf(r.getInt("Id"));
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return Id;
    }
    
    public String getGastos_hoy(){
        
        String json_gastos = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Gastos_hoy()}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            
                ResultSet r = cstmt.executeQuery();

                while(r.next()){
                    
                        if(r.isFirst()){/* Primer registro */
                                  json_gastos = "[";
                         }    
                    
                       json_gastos = json_gastos + "{\"Id_gasto\":"+r.getString("Id")+
                                    ",\"Descripcion\":\""+r.getString("Descripcion")+
                                    "\",\"Tipo\":\""+r.getString("Tipo")+
                                    "\",\"Valor\":"+r.getString("Valor")+
                                    ",\"Fecha\":\""+r.getString("Fecha")+"\"}";
                    
                       if(r.isLast()==false){
                            json_gastos = json_gastos + ",";
                       }else{/* Último registro */
                            json_gastos = json_gastos + "]";
                       }

                }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        return json_gastos;
        
    }
    
}
