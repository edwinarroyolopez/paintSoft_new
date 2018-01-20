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
import model.dao.FormulaDAO;

/**
 *
 * @author Zero
 */
public class ctrlFormula extends HttpServlet {

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
       
        FormulaDAO opFormula = new FormulaDAO();
        
                        String pmtDescripcion;
                        int pmtPeso;
                        String max_Id;
                        int pmtId_formula;
                        int pmtId_maquina;
                        String json_formulas;
                         String json_color;
                        
        int pmtAction = Integer.parseInt(request.getParameter("A"));
        
    
            switch(pmtAction){
                case 1:/* Cargar poliuretanos y bicapas */
                        
                        String json_pol_bic = opFormula.get_Poliuretano_Bicapa();
                        response.getWriter().write(json_pol_bic);
                        
                        break;
                case 2: /* Insertar fórmula */
                        pmtDescripcion = request.getParameter("Descripcion");
                        pmtPeso = Integer.parseInt(request.getParameter("Peso"));
                        String pmtMedida = request.getParameter("Medida");
                        
                        max_Id = opFormula.insert_Formula(pmtDescripcion,pmtPeso,pmtMedida);
                        response.getWriter().write(max_Id); 
                        
                        break;
                case 3: /* Insertar colores de fórmula */
                            int pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                                pmtPeso = Integer.parseInt(request.getParameter("Peso"));

                                max_Id = opFormula.insert_Formula_color(pmtId_producto,pmtPeso);
                                response.getWriter().write(max_Id); 
                        break;
                case 4: /* Read formulas  */
                            int pmt_control = Integer.parseInt(request.getParameter("Control"));
                            json_formulas = opFormula.read_formulas(pmt_control);
                            response.getWriter().write(json_formulas); 
                        break;
                case 5: /* Obtener colores de fórmula */
                               pmtId_formula = Integer.parseInt(request.getParameter("Id_formula"));
                               json_color = opFormula.getColores(pmtId_formula);
                               response.getWriter().write(json_color); 
                        break;
                case 6: /* Crear relación entre máquina y fórmula  */
                               pmtId_formula = Integer.parseInt(request.getParameter("Id_formula"));
                               pmtId_maquina = Integer.parseInt(request.getParameter("Id_maquina"));
                           
                        String id_relacion = opFormula.setRelacion_maquina_formula(pmtId_formula,pmtId_maquina);
                               response.getWriter().write(id_relacion); 
                        break;
                        
                case 7: /* Obtener fórmulas apartir de Id máquina  */
                         pmtId_maquina = Integer.parseInt(request.getParameter("Id_maquina"));
                         json_formulas = opFormula.getFormula_by_id_maquina(pmtId_maquina);
                         response.getWriter().write(json_formulas); 
                        break;      
                        
                  case 8: /* Obtener colores de fórmula */
                               pmtId_formula = Integer.parseInt(request.getParameter("Id_formula"));
                               json_color = opFormula.getColores_venta(pmtId_formula);
                               response.getWriter().write(json_color); 
                        break;
                  
                  case 9: /* Eliminar fórmula */
                               pmtId_formula = Integer.parseInt(request.getParameter("Id_formula"));
                               String r = opFormula.Eliminar_formula(pmtId_formula);
                               response.getWriter().write(r); 
                        break;
                        
                  case 10: /* Eliminar fórmula */
                               pmtId_formula = Integer.parseInt(request.getParameter("Id_formula"));
                               String formula = opFormula.getFormula(pmtId_formula);
                               response.getWriter().write(formula); 
                        break;      
                        
                   case 11: /* Obtener info de un color para fórmula rápida */
                               pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                              String json_info_color = opFormula.read_info_color_fast_formula(pmtId_producto);
                               response.getWriter().write(json_info_color); 
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
