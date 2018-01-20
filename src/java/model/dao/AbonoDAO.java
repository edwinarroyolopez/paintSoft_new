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
public class AbonoDAO {
    
     public AbonoDAO(){}
    
    
    
    public String insert_Abono_venta(int pmtId_factura,int pmtValor_abono){
        
        String saldo = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Abono(?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setInt(1, pmtId_factura);
            cstmt.setInt(2, pmtValor_abono);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                saldo = String.valueOf(r.getInt("Saldo"));
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return saldo;
    }
    /**/
    public String insert_Abono_compra(int pmtId_factura,int pmtValor_abono, String pmtMedio, String pmtReceptor, String pmtResponsable){
        
        String saldo = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Abono_compra(?,?,?,?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setInt(1, pmtId_factura);
            cstmt.setInt(2, pmtValor_abono);
            cstmt.setString(3, pmtMedio);
            cstmt.setString(4, pmtReceptor);
            cstmt.setString(5, pmtResponsable);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                saldo = String.valueOf(r.getInt("Saldo"));
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return saldo;
    }
    
     public String search_Abono_venta(int pmtId_factura){
        
        String json_abono = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Abono(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setInt(1, pmtId_factura);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                
                    if(r.isFirst()){json_abono ="[";}


                     json_abono = json_abono + "{\"Id\":"+ r.getString("Id")+
                                                ",\"Id_encabezado_venta\":"+r.getString("Id_encabezado_venta")+
                                                ",\"Numero\":\""+r.getString("Numero")+
                                                "\",\"Valor\":"+r.getString("Valor")+
                                                ",\"Fecha\":\""+r.getString("Fecha")+"\"}";

                    if(r.isLast()){
                        json_abono =json_abono+"]";
                    }else{
                        json_abono =json_abono+",";
                    }
               
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return json_abono;
    }
     
     public String search_Abono_compra(int pmtId_factura){
        
        String json_abono = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Abono_compra(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setInt(1, pmtId_factura);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                
                    if(r.isFirst()){json_abono ="[";}


                     json_abono = json_abono + "{\"Id\":"+ r.getString("Id")+
                                                ",\"Id_encabezado_compra\":"+r.getString("Id_encabezado_compra")+
                                                ",\"Numero\":\""+r.getString("Numero")+
                                                "\",\"Valor\":"+r.getString("Valor")+
                                                "\",\"Medio\":\""+r.getString("Medio")+
                                                "\",\"Receptor\":\""+r.getString("Receptor")+
                                                "\",\"Responsable\":\""+r.getString("Responsable")+
                                                "\",\"Fecha\":\""+r.getString("Fecha")+"\"}";

                    if(r.isLast()){
                        json_abono =json_abono+"]";
                    }else{
                        json_abono =json_abono+",";
                    }
               
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return json_abono;
    }
}
