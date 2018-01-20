/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import model.Conexion;
import model.vo.GrupoMarcaVO;

/**
 *
 * @author Zero
 */
public class GrupoMarcaDAO {
    
   public GrupoMarcaDAO(){}
    
    
   public String Registrar(GrupoMarcaVO grupo_marca){
    
        Conexion sql = new Conexion();
        String respuesta="";
        
        try {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_GrupoMarca(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                  /* Parametros IN */
                 cstmt.setInt(1, grupo_marca.getId_grupo());
                 cstmt.setInt(2, grupo_marca.getId_marca());
             
                ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                    respuesta = r.getString(1);
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return respuesta;
    }
   
    /* Busca todas las marcas */
    public String getGruposMarcas(){
      String listGrupoMarca = "";
      Conexion sql= new Conexion();
      
      try
      {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_GruposMarcas()}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                ResultSet  r = cstmt.executeQuery();
                 
                 listGrupoMarca = "[";
                        while (r.next()) {   
                            
                          
                            String id = String.valueOf(r.getInt("Id"));
                            String id_grupo = String.valueOf(r.getInt("IdGrupo"));
                            String id_marca = String.valueOf(r.getInt("IdMarca"));
                            String grupo  = r.getString("Grupo");
                            String marca  = r.getString("Marca");
                            
                             listGrupoMarca = listGrupoMarca + "{\"Id\":"+ id +
                                 ",\"Id_grupo\":" + id_grupo +
                                 ",\"Id_marca\":" + id_marca +
                                 ",\"Grupo\":\"" + grupo  +
                                 "\",\"Marca\":\""+marca+"\"}";
                            
                             if(r.isLast()==false){
                                 listGrupoMarca = listGrupoMarca + ",";
                             }
                                
                       }
                        
                        listGrupoMarca = listGrupoMarca +  "]";
                 
                    cstmt.close();
                    sql.getConexion().close();
                                
            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
      
      
      return listGrupoMarca;
        
    }
    
}
