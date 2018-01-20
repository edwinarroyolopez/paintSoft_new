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
/* json */
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
/**
 *
 * @author Zero
 */
public class GrupoDAO {

    public GrupoDAO(){   }



      public String create_update_Grupo(int pmtId_grupo, String pmtDescripcion,boolean pmtGramo, int pmtEstado){

                String id_grupo = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_group("+pmtId_grupo+",'"+pmtDescripcion+"',"+pmtGramo+","+pmtEstado+");";
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_grupo = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_grupo;
    }/* ## Create update grupo ##*/

    

  public String read_Grupos(){

            Conexion postgresql = new Conexion();
            JSONArray list_grupos = new JSONArray();/* Lista de grupos */

            try{
                       java.sql.Statement st = postgresql.getConexion().createStatement();
                       String sql = "SELECT * FROM tblgrupo WHERE Estado<2 ORDER BY Id_grupo DESC";
                       ResultSet r = st.executeQuery(sql);

                       while(r.next()){
                            /* Recibe grupos  */
                                JSONObject grupo = new JSONObject();

                                grupo.put("Id_grupo",r.getInt("Id_grupo"));
                                grupo.put("Descripcion",r.getString("Descripcion"));
                                grupo.put("Gramo",r.getString("Gramo"));
                                grupo.put("Estado",r.getString("Estado"));
                                grupo.put("Fecha_creacion",r.getString("Fecha_creacion"));

                                list_grupos.add(list_grupos.size(),grupo);
                       }/* end while */

                       /* Close connection */
                            r.close();
                            st.close();
                            postgresql.getConexion().close();

            }catch(SQLException e){System.out.println(e.getMessage());}
            
            System.out.println(list_grupos.toJSONString());
            
         return list_grupos.toJSONString();

      }/* ## read grupos ##*/

    public String read_statistics_Grupo(int pmtId_grupo){

               String statistics = new String();
               Conexion sql= new Conexion();

               try{
                         PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_read_statistics_Grupo(?)}",
                         ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                         /* parameter */
                         stm.setInt(1,pmtId_grupo);
                         ResultSet  r = stm.executeQuery();

                                 while (r.next()) {

                                      /* Estadisticas de grupo  */
                                          String Facturas = r.getString("Facturas");
                                          String VFacturas = r.getString("VFacturas");
                                          String Deuda = r.getString("Deuda");

                                    /* Configura datos en forma de json's */
                                     statistics = "{\"Facturas\":"+Facturas+",\"VFacturas\":"+VFacturas+",\"Deuda\":"+Deuda+"}";
                                }/* while */

                             stm.close();
                             sql.getConexion().close();

                     }catch (SQLException e) {
                          System.out.println(e.getMessage());
                     }

         return statistics;
    }/* statistics */

      public String remove_Grupo(int pmtId_grupo){

                   String estado_grupo = new String();
                   Conexion postgresql= new Conexion();

                   try{
                           java.sql.Statement st = postgresql.getConexion().createStatement();
                           String query = "select * FROM spd_remove_group("+pmtId_grupo+");";
                           ResultSet r = st.executeQuery(query);

                             while (r.next()) {
                                /* Nuevo estado del grupo */
                                  estado_grupo = r.getString("out_result");
                              }/* while */

                             st.close();
                             postgresql.getConexion().close();

                         }catch (SQLException e) {
                              System.out.println(e.getMessage());
                         }
             return estado_grupo;
      }/* remove grupo */

}
