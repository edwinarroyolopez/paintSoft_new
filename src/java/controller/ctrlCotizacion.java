/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.vo.FacturaDetalleVO;
import model.vo.FacturaEncabezadoVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Zero
 */
public class ctrlCotizacion extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
   
        
           System.out.println("Antes de parámetros!!");
        
            int Action = Integer.parseInt(request.getParameter("A"));
            
                     /* Parámetros */
                                     String   pmtFactura;
                                     int   pmtId_cliente;
                                     String   pmtForma_pago;
                                     float pmtDescuento;
                                     float pmtIva;
                                     int   pmtTotal;
                                     String   pmtFecha;
                                     
                                     int  pmtCantidad;
                                     int pmtPrecio_unidad;
                                     System.out.println("Ingresa a controlador!");

                switch(Action){
                    
                    case 1:/* Realizar cotización */
                            
                        
                     DecimalFormat formatea = new DecimalFormat("###,###.##");
                     /* La putería! */
                     String str_encabezado = request.getParameter("JSON_encabezado");
                     String str_detalle_producto = request.getParameter("JSON_detalle_producto");
                     
                     JSONParser parser = new JSONParser();

                                try {
                                    
                                      System.out.println("Inicio del try!");
                                        /* Convierte el String en Objeto*/
                                        Object obj_encabezado = parser.parse(str_encabezado);
                                        /* Parsea el objeto a Json */
                                        JSONObject json_encabezado = (JSONObject)obj_encabezado;

                                        /* Seteo los parámetros del encbezado de factura */
                                        pmtFactura = String.valueOf(json_encabezado.get("Factura")); 
                                        pmtId_cliente = Integer.parseInt(String.valueOf(json_encabezado.get("Id_cliente")));
                                        pmtForma_pago = String.valueOf(json_encabezado.get("Forma_pago"));
                                        pmtDescuento =  Float.parseFloat(String.valueOf(json_encabezado.get("Descuento")));
                                        pmtIva =  Float.parseFloat(String.valueOf(json_encabezado.get("Iva")));
                                        pmtTotal =  Integer.parseInt(String.valueOf(json_encabezado.get("Total")));
                                        pmtFecha = String.valueOf(json_encabezado.get("Fecha"));
                                        
                                          System.out.println("Despues de recepcion de parametros: Encabezado");

                                 /* Setter factura pdf */


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
                                                    fields.setField("Forma_pago",pmtForma_pago);
                                                    fields.setField("Cliente",Cliente);
                                                    fields.setField("Nit",Nit);
                                                    fields.setField("Ciudad",Ciudad);
                                                    fields.setField("Telefono",Telefono);
                                                    fields.setField("Direccion",Direccion);

                                                    fields.setField("Neto",formatea.format(pmtTotal));
                                                    fields.setField("Descuento",formatea.format(pmtDescuento));
                                                    fields.setField("Iva",formatea.format(pmtIva));
                                                    fields.setField("Subtotal",formatea.format(pmtTotal));
                                                    fields.setField("Total",formatea.format(pmtTotal));

                                                    System.out.println("Antes de --- Detalle producto!");

                                /* Detalle de productos */
                                Object obj_detalle_producto = parser.parse(str_detalle_producto);
                                JSONArray list_json_detalle_producto = (JSONArray)obj_detalle_producto;
                                        int k = 0;
                                          for (int i = 0; i <list_json_detalle_producto.size(); i++) {


                                                    JSONObject json_detalle_producto = (JSONObject)list_json_detalle_producto.get(i);

                                                     pmtCantidad = Integer.parseInt(String.valueOf(json_detalle_producto.get("Cantidad")));
                                                     pmtPrecio_unidad = Integer.parseInt((String)json_detalle_producto.get("Precio_unidad"));
                                                     pmtDescuento =  Float.parseFloat(String.valueOf(json_detalle_producto.get("Descuento")));


                                                int Precio = pmtPrecio_unidad*pmtCantidad;
                                                    
                                                    k = i +1; /* Posición dentro de formulario */
                                                    
                                                  /* Insertar en pdf ---> Detalle factura */
                                                    fields.setField("Codigo_"+k,(String)json_detalle_producto.get("Codigo"));
                                                    fields.setField("Descripcion_"+k,(String)json_detalle_producto.get("Descripcion"));
                                                    fields.setField("Unidad_"+k,(String)json_detalle_producto.get("Unidad"));
                                                    fields.setField("PUnidad_"+k,formatea.format(pmtPrecio_unidad));
                                                    fields.setField("Cantidad_"+k,String.valueOf(json_detalle_producto.get("Cantidad")));
                                                    fields.setField("Descuento_"+k,(String)json_detalle_producto.get("Descuento"));
                                                    fields.setField("Precio_"+k,formatea.format(Precio));

                                          }


                                        stamper.setFormFlattening(true);
                                        stamper.close();


                                         String ruta = getServletContext().getRealPath("/pdf");
                                         ruta = ruta+"\\prevCotizacion.pdf";

                                    //     File f = new File(ruta); /* De esta forma no se crea el archivo */

                                        FileOutputStream archivo = new FileOutputStream(ruta);/* Parametro: F ---> No crea el archivo --- Ruta: Crea el archivo */

                                        baos.writeTo(archivo);
                                        archivo.close();
                                        archivo.flush();

                                          //http://localhost:8080/paintSoft/pdf/set012417003.pdf


                                } catch (Exception e) {
                                        System.err.println(e);
                                }
                        
                        
                        break;
                    case 2:
                        break;
                    case 3:
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
