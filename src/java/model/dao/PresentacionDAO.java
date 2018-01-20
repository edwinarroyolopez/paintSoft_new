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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author Zero
 */
public class PresentacionDAO {

    public PresentacionDAO(){   }


    public String create_update_Presentacion(int pmtId_presentacion,String pmtDescripcion,boolean pmtFraccionable, int pmtEstado,int pmtId_grupo){
                String id_presentacion = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_presentacion("+pmtId_presentacion+",'"+pmtDescripcion+"','"+pmtFraccionable+"',"+pmtEstado+","+pmtId_grupo+");";
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_presentacion = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_presentacion;
    }/* ## Create update presentacion ##*/


 public String read_Presentaciones(int pmtId_grupo){

        Conexion postgresql = new Conexion();
        JSONArray list_presentaciones = new JSONArray();/* Lista de presentaciones */

        try{
                   java.sql.Statement st = postgresql.getConexion().createStatement();
                   String sql = "SELECT * FROM tblpresentacion WHERE Estado<2 and Id_grupo="+pmtId_grupo+" ORDER BY Id_presentacion DESC";
                   ResultSet r = st.executeQuery(sql);

                   while(r.next()){
                        /* Recibe presentacion  */
                            JSONObject presentacion = new JSONObject();

                            presentacion.put("Id_presentacion",r.getInt("Id_presentacion"));
                            presentacion.put("Descripcion",r.getString("Descripcion"));
                            presentacion.put("Fraccionable",r.getString("Fraccionable"));
                            presentacion.put("Estado",r.getString("Estado"));
                            presentacion.put("Id_grupo",r.getString("Id_grupo"));
                            presentacion.put("Fecha_creacion",r.getString("Fecha_creacion"));
                            presentacion.put("Fecha_modificacion",r.getString("Fecha_modificacion"));

                            list_presentaciones.add(list_presentaciones.size(),presentacion);
                   }/* end while */

                   /* Close connection */
                        r.close();
                        st.close();
                        postgresql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

     return list_presentaciones.toJSONString();

  }/* ## read presentaciones ##*/


    public String read_statistics_Presentacion(int pmtId_presentacion){

               String statistics = new String();
               Conexion sql= new Conexion();

               try
               {
                         PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_read_statistics_Presentacion(?)}",
                         ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                         /* parameter */
                         stm.setInt(1,pmtId_presentacion);
                         ResultSet  r = stm.executeQuery();

                                 while (r.next()) {

                                      /* Estadisticas de presentacion  */
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

    public String remove_presentacion(int pmtId_presentacion){

                     String estado_presentacion = new String();
                     Conexion sql= new Conexion();

                     try
                     {
                               PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_remove_Presentacion(?)}",
                               ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                               /* parameter */
                               stm.setInt(1,pmtId_presentacion);
                               ResultSet  r = stm.executeQuery();

                                       while (r.next()) {
                                            /* Nuevo estado del presentacion */
                                                estado_presentacion = r.getString("Estado");
                                      }/* while */

                                   stm.close();
                                   sql.getConexion().close();

                           }catch (SQLException e) {
                                System.out.println(e.getMessage());
                           }

               return estado_presentacion;
    }/* remove presentacion */


}
