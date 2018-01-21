
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Compra</title>
         <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/compra.css" title="Style">
        <link rel="stylesheet" href="css/compra_factura.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals.js"></script>
        <!-- Js -->
    </head>
    <body>

         <div id="universe">

                <section id="left">
                     <ul id="navigationMenu">
                        <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                        <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                        <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                        <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                        <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                        <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                        <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                        <li><a class="shopping" href="gastos.jsp"><span>Gastos</span></a></li>
                        <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
                    </ul>
                </section>
                 <!-- # Navegacion # -->

                 <!-- Contenedor central -->
                 <section id="center">
                          <div class="title">
                             <div class="label">Productos</div>
                         </div>
                         <br>
                             <div class="container">
                                   <div class="tabMenu">
                                      <div class="tab isSelect" id="tabIngresarCompra">Ingresar Compra</div>
                                      <div class="tab" id="tabBusqueda">Estado de facturas</div>
                                      <div class="tab" id="tabDescripcion">Descripcion</div>
                                      <div class="tab">Mejores</div>
                                    </div><!-- ## Menu ## -->

                                    <iframe id="frm_frm" src="compra/entrada.jsp" style="border:none;"></iframe>

                             </div><!-- Container -->
                 </section>

          </div><!-- ## Universe ## -->

    </body>
</html>
