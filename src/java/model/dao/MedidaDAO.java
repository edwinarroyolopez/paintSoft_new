
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import model.Conexion;
import model.vo.MarcaVO;
import model.vo.MedidaVO;

public class MedidaDAO {
    
    public String Registrar(MedidaVO medida){
    
        Conexion sql = new Conexion();
        String json_medida= new String();
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Medida(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                 /* Parametros IN */
                    cstmt.setString(1, medida.getMedida());
                    ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                    json_medida = "[{\"Medida\":\""+medida.getMedida()+"\",\"Id\":"+r.getString("Id")+"}]";
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return json_medida;
    }
    
     /* Busca todas las marcas */
    public String getMedidas(){
     // LinkedList<MedidaVO> listMedidas =new LinkedList<MedidaVO>();
      
      String listMedidas = "";
      Conexion sql= new Conexion();
      
      try
      {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_MedidasTodas()}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                ResultSet  r = cstmt.executeQuery();
                 
                    listMedidas = "[";
                        while (r.next()) {   
                                                        
                            String id = String.valueOf(r.getInt("Id"));
                            String medida  = r.getString("Medida");
                            
                             listMedidas = listMedidas + "{\"Id\":"+ id +
                                     ",\"Medida\":\""+medida+"\"}";
                            
                             if(r.isLast()==false){
                                 listMedidas = listMedidas + ",";
                             }
                                
                       }
                        
                        listMedidas = listMedidas + "]";
                 
                    cstmt.close();
                    sql.getConexion().close();
                                
            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
      
      
      return listMedidas;
        
    }
    
    /* Sólo busca las marcas de un grupo de productos */
    public static LinkedList<MarcaVO> getMarcas(int pmtIdProducto_grupo){
        LinkedList<MarcaVO> listMarcas=new LinkedList<MarcaVO>();
        Conexion sql= new Conexion();
        
        
         try
      {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Marcas()}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                cstmt.setInt(1, pmtIdProducto_grupo);
                ResultSet  r = cstmt.executeQuery();
                 
                
                        while (r.next()) {   
                                MarcaVO Marca = new MarcaVO();
                                Marca.setId(r.getInt("Id"));
                                Marca.setMarca(r.getString("Marca"));
                                listMarcas.add(Marca);
                       }
                 
                    cstmt.close();
                    sql.getConexion().close();
                                
            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
        
        
        return listMarcas;
    }
    
    
    
}
