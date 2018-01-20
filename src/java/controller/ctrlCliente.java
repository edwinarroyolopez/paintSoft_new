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
import model.dao.ClienteDAO;

/**
 *
 * @author Zero
 */
public class ctrlCliente extends HttpServlet {

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

          ClienteDAO opCliente = new ClienteDAO();
         int mode = Integer.parseInt(request.getParameter("A"));
         int pmtId_cliente;




         switch(mode){
            case 1:/* Create update */
                /* Parámetros: Cliente */
                    pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                    String pmtNombre = request.getParameter("Nombre");
                    String pmtDocumento = request.getParameter("Documento");
                    String pmtTelefono = request.getParameter("Telefono");
                    String pmtDireccion = request.getParameter("Direccion");
                    String pmtCiudad = request.getParameter("Ciudad");
                    String pmtEmail = request.getParameter("Email");
                       int pmtEstado = Integer.parseInt(request.getParameter("Estado"));

                    String id_cliente = opCliente.create_update_Cliente(pmtId_cliente,pmtNombre, pmtDocumento,
                                                                 pmtTelefono,pmtDireccion, pmtCiudad,
                                                                 pmtEmail,pmtEstado);
                     response.getWriter().write(id_cliente);

                break;
            case 2:/* Buscar todos los clientes */
                    String json_clientes = opCliente.read_Clientes();
                    response.getWriter().write(json_clientes);
                break;
            case 3:/* Busca estadisticas de un cliente */
                        pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                        String statistics = opCliente.read_statistics_Cliente(pmtId_cliente);
                        response.getWriter().write(statistics);
                    break;
            case 4:/* Elimina un cliente */
                        pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                        String estado_cliente = opCliente.remove_Cliente(pmtId_cliente);
                        response.getWriter().write(estado_cliente);
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
