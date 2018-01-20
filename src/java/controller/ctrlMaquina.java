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
import model.dao.MaquinaDAO;

/**
 *
 * @author Zero
 */
public class ctrlMaquina extends HttpServlet {

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
            
            MaquinaDAO opMaquina = new MaquinaDAO();
            
     
            int pmtAction = Integer.parseInt(request.getParameter("Action"));
            int id_formula;
            int id_marca;
            int modelo;
            String json_maquinas;
                     
            switch(pmtAction){
                case 1:/* Almacenar marca de máquina */
                     String marca = request.getParameter("Marca");
                        int max_Id_marca = opMaquina.insert_Marca(marca);
                            response.getWriter().write(String.valueOf(max_Id_marca));
                    
                        break;
                case 2:/* Almacenar máquina */
                            id_marca = Integer.parseInt(request.getParameter("Id_marca"));
                            modelo = Integer.parseInt(request.getParameter("Modelo"));
                     String descripcion = request.getParameter("Descripcion");
                        
                      int max_Id_maquina =  opMaquina.insert_Maquina(id_marca,modelo,descripcion);
                          response.getWriter().write(String.valueOf(max_Id_maquina));
                            
                        break;
                case 3: /* Búsqueda de marcas */
                            String json_marcas =opMaquina.getMarcas();
                            response.getWriter().write(json_marcas);
                    
                        break;
                case 4:/* Búsqueda de máquinas por Id_marca y modelo */
                            
                            id_marca = Integer.parseInt(request.getParameter("Id_marca"));
                            modelo = Integer.parseInt(request.getParameter("Modelo"));
                            json_maquinas = opMaquina.getMaquinas_by_marca_and_modelo(id_marca,modelo);
                            response.getWriter().write(json_maquinas);
                            
                        break;       
                case 5:/* Búsqueda de máquinas por Id formula */
                            
                            id_formula = Integer.parseInt(request.getParameter("Id_formula"));
                            json_maquinas = opMaquina.getMaquinas_by_formula(id_formula);
                            response.getWriter().write(json_maquinas);
                            
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
