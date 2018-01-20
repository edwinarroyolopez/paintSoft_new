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
import model.dao.ProveedorDAO;
import model.vo.ProveedorVO;


public class ctrlProveedor extends HttpServlet {

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

         ProveedorDAO opProveedor = new ProveedorDAO();
         
         int mode = Integer.parseInt(request.getParameter("A"));
         int pmtId_proveedor;

        switch(mode){
            case 1:/* Create update */

                /* Parámetros: Proveedor */
                    pmtId_proveedor = Integer.parseInt(request.getParameter("Id_proveedor"));
                    String pmtRazon_social = request.getParameter("Razon_social");
                    String pmtNit = request.getParameter("Nit");
                    String pmtContacto = request.getParameter("Contacto");
                    String pmtCiudad = request.getParameter("Ciudad");
                    String pmtDireccion = request.getParameter("Direccion");
                    String pmtTelefono_1 = request.getParameter("Telefono_1");
                    String pmtTelefono_2 = request.getParameter("Telefono_2");
                    String pmtEmail = request.getParameter("Email");
                    String pmtBanco = request.getParameter("Banco");
                    String pmtTipo_cuenta = request.getParameter("Tipo_cuenta");
                    String pmtNumero_cuenta = request.getParameter("Numero_cuenta");
                    String pmtTitular_cuenta = request.getParameter("Titular_cuenta");
                    int pmtEstado = Integer.parseInt(request.getParameter("Estado"));

                    String id_proveedor = opProveedor.create_update_Proveedor(pmtId_proveedor,pmtRazon_social, pmtNit, pmtContacto, pmtCiudad, pmtDireccion,pmtTelefono_1,
                                 pmtTelefono_2, pmtEmail, pmtBanco,pmtTipo_cuenta,pmtNumero_cuenta,pmtTitular_cuenta,pmtEstado);

                     response.getWriter().write(id_proveedor);

                break;
            case 2:/* Buscar todos los proveedores  */
                    String json_proveedores = opProveedor.read_Proveedores();
                    response.getWriter().write(json_proveedores);
                break;
            case 3:/* Busca estadisticas de un proveedor */
                        pmtId_proveedor = Integer.parseInt(request.getParameter("Id_proveedor"));
                        String statistics = opProveedor.read_statistics_Proveedor(pmtId_proveedor);
                        response.getWriter().write(statistics);
                    break;
            case 4:/* Elimina un proveedor */
                        pmtId_proveedor = Integer.parseInt(request.getParameter("Id_proveedor"));
                        String estado_proveedor = opProveedor.remove_Proveedor(pmtId_proveedor);
                        response.getWriter().write(estado_proveedor);
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
