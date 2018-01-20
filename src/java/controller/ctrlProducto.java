
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.ProductoDAO;
import model.vo.ProductoVO;


public class ctrlProducto extends HttpServlet {

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

                             ProductoDAO opProducto = new ProductoDAO();
                             int mode = Integer.parseInt(request.getParameter("A"));
                             int pmtId_producto;
                             int pmtId_grupo;
                             int pmtId_marca;
                             
                             
                             switch(mode){
                                case 1:/* Create update */
                                    /* Parámetros: producto */
                                        pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                                        pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                                        pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                                        String pmtDescripcion = request.getParameter("Descripcion");
                                        String pmtList_presentaciones = request.getParameter("List_presentaciones");
                                        

                                        String id_producto = opProducto.create_update_Producto(pmtId_producto,pmtId_grupo,pmtId_marca,pmtDescripcion,pmtList_presentaciones);
                                        response.getWriter().write(id_producto);
                                    break;
                                case 2:/* Buscar todos los productos */
                                        String json_productos = opProducto.read_Productos();
                                        response.getWriter().write(json_productos);
                                    break;
                                case 3:/* Busca datos de un producto */
                                            pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                                            String statistics = opProducto.data_Producto(pmtId_producto);
                                            response.getWriter().write(statistics); 
                                        break;
                                case 4:/* Elimina un producto */
                                            pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                                            String estado_producto = opProducto.remove_Producto(pmtId_producto);
                                            response.getWriter().write(estado_producto);
                                        break;
                                case 5: /* read maximo codigo producto: by id_grupo && id_marca */
                                            pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                                            pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));

                                            String codigo = opProducto.read_maximo_codigo(pmtId_grupo,pmtId_marca);
                                            response.getWriter().write(codigo);
                                        break;
                                 case 6: /* read maximo codigo producto: by id_grupo && id_marca */
                                     /*
                                        {List_presentaciones:list_presentaciones,Id_producto:res_id_producto,A:12}
                                     */
                                         /*   String pmtList_presentaciones = request.getParameter("List_presentaciones");
                                            pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));

                                            String res = opProducto.create_update_presentaciones_Producto(pmtList_presentaciones,pmtId_producto);
                                            response.getWriter().write(res); */
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
