
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
/* json */
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
public class ProveedorDAO {


    public  ProveedorDAO(){}

      public String create_update_Proveedor(int pmtId_proveedor,String pmtRazon_social,String pmtNit,String pmtContacto,
                                            String pmtCiudad,String pmtDireccion,String pmtTelefono_1,
                                            String pmtTelefono_2,String pmtEmail,String pmtBanco,
                                            String pmtTipo_cuenta,String pmtNumero_cuenta,String pmtTitular_cuenta,int pmtEstado){

            String id_proveedor = new String();
            Conexion postgresql = new Conexion();

            try{
                java.sql.Statement st = postgresql.getConexion().createStatement();
                String sql = "select * FROM spd_create_update_provider("+pmtId_proveedor+
                                                                       ",'"+pmtRazon_social+
                                                                       "','"+pmtNit+
                                                                       "','"+pmtContacto+
                                                                       "','"+pmtCiudad+
                                                                       "','"+pmtDireccion+
                                                                       "','"+pmtTelefono_1+
                                                                       "','"+pmtTelefono_2+
                                                                       "','"+pmtEmail+
                                                                       "','"+pmtBanco+
                                                                       "','"+pmtTipo_cuenta+
                                                                       "',"+pmtNumero_cuenta+
                                                                       "','"+pmtTitular_cuenta+
                                                                       "','"+pmtEstado+");";

                ResultSet r = st.executeQuery(sql);

                 while(r.next()){
                   id_proveedor = String.valueOf(r.getInt("out_result"));
                 }

            }catch(SQLException e){System.out.println(e.getMessage());}


     return id_proveedor;
    }/* create update proveedor */

   public String read_Proveedores(){

     Conexion postgresql = new Conexion();
     JSONArray list_proveedores = new JSONArray();/* Lista de proveedores */

     try{
                java.sql.Statement st = postgresql.getConexion().createStatement();
                String sql = "SELECT * FROM tblproveedor WHERE Estado<2 ORDER BY Id_proveedor DESC";
                ResultSet r = st.executeQuery(sql);

                while(r.next()){
                     /* Recibe proveedores  */
                         JSONObject proveedor = new JSONObject();

                         proveedor.put("Id_proveedor",r.getInt("Id_proveedor"));
                         proveedor.put("Razon_social",r.getString("Razon_social"));
                         proveedor.put("Nit",r.getString("Nit"));
                         proveedor.put("Contacto",r.getString("Contacto"));
                         proveedor.put("Ciudad",r.getString("Ciudad"));
                         proveedor.put("Direccion",r.getString("Direccion"));
                         proveedor.put("Telefono_1",r.getString("Telefono_1"));
                         proveedor.put("Telefono_2",r.getString("Telefono_2"));
                         proveedor.put("Email",r.getString("Email"));
                         proveedor.put("Banco",r.getString("Banco"));
                         proveedor.put("Tipo_cuenta",r.getString("Tipo_cuenta"));
                         proveedor.put("Numero_cuenta",r.getString("Numero_cuenta"));
                         proveedor.put("Titular_cuenta",r.getString("Titular_cuenta"));
                         proveedor.put("Estado",r.getInt("Estado"));
                         proveedor.put("Fecha_creacion",r.getString("Fecha_creacion"));
                         proveedor.put("Fecha_modificacion",r.getString("Fecha_modificacion"));

                         list_proveedores.add(list_proveedores.size(),proveedor);
                }/* end while */

                /* Close connection */
                     r.close();
                     st.close();
                     postgresql.getConexion().close();

     }catch(SQLException e){System.out.println(e.getMessage());}

       System.out.println(list_proveedores.toJSONString());

  return list_proveedores.toJSONString();

}/* ## read proveedores ##*/

     public String read_statistics_Proveedor(int pmtId_proveedor){

                String statistics = new String();
                Conexion sql= new Conexion();

                try
                {
                          PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_read_statistics_Proveedor(?)}",
                          ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* parameter */
                          stm.setInt(1,pmtId_proveedor);
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

       public String remove_Proveedor(int pmtId_proveedor){

                        String estado_proveedor = new String();
                        Conexion postgresql= new Conexion();

                        try{
                                java.sql.Statement st = postgresql.getConexion().createStatement();
                                String query = "select * FROM spd_remove_provider("+pmtId_proveedor+");";
                                ResultSet r = st.executeQuery(query);

                                  while (r.next()) {
                                     /* Nuevo estado del proveedor */
                                       estado_proveedor = r.getString("out_result");
                                   }/* while */

                                  st.close();
                                  postgresql.getConexion().close();

                              }catch (SQLException e) {
                                   System.out.println(e.getMessage());
                              }
                  return estado_proveedor;
       }/* remove proveedor */


}
