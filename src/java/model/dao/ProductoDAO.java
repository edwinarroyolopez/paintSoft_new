
package model.dao;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class ProductoDAO {

public ProductoDAO(){}

public String create_update_Producto(int pmtId_producto,int pmtId_grupo,int pmtId_marca,String pmtDescripcion,String pmtList_presentaciones){

    
                String id_producto = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_product("+pmtId_producto+","+pmtId_grupo+","+pmtId_marca+",'"+pmtDescripcion+"','"+ pmtList_presentaciones +"');";
                                        
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_producto = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_producto;

}/* ## create update producto ## */


public String read_Productos(){

          Conexion postgresql = new Conexion();
          JSONArray list_productos = new JSONArray();/* Lista de grupos */

          try{
                     java.sql.Statement st = postgresql.getConexion().createStatement();
                     String sql = "SELECT * FROM tblproducto WHERE estado<2 ORDER BY id_producto DESC";
                     ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                          /* Recibe clientes  */
                              JSONObject producto = new JSONObject();

                              producto.put("Id_producto",r.getInt("Id_producto"));
                              producto.put("Id_grupo",r.getString("Id_grupo"));
                              producto.put("Id_marca",r.getString("Id_marca"));
                              producto.put("Descripcion",r.getString("Descripcion"));
                              producto.put("Estado",r.getInt("Estado"));
                              producto.put("Fecha_creacion",r.getString("Fecha_creacion"));
                              producto.put("Fecha_modificacion",r.getString("Fecha_modificacion"));

                              list_productos.add(list_productos.size(),producto);
                     }/* end while */

                     /* Close connection */
                          r.close();
                          st.close();
                          postgresql.getConexion().close();

          }catch(SQLException e){System.out.println(e.getMessage());}

       return list_productos.toJSONString();

    }/* ## read productos ##*/




public String data_Producto(int pmtId_producto){

          Conexion postgresql = new Conexion();
          JSONObject producto = new JSONObject();

          try{
                     java.sql.Statement st = postgresql.getConexion().createStatement();
                       String sql = "select * FROM spd_data_products("+pmtId_producto+");";
                     ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                          /* Recibe datos del producto  */
                              
                                producto.put("Id_producto_presentacion",r.getInt("out_id_producto_presentacion"));
                                producto.put("Id_producto",r.getString("out_id_producto"));
                                producto.put("Presentaciones",r.getString("out_presentaciones"));
                                producto.put("Estado",r.getString("out_estado"));

                     }/* end while */

                     /* Close connection */
                          r.close();
                          st.close();
                          postgresql.getConexion().close();

          }catch(SQLException e){System.out.println(e.getMessage());}

       return producto.toJSONString();

    }/* ## data productos ##*/



public String remove_Producto(int pmtId_producto){
                 
                    Conexion postgresql = new Conexion();
                    String estado_producto = new String();

                 try{
                            java.sql.Statement st = postgresql.getConexion().createStatement();
                            String sql = "select * FROM spd_remove_product("+pmtId_producto+");";
                            ResultSet r = st.executeQuery(sql);

                             while (r.next()) {
                                /* Nuevo estado del grupo */
                                  estado_producto = r.getString("out_result");
                            }/* while */

                               /* Close connection */
                                r.close();
                                st.close();
                                postgresql.getConexion().close();

                       }catch (SQLException e) {
                            System.out.println(e.getMessage());
                       }

           return estado_producto;
}/* remove Producto */




public String Insert_desde_txt(int pmtId, String pmtDescripcion){


 Conexion sql = new Conexion();


              try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("UPDATE tblProducto SET Descripcion=? WHERE Id =? ",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setString(1, pmtDescripcion);
                            cstmt.setInt(2, pmtId);


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

/* Eliminar producto */
public String Eliminar_producto(int pmtId_producto){

    String response = new String();
    Conexion sql = new Conexion();

     try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("DELETE FROM tblProducto  WHERE Id =? ",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setInt(1, pmtId_producto);
                            ResultSet  r = cstmt.executeQuery();

                            while (r.next()) {}

                            cstmt.close();
                            sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }


    return response;
}

public String read_maximo_codigo(int pmtId_grupo, int pmtId_marca){
  /*
      Resumen: Esta funcion recibe dos parametros -> Id_grupo && Id_marca
      estos parametros serán llevados a un procedimiento almacenado y traerá
      el código del ultimo producto almacenado en ese grupo y con esa marca
  */

    String codigo = new String();
    Conexion sql = new Conexion();

    try {
              PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_read_max_codigo(?,?)}",
              ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

              /* parameter */
              stm.setInt(1,pmtId_grupo);
              stm.setInt(2,pmtId_marca);
              ResultSet  r = stm.executeQuery();

                      while (r.next()) {
                           codigo = r.getString("Codigo");
                     }/* while */;

                  stm.close();
                  sql.getConexion().close();

    }catch(SQLException e){
        System.out.println(e.getMessage());
    }

    return codigo;

}/* read maximo codigo */

public String create_update_presentaciones_Producto(String pmtList_presentaciones,int pmtId_producto){
    
                     JSONParser parser = new JSONParser();
                     /* Convierte el String en Objeto*/
                     try {
                            Object list_presentaciones = parser.parse(pmtList_presentaciones);
                            /* Parsea el objeto a Json */
                            JSONObject json_presentaciones = (JSONObject)list_presentaciones;
                            
                              for (int i = 0; i<json_presentaciones.size();i++){
                                    
                                    JSONObject json = (JSONObject)json_presentaciones.get(i);
                                    int Id_presentacion = Integer.parseInt(String.valueOf(json.get("Id_presentacion")));
                                    
                                    
                                       String id_producto = new String();
                                       Conexion postgresql = new Conexion();

                                        java.sql.Statement st = postgresql.getConexion().createStatement();
                                        String sql = "select * FROM spd_create_update_presentacion_product("+pmtId_producto+","+Id_presentacion+");";

                                        ResultSet r = st.executeQuery(sql);

                                         while(r.next()){
                                           id_producto = String.valueOf(r.getInt("out_result"));
                                         }

                                        r.close();
                                        st.close();
                                        postgresql.getConexion().close();
                                    
                                    /* Aquí almacena id_presentacion - id_producto */
                              }
                            
                            /* Seteo los parámetros del encbezado de factura */
                        
                        } catch (Exception e) {
                             System.err.println(e);
                        }
                     
                                     
                                        
                                        
                         
    
    return "";
}

}
