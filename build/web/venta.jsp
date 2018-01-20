<%--
    Document   : venta
    Created on : 12/09/2016, 03:39:14 PM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ventas</title>
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/venta.css" title="Style">
        <link rel="stylesheet" href="css/venta_cliente.css" title="Style">
        <link rel="stylesheet" href="css/venta_configuracion.css" title="Style">
        <link rel="stylesheet" href="css/venta_factura.css" title="Style">
        <link rel="stylesheet" href="css/venta_realizada.css" title="Style">
        <!-- Estilos  -->

         <!-- React js  CDN -->
         <script src="js/react/react.min.js"></script>
         <script src="js/react/JSXTransformer.js"></script>
        <!-- React js  CDN -->
         <!-- Jsx -->
         <script src="js/react/buscador_formula.jsx" type="text/jsx"></script>


         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_cliente.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_producto.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_formulas.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_datagrid.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_configuracion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_facturas.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_realizada.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/venta_cotizacion.js"></script>

        <!-- With react  -->
        <script language="JavaScript" type="text/javascript" src="js/react/formulas.js"></script>

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
                <li><a class="sale" href="#"><span>Ventas</span></a></li>
                <li><a class="shopping" href="gastos.jsp"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
            </ul>
        </section>
         <!-- END *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** END -->


         <section id="center">

            <!-- Titulo de la pagiga -->

             <!-- END *** Titulo de la pagiga *** END -->

            <!-- CONTAINER DE NAVEGACIÓN -->

                <div class="container">


                 <div class="title">
                    <div class="label">Ventas</div>
                </div>
                    <br><br>

                 <!-- TABS DE NAVEGACIÓN -->
                    <div class="tabMenu">
                       <div class="tab isSelect" id="tabVenta">Nueva venta</div>
                       <div class="tab" id="tabFactura">Facturas</div>
                       <div class="tab" id="tabConfiguracion">Configuración</div>
                       <div class="tab" id="tabVentas_realizadas">Ventas realizadas</div>
                    </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->

                   <!--  VENTA -->
                 <div class="frame" id="frmVenta">

                     <!-- Buscar formula para setear en data grid  -->
                     <div id="frm_buscar_formula" class="hidden">
                         <div class="titulo_formula">
                             <div class="label">Buscar fórmula</div>
                         </div>
                         <div class="fila_formula">

                                        <!-- Fórmula --  -->
                                        <div id="cell_formula" class="cell_formula">
                                            <div class="encabezado">
                                                <div class="label">Fórmula</div>
                                            </div>
                                             <!-- Buscador  -->
                                            <div class="buscador" id="buscador_formula"></div>
                                        </div>
                         </div>
                         <!-- Fila para setter -->
                         <div class="fila_formula">
                               <!-- Fórmula --  -->
                                        <div id="cell_setter_formula" class="cell_formula">
                                            <div class="align">
                                                   <div class="field_formula">
                                                       <div class="label">Medida</div>
                                                       <div class="textbox"><input id="txtMedida_formula" placeholder="1/16"></div>
                                                       <div id="listUnidad_medida_formula" class="hidden">
                                                           <div class="row" data-cantidad="1">1/64 Gln</div>
                                                           <div class="row" data-cantidad="2">1/32 Gln</div>
                                                           <div class="row" data-cantidad="4">1/16 Gln</div>
                                                           <div class="row" data-cantidad="8">1/8 Gln</div>
                                                           <div class="row" data-cantidad="16">1/4 Gln</div>
                                                           <div class="row" data-cantidad="32">1/2 Gln</div>
                                                           <div class="row" data-cantidad="64">Gln</div>
                                                       </div>
                                                   </div>
                                                   <div class="field_formula">
                                                       <div class="label">Cantidad</div>
                                                       <div class="textbox"><input id="txtCantidad_formula" value="1" readonly="true" placeholder="1"></div>
                                                   </div>
                                                  <div class="field_formula">
                                                       <div class="label">Precio</div>
                                                       <div class="textbox"><input id="txtPrecio_formula" data-precio_formula="0" placeholder="$10.000"></div>
                                                   </div>
                                            </div>
                                            <div id="listColores">
                                                <div class="encabezado"><div class="color">Color</div><div class="peso">Peso</div></div>
                                            </div>
                                        </div>
                         </div>

                           <!-- Boton para enviar formula al data grid -->
                                        <div class="content_button" id="content_btn_insertar">
                                            <div id="btnClose_formula">
                                                <div class="label">x</div>
                                            </div>

                                            <div id="btn_insertar_formula_grid">
                                                <div class="label">Insertar</div>
                                            </div>
                                        </div>




                     </div>
                     <!-- Buscar formula para setear en data grid  -->

                     <!-- Start ***   Contenido visible   *** Start -->
                     <div class="marco" id="mVenta">

                         <!-- SECTOR: CONFIGURACIÓN FACTURA -->

                         <div id="s_configuracion_factura" class="sector">
                             <div class="encabezado_sector">Factura</div>
                             <div class="fila_sector">
                                    <div class="field">
                                         <div class="label"># Factura</div>
                                         <div class="textbox">
                                             <input id="txtFactura" type="text" placeholder="546372">
                                         </div>
                                     </div>
                                    <div class="field">
                                         <div class="label">Fecha</div>
                                         <div class="textbox">
                                             <input id="txtFecha" type="text" placeholder="31/12/2016" value="31/12/2016">
                                         </div>
                                     </div>
                                     <div id="fieldForma_pago" class="field">
                                         <div class="label">Forma de pago</div>
                                         <div class="" id="fmPago" data-value="-1">- seleccione -</div>
                                     </div>
                             </div>
                         </div>

                         <!-- SECTOR: CONFIGURACIÓN FACTURA -->


                         <!-- SECTOR: BÚSQUEDA CLIENTES -->

                          <div id="s_busqueda_cliente" class="sector">
                              <div id="add_Cliente" class="hidden">
                                  <div class="head_add_Cliente">
                                      <div id="btn_cerrar_add_Cliente">
                                          <div class="label">x</div>
                                      </div>
                                  </div>
                                  <div class="campos">
                                      <div class="fila">
                                         <input id="txt_Nombre_add_Cliente" placeholder="Cliente">
                                      </div>
                                      <div class="fila">
                                          <div class="textbox"><input id="txt_Documento_add_Cliente" placeholder="Documento"></div>
                                          <div class="textbox"><input id="txt_Telefono_add_Cliente" placeholder="Teléfono"></div>
                                          <div class="textbox"><input id="txt_Ciudad_add_Cliente" placeholder="Ciudad"></div>
                                      </div>
                                      <div class="fila"><!-- Button -->
                                          <div id="btn_add_Cliente">
                                              <div class="label">add Cliente</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                                <div class="encabezado_sector"><div class="label">Búsqueda cliente</div>
                                    <div class="textbox">
                                        <input id="txt_search_cliente" type="text" placeholder="Nombre  -  Cédula">
                                    </div>
                                     <!-- Lista de clientes -->
                                     <div id="listClientes" class="hidden">
                                        <!-- <div class="item">
                                             <div class="nombre">Edwin Arroyo Lopez</div>
                                             <div class="documento">1038115788</div>
                                         </div> -->
                                        <div id="sin_resultados" class="hidden">No hay resultados!</div>
                                    </div>
                                     <div id="btn_open_add_Cliente">
                                         <div class="label">+</div>
                                     </div>
                                </div>


                              <div class="fila" id="fila_cliente">
                                     <div class="cell">
                                         <div class="label">Nit</div>
                                         <div class="value" id="data_documento">Seleccione</div>
                                     </div>
                                     <div class="cell">
                                         <div class="label">Ciudad</div>
                                         <div class="value" id="data_city">Seleccione</div>
                                     </div>
                                     <div class="cell">
                                         <div class="label">Telefono</div>
                                          <div class="value" id="data_telefono">Seleccione</div>
                                     </div>
                                     <div  id="data_direccion">Seleccione</div>
                                 </div>


                         </div>

                       <!-- SECTOR: BÚSQUEDA CLIENTES -->

                       <!-- SECTOR: BÚSQUEDA DE PRODUCTOS -->

                            <div id="s_busqueda_producto" class="sector">

                                <div class="cell" id="cell_search_producto">
                                    <div id="btnAcces_formula">
                                        <div class="label">add Fórmula</div>
                                    </div>

                                    <div class="field">
                                        <div class="label">Búqueda producto</div>
                                        <div class="textbox"><input type="text" id="txt_search_producto" placeholder="producto o código"></div>
                                    </div>

                                    <!-- Lista de productos -->
                                    <div id="listProducto" class="hidden">
                                     <!--   <div class="item">
                                            <div class="descripcion">Laca Poliuretano</div>
                                            <div class="codigo">8273A</div>
                                        </div> -->
                                    </div>
                                </div>

                                <div class="cell" id="cell_setter_producto">
                                    <div class="encabezado_sector">
                                        <div class="info" id="info_descripcion">Seleccione producto</div>
                                        <div class="info" id="info_codigo"></div>
                                        <div class="info" id="info_marca"></div>
                                        <div class="info" id="info_grupo"></div>
                                    </div>
                                    <div class="fila">
                                        <!-- Información de unidades de medida -->
                                            <div id="info_unidades">
                                                 <div class="encabezado">
                                                     <div class="unidad">Unidad</div>
                                                 </div>
                                             <!--    <div class="fila">
                                                     <div class="unidad">Galón</div>
                                                     <div class="disponible">20</div>
                                                 </div> -->
                                             </div>

                                        <div class="set_Producto">

                                                            <div class="field">
                                                                <div class="label">Unidad</div>
                                                                <div class="textbox">
                                                                    <input type="text" id="txt_sell_Unidad" placeholder="Litro">
                                                                </div>
                                                                <div id="listFracciones" class="hidden" ></div>
                                                            </div>
                                                            <div class="field">
                                                                <div class="label">Cantidad</div>
                                                                <div class="textbox">
                                                                    <input type="text" id="txt_sell_Cantidad" placeholder="10">
                                                                </div>
                                                            </div>

                                                            <div class="field">
                                                                <div class="label">Precio</div>
                                                                <div class="textbox">
                                                                    <input type="text" id="txt_sell_Precio" placeholder="15.000" >
                                                                </div>
                                                            </div>
                                                            <div class="field">
                                                                <div class="label">Descuento</div>
                                                                <div class="textbox">
                                                                    <input type="text" id="txt_sell_Descuento" placeholder="10%">
                                                                </div>
                                                            </div><br><br>
                                                            <!-- Items empezados -->
                                                            <div id="Item_empezado" >
                                                                <div class="label hidden">Empezados</div>
                                                            </div>
                                                            <!-- Items empezados -->
                                                            <div class="contentButton">
                                                                    <div class="" id="btnAddItem">
                                                                        <div class="label">add Item</div>
                                                                    </div>
                                                             </div>

                                                 </div>

                                    </div>

                                    <!-- Fila  -->

                                </div>

                            </div>

                       <!-- SECTOR: BÚSQUEDA DE PRODUCTOS -->

                       <br><br>
                             <!-- Detalle de factura -->
                             <div class="detalle_factura">

                                 <!-- Configuración de producto -->
                                 <!-- Fin configuración de producto -->

                                 <!-- Data grid -->
                                 <div class="datagrid" id="dataProducto">
                                            <div id="Operation">
                                                <div class="center">
                                                    <div id="btnEliminar_fila" class="hidden">
                                                        <div class="label">Eliminar</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="encabezado">
                                                <div class="codigo">Código</div>
                                                <div class="descripcion">Descripción</div>
                                                <div class="unidad">Unidad</div>
                                                <div class="precio_unidad">$ Unidad</div>
                                                <div class="cantidad">Cantidad</div>
                                                <div class="descuento">Descuento</div>
                                                <div class="precio">Precio</div>
                                            </div>
                                            <!--  <div class="fila"></div>  -->
                                 </div>

                             </div><!-- Fin detalle factura -->

                            <!-- Resumen de factura -->


                                <div id="resumen_factura" >
                                    <div class="encabezado_rf">Resumen de factura</div>
                                    <div class="fila_rf">
                                        <div class="field">
                                            <div class="label">Valor neto</div>
                                            <div class="info" id="info_valor_neto" data-set="">seleccione</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Descuento</div>
                                            <div class="info" id="info_descuento" data-set="">seleccione</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Subtotal</div>
                                            <div class="info" id="info_subtotal" data-set="">seleccione</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Iva</div>
                                            <div class="info" id="info_iva" data-set="">seleccione</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Total</div>
                                            <div class="info" id="info_total" data-set="">seleccione</div>
                                        </div>
                                    </div>
                                </div>


                            <!-- Resumen de factura  -->

                            <!--   -->
                            <br>
                            <div id="finalizar_factura">
                                        <!-- Pago factura -->
                                        <div id="pago_factura">
                                             <div class="encabezado_pf">Pago de factura</div>
                                             <div id="Contado">
                                                 <div class="label">Contado</div>
                                             </div>
                                             <div id="Credito" class="hidden">
                                                 <div class="field">
                                                    <div class="label">Anticipo</div>
                                                    <div class="textbox"><input type="text" id="txtAnticipo" placeholder="500.000"></div>
                                                 </div>
                                             </div>
                                        </div>
                                        <!-- Pago factura -->

                                        <div id="contentBtn">
                                            <!-- Button Almacenar -->
                                            <div id="btnAlmacenar">
                                                <div class="label">Almacenar</div>
                                            </div>
                                            <!-- Button Almacenar -->
                                            <!-- Button Cotización -->
                                            <div id="btnCotizacion">
                                                <div class="label">Cotización</div>
                                            </div>
                                            <!-- Button Cotización -->
                                        </div>
                            </div>
                            <br>

                     <!--  End  ***    Contenido visible   ***  End  -->

                     <!-- Nuevo formulario  -->
                     <div id="marco">

                     </div>



                 </div>
                 <!-- END ***  REGISTRO  *** END -->

               <!--  PINTURA -->
                 <div class="frame" id="frmProducto">
                 </div>
               <!-- END ***  PINTURA  *** END -->

                </div>



                   <!-- FORMULARIO FACTURAS -->
                   <div class="frame isVisible" id="frmFactura">

                       <div id="sector_frmFactura">


                                <div id="buscador_factura">
                                         <!-- Facturas pendientes -->
                                         <div id="facturas_pendientes">
                                             <div class="label">Facturas pendientes</div>
                                         </div>
                                         <!-- Búsqueda de facturas -->
                                         <div id="busqueda_factura_texto">
                                             <div class="field">
                                                 <div class="label"></div>
                                                 <div class="textbox"><input id="txt_search_factura" placeholder="Ingrese el número factura o el nombre del cliente"></div>
                                             </div>
                                             <div id="listFacturas" class="hidden"></div>
                                         </div>
                                         <!-- Facturas canceladas -->
                                         <div id="facturas_canceladas">
                                             <div class="label">Facturas canceladas</div>
                                         </div>
                                </div>

                                <!-- Cuerpo del contenido  -->
                                <div id="marco_factura">
                                        <!-- Facturas cliente -->
                                        <div id="contenido_factura">

                                                    <!-- Factura detalle -->
                                                    <div id="f_Proveedor">
                                                            <!-- Encabezado cliente  -->
                                                            <div class="encabezado">
                                                                <div id="cliente_descripcion">Steve Jobs</div>
                                                                <div id="cliente_detalle">
                                                                    <div id="cliente_documento">10101010</div>
                                                                    <div id="cliente_saldo">$500.000</div>
                                                                </div>
                                                            </div>
                                                            <!-- Facturas del cliente -->
                                                            <div id="facturas_cliente"> </div>
                                                    </div>

                                                    <!-- Factura detalle -->
                                                    <div id="f_Factura_detalle">
                                                            <!-- Agregar un producto a la factura -->
                                                            <div id="content_add_producto_factura" class="hidden">
                                                                <div class="frame_add_producto">
                                                                    <div id="search_producto_factura">
                                                                            <input type="text" id="txt_search_producto_factura" placeholder="Ingrese el producto que desea buscar!">
                                                                            <div id="list_producto_factura"></div>
                                                                    </div>
                                                                    <div class="content_detalle_producto">
                                                                        <div id="list_unidad_medida_factura"></div>
                                                                        <div id="list_fracciones_factura">Fracciones!</div>
                                                                        <div id=""></div>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Abonar a la factura  -->
                                                            <div id="content_add_abono_factura" class="hidden">
                                                                <div class="frame_add_abono">
                                                                    <div class="head_abono">
                                                                        <div id="btnClose_abono">
                                                                            <div class="label">x</div>
                                                                         </div>
                                                                            <div class="content_head_item" id="content_saldo_factura">
                                                                                <div class="label">Saldo</div>
                                                                                <div class="value">0000</div>
                                                                            </div>
                                                                            <div class="content_head_item" id="content_cliente_factura">
                                                                                <div class="label">Cliente</div>
                                                                                <div class="value">Steve Jobs</div>
                                                                            </div>
                                                                    </div>
                                                                    <!-- Abonos! -->
                                                                    <div id="content_abonos_factura">
                                                                        <div id="list_abono">
                                                                            <div id="btnImprime_historial">
                                                                                <div class="label">Imprime comprobante</div>
                                                                            </div>

                                                                        </div>
                                                                        <div id="set_abono">
                                                                            <div class="content_set_abono" style="width: 180px;">
                                                                                <div class="field_abono">
                                                                                    <div class="label">Valor de abono</div>
                                                                                    <input type="text" id="txtValor_abono" placeholder="10.000">
                                                                                </div>
                                                                                <div class="field_abono">
                                                                                    <div id="btn_finalizar_abono">
                                                                                        <div class="label">Finalizar</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        <div class="encabezado">
                                                            <div id="fatura_detalle">032017001</div>
                                                            <div class="descripcion_factura">
                                                                            <!-- Button Cancelar factura  -->
                                                                            <div class="content_button_cancelar_factura">
                                                                                <div id="btn_cancelar_factura">
                                                                                    <div class="label">Cancelar factura</div>
                                                                                </div>
                                                                            </div>

                                                                    <!-- Estado -->
                                                                    <div id="fd_Estado" class="field">
                                                                        <div class="label">Estado</div>
                                                                        <div id="estado_factura">Cerrada</div>
                                                                    </div>
                                                                    <!-- Forma de pago -->
                                                                    <div id="fd_Forma_pago" class="field">
                                                                        <div class="label">Forma de pago</div>
                                                                        <div id="forma_pago_factura">Contado</div>
                                                                    </div>
                                                                    <!-- Valor -->
                                                                    <div id="fd_Valor" class="field">
                                                                        <div class="label">Valor</div>
                                                                        <div id="valor_factura">200.000</div>
                                                                    </div>
                                                                    <!-- Saldo -->
                                                                    <div id="fd_Saldo" class="field">
                                                                        <div class="label">Saldo</div>
                                                                        <div id="saldo_factura">0</div>
                                                                    </div>
                                                            </div>
                                                            <div class="descripcion_cliente">
                                                                <div id="fd_documento">54236589</div>
                                                                <div id="fd_cliente">Steve Jobs</div>
                                                            </div>
                                                        </div>
                                                        <div id="contenido_detalle_factura">
                                                            <div id="accion_detalle_factura">
                                                                <div class="content_action">
                                                                    <div id="btnAdd_producto_factura" class="">
                                                                        <div class="label">add Producto</div>
                                                                    </div>
                                                                </div>
                                                                 <div class="content_action">
                                                                    <div id="btnEliminar_fila_factura" class="hidden">
                                                                        <div class="label">Eliminar</div>
                                                                    </div>
                                                                      <div id="btnAdd_abono_factura" class="">
                                                                        <div class="label">add Abono</div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div id="datagrid_detalle_factura">
                                                                <div class="encabezado">
                                                                    <div class="codigo">Código</div>
                                                                    <div class="descripcion">Descripción</div>
                                                                    <div class="unidad">Unidad</div>
                                                                    <div class="precio_unidad">$ Unidad</div>
                                                                    <div class="cantidad">Cantidad</div>
                                                                    <div class="descuento">Descuento</div>
                                                                    <div class="precio">Precio</div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <!-- Facturas pendientes  -->
                                                    <div id="f_Pendientes">
                                                        <!-- Encabezado facturas pendientes -->
                                                        <div class="encabezado">
                                                            <div id="saldo_facturas_pendientes">Saldo facturas pendientes</div>
                                                        </div>
                                                            <!-- Facturas pendientes -->
                                                        <div id="list_facturas_pendientes"></div>
                                                    </div>

                                                    <!-- Facturas canceladas  -->
                                                    <div id="f_Canceladas">
                                                        <!-- Encabezado facturas canceladas -->
                                                        <div class="encabezado">
                                                            <div id="">Facturas canceladas</div>
                                                        </div>
                                                            <!-- Facturas pendientes -->
                                                        <div id="list_facturas_canceladas"></div>
                                                    </div>
                                        </div>





                                </div>

                       </div>

                   </div>
                   <!-- FORMULARIO FACTURAS  *** END *** -->


                   <!-- CONFIGURACION   -->
                   <div class="frame" id="frmConfiguracion">

                       <div id="sector_frmConfiguracion">

                           <div id="Menu_configuracion"></div>

                           <div id="frmConfiguracion_precio_producto">

                               <div id="pp_Search_producto">
                                   <div class="field_search">
                                  <!--      <div class="label">Seleccione un producto</div>   -->
                                       <div class="textbox"><input id="txt_pp_search_producto" placeholder="Ingrese un producto"></div>
                                   </div>
                                   <div id="list_pp_producto" class="hidden">

                                   </div>
                               </div>

                               <!-- Contenido central de configuración precio de producto -->
                               <div id="content_precio_producto">
                                   <div id="sector_unidad_medida">
                                       <div class="encabezado" id="encabezado_unidad_medida">Unidad de medida</div>
                                       <!-- Lista de unidades de medida -->
                                       <div id="list_pp_unidad_medida"></div>
                                   </div>
                                   <div id="sector_precio_producto">
                                       <div class="encabezado">
                                           <div id="pp_producto"></div>
                                       </div>
                                       <div class="precio_superior">
                                           <div class="field">
                                               <div class="label">Precio venta</div>
                                               <div class="textbox"><input id="txt_pp_precio_venta" placeholder="10.000"></div>
                                           </div>
                                       </div>
                                       <div class="precio_inferior">
                                           <div class="hidden" id="list_pp_precio_fracciones">
                                               <div class="encabezado" >Fracciones</div>
                                           </div>
                                           <div class="content_button">
                                               <div id="btn_set_precio">
                                                   <div class="label">Almacenar</div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>

                           </div>

                       </div>

                   </div>

                   <!-- CONFIGURACION   *** END *** -->

                    <!-- Ventas realizadas   -->
                   <div class="frame" id="frmVentas_realizadas">

                       <div id="sector_frmVentas_realizadas">

                           <div id="top_facturas_realizadas">
                                <div id="searcher_date">
                                    <div class="field_search">
                                        <div class="label">Fecha de búsqueda</div>
                                        <div class="textbox"><input id="txt_fecha_busqueda" placeholder="dd/mm/aaaa"></div>
                                    </div>
                                    <div id="btnBusqueda">
                                        <div class="label">Buscar</div>
                                    </div>
                                </div>
                               <!-- Botón imprimir informe! -->

                           </div>

                           <!-- Encabezado -->
                                <div id="encabezado_ventas_realizadas">
                                    <div class="field">
                                        <div class="label">Facturas</div>
                                        <div class="info" id="info_cantidad_facturas">0</div>
                                    </div>
                                    <div class="field">
                                        <div class="label">Ventas</div>
                                        <div class="info" id="info_ventas_facturas">0</div>
                                    </div>
                                    <div class="field">
                                        <div class="label">Créditos</div>
                                        <div class="info" id="info_credito_facturas">0</div>
                                    </div>
                                    <div class="field">
                                        <div class="label">Caja</div>
                                        <div class="info" id="info_caja_facturas">0</div>
                                    </div>
                                </div>

                           <!-- Data grid: Ventas realizadas  -->
                           <div id="datagrid_ventas_realizadas">
                                    <div class="header">
                                        <div class="factura">Factura</div>
                                        <div class="cliente">Cliente</div>
                                        <div class="forma_pago">Forma de pago</div>
                                        <div class="valor">Valor</div>
                                    </div>
                           </div>

                       </div>

                   </div>

                   <!-- Ventas realizadas   *** END *** -->

                </div>
            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->

        </section>
         <!-- END *** CONTENEDOR PRINCIPAL *** END -->


    </div>
    </body>
</html>
