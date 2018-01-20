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
import model.dao.GrupoDAO;

/**
 *
 * @author Zero
 */
public class ctrlGrupo extends HttpServlet {

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


                      GrupoDAO opGrupo = new GrupoDAO();
                     int mode = Integer.parseInt(request.getParameter("A"));
                     int pmtId_grupo;


                     switch(mode){
                        case 1:/* Create update */
                            /* Parámetros: grupo */
                                pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                                String pmtDescripcion = request.getParameter("Descripcion");
                                boolean pmtGramo = Boolean.parseBoolean(request.getParameter("Gramo"));
                                   int pmtEstado = Integer.parseInt(request.getParameter("Estado"));

                                String id_grupo = opGrupo.create_update_Grupo(pmtId_grupo,pmtDescripcion,pmtGramo,pmtEstado);
                                response.getWriter().write(id_grupo);

                            break;
                        case 2:/* Buscar todos los grupos */
                                String json_grupos = opGrupo.read_Grupos();
                                response.getWriter().write(json_grupos);
                            break;
                        case 3:/* Busca estadisticas de un grupo */
                                    pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                                    String statistics = opGrupo.read_statistics_Grupo(pmtId_grupo);
                                    response.getWriter().write(statistics);
                                break;
                        case 4:/* Elimina un grupo */
                                    pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                                    String estado_grupo = opGrupo.remove_Grupo(pmtId_grupo);
                                    response.getWriter().write(estado_grupo);
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
