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
import model.dao.GrupoMarcaDAO;
import model.dao.MedidaDAO;
import model.dao.productoGrupoDAO;
import model.dao.unidadMedidaDAO;
import model.vo.FraccionVO;
import model.vo.MedidaVO;
import model.vo.unidadMedidaVO;
 

public class ctrlMedida extends HttpServlet {

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
        
            
            /* Para Unidades de medida */
             unidadMedidaDAO OpunidadMedida = new unidadMedidaDAO();
     
             
             /* Parámetros */
             int pmtId_medida;
             int pmtId_grupo;
             int pmtAction = Integer.parseInt(request.getParameter("Action"));
             String listUnidades_medida;
             int  pmtId_unidad_medida; 
              
             String respuesta = "";
        
        switch(pmtAction){
            case 1:/* Save */
                
                   /* Parámetros: Medida */
                     String pmtMedida = request.getParameter("Medida");
                    
                   /* Resgistra  Medida */
                            MedidaDAO OpMedida = new MedidaDAO();
                            MedidaVO  medida  = new MedidaVO(0,pmtMedida);
                            String json_medida = OpMedida.Registrar(medida);
                            response.getWriter().write(json_medida);
                break;
                
            case 2:/*  Almacenar unidad de medida  */
                
                 /* Parámetros: Medida */
                     String pmtUnidad_medida = request.getParameter("Unidad_medida");
                     pmtId_medida = Integer.parseInt(request.getParameter("Id_medida"));
                     pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                    
                    unidadMedidaVO  unidad_medida  = new unidadMedidaVO(0,pmtId_medida,pmtId_grupo,pmtUnidad_medida);
                    String json_unidad_medida =OpunidadMedida.Registrar(unidad_medida);
                    response.getWriter().write(json_unidad_medida);  
                    
                    /*  END *** Resgistra unidad de medida  *** END  */  
                
                break;
                
                  case 3:/*  Buscar: Id unidad de medida - Unidad de medida - Stock - Precio de venta 1 */
                   
                    
                break;
                
                 case 4: /*  Buscar Unidades de Medida  */
                
                     /* Filtro por id de medida */
                        pmtId_medida = Integer.parseInt(request.getParameter("Id_medida")); 
                        pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo")); 

                        listUnidades_medida = OpunidadMedida.getUnidades_medida();
                        response.getWriter().write(listUnidades_medida); 
                 
                break;
                case 5: /*  Buscar Unidades de Medida  */
                          listUnidades_medida = OpunidadMedida.getUnidades_medida();
                          response.getWriter().write(listUnidades_medida);
                break;
                
                case 6: /*  Buscar Fracciones de unidades de medida  */
                    
//                        pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida")); 
//                    int pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
//                        FraccionDAO opFraccion = new FraccionDAO();
//                        String listFracciones = opFraccion.listFracciones(pmtId_unidad_medida,pmtId_producto);
//                        response.getWriter().write(listFracciones); 
                 
                break;
                
                 case 7: /*  Guarda una Fracción de una unidad de medida  */
                    
//                        String pmtFraccion = request.getParameter("Fraccion");
//                        Float pmtProporcion = Float.parseFloat(request.getParameter("Proporcion"));
//                        pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida")); 
//                        
//                        FraccionVO fraccion = new FraccionVO(0, pmtId_unidad_medida, pmtFraccion,pmtProporcion);
//                        opFraccion = new FraccionDAO();
//                        String Id = opFraccion.registrar(fraccion);
//                        response.getWriter().write(Id); 
                 
                break;
                
                case 8: /* Busca Medidas  */
                        MedidaDAO opMedida = new MedidaDAO();
                        String listMedidas = opMedida.getMedidas();
                        response.getWriter().write(listMedidas); 
                break;
                
                case 9: /* Busca Grupo de marcas  */
                        GrupoMarcaDAO opGrupoMarcas = new GrupoMarcaDAO();
                        String listGrupoMarcas = opGrupoMarcas.getGruposMarcas();
                        response.getWriter().write(listGrupoMarcas); 
                break;
                case 10: /* Busca Grupos  */
                        productoGrupoDAO opGrupo = new productoGrupoDAO();
                        String listGrupo = opGrupo.getGrupos();
                        response.getWriter().write(listGrupo); 
                break;
                case 11: /* Define forma fisica de la medida  */
                          pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida")); 
                      int pmtForma_fisica = Integer.parseInt(request.getParameter("Forma_fisica"));
                          String r =  OpunidadMedida.set_Forma_fisica(pmtId_unidad_medida,pmtForma_fisica);
                          response.getWriter().write(r); 
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
