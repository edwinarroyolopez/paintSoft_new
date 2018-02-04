package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class compra_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
      out.write("        <title>Compra</title>\n");
      out.write("         <!-- Estilos -->\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/controllers.css\" title=\"Style\"/>\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/generals.css\" title=\"Style\"/>\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/menu.css\" title=\"Style\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/standar.css\" title=\"Style\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/compra.css\" title=\"Style\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/compra_factura.css\" title=\"Style\">\n");
      out.write("        <!-- Estilos  -->\n");
      out.write("         <!-- Js -->\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/jquery-1.9.1.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/generals.js\"></script>\n");
      out.write("        <!-- Js -->\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("\n");
      out.write("         <div id=\"universe\">\n");
      out.write("\n");
      out.write("                <section id=\"left\">\n");
      out.write("                     <ul id=\"navigationMenu\">\n");
      out.write("                        <li> <a class=\"client\" href=\"cliente.jsp\"><span>Clientes</span></a></li>\n");
      out.write("                        <li><a class=\"provider\" href=\"proveedor.jsp\"><span>Proveedores</span></a></li>\n");
      out.write("                        <li><a class=\"formula\" href=\"formulas.jsp\"><span>Fórmulas</span></a></li>\n");
      out.write("                        <li><a class=\"product\" href=\"producto.jsp\"><span>Productos</span></a></li>\n");
      out.write("                        <li><a class=\"formula\" href=\"inventario.jsp\"><span>Inventario</span></a></li>\n");
      out.write("                        <li><a class=\"shopping\" href=\"compra.jsp\"><span>Compras</span></a></li>\n");
      out.write("                        <li><a class=\"sale\" href=\"venta.jsp\"><span>Ventas</span></a></li>\n");
      out.write("                        <li><a class=\"shopping\" href=\"gastos.jsp\"><span>Gastos</span></a></li>\n");
      out.write("                        <li><a class=\"formula\" href=\"estadistica.jsp\"><span>Estadística</span></a></li>\n");
      out.write("                    </ul>\n");
      out.write("                </section>\n");
      out.write("                 <!-- # Navegacion # -->\n");
      out.write("\n");
      out.write("                 <!-- Contenedor central -->\n");
      out.write("                 <section id=\"center\">\n");
      out.write("                          <div class=\"title\">\n");
      out.write("                             <div class=\"label\">Compras</div>\n");
      out.write("                         </div>\n");
      out.write("                         <br>\n");
      out.write("                             <div class=\"container\">\n");
      out.write("                                   <div class=\"tabMenu\">\n");
      out.write("                                      <div class=\"tab isSelect\" id=\"tabIngresarCompra\">Ingresar Compra</div>\n");
      out.write("                                      <div class=\"tab\" id=\"tabBusqueda\">Estado de facturas</div>\n");
      out.write("                                      <div class=\"tab\" id=\"tabDescripcion\">Descripcion</div>\n");
      out.write("                                      <div class=\"tab\">Mejores</div>\n");
      out.write("                                    </div><!-- ## Menu ## -->\n");
      out.write("\n");
      out.write("                                    <iframe id=\"frm_frm\" src=\"compra/entrada.jsp\" style=\"border:none;\"></iframe>\n");
      out.write("\n");
      out.write("                             </div><!-- Container -->\n");
      out.write("                 </section>\n");
      out.write("\n");
      out.write("          </div><!-- ## Universe ## -->\n");
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
