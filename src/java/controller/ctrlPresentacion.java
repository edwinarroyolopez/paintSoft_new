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
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.PresentacionDAO;

/**
 *
 * @author Zero
 */
public class ctrlPresentacion extends HttpServlet {

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


                     PresentacionDAO opPresentacion = new PresentacionDAO();
                     int mode = Integer.parseInt(request.getParameter("A"));
                     int pmtId_presentacion;
                     int pmtId_grupo;


                     switch(mode){
                        case 1:/* Create update */
                            /* Parámetros: Presentacion */
                                pmtId_presentacion = Integer.parseInt(request.getParameter("Id_presentacion"));
                                String pmtDescripcion = request.getParameter("Descripcion");
                                   boolean pmtFraccionable = Boolean.parseBoolean(request.getParameter("Fraccionable"));
                                   int pmtEstado = Integer.parseInt(request.getParameter("Estado"));
                                       pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));

                                String id_presentacion = opPresentacion.create_update_Presentacion(pmtId_presentacion,pmtDescripcion,pmtFraccionable,pmtEstado,pmtId_grupo);
                                response.getWriter().write(id_presentacion);

                            break;
                        case 2:/* Buscar todos los Presentacions */
                                pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                                String json_presentaciones = opPresentacion.read_Presentaciones(pmtId_grupo);
                                response.getWriter().write(json_presentaciones);
                            break;
                        case 3:/* Busca estadisticas de un Presentacion */
                                    pmtId_presentacion = Integer.parseInt(request.getParameter("Id_presentacion"));
                                    String statistics = opPresentacion.read_statistics_Presentacion(pmtId_presentacion);
                                    response.getWriter().write(statistics);
                                break;
                        case 4:/* Elimina un Presentacion */
                                    pmtId_presentacion = Integer.parseInt(request.getParameter("Id_presentacion"));
                                    String estado_presentacion = opPresentacion.remove_presentacion(pmtId_presentacion);
                                    response.getWriter().write(estado_presentacion);
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
