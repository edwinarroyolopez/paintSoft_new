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
import model.vo.FacturaDetalleVO;

/**
 *
 * @author Zero
 */
public class FacturaDetalleDAO {
    
    public FacturaDetalleDAO(){}
    
    
     public String setFactura_detalle_compra( FacturaDetalleVO Factura_detalle ){
    
      Conexion sql = new Conexion();
        String respuesta="";
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_detalle(?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setInt(1, Factura_detalle.getId_encabezado());
                 cstmt.setInt(2, Factura_detalle.getId_producto());
                 cstmt.setInt(3, Factura_detalle.getId_unidad());
                 cstmt.setInt(4, Factura_detalle.getCantidad());
                 cstmt.setFloat(5, Factura_detalle.getPrecio_unidad());
                 cstmt.setFloat(6, Factura_detalle.getPrecio_venta());
                 cstmt.setFloat(7, Factura_detalle.getMargen_ganancia());
                 cstmt.setFloat(8, Factura_detalle.getDescuento());
                 cstmt.setFloat(9, Factura_detalle.getIva());
                 cstmt.setBoolean(10, Factura_detalle.getEstado());
                 
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
    
     public String setFactura_Venta( FacturaDetalleVO Factura_detalle ){
    
      Conexion sql = new Conexion();
      String respuesta="";
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_detalle_venta(?,?,?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setInt(1, Factura_detalle.getId_encabezado());
                 cstmt.setInt(2, Factura_detalle.getId_producto());
                 cstmt.setInt(3, Factura_detalle.getId_unidad());
                 cstmt.setInt(4, Factura_detalle.getTipo());
                 cstmt.setInt(5, Factura_detalle.getId_fraccion());
                 cstmt.setInt(6, Factura_detalle.getCantidad());
                 cstmt.setFloat(7, Factura_detalle.getPrecio_unidad());
                 cstmt.setFloat(8, Factura_detalle.getDescuento());
                 cstmt.setFloat(9, Factura_detalle.getIva());
                 cstmt.setBoolean(10, Factura_detalle.getEstado());                 
                 cstmt.setFloat(11, Factura_detalle.getRestante());  
                 cstmt.setInt(12, Factura_detalle.getResta_inventario());

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
    public String setDetalle_formula(int pmtId_unidad,int pmtPrecio_unidad,int pmtCantidad,Float  pmtDescuento, Float pmtIva,int pmtId_formula){
        
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
                PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Detalle_formula_venta(?,?,?,?,?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                pstmt.setInt(1, pmtId_unidad);
                pstmt.setInt(2, pmtPrecio_unidad);
                pstmt.setInt(3, pmtCantidad);
                pstmt.setFloat(4, pmtDescuento);
                pstmt.setFloat(5, pmtIva);
                pstmt.setInt(6, pmtId_formula);

                ResultSet r = pstmt.executeQuery();

                while(r.next()){
                    Id = r.getString("Id");
                }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        return Id;
    }
    
    public String Descontar_productos_formula(int pmtId_producto,int pmtId_unidad_medida,int pmtSalida_empezada,
                                              int pmtRestante_empezada,int pmtSalida_entera,int pmtRestante_entera){
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Descontar_productos_formula(?,?,?,?,?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            pstmt.setInt(1, pmtId_producto);
            pstmt.setInt(2, pmtId_unidad_medida);
            pstmt.setInt(3, pmtSalida_empezada);
            pstmt.setInt(4, pmtRestante_empezada);
            pstmt.setInt(5, pmtSalida_entera);
            pstmt.setInt(6, pmtRestante_entera);
            
            ResultSet r = pstmt.executeQuery();
            
            while(r.next()){
                Id = r.getString("Id");
            }
            
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
    
        return Id;
    }
    /* Get detalle factura venta */
    public String getFactura_detalle_venta(int pmtId_factura){
    
            String json_factura_detalle = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Detalle_factura_venta(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_factura_detalle = "[";
                                        }

                                           /* Recibe datos desde bd */
                                              int Id_detalle = r.getInt("Id");
                                              int Id_encabezado_factura = r.getInt("Id_encabezado_venta");
                                              int Id_unidad= r.getInt("Id_unidad");
                                              int Tipo= r.getInt("Tipo");
                                              int Id_fraccion= r.getInt("Id_fraccion");
                                              int Cantidad= r.getInt("Cantidad");
                                              int Precio_unidad= r.getInt("Precio_unidad");
                                            float Descuento= r.getInt("Descuento");
                                            float Iva= r.getInt("Iva");
                                              int Estado= r.getInt("Estado");
                                              int Id_producto= r.getInt("Id_producto");
                                              int Id_formula= r.getInt("Id_formula");
                                           String Descripcion = r.getString("Descripcion");
                                           String Codigo = r.getString("Codigo");
                                           String Unidad = r.getString("Unidad");

                                           /* Configura datos en forma de json's */
                                            json_factura_detalle = json_factura_detalle + "{\"Id_detalle\":"+Id_detalle+
                                                   ",\"Id_encabezado_factura\":"+Id_encabezado_factura+
                                                   ",\"Id_unidad\":"+Id_unidad+
                                                   ",\"Tipo\":"+Tipo+
                                                   ",\"Id_fraccion\":"+Id_fraccion+
                                                   ",\"Cantidad\":"+Cantidad+
                                                   ",\"Precio_unidad\":"+Precio_unidad+
                                                   ",\"Descuento\":"+Descuento+
                                                   ",\"Iva\":"+Iva+
                                                   ",\"Estado\":"+Estado+
                                                   ",\"Id_producto\":"+Id_producto+
                                                   ",\"Id_formula\":"+Id_formula+
                                                   ",\"Descripcion\":\""+Descripcion+
                                                   "\",\"Codigo\":\""+Codigo+ 
                                                   "\",\"Unidad\":\""+Unidad+"\"}";

                                           if(r.isLast()==false){
                                               json_factura_detalle = json_factura_detalle + ",";
                                           }else{/* Ultimo registro */
                                               json_factura_detalle = json_factura_detalle +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            
            
            return json_factura_detalle;
    }
 
    
    
    /* Get detalle factura venta */
    public String getFactura_detalle_compra(int pmtId_factura){
    
            String json_factura_detalle = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Detalle_factura_compra(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_factura_detalle = "[";
                                        }
                                            
                                           /* Recibe datos desde bd */
                                              int Id_detalle = r.getInt("Id");
                                              int Id_encabezado_factura = r.getInt("Id_encabezado");
                                              int Id_unidad= r.getInt("Id_unidad");
                                              int Cantidad= r.getInt("Cantidad");
                                              int Precio_unidad= r.getInt("Precio_unidad");
                                            float Descuento= r.getInt("Descuento");
                                            float Iva= r.getInt("Iva");
                                              int Estado= r.getInt("Estado");
                                              int Id_producto= r.getInt("Id_producto");
                                           String Descripcion = r.getString("Descripcion");
                                           String Codigo = r.getString("Codigo");
                                           String Unidad = r.getString("Unidad");

                                           /* Configura datos en forma de json's */
                                            json_factura_detalle = json_factura_detalle + "{\"Id_detalle\":"+Id_detalle+
                                                   ",\"Id_encabezado_factura\":"+Id_encabezado_factura+
                                                   ",\"Id_unidad\":"+Id_unidad+
                                                   ",\"Cantidad\":"+Cantidad+
                                                   ",\"Precio_unidad\":"+Precio_unidad+
                                                   ",\"Descuento\":"+Descuento+
                                                   ",\"Iva\":"+Iva+
                                                   ",\"Estado\":"+Estado+
                                                   ",\"Id_producto\":"+Id_producto+
                                                   ",\"Descripcion\":\""+Descripcion+
                                                   "\",\"Codigo\":\""+Codigo+ 
                                                   "\",\"Unidad\":\""+Unidad+"\"}";

                                           if(r.isLast()==false){
                                               json_factura_detalle = json_factura_detalle + ",";
                                           }else{/* Ultimo registro */
                                               json_factura_detalle = json_factura_detalle +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return json_factura_detalle;
    }
    
    
}
