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
import model.dao.GrupoMarcaDAO;
import model.dao.MarcaDAO;
import model.vo.GrupoMarcaVO;
import model.vo.MarcaVO;

/**
 *
 * @author Zero
 */
public class ctrlMarca extends HttpServlet {

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


                      MarcaDAO opMarca = new MarcaDAO();
                      int mode = Integer.parseInt(request.getParameter("A"));
                      int pmtId_marca, pmtEstado;

                                     switch(mode){
                                        case 1:/* Create update */
                                            /* Parámetros: marca */
                                                pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                                                String pmtDescripcion = request.getParameter("Descripcion");
                                                pmtEstado = Integer.parseInt(request.getParameter("Estado"));

                                                String id_marca = opMarca.create_update_Marca(pmtId_marca,pmtDescripcion,pmtEstado);
                                                response.getWriter().write(id_marca);
                                            break;
                                        case 2:/* Buscar todas las marcas  */
                                                String json_marcas = opMarca.read_Marcas();
                                                response.getWriter().write(json_marcas);
                                            break;
                                        case 3:/* Busca estadisticas de una presentacion */

                                                break;
                                        case 4:/* Elimina una marca */
                                                    pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                                                    String estado_marca = opMarca.remove_Marca(pmtId_marca);
                                                    response.getWriter().write(estado_marca);
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
