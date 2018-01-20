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
import model.dao.AbonoDAO;
import model.vo.FacturaDetalleVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Zero
 */
public class ctrlAbono extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        
         int pmtAction = Integer.parseInt(request.getParameter("A"));
         int pmtId_factura, pmtValor_abono;
         AbonoDAO opAbono = new AbonoDAO();
         
       
        
        switch(pmtAction){
            case 1:/* Insertar abono venta */
                /* Parámetros: Abono venta */
                            pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                            pmtValor_abono = Integer.parseInt(request.getParameter("Valor_abono"));

                         String saldo = opAbono.insert_Abono_venta(pmtId_factura, pmtValor_abono);
                         response.getWriter().write(saldo);
                break;
            case 2:/* Buscar abonos  venta*/
                            pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                     String json_abono = opAbono.search_Abono_venta(pmtId_factura);
                     response.getWriter().write(json_abono); 
                break;
            case 3:/* Imprimir abonos venta */
                                            
                       /* Información del cliente */
                       String pmtCliente = request.getParameter("Cliente");
                       String pmtNit = request.getParameter("Nit");
                       String pmtCiudad = request.getParameter("Ciudad");
                       String pmtTelefono = request.getParameter("Telefono");
                       String pmtDireccion = request.getParameter("Direccion");
                       /* Información de la factura */
                       String pmtFecha = request.getParameter("Fecha");
                       String pmtNumero = request.getParameter("Numero");
                          int pmtValor_factura = Integer.parseInt(request.getParameter("Valor_factura"));
                          int pmtSaldo_factura = Integer.parseInt(request.getParameter("Saldo_factura"));
                       String pmtEstado_factura = request.getParameter("Estado_factura");
                            
                       /* Json Abono ---> */ 
                       String str_json_Abono = request.getParameter("json_Abono");
                       JSONParser parser = new JSONParser();
                        
                       try{
                                             /* Formato decimal */
                                DecimalFormat formatea = new DecimalFormat("###,###.##");
                             /* Setter factura pdf */

                                /* Selección de plantilla -->  */               
                                InputStream is = getServletContext().getResourceAsStream("/FSpaintSoft_comprobante.pdf");
                                PdfReader reader = new PdfReader(is, null);
                                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                PdfStamper stamper = new PdfStamper(reader, baos);
                                AcroFields fields = stamper.getAcroFields(); /* Trae campos de la plantilla */

                                                    /* Cambiar fuente 
                                                    FontFactory.register("c:/windows/fonts/arial.ttf", "my_arial");
                                                    Font myArialFont = FontFactory.getFont("my_arial");
                                                    BaseFont bf = myArialFont.getBaseFont();
                                                    fields.addSubstitutionFont(bf); */
                                                    
                                /* Inserta cliente en pdf */   
                                    fields.setField("Nombre",pmtCliente);
                                    fields.setField("Nit",pmtNit);
                                    fields.setField("Ciudad",pmtCiudad);
                                    fields.setField("Telefono",pmtTelefono);
                                    fields.setField("Direccion",pmtDireccion);
                                    
                                 /* Inserta factura en pdf */   
                                    fields.setField("Fecha",pmtFecha);
                                    fields.setField("Factura",pmtNumero);
                                    fields.setField("Valor",formatea.format(pmtValor_factura));
                                    fields.setField("Saldo",formatea.format(pmtSaldo_factura));
                                    fields.setField("Estado",pmtEstado_factura);
                                    
                                    
                                Object obj_json_abono = parser.parse(str_json_Abono);
                                JSONArray list_json_Abono = (JSONArray)obj_json_abono;

                                          for (int i = 0; i <list_json_Abono.size(); i++) {

                                                 JSONObject json_Abono = (JSONObject)list_json_Abono.get(i);
         
                                                 String pmtNumero_abono = String.valueOf(json_Abono.get("Numero"));
                                                        pmtValor_abono = Integer.parseInt(String.valueOf(json_Abono.get("Valor")));
                                                 String pmtFecha_abono = String.valueOf(json_Abono.get("Fecha"));
                                                    
                                                 int n = i+1;
                                                  /* Insertar en pdf ---> Fila abono */
                                                    fields.setField("F"+n,pmtFecha_abono);
                                                    fields.setField("A"+n,pmtNumero_abono);
                                                    fields.setField("V"+n,String.valueOf(formatea.format(pmtValor_abono)));
                                                    
                                                    /* Último abono realizado */
                                                    if(n==list_json_Abono.size()){
                                                        fields.setField("N_Abono",pmtNumero_abono);
                                                        fields.setField("Abono",String.valueOf(formatea.format(pmtValor_abono)));
                                                    }
                                          
                                          }
                       
                                        stamper.setFormFlattening(true);
                                        stamper.close();


                                         String ruta = getServletContext().getRealPath("/pdf");

                                         System.out.println(ruta+"\\abono"+pmtNumero+".pdf");
                                         ruta = ruta+"\\abono"+pmtNumero+".pdf";

                                    //     File f = new File(ruta); /* De esta forma no se crea el archivo */

                                        FileOutputStream archivo = new FileOutputStream(ruta);/* Parametro: F ---> No crea el archivo --- Ruta: Crea el archivo */

                                        baos.writeTo(archivo);
                                        archivo.close();
                                        archivo.flush();

                                          //http://localhost:8080/paintSoft/pdf/abono012417003.pdf
                                          
                                          
                       
                       }catch (Exception e) {
                                  System.err.println(e);
                                }
                       
                     response.getWriter().write(""); 
                break;    
                
            case 4:/* Insertar abono compra */
                    /* Parámetros: Abono compra */
                                pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                           int  pmtValor = Integer.parseInt(request.getParameter("Valor"));
                        String  pmtMedio = request.getParameter("Medio");
                        String  pmtReceptor = request.getParameter("Receptor");
                        String  pmtResponsable = request.getParameter("Responsable");


                         String saldo_compra = opAbono.insert_Abono_compra(pmtId_factura, pmtValor, pmtMedio, pmtReceptor,pmtResponsable);
                                response.getWriter().write(saldo_compra);
                break;
            case 5:/* Buscar abonos  compra*/
                                pmtId_factura = Integer.parseInt(request.getParameter("Id_factura"));
                          String json_abono_compra = opAbono.search_Abono_compra(pmtId_factura);
                          response.getWriter().write(json_abono_compra); 
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
