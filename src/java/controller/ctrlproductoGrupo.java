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
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.LinkedList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.LlenaDAO;
import model.dao.productoGrupoDAO;
import model.vo.productoGrupoVO;

/**
 *
 * @author Zero
 */
public class ctrlproductoGrupo extends HttpServlet {

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
        
            response.setContentType("text/pain;charset=UTF-8");
            PrintWriter out = response.getWriter();
        
          /* Data Access Object */  
         productoGrupoDAO OpproductoGrupo = new productoGrupoDAO();
         LinkedList<productoGrupoVO> listproductoGrupo =  OpproductoGrupo.getList();
         
         int pmtAction = Integer.parseInt(request.getParameter("Action"));
         String respuesta = "";
        
        switch(pmtAction){
            case 1:/* Almacenar: Grupo de productos */
                
                /* Parámetros */
                    String pmtproductoGrupo = request.getParameter("productoGrupo");
                    int pmtId_medida = Integer.parseInt(request.getParameter("Id_medida"));
                    String pmtMedida = request.getParameter("Medida");
                    
                    /* Registrar Grupo de productos */
                        productoGrupoVO  productoGrupo = new productoGrupoVO(0, pmtproductoGrupo, pmtId_medida,pmtMedida);
                        String json_grupo = OpproductoGrupo.Registrar(productoGrupo);
                        response.getWriter().write(json_grupo);
                 break;
                 
            case 2:break;
            case 3:/* Buscar grupos: Para Combobox */
                 
                        for (int i=0;i<listproductoGrupo.size();i++){
                            String ob = "<div class=\"item\"  data-id=\""+listproductoGrupo.get(i).getId()+ "\">" + listproductoGrupo.get(i).getGrupo() +" </div>";
                           respuesta = respuesta + ob;
                        }
                        
//                        response.getWriter().write(respuesta);
                break;
            case 4:/* Llenar pdf */
                      
                      response.setContentType("application/pdf");
                      response.setHeader("Cache-control","must-revalidate, post-check=0, pre-check=0");
        
                        try {

                                InputStream is = getServletContext().getResourceAsStream("/plantilla.pdf");
                                PdfReader reader = new PdfReader(is, null);
                                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                PdfStamper stamper = new PdfStamper(reader, baos);
                                AcroFields fields = stamper.getAcroFields();
                                /* Cambiar fuente */
                                FontFactory.register("c:/windows/fonts/arial.ttf", "my_arial");
                                Font myArialFont = FontFactory.getFont("my_arial");
                                BaseFont bf = myArialFont.getBaseFont();
                                fields.addSubstitutionFont(bf);

                                
                                fields.setField("txtIngresos","5000");
                                fields.setField("txtEgresos","2000");
                                
                                fields.setField("txtInversion",String.valueOf("3000"));
                                 
                                stamper.setFormFlattening(true);
                                stamper.close();
                                OutputStream os = response.getOutputStream();
                                baos.writeTo(os);
                                os.flush();
                                
                        } catch (DocumentException de) {
                                throw new IOException(de.getMessage());
                        }
                      
                      LlenaDAO llena = new LlenaDAO();
                               llena.Setter("5000", "2000");
                        
                      
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
            throws ServletException, IOException{
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
