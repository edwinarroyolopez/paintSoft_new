
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Compra</title>
         <!-- Estilos -->
        <link rel="stylesheet" href="../css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="../css/generals.css" title="Style"/>
        <link rel="stylesheet" href="../css/menu.css" title="Style">
        <link rel="stylesheet" href="../css/standar.css" title="Style">
        <link rel="stylesheet" href="../css/compra.css" title="Style">
        <link rel="stylesheet" href="../css/compra_factura.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals."></script>
        <script language="JavaScript" type="text/javascript" src="js/compra.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/compra_facturas.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/compra_proveedor.js"></script>
        <!-- Js -->
    </head>
    <body>

      <!--  formulario: productos -->
        <div class="frame isVisible" id="frmEntrada">
          <div class="box">
            <div class="content_crud" id="crudEntrada">
                      <div class="box">
                        <!-- searcher -->
                        <div class="content_search">
                            <div class="searcher">
                                <div class="fieldSearch">
                                    <input class="txtSearch" data-id_grupo="0" id="txtBuscador_proveedor" placeholder="..."></input>
                                </div>
                                <div class="label">Seleccione un proveedor</div>
                                <div class="list hidden" id="listProveedores"></div>
                            </div>
                        </div>
                        <!-- driver -->
                        <div class="driver">
                          <div style="margin:auto;max-width:max-content;">
                                 <!-- profile info -->
                                  <div class="profile_info">
                                    <div class="info">
                                      <div class="label" id="lblinfo_nit">Nit</div>
                                      <div class="value" id="info_productos"></div>
                                    </div>
                                    <div class="info">
                                      <div class="label">Ciudad</div>
                                      <div class="value" id="info_estado"></div>
                                    </div>
                                    <div class="info" >
                                      <div class="label" id="lblinfo_telefono">Teléfono</div>
                                      <div class="value" id="info_vfacturas"></div>
                                    </div>
                                  </div>
                          </div>
                        </div><!-- ## dirver ## -->
                        <!-- setter -->
                        <div class="setter" id="setterFactura">
                             <div class="content_box" >
                               <div class="box">
                                 <div class="head"><div class="label" id="msgOperationProducto">Información de la factura</div></div>
                                   <div class="field">
                                       <div class="textbox"><input type="text" id="txtFactura" placeholder="0123FACT9876"></div>
                                       <div class="label">Número</div>
                                   </div>
                                   <div class="field">
                                       <div class="textbox"><input type="text" id="txtFecha" placeholder="10/10/2018" data-id_marca="0"></div>
                                       <div class="label">Fecha</div>
                                  </div>
                                  <div class="field">
                                      <div class="textbox"><input type="text" id="txtForma_pago" placeholder="Contado" data-id_marca="0"></div>
                                      <div class="label">Forma de pago</div>
                                 </div>
                                </div>
                                   <br><br>
                                   <!-- Botón almacenar  -->
                                   <%-- <div class="content_button">
                                     <div class="button" id="btnAlmacenar_producto">
                                       <div class="label">Ingresar</div>
                                     </div>
                                   </div> --%>
                               </div>
                             </div><!-- ## setter ## -->

                             <!-- searcher -->
                             <div class="content_search">
                                 <div class="searcher">
                                     <div class="fieldSearch">
                                         <input class="txtSearch" data-id_grupo="0" id="txtBuscador_producto" placeholder="..."></input>
                                     </div>
                                     <div class="label">Seleccione un producto</div>
                                     <div class="list hidden" id="listProveedores"></div>
                                 </div>
                             </div>
                             <!-- driver -->
                             <div class="driver">
                               <div style="margin:auto;max-width:max-content;">
                                      <!-- profile info -->
                                       <div id="listPresentaciones">
                                         <div class="presentacion">
                                           <div class="label" id="lblinfo_nit">Presentacion One</div>
                                           <div class="value" id="info_productos"></div>
                                         </div>
                                         <div class="presentacion">
                                           <div class="label">Presentacion Two</div>
                                           <div class="value" id="info_estado"></div>
                                         </div>
                                         <div class="presentacion" >
                                           <div class="label" id="lblinfo_telefono">Presentacion Three</div>
                                           <div class="value" id="info_vfacturas"></div>
                                         </div>
                                       </div>
                               </div>
                             </div><!-- ## dirver ## -->

                        </div>
                </div><!-- Box: Uno -->
              </div>
          </div>

          <!-- Formulario de productos -->

                 <!-- FORMULARIO DE REGISTRO DE FACTURA  -->

                 <div class="S1">
                 <div class="frame isVisible" id="frmIngresarCompra">
                     <div class="lienzo">


                               <!-- Sector: Producto -->
                               <div class="sector" id="sProducto">
                                   <div class="encabezado_sector">
                                          <div class="label">Producto</div>
                                          <div class="textbox"><input type="text" id="txtSearchProducto" placeholder="Buscar producto..."></div>
                                          <div class="info" id="info_producto_codigo"></div>
                                          <div class="info" id="info_producto_marca"></div>
                                          <div class="info" id="info_producto_grupo"></div>
                                          <div class="listProducto" id="listProducto" style="display: none;"></div>
                                   </div>
                                   <div class="fila_sector">
                                       <div class="cell_sector">
                                              <div class="field" id="fUnidadMedida">
                                                 <div class="label" style="width: 120px;">Unidad de medida</div>
                                                 <div class="textbox"><input type="text" id="txtUnidadMedida" placeholder="2 Galones"></div>
                                                 <div class="combobox" id="cbUnidadMedida"></div>
                                              </div>
                                              <!-- Interfaz para saber cuantas unidades fisicas tiene un producto
                                                   que no contiene unidades de medida -->
                                              <div class="field hidden" id="fDisponible" data-estado="0">
                                                 <div class="label" style="width: 120px;">Disponible</div>
                                                 <div class="textbox"><div class="label" id="stock_producto">0</div></div>
                                              </div>

                                              <div class="field" style="padding: 5px 0 0 20px;">
                                                 <div class="label">Precio unidad</div>
                                                 <div class="textbox"><input type="text" id="txtPrecioUnidad" placeholder="10.000"></div>
                                              </div>
                                              <div class="field">
                                                 <div class="label">Cantidad</div>
                                                 <div class="textbox"><input type="text" id="txtCantidad" placeholder="8"></div>
                                              </div>
                                              <div class="field" id="fIva">
                                                    <div class="label">Iva</div>
                                                    <div class="textbox"><input type="text" id="txtIva" placeholder="19%" value="19"></div>
                                                    <div id="Iva_incluido" data-estado="0">Incluido</div>
                                                </div>
                                              <div class="field"  style="padding: 5px 0 0 20px;">
                                                    <div class="label">Descuento</div>
                                                    <div class="textbox"><input type="text" id="txtDescuento" placeholder="10%" value="0"></div>
                                              </div>
                                              <div class="field">
                                                    <div class="label">Precio sugerido</div>
                                                    <div class="textbox"><div class="" id="precioSugerido"></div></div>
                                             </div>
                                       </div>
                                       <div id="precio_venta">
                                            <div class="field">
                                                   <div class="label">Precio de venta</div>
                                                   <div class="textbox"><input type="text" id="txtPrecioVenta" placeholder="10.000"></div>
                                                   <div class="label" style="padding: 5px 0 0 0;">Margen</div>
                                                   <div id="Margen_ganancia" class="textbox" style="text-align: center;"></div>
                                                </div>
                                       </div>
                                       <div id="fracciones">
                                           <div class="encabezado_fracciones">
                                               <div class="fraccion">Fracciones:</div>
                                               <div  id="fracciones_unidad_medida">seleccione</div>
                                           </div>
                                           <div class="fila_fracciones" style="text-align: center;">Seleccione unidad de medida</div>
                                       </div>

                                   </div>
                               </div>

                                      <div class="space">
                                           <div class="align">
                                               <div class="btnAlmacenar" id="btnAddItem">
                                                           <div class="label">Agregar Item</div>
                                                    </div>
                                              </div>
                                      </div>

                               <!-- Data grid -->
                               <div class="factura">
                                          <div class="datagrid" id="dtFacturaCompra">
                                              <div class="contenedor_button_eliminar">
                                                   <div id="btnEliminar_fila" class="hidden">
                                                        <div class="label">Eliminar</div>
                                                   </div>
                                              </div>

                                              <div class="encabezado">
                                                  <div class="codigo" >Código</div>
                                                  <div class="descripcion">Descripcion</div>
                                                  <div class="unidad">Unidad</div>
                                                  <div class="cantidad">Cantidad</div>
                                                  <div class="preciounidad">$ Unidad</div>
                                                  <div class="iva">Iva</div>
                                                  <div class="descuento">Descuento</div>
                                                  <div class="precio">Valor</div>
                                              </div>

                                           <!--   <div class="fila">
                                                  <div class="codigo">RGB4362</div>
                                                  <div class="descripcion"><div>Verde caribe</div></div>
                                                  <div class="unidad">1/8 Gl</div>
                                                  <div class="cantidad">12</div>
                                                  <div class="preciounidad"><div>20.000</div></div>
                                                  <div class="iva">12</div>
                                                  <div class="descuento">12</div>
                                                  <div class="precio"><div>240.000</div></div>
                                              </div> -->

                                          </div>
                                   <br>
                                          <!-- Sector: Resumen factura -->
                                     <div class="sector" id="sResumen_factura">
                                         <div class="encabezado_sector">Resumen de factura</div>
                                         <div class="fila_sector">
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
                                   <br>
                                     <!-- Sector: Pago de factura -->
                                     <div class="sector" id="sPago_factura">
                                         <div class="encabezado_sector">Pago de factura</div>
                                         <div id="fila_contado" class="fila_sector">
                                             <div class="field" id="comprobante_contado">
                                                 <div class="label">Comprobante de pago</div>
                                             </div>
                                         </div>
                                         <div id="fila_credito" class="fila_sector hidden">
                                             <div class="field">
                                                 <div class="label">Anticipo</div>
                                                 <div class="textbox"><input type="text" id="txtAnticipo" placeholder="seleccione"></div>
                                             </div>
                                             <div class="field">
                                                 <div class="label">Fecha</div>
                                                <div class="textbox"><input type="text" id="txtFechaAnticipo" placeholder="seleccione"></div>
                                             </div>
                                             <div class="field" id="comprobante_credito">
                                                 <div class="label">Comprobante de pago</div>
                                             </div>
                                         </div>
                                     </div>
                                     <!--  Sector - Ingresar facturas -->
                                      <div class="sector" id="sIngresar_factura">
                                         <div class="encabezado_sector">
                                             <div class="field" id="btnIngresar_factura">
                                                 <div class="label">Ingresar factura</div>
                                             </div>
                                         </div>
                                     </div>

                               </div>


                     </div>



                 </div>




                 <!-- Formulario de compra   -->




                 </div><!-- FIN S1 -->

                 <!-- END *** FORMULARIO DE REGISTRO DE FACTURA  *** END  -->


                 <!-- FORMULARIO BUSQUEDA DE FACTURAS  -->

                 <div class="frame" id="frmFacturas">

                     <div id="sector_frmFactura">
                                <!-- Buscador  -->
                                <div id="contenedor_buscador_facturas">
                                    <div id="subcontenedor_buscador_facturas">
                                        <!-- Button facturas pendientes -->
                                            <div id="btnFacturas_pendientes">
                                                <div class="label">Facturas pendientes</div>
                                            </div>
                                        <!-- Buscador de facturas de compra -->
                                        <div id="buscador_facturas">
                                            <div class="field">
                                                <div class="textbox">
                                                   <input type="text" id="txt_buscador_factura" placeholder="Ingrese el número de la factura o el proveedor">
                                                </div>
                                                <div id="listFacturas" class="hidden"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="marco_factura">
                                          <div id="contenido_factura">
                                                               <!-- Factura detalle -->
                                                               <div id="f_Proveedor">
                                                                       <!-- Encabezado proveedor  -->
                                                                       <div class="encabezado">
                                                                           <div id="proveedor_descripcion">Apple </div>
                                                                           <div id="proveedor_detalle">
                                                                               <div id="proveedor_documento">10101010</div>
                                                                               <div id="proveedor_saldo">$500.000</div>
                                                                           </div>
                                                                       </div>
                                                                       <!-- Facturas del proveedor -->
                                                                       <div id="facturas_proveedor"></div>
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
                                                                            <div class="content_head_item" id="content_proveedor_factura">
                                                                                <div class="label">Proveedor</div>
                                                                                <div class="value">Steve Jobs</div>
                                                                            </div>
                                                                    </div>
                                                                    <!-- Abonos! -->
                                                                    <div id="content_abonos_factura">
                                                                        <!--
                                                                        <div id="list_abono">
                                                                            <div id="btnImprime_historial">
                                                                                <div class="label">Imprime comprobante</div>
                                                                            </div>
                                                                        </div> -->

                                                                            <div id="set_abono">
                                                                                    <div class="content_set_abono">
                                                                                        <div class="row_abono">
                                                                                                <div class="field_abono">
                                                                                                    <div class="label">Valor de abono</div>
                                                                                                    <input type="text" id="txt_valor_abono">
                                                                                                </div>
                                                                                                <div class="field_abono field_persona">
                                                                                                    <div class="label">Receptor</div>
                                                                                                    <input type="text" id="txt_receptor_abono">
                                                                                                </div>
                                                                                        </div>
                                                                                        <div class="row_abono">
                                                                                                <div class="field_abono">
                                                                                                    <div class="label">Medio</div>
                                                                                                    <input type="text" id="txt_medio_abono">
                                                                                                </div>
                                                                                                <div class="field_abono field_persona">
                                                                                                    <div class="label">Responsable</div>
                                                                                                    <input type="text" id="txt_responsable_abono">
                                                                                                </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!-- Botones ;) -->
                                                                                    <div class="content_button_abono">
                                                                                        <div id="btn_scan_comprobante">
                                                                                            <div class="label">Scan comprobante</div>
                                                                                        </div>
                                                                                        <div id="btn_realizar_abono">
                                                                                            <div class="label">Realizar transaccion</div>
                                                                                        </div>
                                                                                    </div>

                                                                            </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        <div class="encabezado">
                                                            <div id="fatura_detalle">032017001</div>
                                                            <div class="descripcion_factura">
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
                                                            <div class="descripcion_proveedor">
                                                                <div id="fd_documento">54236589</div>
                                                                <div id="fd_proveedor">Steve Jobs</div>
                                                            </div>
                                                        </div>
                                                        <div id="contenido_detalle_factura">
                                                            <div id="accion_detalle_factura">
                                                                <div class="content_action">
                                                                   <!-- <div id="btnAdd_producto_factura" class="">
                                                                        <div class="label">add Producto</div>
                                                                    </div> -->
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
                                                   </div>
                                </div>


                                  </div><!-- sector contenedor de facturas -->
                 </div>

                 <!-- END *** FORMULARIO BUSQUEDA DE FACTURAS  *** END -->



    </body>
</html>
