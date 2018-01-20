<%--
    Document   : gastos
    Created on : 7/04/2017, 12:28:53 AM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gastos</title>
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/gastos.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/gastos.js"></script>
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
                <li><a class="shopping" href="#"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
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
                    <div class="label">Gastos</div>
                </div>
                    <br><br>

                 <!-- TABS DE NAVEGACIÓN -->
                    <div class="tabMenu">
                       <div class="tab isSelect" id="tabGastos">Gastos</div>
                       <div class="tab" id="tabOtros">Otros</div>
                    </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->



                   <!-- FORMULARIO Gastos -->
                   <div class="frame isVisible" id="frmGastos">

                       <div id="sector_frmGastos">
                           <div id="content_fields">
                               <div class="top">
                                   <div class="field">
                                        <div class="label">Descripción</div>
                                        <div class="textbox"><input id="txtDescripcion" placeholder="Descripción..."></div>
                                   </div>
                               </div>
                               <div class="bottom">
                                   <div class="field">
                                        <div class="label">Tipo</div>
                                        <div class="textbox"><input id="txtTipo_gasto" placeholder="Tipo..."></div>
                                        <div id="list_Tipo_gasto" class="hidden">
                                            <div class="item" data-id_tipo_gasto="0">Diario</div>
                                            <div class="item" data-id_tipo_gasto="1">Mensual</div>
                                        </div>
                                   </div>
                                   <div class="field">
                                        <div class="label">Valor</div>
                                        <div class="textbox"><input id="txtValor_gasto" placeholder="100.000..."></div>
                                   </div>
                               </div>
                               <div id="content_button">
                                   <div id="btn_add_Gasto">
                                       <div class="label">add Gasto</div>
                                   </div>
                               </div>

                               <div id="datagrid_Gastos">
                                   <div class="header">
                                       <div class="descripcion">Descripción</div>
                                       <div class="tipo">Tipo</div>
                                       <div class="valor">Valor</div>
                                   </div>
                                                <!-- <div class="row">
                                                     <div class="descripcion">Arriendo mes de Abril</div>
                                                     <div class="tipo">Mensual</div>
                                                     <div class="valor">800.000</div>
                                                 </div> -->
                               </div>
                           </div>
                       </div>

                   </div>
                   <!-- FORMULARIO Gastos  *** END *** -->



                </div>
            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->

        </section>
         <!-- END *** CONTENEDOR PRINCIPAL *** END -->


    </div>



    </body>
</html>
