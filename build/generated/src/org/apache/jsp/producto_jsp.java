package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class producto_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
      out.write("        <title>Producto</title>\n");
      out.write("          <!-- Estilos -->\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/controllers.css\" title=\"Style\"/>\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/generals.css\" title=\"Style\"/>\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/menu.css\" title=\"Style\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/standar.css\" title=\"Style\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"css/producto.css\" title=\"Style\">\n");
      out.write("         <!-- Js -->\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/jquery-1.9.1.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/generals.js\"></script>\n");
      out.write("        <!-- <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/producto/ctrlMarca.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/producto/ctrlFraccion.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/producto/ctrlPresentacion.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/producto/ctrlProducto.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/marca.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/presentacion.js\"></script>\n");
      out.write("        <script language=\"JavaScript\" type=\"text/javascript\" src=\"js/fraccion.js\"></script> -->\n");
      out.write("        ");
      out.write("\n");
      out.write("      ");
      out.write("\n");
      out.write("        ");
      out.write("\n");
      out.write("        ");
      out.write("\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("\n");
      out.write("\n");
      out.write("        <div id=\"universe\" spellcheck=\"false\">\n");
      out.write("                <!-- Menú -->\n");
      out.write("            <section id=\"left\">\n");
      out.write("             <ul id=\"navigationMenu\">\n");
      out.write("                <li> <a class=\"client\" href=\"cliente.jsp\"><span>Clientes</span></a></li>\n");
      out.write("                <li><a class=\"provider\" href=\"proveedor.jsp\"><span>Proveedores</span></a></li>\n");
      out.write("                <li><a class=\"product\" href=\"#\"><span>Productos</span></a></li>\n");
      out.write("                <li><a class=\"formula\" href=\"inventario.jsp\"><span>Inventario</span></a></li>\n");
      out.write("                <li><a class=\"sale\" href=\"venta.jsp\"><span>Ventas</span></a></li>\n");
      out.write("                <li><a class=\"shopping\" href=\"compra.jsp\"><span>Compras</span></a></li>\n");
      out.write("                <li><a class=\"formula\" href=\"gastos.jsp\"><span>Gastos</span></a></li>\n");
      out.write("                <li><a class=\"formula\" href=\"estadistica.jsp\"><span>Estadística</span></a></li>\n");
      out.write("                <li><a class=\"formula\" href=\"formulas.jsp\"><span>Fórmulas</span></a></li>\n");
      out.write("             </ul>\n");
      out.write("            </section>\n");
      out.write("\n");
      out.write("        <!-- Contenedor central -->\n");
      out.write("        <section id=\"center\">\n");
      out.write("                 <div class=\"title\">\n");
      out.write("                    <div class=\"label\">Productos</div>\n");
      out.write("                </div>\n");
      out.write("                <br>\n");
      out.write("\n");
      out.write("                  <a id=\"descargar_productos\" class=\"hidden\">Descargar productos</a>\n");
      out.write("\n");
      out.write("                <div class=\"container\">\n");
      out.write("                    <div class=\"tabMenu\">\n");
      out.write("                       <div class=\"tab isSelect\" id=\"tabProducto\">Administrar productos</div>\n");
      out.write("                       <div class=\"tab\" id=\"tabGrupo\">Grupos</div>\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("                     <iframe id=\"frm_frm\" src=\"producto/producto.jsp\" style=\"border:none;\"></iframe>\n");
      out.write("                            <!-- Forma fisica de  -->\n");
      out.write("                                <div id=\"forma_fisica\" data-estado=\"0\">\n");
      out.write("                                    <div class=\"label\">Líquido</div>\n");
      out.write("                                </div>\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("                     </div>\n");
      out.write("                </div>\n");
      out.write("                 <!-- END ***  CONFIGURACIÓN  *** END -->\n");
      out.write("\n");
      out.write("\n");
      out.write("                </div>\n");
      out.write("            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->\n");
      out.write("\n");
      out.write("\n");
      out.write("        </section>\n");
      out.write("         <!-- END *** CONTENEDOR PRINCIPAL *** END -->\n");
      out.write("\n");
      out.write("         </div>\n");
      out.write("\n");
      out.write("         <script type=\"text/javascript\">\n");
      out.write("\n");
      out.write("                 $('div.tabMenu').on('click','div.tab',function(){\n");
      out.write("\n");
      out.write("                         console.log('Click tab')\n");
      out.write("\n");
      out.write("                            /* Tab Select*/\n");
      out.write("                            $(\"div.tab\").removeClass('isSelect');/* Quita la selección en las tabs*/\n");
      out.write("                            $(this).addClass('isSelect');/* Selecciona esta tab */\n");
      out.write("                            /* Frame Select*/\n");
      out.write("                            $(\"div.frame\").removeClass('isVisible');\n");
      out.write("\n");
      out.write("                            var Opcion = $(this).attr('id');\n");
      out.write("\n");
      out.write("                            /* Selecciona formulario */\n");
      out.write("                              switch(Opcion){\n");
      out.write("                                  case 'tabProducto':\n");
      out.write("                                           $('iframe#frm_frm').attr('src','producto/producto.jsp')\n");
      out.write("                                      break;\n");
      out.write("                                   case 'tabGrupo':\n");
      out.write("                                             $('iframe#frm_frm').attr('src','producto/grupo.jsp')\n");
      out.write("                                      break;\n");
      out.write("                              }\n");
      out.write("\n");
      out.write("                 });/* Navegación local */\n");
      out.write("         </script>\n");
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
