<%--
    Document   : inventario
    Created on : 23/12/2016, 09:36:55 AM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inventario</title>
          <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/inventario.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/inventario.js"></script>
        <!-- Js -->

    </head>
    <body>
        <div id="Inventario">
            <div class="label">Valor actual</div>
            <div id="Total">0</div>

            <div id="setcantidad_producto">
                <div style="font-size: 16px;"><b>Unidades Enteras</b></div>
                <div id="select_producto">Seleccione producto</div>
                <div class="value" id="select_medida">Seleccione medida</div>
                <div id="select_cantidad">
                    <div class="label">Fecha último inventario</div>
                    <div class="value" id="value_fecha_inventario">N/A</div>
                    <div class="label"><b>Unidades Enteras</b></div>
                    <b><div class="value" id="value_cantidad_actual">N/A</div></b>
                    <div class="label">nueva cantidad</div>
                    <div class="textbox"><input type="text" id="txt_nueva_cantidad" placeholder="10"></div>
                </div>
                <div id="btn_set_cantidad">
                    <div class="label">Ingresar</div>
                </div>
            </div>
            <br>
            <hr>
            <div id="setempezado_producto">
                <div style="font-size: 16px;"><b>Unidades Empezadas</b></div>
                <div id="select_producto_empezado">Seleccione producto</div>
                <div class="value" id="select_medida_empezado">Seleccione medida</div>
                <div id="select_cantidad">
                    <div class="label">Fecha último inventario</div>
                    <div class="value" id="value_fecha_empezado">N/A</div>
                    <div class="label"><b>Empezados</b></div>
                    <b><div class="value" id="value_cantidad_actual_empezado">N/A</div></b>
                    <div class="label">Cantidad</div>
                    <div class="textbox"><input type="text" id="txt_nueva_cantidad_empezado" placeholder="10"></div>
                </div>
                <div id="btn_set_cantidad_empezado">
                    <div class="label">Ingresar</div>
                </div>
            </div>

        </div>

        <div id="universe">
        <!-- MENU NAVEGACION -->
            <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                <li><a class="formula" href="#"><span>Inventario</span></a></li>
                <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                <li><a class="sale" href="gastos.jsp"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
             </ul>
            </section>
        <!-- END *** MENU NAVEGACION *** END -->

        <div class="container">
            <h2>Inventario</h2>

                         <div class="encabezado_sector">
                                <div class="listProducto hidden" id="listProducto"></div>
                                <div class="label">Producto</div>
                                <div class="textbox"><input id="txtSearchProducto" placeholder="Buscar producto..." type="text"></div>
                                <div class="info" id="info_producto_codigo"></div>
                                <div class="info" id="info_producto_marca"></div>
                                <div class="info" id="info_producto_grupo"></div>
                         </div>
            <br>


                         <div class="fila_sector" >
                                 <div id="cell_unidad_medida" class="cell_sector">

                                       <div id="encabezado_medida">
                                           <div class="unidad_medida" >Unidad de medida</div>
                                            <div class="stock" >Stock</div>
                                       </div>

                                       <div class="listUnidadMedida" id="listUnidadMedida"></div>
                                 </div>
                                 <div id="cell_disponible" class="cell_sector hidden">
                                       <div class="label">Disponible</div>
                                       <div id="lblDisponible"></div>
                                 </div>

                             <!-- Información relacionada directamente con la unidad de medida del producto  -->
                                <div class="cell_sector hidden" id="cell_producto" >
                                                <div id="lblSelectedUnidadMedida">
                                                    <div class="unidad_medida">Seleccione!</div>
                                                    <div class="stock"></div>
                                                </div>

                                                <div class="align">
                                                       <!-- Caja de texto peso para poliuretanos  -->
                                                       <div id="Peso">
                                                           <div class="child hidden">
                                                             <div class="label">Peso</div>
                                                             <div class="textbox"><input id="txtPeso" placeholder="20gr" type="text"></div>
                                                             <div class="button" id="btn_set_Peso">
                                                                 <div class="label">set</div>
                                                             </div>
                                                           </div>

                                                        </div>
                                                </div>


                                                <br>
                                                <div class="align">
                                                        <div class="field">
                                                            <div class="label">Precio de venta</div>
                                                            <div class="textbox"><input id="txtPrecioVenta" placeholder="10.000" type="text"></div>
                                                        </div>
                                                        <div class="field">
                                                             <div class="label">Cantidad</div>
                                                             <div class="textbox"><input id="txtCantidad" placeholder="100" type="text"></div>
                                                        </div>
                                                </div>
                                                <div class="align">
                                                        <div class="field">
                                                             <div class="label">Iva</div>
                                                             <div class="textbox"><input id="txtIva" placeholder="19%" value="19" type="text"></div>
                                                        </div>
                                                </div>

                                                 <br>
                                        <!--   <div id="lblFracciones">Fracciones</div>
                                           <div id="fracciones"></div>  -->
                                        <div id="content_fracciones" class="hidden">
                                            <div id="lblFracciones">Fracciones</div>
                                            <div id="fracciones"></div>
                                        </div>

                                        <!--  Almacenar  -->
                                        <div id="btnAlmacenar"><div class="label">Almacenar</div></div>

                                </div>
                         </div>
                        <br>


        </div>

        </div>



    </body>
</html>
