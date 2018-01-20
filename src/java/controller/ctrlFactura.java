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
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
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
         int pmtAnticipo;
         String pmtVencimiento;
         int pmtSaldo;
         int pmtTotal;
         String pmtFecha;
         FacturaDetalleVO Factura_detalle;
         FacturaEncabezadoVO Factura_encabezado;


             String respuesta;
                int pmtId_factura;
                int pmtId_encabezado;
                int pmtId_producto;
                int pmtId_unidad;
                int pmtId_fraccion;
                int pmtCantidad ;
                int pmtPrecio_unidad;


        int pmtAction = Integer.parseInt(request.getParameter("Action"));
        boolean pmtEstado;

        switch(pmtAction){
             case 0:/* Consecutivo  */

                     pmtFecha = request.getParameter("Fecha");

                    String consecutivo = OpFacturaEncabezado.Consecutivo(pmtFecha);
                    response.getWriter().write(consecutivo);
                    /*  END *** setFactura_Compra tipo de pinturas  *** END  */

                break;
            case 1:/* ALMACENAR: ---> ENCABEZADO: Factura de compra  */

                    String str_json_encabezado = request.getParameter("json_Encabezado");
                    String str_json_detalle = request.getParameter("json_Detalle");


                    respuesta = set_Compra(str_json_encabezado,str_json_detalle);
                    response.getWriter().write(respuesta);
                    /*  END *** setFactura_Compra tipo de pinturas  *** END  */

                break;
            case 2:/* Almacena: Detalle de factura compra */
                     pmtId_encabezado = Integer.parseInt(request.getParameter("Id_encabezado"));
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
                     pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                     pmtPrecio_unidad = Integer.parseInt(request.getParameter("Precio_unidad"));
                     pmtDescuento =  Float.parseFloat(request.getParameter("Descuento"));
                     pmtIva =  Float.parseFloat(request.getParameter("Iva"));
                    Float pmtPrecio_venta = Float.parseFloat(request.getParameter("Precio_venta"));
                    Float pmtMargen_ganancia = Float.parseFloat(request.getParameter("Margen_ganancia"));

                    pmtEstado = Boolean.parseBoolean(request.getParameter("Estado"));

                        Factura_detalle = new  FacturaDetalleVO(0, pmtId_encabezado, pmtId_producto, pmtId_unidad, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva,pmtPrecio_venta,pmtMargen_ganancia, pmtEstado);
                        respuesta = OpFacturaDetalle.setFactura_detalle_compra(Factura_detalle);
                        response.getWriter().write(respuesta);

                break;
            case 3:break;
            case 4:/* Almacenar valores de las fracciones */

                       pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                       pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
                       pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                   int pmtPrecio_fraccion = Integer.parseInt(request.getParameter("Precio_fraccion"));;

                      FraccionDAO opFraccion = new FraccionDAO();
                      String r = opFraccion.addPrecio_fraccion(pmtId_producto, pmtId_unidad, pmtId_fraccion, pmtPrecio_fraccion);
                      response.getWriter().write(r);

                break;

                 case 5:/* Almacenar valores de las fracciones */

                  pmtFecha = request.getParameter("Fecha");
                  pmtForma_pago = Integer.parseInt(request.getParameter("fmPago"));

                  OpFacturaEncabezado.calcularFechaVecimiento(pmtForma_pago, pmtFecha);

                break;

                 case 6:/* ALMACENAR: ---> ENCABEZADO: Factura de venta  */

                     DecimalFormat formatea = new DecimalFormat("###,###.##");
                     /* La putería! */
                     String str_encabezado = request.getParameter("JSON_encabezado");
                     String str_detalle_producto = request.getParameter("JSON_detalle_producto");


                     JSONParser parser = new JSONParser();


                                try {

                                    System.out.println("Json Encabezado: "+str_encabezado);

                                        /* Convierte el String en Objeto*/
                                        Object obj_encabezado = parser.parse(str_encabezado);
                                        /* Parsea el objeto a Json */
                                        JSONObject json_encabezado = (JSONObject)obj_encabezado;
                                        
                                        
                                        /* Seteo los parámetros del encbezado de factura */
                                        pmtFactura = String.valueOf(json_encabezado.get("Factura"));
                                        pmtId_cliente = Integer.parseInt(String.valueOf(json_encabezado.get("Id_cliente")));
                                        pmtForma_pago = Integer.parseInt(String.valueOf(json_encabezado.get("Forma_pago")));
                                        pmtAnticipo = Integer.parseInt(String.valueOf(json_encabezado.get("Anticipo")));
                                        pmtVencimiento = String.valueOf(json_encabezado.get("Vencimiento"));
                                        pmtSaldo = Integer.parseInt(String.valueOf(json_encabezado.get("Saldo")));
                                        pmtDescuento =  Float.parseFloat(String.valueOf(json_encabezado.get("Descuento")));
                                        pmtIva =  Float.parseFloat(String.valueOf(json_encabezado.get("Iva")));
                                        pmtTotal =  Integer.parseInt(String.valueOf(json_encabezado.get("Total")));
                                        pmtFecha = String.valueOf(json_encabezado.get("Fecha"));

                                            /* Creo objeto factura encabezado */
                                             Factura_encabezado = new FacturaEncabezadoVO(0, pmtFactura, pmtId_cliente, pmtForma_pago,
                                                       pmtAnticipo, pmtVencimiento, pmtSaldo, pmtDescuento, pmtIva, pmtTotal, pmtFecha);

                                              OpFacturaEncabezado.F_Venta(Factura_encabezado);

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

                                                  //  fields.setField("Neto",formatea.format(pmtTotal));
                                                    fields.setField("Descuento",formatea.format(pmtDescuento));
                                                    fields.setField("Iva",formatea.format(pmtIva));
                                                    fields.setField("Subtotal",formatea.format(pmtTotal));
                                                    fields.setField("Total",formatea.format(pmtTotal));


                                                   System.out.println("Json formula: "+request.getParameter("JSON_detalle_formula"));

                                        /* Detalle fórmula: Recibe directamente el json como objeto */
                                             Object obj_detalle_formula = parser.parse(request.getParameter("JSON_detalle_formula"));
                                            /* Hace parsing de objeto a json */
                                              JSONArray list_json_detalle_formula = (JSONArray)obj_detalle_formula;/* Aqui: Error ' */
                                              
                                               
                                              
                                           /* Control posiciones en pdf */
                                        int j = 0;

                                        for (int i = 0; i<list_json_detalle_formula.size();i++){

                                            /* Proceso de almacenamiento ---> Formula */
                                                    JSONObject json_detalle_formula = (JSONObject)list_json_detalle_formula.get(i);

                                                 int pmtId_formula = Integer.parseInt(String.valueOf(json_detalle_formula.get("Id_formula")));
                                                     pmtId_unidad = Integer.parseInt(String.valueOf(json_detalle_formula.get("Id_unidad")));
                                                     pmtCantidad = Integer.parseInt(String.valueOf(json_detalle_formula.get("Cantidad")));
                                                     pmtPrecio_unidad = Integer.parseInt((String)json_detalle_formula.get("Precio_unidad"));
                                                     pmtDescuento =  Float.parseFloat(String.valueOf(json_detalle_formula.get("Descuento")));
                                                     pmtIva =  Float.parseFloat(String.valueOf(json_detalle_formula.get("Iva")));

                                                     /* Inserta fórmula a base de datos */
                                                    OpFacturaDetalle.setDetalle_formula(pmtId_unidad, pmtPrecio_unidad, pmtCantidad, pmtDescuento,pmtIva,pmtId_formula);


                                            /* Seteo de campos en pdf  ---> Detalle formula */
                                                    j = i+1;/* Variable usada para darle continuidad a los campos en la factura */

                                                    fields.setField("Codigo_"+j,(String)json_detalle_formula.get("Codigo"));
                                                    fields.setField("Descripcion_"+j,(String)json_detalle_formula.get("Descripcion"));
                                                    fields.setField("Unidad_"+j,formatea.format(pmtPrecio_unidad));
                                                    fields.setField("PUnidad_"+j,String.valueOf(json_detalle_formula.get("Precio_unidad")));
                                                    fields.setField("Cantidad_"+j,String.valueOf(json_detalle_formula.get("Cantidad")));
                                                    fields.setField("Descuento_"+j,(String)json_detalle_formula.get("Descuento"));
                                                    fields.setField("Precio_"+j,formatea.format(pmtPrecio_unidad));

                                                      /* Proceso de almacenamiento ---> Productos de fórmula: Descontar de inventario  */

                                                             String listColores =  String.valueOf(json_detalle_formula.get("List_colores"));

                                                             Object obj_productos_formula = parser.parse(listColores);
                                                           /* Hace parsing de objeto a json */
                                                             JSONArray list_json_productos_formula = (JSONArray)obj_productos_formula;/* Aqui: Error ' */

                                                                for (int k = 0; k<list_json_productos_formula.size();k++){

                                                                         JSONObject json_productos_formula = (JSONObject)list_json_productos_formula.get(k);

                                                                          System.out.println("Numero de veces que descuenta k: "+k);

                                                                            pmtId_producto = Integer.parseInt(String.valueOf(json_productos_formula.get("Id_producto")));
                                                                        int pmtId_unidad_medida = Integer.parseInt(String.valueOf(json_productos_formula.get("Id_unidad_medida")));
                                                                        int pmtSalida_empezada = Integer.parseInt(String.valueOf(json_productos_formula.get("Salida_empezada")));
                                                                        int pmtRestante_empezada =  Integer.parseInt(String.valueOf(json_productos_formula.get("Restante_empezada")));
                                                                        int pmtSalida_entera =  Integer.parseInt(String.valueOf(json_productos_formula.get("Salida_entera")));
                                                                        int pmtRestante_entera =  Integer.parseInt(String.valueOf(json_productos_formula.get("Restante_entera")));

                                                                        /* Ir a base de datos y descontar */
                                                                        OpFacturaDetalle.Descontar_productos_formula(pmtId_producto,pmtId_unidad_medida,pmtSalida_empezada,pmtRestante_empezada,pmtSalida_entera,pmtRestante_entera);
                                                                }
                                        }


                                /* Detalle de productos */
                                Object obj_detalle_producto = parser.parse(str_detalle_producto);
                                JSONArray list_json_detalle_producto = (JSONArray)obj_detalle_producto;

                                          for (int i = 0; i <list_json_detalle_producto.size(); i++) {


                                                    JSONObject json_detalle_producto = (JSONObject)list_json_detalle_producto.get(i);

                                                     pmtId_producto = Integer.parseInt(String.valueOf(json_detalle_producto.get("Id_producto")));
                                                     pmtId_unidad = Integer.parseInt(String.valueOf(json_detalle_producto.get("Id_unidad")));
                                                 int pmtTipo = Integer.parseInt(String.valueOf(json_detalle_producto.get("Tipo")));
                                                     pmtId_fraccion = Integer.parseInt(String.valueOf(json_detalle_producto.get("Id_fraccion")));
                                                     pmtCantidad = Integer.parseInt(String.valueOf(json_detalle_producto.get("Cantidad")));
                                                     pmtPrecio_unidad = Integer.parseInt((String)json_detalle_producto.get("Precio_unidad"));
                                                     pmtDescuento =  Float.parseFloat(String.valueOf(json_detalle_producto.get("Descuento")));
                                                     pmtIva =  Float.parseFloat(String.valueOf(json_detalle_producto.get("Iva")));
                                                     pmtEstado =  Boolean.parseBoolean(String.valueOf(json_detalle_producto.get("Estado")));
                                               float pmtRestante =  Float.parseFloat(String.valueOf(json_detalle_producto.get("Restante")));
                                                 int pmtResta_inventario =  Integer.parseInt(String.valueOf(json_detalle_producto.get("Resta_inventario")));

                                                            /* Insertar en base de datos detalle*/
                                                 Factura_detalle = new FacturaDetalleVO(0, 0, pmtId_producto, pmtId_unidad, pmtTipo, pmtId_fraccion,
                                                                                        pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva, pmtEstado,
                                                                                        pmtRestante, pmtResta_inventario);

                                                 OpFacturaDetalle.setFactura_Venta(Factura_detalle);

                                                int Precio = pmtPrecio_unidad*pmtCantidad;
                                                 j = j+1;

                                                  /* Insertar en pdf ---> Detalle factura */
                                                    fields.setField("Codigo_"+j,(String)json_detalle_producto.get("Codigo"));
                                                    fields.setField("Descripcion_"+j,(String)json_detalle_producto.get("Descripcion"));
                                                    fields.setField("Unidad_"+j,(String)json_detalle_producto.get("Unidad"));
                                                    fields.setField("PUnidad_"+j,formatea.format(pmtPrecio_unidad));
                                                    fields.setField("Cantidad_"+j,String.valueOf(json_detalle_producto.get("Cantidad")));
                                                    fields.setField("Descuento_"+j,(String)json_detalle_producto.get("Descuento"));
                                                    fields.setField("Precio_"+j,formatea.format(Precio));

                                          }


                                        stamper.setFormFlattening(true);
                                        stamper.close();


                                         String ruta = getServletContext().getRealPath("/pdf");

                                         System.out.println(ruta+"\\set"+pmtFactura+".pdf");
                                         ruta = ruta+"\\set"+pmtFactura+".pdf";

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

                 case 7:/* ALMACENAR: ---> DETALLE: Factura de venta  */

                                pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                                pmtId_unidad = Integer.parseInt(request.getParameter("Id_unidad"));
                            int pmtTipo = Integer.parseInt(request.getParameter("Tipo"));
                                pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                                pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                                pmtPrecio_unidad = Integer.parseInt(request.getParameter("Precio_unidad"));
                                pmtDescuento =  Float.parseFloat(request.getParameter("Descuento"));
                                pmtIva =  Float.parseFloat(request.getParameter("Iva"));
                                pmtEstado =  Boolean.parseBoolean((request.getParameter("Estado")));
                          float pmtRestante =  Float.parseFloat(request.getParameter("Restante"));
                            int pmtResta_inventario =  Integer.parseInt(request.getParameter("Resta_inventario"));


                            Factura_detalle = new FacturaDetalleVO(0, 0, pmtId_producto, pmtId_unidad, pmtTipo, pmtId_fraccion, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva, pmtEstado, pmtRestante, pmtResta_inventario);
                            respuesta = OpFacturaDetalle.setFactura_Venta(Factura_detalle);
                            response.getWriter().write(respuesta);


                break;

                 case 8: /* Get Facturas venta */
                            String json_facturas_venta = OpFacturaEncabezado.getFacturas_venta();
                            response.getWriter().write(json_facturas_venta);
                     break;
                case 9: /* Get detalle factura venta */
                                   pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                            String json_detalle_factura_venta = OpFacturaDetalle.getFactura_detalle_venta(pmtId_factura);
                            response.getWriter().write(json_detalle_factura_venta);
                     break;
                case 10: /* Get detalle factura venta */
                            String pmtFecha_busqueda = request.getParameter("Fecha_busqueda");
                            String json_facturas = OpFacturaEncabezado.getVentas_realizadas(pmtFecha_busqueda);
                            response.getWriter().write(json_facturas);
                     break;
                case 11: /* Get Facturas venta */
                            String json_facturas_compra = OpFacturaEncabezado.getFacturas_compra();
                            response.getWriter().write(json_facturas_compra);
                     break;
                case 12: /* Get detalle facturas de compra */
                                   pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                            String json_detalle_factura_compra = OpFacturaDetalle.getFactura_detalle_compra(pmtId_factura);
                                   response.getWriter().write(json_detalle_factura_compra);
                     break;
                case 13: /* Cancelar factura de venta */
                                   pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                            String id_factura_cancelada = OpFacturaEncabezado.set_Cancelar_factura_venta(pmtId_factura);
                                   response.getWriter().write(id_factura_cancelada);
                     break;
                case 14: /* Buscar facturas de venta canceladas */
                            String json_facturas_venta_canceladas = OpFacturaEncabezado.getVentas_canceladas();
                                   response.getWriter().write(json_facturas_venta_canceladas);
                     break;
            default:
                break;

        }

    }

    private String set_Compra(String str_json_encabezado, String str_json_detalle){

                     JSONParser parser = new JSONParser();
                     String r = new String();

                                try {/* Json Encabezado */
                                                /* Convierte el String en Objeto*/
                                            Object obj_encabezado = parser.parse(str_json_encabezado);
                                                    /* Parsea el objeto a Json */
                                            JSONObject json_encabezado = (JSONObject)obj_encabezado;

                                         String  pmtFactura = String.valueOf(json_encabezado.get("Numero"));
                                            int  pmtId_proveedor = Integer.parseInt(String.valueOf(json_encabezado.get("Id_proveedor")));
                                            int  pmtForma_pago = Integer.parseInt(String.valueOf(json_encabezado.get("Forma_pago")));
                                            int  pmtAnticipo = Integer.parseInt(String.valueOf(json_encabezado.get("Anticipo")));
                                         String  pmtVencimiento = String.valueOf(json_encabezado.get("Vencimiento"));
                                            int  pmtSaldo = Integer.parseInt(String.valueOf(json_encabezado.get("Saldo")));
                                           float pmtDescuento =  Float.parseFloat(String.valueOf(json_encabezado.get("Descuento")));
                                           float pmtIva =  Float.parseFloat(String.valueOf(json_encabezado.get("Iva")));
                                            int  pmtTotal =  Integer.parseInt(String.valueOf(json_encabezado.get("Total")));
                                         String  pmtFecha = String.valueOf(json_encabezado.get("Fecha"));


                                        FacturaEncabezadoDAO OpFacturaEncabezado = new FacturaEncabezadoDAO();
                                        FacturaEncabezadoVO Factura_encabezado = new FacturaEncabezadoVO(0, pmtFactura, pmtId_proveedor, pmtForma_pago, pmtAnticipo, pmtVencimiento, pmtSaldo, pmtDescuento, pmtIva, pmtTotal, pmtFecha,false);
                                        int Id_encabezado = OpFacturaEncabezado.Registrar(Factura_encabezado);


                                        /* Json Detalle */
                                            Object obj_detalle = parser.parse(str_json_detalle);
                                            JSONArray list_json_detalle = (JSONArray)obj_detalle;


                                            for (int i = 0; i <list_json_detalle.size(); i++) {


                                                            JSONObject json_detalle = (JSONObject)list_json_detalle.get(i);


                                                                int pmtId_encabezado = Id_encabezado;
                                                                int pmtId_producto = Integer.parseInt(String.valueOf(json_detalle.get("Id_producto")));
                                                                int pmtId_unidad = Integer.parseInt(String.valueOf(json_detalle.get("Id_unidad")));
                                                                int pmtCantidad = Integer.parseInt(String.valueOf(json_detalle.get("Cantidad")));
                                                                int pmtPrecio_unidad = Integer.parseInt(String.valueOf(json_detalle.get("Precio_unidad")));
                                                                    pmtDescuento =  Float.parseFloat(String.valueOf(json_detalle.get("Descuento")));
                                                                    pmtIva =  Float.parseFloat(String.valueOf(json_detalle.get("Iva")));
                                                                int pmtPrecio_venta = Integer.parseInt(String.valueOf(json_detalle.get("Precio_venta")));
                                                              float pmtMargen_ganancia = Float.parseFloat(String.valueOf(json_detalle.get("Margen_ganancia")));

                                                  FacturaDetalleDAO OpFacturaDetalle = new FacturaDetalleDAO();
                                                   FacturaDetalleVO Factura_detalle = new  FacturaDetalleVO(0, pmtId_encabezado, pmtId_producto, pmtId_unidad, pmtCantidad, pmtPrecio_unidad, pmtDescuento, pmtIva,pmtPrecio_venta,pmtMargen_ganancia,true);
                                                                    r = OpFacturaDetalle.setFactura_detalle_compra(Factura_detalle);


                                                            /* Json Fracción */
                                                                String str_json_fraccion = String.valueOf(json_detalle.get("Json_Fraccion"));
                                                                Object obj_json_fraccion = parser.parse(str_json_fraccion);
                                                             JSONArray list_json_fraccion= (JSONArray)obj_json_fraccion;/* Aqui: Error ' */

                                                                System.out.println("Json Fraccion: " + list_json_fraccion);

                                                                for (int j = 0; j <list_json_fraccion.size(); j++) {
                                                                                /* */
                                                                                JSONObject json_fraccion = (JSONObject)list_json_fraccion.get(j);

                                                                            int   pmtId_fraccion = Integer.parseInt(String.valueOf(json_fraccion.get("Id_fraccion")));
                                                                            int pmtPrecio_fraccion = Integer.parseInt(String.valueOf(json_fraccion.get("Precio_fraccion")));

                                                                            System.out.println("Id fracción: " + pmtId_fraccion +" Precio fracción: "+pmtPrecio_fraccion);

                                                                      FraccionDAO OpFraccion = new FraccionDAO();
                                                                               String m =   OpFraccion.addPrecio_fraccion(pmtId_producto,pmtId_unidad,pmtId_fraccion,pmtPrecio_fraccion);
                                                                               System.out.println("Respuesta: " + m);

                                                                }




                                          }


                                         //   r = String.valueOf(Id_encabezado);

                                }catch(Exception e){System.err.println(e);}


                         return r;
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
