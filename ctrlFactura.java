/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.FacturaDetalleDAO;
import model.dao.FacturaEncabezadoDAO;
import model.dao.FraccionDAO;
import model.vo.FacturaDetalleVO;
import model.vo.FacturaEncabezadoVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Zero
 */
public class ctrlFactura extends HttpServlet {

 
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        
        FacturaEncabezadoDAO OpFacturaEncabezado = new FacturaEncabezadoDAO();
        FacturaDetalleDAO OpFacturaDetalle = new  FacturaDetalleDAO();
        
        /* Declaración de variables comunes  */
         Float pmtDescuento;
         Float pmtIva;
         String pmtFactura;
         int pmtId_proveedor;
         int pmtId_cliente;
         int pmtForma_pago;
         Float pmtAnticipo;
         String pmtVencimiento;
         Float pmtSaldo;
         Float pmtTotal;
         String pmtFecha;    
         FacturaDetalleVO Factura_detalle;          
         FacturaEncabezadoVO Factura_encabezado;
         
         
         String respuesta;
        
                int pmtId_encabezado;
                int pmtId_producto;
                int pmtId_unidad;
                int pmtCantidad ;
                Float pmtPrecio_unidad;
                
         
        int pmtAction = Integer.parseInt(request.getParameter("Action"));
        boolean pmtEstado;
        
        switch(pmtAction){
            case 1:/* ALMACENAR: ---> ENCABEZADO: Factura de compra  */
               
                     pmtFactura = request.getParameter("Factura");
                     pmtId_proveedor = Integer.parseInt(request.getParameter("Id_proveedor"));
                     pmtForma_pago = Integer.parseInt(request.getParameter("Forma_pago"));
                     pmtAnticipo = Float.parseFloat(request.getParameter("Anticipo"));
                     pmtVencimiento = request.getParameter("Vencimiento");
                     pmtSaldo = Float.parseFloat(request.getParameter("Saldo"));
                     pmtDescuento =  Float.parseFloat(request.getParameter("Descuento"));
                     pmtIva =  Float.parseFloat(request.getParameter("Iva"));
                     pmtTotal =  Float.parseFloat(request.getParameter("Total"));
                     pmtFecha = request.getParameter("Fecha");    
                     pmtEstado = Boolean.parseBoolean(request.getParameter("Estado"));
                
                    Factura_encabezado = new FacturaEncabezadoVO(0, pmtFactura, pmtId_proveedor, pmtForma_pago, pmtAnticipo, pmtVencimiento, pmtSaldo, pmtDescuento, pmtIva, pmtTotal, pmtFecha,pmtEstado);
                    respuesta = OpFacturaEncabezado.Registrar(Factura_encabezado);
                    response.getWriter().write(respuesta);        
                    /*  END *** setFactura_Compra tipo de pinturas  *** END  */  
                    
                break;
            case 2:/* Almacena: Detalle de factura */
                     pmtId_encabezado = Integer.parseInt(request.getParameter("Id_encabezado"));
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
                     pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                     pmtPrecio_unidad = Float.parseFloat(request.getParameter("Precio_unidad"));
                     pmtDescuento =  Float.parseFloat(request.getParameter("Descuento"));
                     pmtIva =  Float.parseFloat(request.getParameter("Iva"));
                    Float pmtPrecio_venta = Float.parseFloat(request.getParameter("Precio_venta"));
                    Float pmtMargen_ganancia = Float.parseFloat(request.getParameter("Margen_ganancia"));
                    
                    pmtEstado = Boolean.parseBoolean(request.getParameter("Estado"));
           
                        Factura_detalle = new  FacturaDetalleVO(0, pmtId_encabezado, pmtId_producto, pmtId_unidad, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva,pmtPrecio_venta,pmtMargen_ganancia, pmtEstado);
                        respuesta = OpFacturaDetalle.setFactura_Compra(Factura_detalle);
                        response.getWriter().write(respuesta);  
                                  
                break;
            case 3:/* Cargar id de la proxima factura */
                OpFacturaEncabezado.updateIds();/* Actualiza los ids: Encabezado - Detalle */
                String Id_encabezado = Integer.toString(OpFacturaEncabezado.getId_encabezado_ultimo());
                String Id_detalle = Integer.toString(OpFacturaEncabezado.getId_detalle_ultimo());
                respuesta = "{\"Id_detalle\":"+Id_detalle+",\"Id_encabezado\":"+Id_encabezado+"}";
                response.getWriter().write(respuesta);  
                
                break;
            case 4:/* Almacenar valores de las fracciones */
               
                  pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                  pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
            int   pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
            Float pmtPrecio_fraccion = Float.parseFloat(request.getParameter("Precio_fraccion"));
            
            
                  FraccionDAO OpFraccion = new FraccionDAO();
                  OpFraccion.addPrecio_fraccion(pmtId_producto,pmtId_unidad,pmtId_fraccion,pmtPrecio_fraccion);
              
                break;
                
                 case 5:/* Almacenar valores de las fracciones */
               
                  pmtFecha = request.getParameter("Fecha");
                  pmtForma_pago = Integer.parseInt(request.getParameter("fmPago"));
            
                  OpFacturaEncabezado.calcularFechaVecimiento(pmtForma_pago, pmtFecha);
                  
                break;
                
                 case 6:/* ALMACENAR: ---> ENCABEZADO: Factura de venta  */
               
                     /* La putería! */
                     String str_encabezado = request.getParameter("JSON_encabezado");
                     String str_detalle = request.getParameter("JSON_detalle");
                     
                     JSONParser parser = new JSONParser();
        

        try {
                Object obj_encabezado = parser.parse(str_encabezado);
                JSONObject json_encabezado = (JSONObject)obj_encabezado;
                
              /*  System.out.println("\n JSON \n\n");
                        System.out.println("Encabezado:");
                        System.out.println(str_encabezado);
                        System.out.println("Detalle:");
                        System.out.println(str_detalle);
                System.out.println("\n\n\n"); */
                
                
                pmtFactura = String.valueOf(json_encabezado.get("Factura")); 
                pmtId_cliente = Integer.parseInt(String.valueOf(json_encabezado.get("Id_cliente")));
                pmtForma_pago = Integer.parseInt(String.valueOf(json_encabezado.get("Forma_pago")));
                pmtAnticipo = Float.parseFloat(String.valueOf(json_encabezado.get("Anticipo")));
                pmtVencimiento = String.valueOf(json_encabezado.get("Vencimiento"));
                pmtSaldo = Float.parseFloat(String.valueOf(json_encabezado.get("Saldo")));
                pmtDescuento =  Float.parseFloat(String.valueOf(json_encabezado.get("Descuento")));
                pmtIva =  Float.parseFloat(String.valueOf(json_encabezado.get("Iva")));
                pmtTotal =  Float.parseFloat(String.valueOf(json_encabezado.get("Total")));
                pmtFecha = String.valueOf(json_encabezado.get("Fecha"));
                

                
                
                     Factura_encabezado = new FacturaEncabezadoVO(0, pmtFactura, pmtId_cliente, pmtForma_pago,
                               pmtAnticipo, pmtVencimiento, pmtSaldo, pmtDescuento, pmtIva, pmtTotal, pmtFecha);
                     
                       String r = OpFacturaEncabezado.F_Venta(Factura_encabezado);
                  
                     //    response.getWriter().write(r);  
                           
                      /* Creación de factura pdf */
                                   /* Setter factura pdf */
                       
                      
        /* Condición Forma de pago */
         String Forma_pago;
        if(pmtForma_pago>0){Forma_pago="Crédito";}else{Forma_pago="Contado";}
                       
                       
        /* Selección de plantilla -->  */               
        InputStream is = getServletContext().getResourceAsStream("/FSpaintSoft.pdf");
        PdfReader reader = new PdfReader(is, null);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfStamper stamper = new PdfStamper(reader, baos);
        AcroFields fields = stamper.getAcroFields(); /* Trae campos de la plantilla */
        
        /* Cambiar fuente 
        FontFactory.register("c:/windows/fonts/arial.ttf", "my_arial");
        Font myArialFont = FontFactory.getFont("my_arial");
        BaseFont bf = myArialFont.getBaseFont();
        fields.addSubstitutionFont(bf); */

  
        String Cliente = (String)json_encabezado.get("Cliente");
        String Nit = (String)json_encabezado.get("Nit");
        String Ciudad = (String)json_encabezado.get("Ciudad");
        String Telefono = (String)json_encabezado.get("Telefono");
        String Direccion =(String)json_encabezado.get("Direccion");
        
        /* Insertar en plantilla ---> Encabezado de factura */
        fields.setField("Numero_factura",pmtFactura);
        fields.setField("Fecha",pmtFecha);
        fields.setField("Forma_pago",Forma_pago);
        fields.setField("Cliente",Cliente);
        fields.setField("Nit",Nit);
        fields.setField("Ciudad",Ciudad);
        fields.setField("Telefono",Telefono);
        fields.setField("Direccion",Direccion);
        
        fields.setField("Valor_neto",String.valueOf(pmtIva));
        fields.setField("Descuento",String.valueOf(pmtDescuento));
        fields.setField("Iva",String.valueOf(pmtIva));
        fields.setField("Subtotal",String.valueOf(pmtTotal));
        fields.setField("Total",String.valueOf(pmtTotal));
        

        /* Configuración de Json para detalle de factura  */
        
         
        Object obj_detalle = parser.parse(str_detalle);
        JSONArray list_json_detalle = (JSONArray)obj_detalle;
                
                  for (int i = 0; i <list_json_detalle.size(); i++) {
                      
                      
                    JSONObject json_detalle = (JSONObject)list_json_detalle.get(i);
                  
                     pmtId_producto = Integer.parseInt(String.valueOf(json_detalle.get("Id_producto")));
                     pmtId_unidad = Integer.parseInt(String.valueOf(json_detalle.get("Id_unidad")));
                 int pmtTipo = Integer.parseInt(String.valueOf(json_detalle.get("Tipo")));
                     pmtId_fraccion = Integer.parseInt(String.valueOf(json_detalle.get("Id_fraccion")));
                     pmtCantidad = Integer.parseInt(String.valueOf(json_detalle.get("Cantidad")));
                     pmtPrecio_unidad = Float.parseFloat((String)json_detalle.get("Precio_unidad"));
                     pmtDescuento =  Float.parseFloat(String.valueOf(json_detalle.get("Descuento")));
                     pmtIva =  Float.parseFloat(String.valueOf(json_detalle.get("Iva")));
                     pmtEstado =  Boolean.parseBoolean(String.valueOf(json_detalle.get("Estado")));
               float pmtRestante =  Float.parseFloat(String.valueOf(json_detalle.get("Restante")));
                 int pmtResta_inventario =  Integer.parseInt(String.valueOf(json_detalle.get("Resta_inventario")));
                 
                            /* Insertar en base de datos detalle*/
                 Factura_detalle = new FacturaDetalleVO(0, 0, pmtId_producto, pmtId_unidad, pmtTipo, pmtId_fraccion, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva, pmtEstado, pmtRestante, pmtResta_inventario);
                 OpFacturaDetalle.setFactura_Venta(Factura_detalle);
                 
                        float Precio = pmtPrecio_unidad*pmtCantidad;
                        int j = i+1;
                        
                          /* Insertar en pdf ---> Detalle factura */
                            fields.setField("Codigo_"+j,(String)json_detalle.get("Codigo"));
                            fields.setField("Descripcion_"+j,(String)json_detalle.get("Descripcion"));
                            fields.setField("Unidad_"+j,(String)json_detalle.get("Unidad"));
                            fields.setField("PUnidad_"+j,String.valueOf(json_detalle.get("Precio_unidad")));
                            fields.setField("Cantidad_"+j,String.valueOf(json_detalle.get("Cantidad")));
                            fields.setField("Descuento_"+j,(String)json_detalle.get("Descuento"));
                            fields.setField("Precio_"+j,String.valueOf(Precio));
                            
                         
                  }
        
        
                stamper.setFormFlattening(true);
                stamper.close();


                FileOutputStream archivo = new FileOutputStream("C:\\Users\\Zero\\Documents\\NetBeansProjects\\paintSoft\\web\\pdf\\set"+pmtFactura+".pdf");

                baos.writeTo(archivo);
                archivo.close();
                archivo.flush();


                    
                    
                    
            
        } catch (Exception e) {
                System.err.println(e);
        }
                     
       
                       
                       
                break;
                
                 case 7:/* ALMACENAR: ---> DETALLE: Factura de venta  */
                     
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
                 int pmtTipo = Integer.parseInt(request.getParameter("Tipo"));
                     pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                     pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                     pmtPrecio_unidad = Float.parseFloat(request.getParameter("Precio_unidad"));
                     pmtDescuento =  Float.parseFloat(request.getParameter("Descuento"));
                     pmtIva =  Float.parseFloat(request.getParameter("Iva"));
                     pmtEstado =  Boolean.parseBoolean((request.getParameter("Estado")));
               float pmtRestante =  Float.parseFloat(request.getParameter("Restante"));
                 int pmtResta_inventario =  Integer.parseInt(request.getParameter("Resta_inventario"));
            
                 
                 Factura_detalle = new FacturaDetalleVO(0, 0, pmtId_producto, pmtId_unidad, pmtTipo, pmtId_fraccion, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva, pmtEstado, pmtRestante, pmtResta_inventario);
                 respuesta = OpFacturaDetalle.setFactura_Venta(Factura_detalle);
                 response.getWriter().write(respuesta);
                 
                 
                break;
                
                
            default:
                break;   
        
        }
        
    }
    
    

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
