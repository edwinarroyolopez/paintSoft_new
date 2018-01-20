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
import model.vo.FacturaEncabezadoVO;

/**
 *
 * @author Zero
 */
public class FacturaEncabezadoDAO {
  
    
    private LinkedList<FacturaEncabezadoVO> list;
    private int id_encabezado_ultimo;
    private int id_detalle_ultimo;
    /* Variable de control: Para eliminar o no los detalles de factura */
    
    public FacturaEncabezadoDAO(){
        
    }
    
    /* Setters */
    public void setList(LinkedList<FacturaEncabezadoVO> list){this.list = list;}
    public void setId_encabezado_ultimo(int id_encabezado){this.id_encabezado_ultimo = id_encabezado;}
    public void setId_detalle_ultimo(int id_detalle){this.id_detalle_ultimo = id_detalle;}
    /* Getters */
    public LinkedList<FacturaEncabezadoVO> getList(){return list;}
    public int getId_encabezado_ultimo(){return this.id_encabezado_ultimo;}
    public int getId_detalle_ultimo(){return this.id_detalle_ultimo;}
    
    
    /* Consecutivo */
    
    public String Consecutivo(String pmtFecha){
     
        
        Conexion sql = new Conexion();
        String consecutivo = new String();
        
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Consecutivo(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setString(1, pmtFecha);
                 
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                    consecutivo = String.valueOf(r.getInt("Consecutivo"));
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return consecutivo;
    }
    
    
    
    
    public int Registrar( FacturaEncabezadoVO Factura_encabezado ){
    
        
        /* Calcular fecha de vencimiento */
        int fmPago = Factura_encabezado.getForma_pago();
        String Fecha_factura = Factura_encabezado.getFecha();
        Factura_encabezado.setVencimiento(calcularFechaVecimiento(fmPago, Fecha_factura));
        
        Conexion sql = new Conexion();
        int Id_encabezado = 0;
        
        
        try {
                        
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_Compra_encabezado(?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setString(1, Factura_encabezado.getNumero());
                 cstmt.setInt(2, Factura_encabezado.getId_proveedor());
                 cstmt.setInt(3, Factura_encabezado.getForma_pago());
                 cstmt.setFloat(4, Factura_encabezado.getAnticipo());
                 cstmt.setString(5, Factura_encabezado.getVecimiento());
                 cstmt.setFloat(6, Factura_encabezado.getSaldo());
                 cstmt.setFloat(7, Factura_encabezado.getDescuento());
                 cstmt.setFloat(8, Factura_encabezado.getIva());
                 cstmt.setInt(9, Factura_encabezado.getTotal());
                 cstmt.setString(10, Factura_encabezado.getFecha());
                 
                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                    Id_encabezado = r.getInt(1);
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return Id_encabezado;
    
    }
    
    public String calcularFechaVecimiento(int fmPago, String Fecha_factura){
        
         String Fecha_vencimiento = "";
         int dias_plazo = 0;
        
        switch(fmPago){
            case 0:  
                    break;
            case 1: dias_plazo = 15;
                    break;
            case 2: dias_plazo = 30;
                    break;
            case 3: dias_plazo = 45;
                    break;
        }
       
                int dia =   Integer.parseInt(Fecha_factura.substring(0, 2));
                int mes =   Integer.parseInt(Fecha_factura.substring(3, 5));
                int anio =  Integer.parseInt(Fecha_factura.substring(6, 10));


                if(mes<=7){

                    if(mes%2==0){/* 30 días */
                       Fecha_vencimiento = calcula_Fecha_vencimiento(anio, mes, dia, dias_plazo, 30);
                    }else{ /* 31 días */
                       Fecha_vencimiento = calcula_Fecha_vencimiento(anio, mes, dia, dias_plazo, 31);
                    }

                }else if(mes>7){

                    if(mes%2==0){/* 31 días */
                        Fecha_vencimiento = calcula_Fecha_vencimiento(anio, mes, dia, dias_plazo, 31);
                    }else{ /* 30 días */
                        Fecha_vencimiento = calcula_Fecha_vencimiento(anio, mes, dia, dias_plazo, 30);
                    }

                }
        
        System.out.println("Fecha de vencimiento: "+Fecha_vencimiento);
        return Fecha_vencimiento;
    }
    
    
    String calcula_Fecha_vencimiento(int anio, int mes,int dia, int dias_plazo, int cant_dias){
        
        String Fecha_vencimiento;
        
        
                int modDia = (dia + dias_plazo)%cant_dias;
                int cocDia = (dia + dias_plazo)/cant_dias;
                int sum = dia + dias_plazo;
                int modMes;
                
                
                switch(cocDia){
                    case 0:/* No cambia de mes*/
                        break;
                    case 1:/* Aumenta un mes */
                        mes = mes + 1;
                        break;
                    case 2:/* Aumenta dos meses */
                                mes = mes + 2;
                                
                                if(cant_dias==30){
                                    modDia = modDia - 1;/* Cruzó por un mes de 31 */
               
                                }else{
                                    modDia = modDia + 1;/* Cruzó por un mes de 30 */
                                }
                        break;
                }
                
                    /* Meses > 7 */
                if(mes>7){
                           modMes = mes%12;

                            if(modMes==1){
                                mes = 1;
                                anio = anio + 1;
                            }else if(modMes==2){
                                mes = 2;
                                anio = anio + 1;
                                modDia = modDia - 1;
                            }           
                }
               
                String dd=String.valueOf(modDia), mm=String.valueOf(mes);
               
                 if(modDia<10) {dd="0"+dd;} 
                 if(mes<10) {mm="0"+mm;} 
                
            Fecha_vencimiento = dd+"/"+mm+"/"+String.valueOf(anio);
            return Fecha_vencimiento;
    }
    
    public String getFacturas_compra(){
    
             String json_facturas_compra = new String();
             Conexion sql= new Conexion();
                System.out.println("Busqueda de facturas de compra!");
             try
             {
                       PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Facturas_compra()}",
                       ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                       ResultSet  r = cstmt.executeQuery();

                     
                                   
                                    /* Crear json facturas de compra  */
                                                while (r.next()) {   

                                                        if(r.isFirst()){/* Primer registro*/
                                                            json_facturas_compra = "[";
                                                        }

                                                           /* Recibe datos desde bd */
                                                              int Id_factura = r.getInt("Id_factura");
                                                           String Numero = r.getString("Numero");
                                                              int Forma_pago = r.getInt("Forma_pago");
                                                           String Fecha = r.getString("Fecha");
                                                              int Valor = r.getInt("Valor");
                                                              int Saldo = r.getInt("Saldo");
                                                              int Estado = r.getInt("Estado");
                                                              int Id_proveedor = r.getInt("Id_proveedor");
                                                           String Razon_social = r.getString("Razon_Social");
                                                           String Nit = r.getString("Nit");
                                                           String Ciudad = r.getString("Ciudad");
                                                           String Telefono = r.getString("Telefono_1");
                                                           String Direccion = r.getString("Direccion");

                                                           /* Configura datos en forma de json's */
                                                            json_facturas_compra = json_facturas_compra + "{\"Id_factura\":"+Id_factura+
                                                                   ",\"Numero\":\""+Numero+
                                                                   "\",\"Forma_pago\":"+Forma_pago+
                                                                   ",\"Fecha\":\""+Fecha+
                                                                   "\",\"Valor\":"+Valor+
                                                                    ",\"Saldo\":"+Saldo+
                                                                   ",\"Estado\":"+Estado+
                                                                   ",\"Id_proveedor\":"+Id_proveedor+
                                                                   ",\"Razon_social\":\""+Razon_social+
                                                                   "\",\"Nit\":\""+Nit+
                                                                    "\",\"Ciudad\":\"" +Ciudad+
                                                                    "\",\"Telefono\":\"" +Telefono+
                                                                    "\",\"Direccion\":\"" +Direccion+"\"}";

                                                           if(r.isLast()==false){
                                                               json_facturas_compra = json_facturas_compra + ",";
                                                           }else{/* Ultimo registro */
                                                               json_facturas_compra = json_facturas_compra +"]";
                                                           }
                                          }
                                    
                           cstmt.close();
                           sql.getConexion().close();

                   }catch (SQLException e) {
                        System.out.println(e.getMessage());
                   }

             return json_facturas_compra;
    
    }
    /* Busqueda de ultimos id's */
    public void updateIds(){
    
         Conexion sql= new Conexion();

             try
             {
                       PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Factura_ultimoid()}",
                       ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                       ResultSet  r = cstmt.executeQuery();

                               while (r.next()) {   
                                   this.id_encabezado_ultimo = r.getInt("Id_encabezado");
                                   this.id_detalle_ultimo = r.getInt("Id_detalle");
                              }
                               
                           cstmt.close();
                           sql.getConexion().close();

                   }catch (SQLException e) {
                        System.out.println(e.getMessage());
                   }
    
    }
    
    
    /* FACTURA DE VENTA ---->> */
     public String F_Venta( FacturaEncabezadoVO Factura_encabezado ){
         
          /* Calcular fecha de vencimiento */
      
        Factura_encabezado.setVencimiento("04/01/2017");
        Conexion sql = new Conexion();
        String respuesta = "";
        
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_Venta_encabezado(?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setString(1,Factura_encabezado.getNumero());
                 cstmt.setInt(2, Factura_encabezado.getId_cliente());
                 cstmt.setInt(3, Factura_encabezado.getForma_pago());
                 cstmt.setFloat(4, Factura_encabezado.getAnticipo());
                 cstmt.setString(5, Factura_encabezado.getVecimiento());
                 cstmt.setFloat(6, Factura_encabezado.getSaldo());
                 cstmt.setFloat(7, Factura_encabezado.getDescuento());
                 cstmt.setFloat(8, Factura_encabezado.getIva());
                 cstmt.setFloat(9, Factura_encabezado.getTotal());
                 cstmt.setString(10, Factura_encabezado.getFecha());
                 
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
    
    
     public String getFacturas_venta(){
     
            String json_facturas_venta = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Facturas_venta()}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */

                             ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_facturas_venta = "[";
                                        }

                                           /* Recibe datos desde bd */
                                              int Id_factura = r.getInt("Id_factura");
                                           String Numero = r.getString("Numero");
                                              int Forma_pago = r.getInt("Forma_pago");
                                              int Valor = r.getInt("Valor");
                                              int Saldo = r.getInt("Saldo");
                                              int Estado = r.getInt("Estado");
                                              int Id_cliente = r.getInt("Id_cliente");
                                           String Cliente = r.getString("Nombre");
                                           String Documento = r.getString("Documento");
                                           String Ciudad = r.getString("Ciudad");
                                           String Telefono = r.getString("Telefono");
                                           String Direccion = r.getString("Direccion");

                                           /* Configura datos en forma de json's */
                                            json_facturas_venta = json_facturas_venta + "{\"Id_factura\":"+Id_factura+
                                                   ",\"Numero\":\""+Numero+
                                                   "\",\"Forma_pago\":"+Forma_pago+
                                                   ",\"Valor\":"+Valor+
                                                    ",\"Saldo\":"+Saldo+
                                                   ",\"Estado\":"+Estado+
                                                   ",\"Id_cliente\":"+Id_cliente+
                                                   ",\"Cliente\":\""+Cliente+
                                                   "\",\"Documento\":\""+Documento+
                                                    "\",\"Ciudad\":\"" +Ciudad+
                                                    "\",\"Telefono\":\"" +Telefono+
                                                    "\",\"Direccion\":\"" +Direccion+"\"}";

                                           if(r.isLast()==false){
                                               json_facturas_venta = json_facturas_venta + ",";
                                           }else{/* Ultimo registro */
                                               json_facturas_venta = json_facturas_venta +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }

            
            
            return json_facturas_venta;
     }
     
     /* Ventas realizadas */
     public String getVentas_realizadas(String pmtFecha_busqueda){
         
            String json_facturas = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Ventas_realizadas(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setString(1, pmtFecha_busqueda);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_facturas = "[";
                                        }

                                           /* Recibe datos desde bd */
                                           String Factura = r.getString("Factura");
                                           String Cliente = r.getString("Cliente");
                                           String Forma_pago = r.getString("Forma_pago");
                                              int Valor = r.getInt("Valor");
                              
                                           /* Configura datos en forma de json's */
                                            json_facturas = json_facturas + "{\"Factura\":\""+Factura+
                                                   "\",\"Cliente\":\""+Cliente+
                                                   "\",\"Forma_pago\":\""+Forma_pago+
                                                   "\",\"Valor\":"+Valor+"}";

                                           if(r.isLast()==false){
                                               json_facturas = json_facturas + ",";
                                           }else{/* Ultimo registro */
                                               json_facturas = json_facturas +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();

                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
                    
            return json_facturas;
     }
     
     /* Cancelar facturas de venta */
     public String set_Cancelar_factura_venta(int pmtId_factura){
         
         
              String Id_factura_cancelada = new String();
            Conexion sql = new Conexion();
        
        
                    try {
                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Cancelar_factura_venta(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   
                                    /* Recibe datos desde bd */
                                     Id_factura_cancelada = r.getString("Id");
                              }

                                cstmt.close();
                                sql.getConexion().close();

                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            return Id_factura_cancelada;
     }
     
      public String getVentas_canceladas(){
         
            String json_facturas_canceladas = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Factura_venta_canceladas()}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_facturas_canceladas = "[";
                                        }
                                        
                                        
                                           /* Recibe datos desde bd */
                                           String Id_factura_cancelada = r.getString("Id");
                                           String Id_encabezado_venta = r.getString("Id_encabezado_venta");
                                           String Factura = r.getString("Factura");
                                           String Cliente = r.getString("Cliente");
                                           String Documento = r.getString("Documento");
                                           String Forma_pago = r.getString("Forma_pago");
                                              int Valor = r.getInt("Valor");
                              
                                           /* Configura datos en forma de json's */
                                            json_facturas_canceladas = json_facturas_canceladas + "{\"Id_factura_cancelada\":"+Id_factura_cancelada+
                                                    ",\"Id_encabezado_venta\":"+Id_encabezado_venta+
                                                    ",\"Factura\":\""+Factura+
                                                    "\",\"Cliente\":\""+Cliente+
                                                    "\",\"Documento\":\""+Documento+
                                                    "\",\"Forma_pago\":"+Forma_pago+
                                                    ",\"Valor\":"+Valor+"}";

                                           if(r.isLast()==false){
                                               json_facturas_canceladas = json_facturas_canceladas + ",";
                                           }else{/* Ultimo registro */
                                               json_facturas_canceladas = json_facturas_canceladas +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();

                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
                    
            return json_facturas_canceladas;
     }
     
     
}
