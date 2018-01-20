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
import model.vo.unidadMedidaVO;

/**
 *
 * @author Zero
 */
public class unidadMedidaDAO {
    
    
    private LinkedList<unidadMedidaVO> list;
    
    public unidadMedidaDAO(){    }
    
    public LinkedList<unidadMedidaVO> getList(){return this.list;}
     public void setList(LinkedList<unidadMedidaVO> list){ this.list = list;}
    
    
    public String Registrar(unidadMedidaVO unidad_medida){
    
        Conexion sql = new Conexion();
        String json_unidad_medida = new String();
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_unidadMedida(?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                
                int id_medida = unidad_medida.getId_medida();
                int id_grupo = unidad_medida.getId_grupo();
                String text_unidad_medida = unidad_medida.getUnidad_medida();
                
                  /* Parametros IN */
                 cstmt.setInt(1, id_medida);
                 cstmt.setInt(2, unidad_medida.getId_grupo());
                 cstmt.setString(3, text_unidad_medida);
             
                ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                   
                     json_unidad_medida = "[{\"Id\":"+r.getString("Id")+ ", \"Id_medida\":"+id_medida+
                                          ", \"Id_grupo\":"+id_grupo+", \"Unidad_medida\":\""+text_unidad_medida+"\"}]" ;
                    
                    
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return json_unidad_medida;
    }
    
    public String getUnidades_medida(){
    
        
        String listUnidadesMedida = "";
        Conexion sql= new Conexion();
        
        
         try
      {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_UnidadesMedida()}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                ResultSet  r = cstmt.executeQuery();
                 
                        listUnidadesMedida = "[";
                        
                        while (r.next()) {   
                            
                            String id = String.valueOf(r.getInt("Id"));
                            String id_medida = String.valueOf(r.getInt("Id_medida"));
                            String id_grupo = String.valueOf(r.getInt("Id_grupo"));
                            String grupo = r.getString("Grupo");
                            String unidad_medida = r.getString("Valor");
                            String medida = r.getString("Medida");
                            
                             listUnidadesMedida = listUnidadesMedida + "{\"Id\":"+ id +
                                 ",\"Id_medida\":" + id_medida +
                                 ",\"Id_grupo\":" + id_grupo +
                                 ",\"Grupo\":\"" + grupo  +
                                 "\",\"Unidad_medida\":\"" + unidad_medida  +
                                 "\",\"Medida\":\""+medida+"\"}";
                            
                                    if(r.isLast()==false){
                                        listUnidadesMedida = listUnidadesMedida + ",";
                                    }
                               
                       }
                        
                        listUnidadesMedida = listUnidadesMedida +  "]";
                        
                    cstmt.close();
                    sql.getConexion().close();
                                
            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
         return listUnidadesMedida;
        
    }/* Fin - Get Unidades de medida */
    
    
     public String set_Forma_fisica(int pmtId_unidad_medida,int pmtForma_fisica){
    
          Conexion sql= new Conexion();
  
            try
            {
          
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_set_Forma_fisica(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                 /* Parametros IN */
                  cstmt.setInt(1, pmtId_unidad_medida);
                  cstmt.setInt(2, pmtForma_fisica);
                  
                 ResultSet  r = cstmt.executeQuery();
                 
                 while (r.next()) {
                     
                 }
                 
                 cstmt.close();
                 sql.getConexion().close();
                                
            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
         
    
        return "Listo!";
    }
    
    
    
    
}
