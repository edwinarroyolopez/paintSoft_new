
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import model.vo.FraccionVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class FraccionDAO {

    public FraccionDAO(){}


       public String create_update_Fraccion(int pmtId_presentacion,String pmtFraccion,float pmtProporcion){
                String id_fraccion = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_fraccion("+pmtId_presentacion+",'"+pmtFraccion+"',"+pmtProporcion+");";
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_fraccion = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_fraccion;
    }/* ## Create update fraccion ##*/


  public String read_Fracciones(int pmtId_presentacion){
           Conexion postgresql = new Conexion();
           JSONArray list_fracciones = new JSONArray();/* Lista de fracciones */

           try{
                      java.sql.Statement st = postgresql.getConexion().createStatement();
                      String sql = "SELECT * FROM tblfraccion WHERE Id_presentacion="+pmtId_presentacion+" ORDER BY Id_fraccion DESC";
                      ResultSet r = st.executeQuery(sql);

                      while(r.next()){
                           /* Recibe fraccion  */
                               JSONObject fraccion = new JSONObject();

                               fraccion.put("Id_fraccion",r.getInt("Id_fraccion"));
                               fraccion.put("Id_presentacion",r.getString("Id_presentacion"));
                               fraccion.put("Fraccion",r.getString("Descripcion"));
                               fraccion.put("Proporcion",r.getString("Proporcion"));

                               list_fracciones.add(list_fracciones.size(),fraccion);
                      }/* end while */

                      /* Close connection */
                           r.close();
                           st.close();
                           postgresql.getConexion().close();

           }catch(SQLException e){System.out.println(e.getMessage());}

        return list_fracciones.toJSONString();

     }/* ## read presentaciones ##*/

    public String remove_Fraccion(int pmtId_fraccion){
        String estado_fraccion = new String();
        return estado_fraccion;
    }/* remove fraccion */


    public String addPrecio_fraccion(int pmtId_producto, int pmtId_unidad, int pmtId_fraccion, int pmtPrecio_fraccion ){


                            Conexion sql = new Conexion();
                                    String respuesta="";

                            try {

                                    PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Precio_fraccion(?,?,?,?)}",
                                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                                      /* Parametros IN */
                                     cstmt.setInt(1, pmtId_producto);
                                     cstmt.setInt(2, pmtId_unidad);
                                     cstmt.setInt(3, pmtId_fraccion);
                                     cstmt.setFloat(4, pmtPrecio_fraccion);

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

    public String listPrecioFracciones(int pmtId_producto,int pmtId_unidad_medida){

        String listPrecioFracciones = "";
        Conexion sql= new Conexion();

      try
      {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Precio_Fracciones(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                 /* Parametros IN */
                 cstmt.setInt(1, pmtId_producto);
                 cstmt.setInt(2, pmtId_unidad_medida);

                 ResultSet  r = cstmt.executeQuery();

                 listPrecioFracciones = "[";

                        while (r.next()) {

                            String id = String.valueOf(r.getInt("Id"));
                            String precio_fraccion  = String.valueOf(r.getFloat("Precio_fraccion"));
                            String fraccion = r.getString("Fraccion");
                            String proporcion = String.valueOf(r.getFloat("Proporcion"));

                             listPrecioFracciones = listPrecioFracciones + "{\"Id\":"+ id +",\"Precio_fraccion\":"+precio_fraccion +
                                     ",\"Fraccion\":\""+fraccion+"\",\"Proporcion\":"+proporcion+"}";

                             if(r.isLast()==false){
                                 listPrecioFracciones = listPrecioFracciones + ",";
                             }

                        }

                    listPrecioFracciones = listPrecioFracciones + "]";

                    cstmt.close();
                    sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }

        return listPrecioFracciones;

    }

    /* Eliminar fraccion a partir del Id y la unidad medida */
    public String Delete_Fraccion(int pmtId_unidad_medida,int pmtId_fraccion){

        String response = new String();
        Conexion sql = new Conexion();

          System.out.println("Inicia eliminar...");

        try{

            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_D_Fraccion(?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                    /* Parámetros para SQL */
                    pstmt.setInt(1, pmtId_unidad_medida);
                    pstmt.setInt(2, pmtId_fraccion);

                    /* Resultados de la consulta empaquetados */
                    ResultSet r = pstmt.executeQuery();

                    while(r.next()){/* Recorrido de resultados */
                        response = r.getString("response");
                    }

                    /* Cerrar conexión */
                    pstmt.close();
                    sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

        return response;
    }

     /* Eliminar fraccion a partir del Id y la unidad medida */
    public String Buscar_fraccion(int pmtId_fraccion){

        String fraccion = new String();
        Conexion sql = new Conexion();

          System.out.println("Inicia eliminar...");

        try{

            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_F_Fraccion_devolucion(?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                    /* Parámetros para SQL */
                    pstmt.setInt(1, pmtId_fraccion);

                    /* Resultados de la consulta empaquetados */
                    ResultSet r = pstmt.executeQuery();

                    while(r.next()){/* Recorrido de resultados */
                        fraccion = r.getString("Fraccion");
                    }

                    /* Cerrar conexión */
                    pstmt.close();
                    sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

        return fraccion;
    }

}
