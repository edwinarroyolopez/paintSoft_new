<%--
    Document   : estadistica
    Created on : 18/04/2017, 05:40:21 AM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Estadistica</title>
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/estadistica.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals."></script>
        <script language="JavaScript" type="text/javascript" src="js/estadistica.js"></script>
    </head>
    <body>


            <div id="universe">
            <!-- START  *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** START -->
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
                            <li><a class="formula" href="#"><span>Estadística</span></a></li>
                        </ul>
                    </section>
                     <!-- END *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** END -->

         <!-- rgba(40, 84, 107, 0.97) -->

         <section id="center">

            <!-- Titulo de la pagiga -->

             <!-- END *** Titulo de la pagiga *** END -->

            <!-- CONTAINER DE NAVEGACIÓN -->

                <div class="container">


                 <div class="title">
                    <div class="label">Estadística</div>
                </div>
                    <br><br>

                 <!-- TABS DE NAVEGACIÓN -->
                    <div class="tabMenu">
                       <div class="tab isSelect" id="tabGanancias">Ganancias</div>
                       <div class="tab" id="tabOtros">Otros</div>
                    </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->



                   <!-- FORMULARIO Estadistica -->
                   <div class="frame isVisible" id="frmEstadistica">

                       <div>Ganancia</div><div id="info_ganancia" style="color: #438164;"></div>
                       <div>Gasto</div><div id="info_gasto" style="color: #F00;"></div>


                   </div>
                   <!-- FORMULARIO Gastos  *** END *** -->



                </div>
            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->

        </section>
         <!-- END *** CONTENEDOR PRINCIPAL *** END -->


    </div>


    </body>
</html>
