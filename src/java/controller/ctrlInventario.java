/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.FraccionDAO;
import model.dao.InventarioDAO;
import model.dao.ProductoDAO;


/**
 *
 * @author Zero
 */
public class ctrlInventario extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
        
         InventarioDAO OpInventario = new InventarioDAO();
         
         int pmtAction =  Integer.parseInt(request.getParameter("Action"));
         int pmtId_producto;
         int pmtId_medida;
         int pmtId_unidad_medida;
         int pmtCantidad;
         int pmtPrecio_venta;
         float pmtIva;
         int pmtControl;

         
        switch(pmtAction){
            case 1:/* Buscar - Stock de porducto por id producto */
                
                /* Parámetros: Producto */
                        pmtControl = Integer.parseInt(request.getParameter("Control"));
                        pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                        pmtId_medida = Integer.parseInt(request.getParameter("Id_medida"));
                        
                        String listStockProducto = OpInventario.getStockProducto(pmtControl,pmtId_producto,pmtId_medida);
                        response.getWriter().write(listStockProducto); 
                            
        
                break;
            case 2:/* Inventario ---> Inventario */
                
                      
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                     pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                     pmtPrecio_venta = Integer.parseInt(request.getParameter("Precio_venta"));
                     pmtIva = Float.parseFloat(request.getParameter("Iva"));
                
                     
                     
                   String Id = OpInventario.doInventario(pmtId_producto, pmtId_unidad_medida, pmtCantidad, pmtPrecio_venta,pmtIva);
                   response.getWriter().write(Id); 
                   
                break;
            case 3:/* Buscar todos los productos: Compra.jsp */
                    
                break;
                
            case 4:/* Busca los precios de las fracciones: Parámetros: Id_unidad_medida , Id_producto */
                    
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                
                     FraccionDAO opFraccion = new FraccionDAO();
                     String listPrecioFracciones = opFraccion.listPrecioFracciones(pmtId_producto, pmtId_unidad_medida);
                     response.getWriter().write(listPrecioFracciones); 
                     
                break;
                
                case 5:/* Busca productos empezados: Parámetros: Id_unidad_medida , Id_producto */
                    
                     pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                     pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                
                     String Restante = String.valueOf(OpInventario.producto_Empezado(pmtId_producto, pmtId_unidad_medida));
                     response.getWriter().write(Restante); 
                     
                break;
                
                case 6:/* Busca productos empezados: Parámetros: Id_unidad_medida , Id_producto */
                    
                            /* NOTHING! */
                     String total = OpInventario.Total();
                     response.getWriter().write(total); 
                     
                break;
                
                case 7:/* Busca productos empezados: Parámetros: Id_unidad_medida , Id_producto */
                    
                            /* NOTHING! */
                       String ruta = getServletContext().getRealPath("/pdf/productos.txt");
                       
                    try {
                           
                     
                            File archivo = new File(ruta);
                            FileReader fr = new FileReader(archivo);
                            BufferedReader br = new BufferedReader(fr);
                            
                            String linea;
                            
                            while((linea=br.readLine())!=null){
                                
                              String row[] =  linea.split(";");/* Id; Id_grupo; Id_marca; Codigo; Descripcion */
                                
                              System.out.println("Id: "+row[0] + " Codigo: "+row[3]+ " Descripcion: "+row[4]);
                              
                              int id = Integer.parseInt(row[0]);
                              String descripcion = row[4];
                              
                              /*  Aquí debo Actualizar ---> Tabla producto donde id = Id  */
                                ProductoDAO op = new ProductoDAO();
                                
                                System.out.println(op.Insert_desde_txt(id, descripcion));
                                
                            }
                        
                    } catch (Exception e) {
                        System.out.println(e);
                    }
                    
                          
                     
                     response.getWriter().write(ruta); 
                break;
                
                case 8:
                         pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                         pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                         
                         String fecha_ultimo_inventario = OpInventario.getFecha_ultimo_inventario(pmtId_producto,pmtId_unidad_medida);
                         response.getWriter().write(fecha_ultimo_inventario);
                        break;
                case 9:
                         pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                         pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                         pmtCantidad = Integer.parseInt(request.getParameter("Cantidad"));
                          
                         
                         String r = OpInventario.setCantidad_producto_sin_Estado(pmtId_producto,pmtId_unidad_medida,pmtCantidad);
                         response.getWriter().write(r);
                        break;
                        
                  case 10:
                         pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                         pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                   float pmtCantidad_ = Float.parseFloat(request.getParameter("Cantidad"));
                          
                         
                         String rs = OpInventario.setCantidad_producto_empezado(pmtId_producto,pmtId_unidad_medida,pmtCantidad_);
                         response.getWriter().write(rs);
                        break;
                    
                   case 11:
                         pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                         pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                         
                         pmtPrecio_venta = Integer.parseInt(request.getParameter("Precio_venta"));
                     int pmtPrecio_gramo = Integer.parseInt(request.getParameter("Precio_gramo"));
                          
                         
                         String w = OpInventario.setPrecio_venta_gramo(pmtId_producto,pmtId_unidad_medida,pmtPrecio_venta,pmtPrecio_gramo);
                         response.getWriter().write(w);
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
