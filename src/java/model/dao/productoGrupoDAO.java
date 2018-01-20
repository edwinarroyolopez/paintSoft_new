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
import model.vo.productoGrupoVO;

/**
 *
 * @author Zero
 */
public class productoGrupoDAO {
    
    private LinkedList<productoGrupoVO> list;
    
    public  productoGrupoDAO(){   }
    
    public void setList(LinkedList<productoGrupoVO> list){this.list =list;}
    public LinkedList<productoGrupoVO> getList(){return this.list;}
    
    public String getGrupos(){
    
         String listGrupos = "[";
        Conexion sql= new Conexion();

            try
            {

                  PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_productoGrupos()}",
                  ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                  ResultSet  r = cstmt.executeQuery();

                          while (r.next()) {   
                              
                                String id = String.valueOf(r.getInt("Id"));
                                String id_medida = String.valueOf(r.getInt("Id_medida"));
                                String grupo  = r.getString("Grupo");
                                String medida  = r.getString("Medida");

                                 listGrupos = listGrupos + "{\"Id\":"+ id +
                                     ",\"Id_medida\":" + id_medida +
                                     ",\"Grupo\":\"" + grupo  +
                                     "\",\"Medida\":\""+medida+"\"}";

                                 if(r.isLast()==false){
                                     listGrupos = listGrupos + ",";
                                 }
                         }
                           listGrupos = listGrupos +  "]";

                      cstmt.close();
                      sql.getConexion().close();

              }catch (SQLException e) {
                   System.out.println(e.getMessage());
              }

             return listGrupos;      
    }
    
   
    
    
    public String Registrar(productoGrupoVO productoGrupo){
        
        Conexion sql = new Conexion();
        String json_grupo = "";
            
       try {
                       
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_productoGrupo(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                  /* Parametros IN */
                 cstmt.setString(1, productoGrupo.getGrupo());
                 cstmt.setInt(2, productoGrupo.getId_medida());
             
                ResultSet  r = cstmt.executeQuery();
                                
                 while (r.next()){                    
                    
                     json_grupo = "[{\"Id\":"+r.getString("Id")+",\"Grupo\":\""+productoGrupo.getGrupo()+
                             "\",\"Id_medida\":"+productoGrupo.getId_medida()+",\"Medida\":\""+productoGrupo.getMedida()+"\"}]";
                }
                       
                    cstmt.close();
                    sql.getConexion().close();

            } catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
                  return json_grupo;
                  
    }/* End Register */
    
  
    
}
