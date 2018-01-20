<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Producto</title>
          <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/producto.css" title="Style">
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals.js"></script>
    </head>
    <body>

        <div id="universe" spellcheck="false">
                      <!-- Menú -->
                  <section id="left">
                   <ul id="navigationMenu">
                      <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                      <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                      <li><a class="product" href="#"><span>Productos</span></a></li>
                      <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                      <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                      <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                      <li><a class="formula" href="gastos.jsp"><span>Gastos</span></a></li>
                      <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
                      <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                   </ul>
                  </section>

                  <!-- Contenedor central -->
                  <section id="center">
                           <div class="title">
                              <div class="label">Productos</div>
                          </div>
                          <br>

                            <a id="descargar_productos" class="hidden">Descargar productos</a>

                              <div class="container">
                                  <div class="tabMenu">
                                     <div class="tab isSelect" id="tabProducto">Administrar productos</div>
                                     <div class="tab" id="tabGrupo">Grupos</div>
                                  </div>

                                  <iframe id="frm_frm" src="producto/producto.jsp" style="border:none;"></iframe>
                                  <!-- Forma fisica de  -->
                                    <div id="forma_fisica" data-estado="0">
                                        <div class="label">Líquido</div>
                                    </div>
                              </div><!-- Container -->
                  </section>
         </div>

         <script type="text/javascript">

                 $('div.tabMenu').on('click','div.tab',function(){

                            /* Tab Select*/
                            $("div.tab").removeClass('isSelect');/* Quita la selección en las tabs*/
                            $(this).addClass('isSelect');/* Selecciona esta tab */
                            /* Frame Select*/
                            $("div.frame").removeClass('isVisible');

                            var Opcion = $(this).attr('id');

                            /* Selecciona formulario */
                              switch(Opcion){
                                  case 'tabProducto':
                                           $('iframe#frm_frm').attr('src','producto/producto.jsp')
                                      break;
                                   case 'tabGrupo':
                                             $('iframe#frm_frm').attr('src','producto/grupo.jsp')
                                      break;
                              }

                 });/* Navegación local */
         </script>

    </body>
</html>
