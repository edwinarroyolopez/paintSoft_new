/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.FraccionDAO;

/**
 *
 * @author Zero
 */
public class ctrlFraccion extends HttpServlet {

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
        PrintWriter out = response.getWriter();

              FraccionDAO opFraccion = new FraccionDAO();
              int mode = Integer.parseInt(request.getParameter("A"));
              int pmtId_fraccion, pmtId_presentacion;


                             switch(mode){
                                case 1:/* Create update */
                                    /* Parámetros: fraccion */
                                        pmtId_presentacion = Integer.parseInt(request.getParameter("Id_presentacion"));
                                        String pmtFraccion = request.getParameter("Fraccion");
                                        float pmtProporcion = Float.parseFloat(request.getParameter("Proporcion"));

                                        String id_fraccion = opFraccion.create_update_Fraccion(pmtId_presentacion,pmtFraccion,pmtProporcion);
                                        response.getWriter().write(id_fraccion);
                                    break;
                                case 2:/* Buscar todas las fracciones de una presentacion */
                                        pmtId_presentacion = Integer.parseInt(request.getParameter("Id_presentacion"));
                                        String json_fracciones = opFraccion.read_Fracciones(pmtId_presentacion);
                                        response.getWriter().write(json_fracciones);
                                    break;
                                case 3:/* Busca estadisticas de una presentacion */

                                        break;
                                case 4:/* Elimina una fraccion */
                                            pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                                            String estado_fraccion = opFraccion.remove_Fraccion(pmtId_fraccion);
                                            response.getWriter().write(estado_fraccion);
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
