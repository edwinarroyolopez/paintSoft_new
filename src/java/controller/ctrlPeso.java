/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Locales */
import model.dao.PesoDAO;


/**
 *
 * @author Zero
 */
public class ctrlPeso extends HttpServlet {

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
        
        PesoDAO opPeso = new PesoDAO();
        
        int pmtAction = Integer.parseInt(request.getParameter("A"));
       
        int pmtId_producto,pmtId_unidad_medida;
        int pmtPeso;
        String Id;
        
        switch(pmtAction){
            
            case 1:/* Busca peso con Id_medida e Id_producto */
                 
                  pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                  pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
            String json_peso =  opPeso.getPeso(pmtId_producto,pmtId_unidad_medida);
                  response.getWriter().write(String.valueOf(json_peso));
                  
                    break;
            case 2:/* Almacena peso de la unidad de medida de un producto */
              
                  pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                  pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                  pmtPeso = Integer.parseInt(request.getParameter("Peso"));
                  
                 Id =   opPeso.Insert_peso(pmtId_producto,pmtId_unidad_medida,pmtPeso);
                response.getWriter().write(Id);
                
                    break; 
            case 3: /* Almacenar o actualiza precio gramo */
                  
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                int  pmtPrecio_gramo = Integer.parseInt(request.getParameter("Precio_gramo"));
                   
                   Id =   opPeso.Insert_precio_gramo(pmtId_producto,pmtPrecio_gramo);
                   response.getWriter().write(Id); 
                    break;
            case 4:/*  Consulta si hay exixtencias suficientes de un producto para pesar la formula */
                    
                    pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                    pmtPeso = Integer.parseInt(request.getParameter("Peso"));
                    
                    String Suficiente = opPeso.getSuficiente_producto(pmtId_producto,pmtPeso);
                    response.getWriter().write(Suficiente); 
                    
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
