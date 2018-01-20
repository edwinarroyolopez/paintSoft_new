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

public class ClienteDAO {

     public ClienteDAO() {}

      public String create_update_Cliente(int pmtId_cliente, String pmtNombre, String pmtDocumento,
                                         String pmtTelefono, String pmtDireccion,String  pmtCiudad,
                                         String pmtEmail, int pmtEstado){
                String id_cliente = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_customer("+pmtId_cliente+",'"+pmtNombre+"','"+pmtDocumento+"','"+pmtTelefono+"','"+pmtDireccion+"','"+pmtCiudad+"','"+pmtEmail+"',"+pmtEstado+");";
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_cliente = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_cliente;
    }/* ## Create update cliente ##*/

      public String read_Clientes(){

        Conexion postgresql = new Conexion();
        JSONArray list_clientes = new JSONArray();/* Lista de clientes */

        try{
                   java.sql.Statement st = postgresql.getConexion().createStatement();
                   String sql = "SELECT * FROM tblcliente WHERE Estado<2 ORDER BY Id_cliente DESC";
                   ResultSet r = st.executeQuery(sql);

                   while(r.next()){
                        /* Recibe clientes  */
                            JSONObject cliente = new JSONObject();

                            cliente.put("Id_cliente",r.getInt("Id_cliente"));
                            cliente.put("Nombre",r.getString("Nombre"));
                            cliente.put("Documento",r.getString("Documento"));
                            cliente.put("Telefono",r.getString("Telefono"));
                            cliente.put("Direccion",r.getString("Direccion"));
                            cliente.put("Ciudad",r.getString("Ciudad"));
                            cliente.put("Email",r.getString("Email"));
                            cliente.put("Estado",r.getInt("Estado"));
                            cliente.put("Fecha_creacion",r.getString("Fecha_creacion"));
                            cliente.put("Fecha_modificacion",r.getString("Fecha_modificacion"));

                            list_clientes.add(list_clientes.size(),cliente);
                   }/* end while */

                   /* Close connection */
                        r.close();
                        st.close();
                        postgresql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

     return list_clientes.toJSONString();

  }/* ## read clientes ##*/


  public String read_statistics_Cliente(int pmtId_cliente){

             String statistics = new String();
             Conexion sql= new Conexion();

             try{
                       PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_read_statistics_Cliente(?)}",
                       ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                       /* parameter */
                       stm.setInt(1,pmtId_cliente);
                       ResultSet  r = stm.executeQuery();

                               while (r.next()) {

                                    /* Estadisticas de cliente  */
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

  public String remove_Cliente(int pmtId_cliente){

                   String estado_cliente = new String();
                   Conexion postgresql= new Conexion();

                   try{
                           java.sql.Statement st = postgresql.getConexion().createStatement();
                           String query = "select * FROM spd_remove_customer("+pmtId_cliente+");";
                           ResultSet r = st.executeQuery(query);

                             while (r.next()) {
                                /* Nuevo estado del cliente */
                                  estado_cliente = r.getString("out_result");
                              }/* while */

                             st.close();
                             postgresql.getConexion().close();

                         }catch (SQLException e) {
                              System.out.println(e.getMessage());
                         }
             return estado_cliente;
  }/* remove cliente */


}
