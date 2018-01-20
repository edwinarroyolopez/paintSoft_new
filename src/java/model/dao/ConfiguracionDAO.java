
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import model.Conexion;

public class ConfiguracionDAO {

    /* Constructor */
    public ConfiguracionDAO() {
    }
    
    public String load_Table(){
        
        Conexion sql = new Conexion();
        String json_table = new String();
        
           try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Configuracion_get_tables()}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                
                 json_table = "[";
                 
                 while (r.next()) {            
                     
                      json_table = json_table +  "{\"Tabla\":\"" + r.getString("Tabla")+"\"}";
                    
                     if(r.isLast()==false){
                            json_table = json_table + ",";
                      }
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
                    
                    json_table = json_table + "]";
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
       return json_table; 
    } 
    
    public String getColumnas(String pmtTabla){
    
        Conexion sql = new Conexion();
        String json_name_columnas = new String();
        String json_columnas = new String();
        ArrayList list = new ArrayList();
                 
        
        /* Dos fases: Voy por el nombre de las columnas y la cantidad  */
        
         try {
                /* Primer procedimiento ---> Trae nombre de columnas */        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Configuracion_name_columns(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setString(1, pmtTabla);
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                
                 
                 
                 json_name_columnas = "\"Columnas\":[";
                 
                 /* Recorre el nombre de cada columna en la tabla */
                 while (r.next()) {            
                     
                      json_name_columnas = json_name_columnas +  "{\"Columna\":\"" + r.getString("Columna")+"\"}";
                      
                      /* Agrego la columna a una lista */
                      list.add(r.getString("Columna"));
                      
                     if(r.isLast()==false){
                            json_name_columnas = json_name_columnas + ",";
                      }
                }
                      json_name_columnas = json_name_columnas + "]";      
                 
                    cstmt.close();
                    sql.getConexion().close();
                    
                
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        json_columnas = getRegistros(json_name_columnas, list, pmtTabla);
        
        return json_columnas;
    
    }
    public String getRegistros(String json_name_columns, ArrayList list, String pmtTabla){
    
          Conexion sql = new Conexion();
          String json_columnas = new String();
        
        /* Dos fases: Voy por el nombre de las columnas y la cantidad  */
        
         try {
                /* Primer procedimiento ---> Trae nombre de columnas */        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("SELECT * FROM "+pmtTabla,
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
             
                 json_columnas = "[{" + json_name_columns+"}";
                 
                  if(r.next()){/* Si tiene registros*/
                        json_columnas = json_columnas + ","; /* Para darle continuidad a los registros */
                        r.previous();/* Regreso el cursor */
                    }
                     
                 
                 /* Recorre el nombre de cada columna en la tabla */
                 while (r.next()) {            
                 
                     String columna_valor = "{";
                                 
                         /* Crea un json Columna - Valor: Equivale a un registro o fila de la tabla */
                         for (int i = 0; i < list.size(); i++) {/* Ciclo que recorre cada columna */
                             
                            columna_valor = columna_valor + "\""+list.get(i)+"\":\""+ r.getObject(i+1).toString()+"\"" ;
                            
                            if(i+1<list.size()){/* Controlo cuando será último*/
                                columna_valor = columna_valor +",";
                            }
                         }
                         
                        columna_valor = columna_valor +"}";/* Resultado: {"Nombre":"Ed"} */
                         
                        json_columnas = json_columnas +  columna_valor;

                        if(r.isLast()==false){
                               json_columnas = json_columnas + ",";
                         }
                        
                }
                     
                    cstmt.close();
                    sql.getConexion().close();
                    
                     
                    json_columnas = json_columnas + "]";
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        
        return json_columnas;
        
        
    }

    
}
