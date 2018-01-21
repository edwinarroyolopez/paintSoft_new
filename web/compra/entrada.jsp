
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
        <script language="JavaScript" type="text/javascript" src="../js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="../js/generals.js"></script>
        <script language="JavaScript" type="text/javascript" src="../js/proveedor/ctrlProveedor.js"></script>
        <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlProducto.js"></script>
        <script language="JavaScript" type="text/javascript" src="../js/proveedor/entrada.js"></script>
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
                                <div class="label" id='info_proveedor'>Seleccione un proveedor</div>
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
                                      <div class="value" id="info_nit"></div>
                                    </div>
                                    <div class="info">
                                      <div class="label">Ciudad</div>
                                      <div class="value" id="info_ciudad"></div>
                                    </div>
                                    <div class="info" >
                                      <div class="label" id="lblinfo_telefono">Teléfono</div>
                                      <div class="value" id="info_telefono"></div>
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
                                     <div class="label" id="info_producto">Seleccione un producto</div>
                                     <div class="list hidden" id="listProductos"></div>
                                 </div>
                             </div>
                             <!-- presentaciones -->
                             <div class="content_presentaciones" id="content_presentaciones">
                                  <div class="presentacion">
                                     <span class="text">Presentacion One</span>
                                   </div>
                                   <div class="presentacion">
                                     <span class="text">Presentacion Two</span>
                                     <span class="x"></span>
                                   </div>
                                   <div class="presentacion">
                                     <span class="text">Presentacion Three</span>
                                   </div>
                                   <div class="presentacion">
                                     <span class="text">Presentacion Four</span>
                                   </div>
                                   <div class="presentacion">
                                     <span class="text">Presentacion Five</span>
                                   </div>
                              </div><!-- presentaciones -->
                              <br>
                              <div class="content_values">
                                <div class="row">
                                    <div class="field field_cantidad">
                                      <div class="cantidad">
                                        <label for="txtCantidad">Cantidad</label>
                                        <div class="textbox">
                                          <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                        </div>
                                      </div>
                                      <div class="control">
                                          <div class="incrementa">
                                            <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="ui-icon">
                                            	<g fill="#000" fill-rule="evenodd">
                                            		<path d="M8.646 7.354l4 4 .354.353.707-.707-.353-.354-4-4L9 6.293 8.293 7z"></path>
                                            		<path d="M5.354 11.354l4-4L9.707 7 9 6.293l-.354.353-4 4-.353.354.707.707z"></path>
                                            	</g>
                                            </svg>
                                          </div>
                                          <div class="decrementa">
                                            <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="ui-icon">
                                            	<g fill="#000" fill-rule="evenodd">
                                            		<path d="M4.646 7.354l4 4 .354.353.707-.707-.353-.354-4-4L5 6.293 4.293 7z"></path>
                                            		<path d="M9.354 11.354l4-4L13.707 7 13 6.293l-.354.353-4 4-.353.354.707.707z"></path>
                                            	</g>
                                            </svg>
                                          </div>
                                      </div>
                                    </div><!-- Cantidad -->
                                    <div class="field">
                                      <label for="txtCantidad">Precio unidad</label>
                                      <div class="textbox">
                                        <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                      </div>
                                    </div>
                                    <div class="field">
                                      <label for="txtCantidad">Precio venta</label>
                                      <div class="textbox">
                                        <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                      </div>
                                    </div>
                                </div><!-- row 1 -->
                                <div class="row">
                                    <div class="field">
                                      <label for="txtCantidad">Descuento</label>
                                      <div class="textbox">
                                        <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                      </div>
                                    </div>
                                    <div class="field">
                                      <label for="txtCantidad">Precio sugerido</label>
                                      <div class="textbox">
                                        <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                      </div>
                                    </div>
                                    <div class="field">
                                      <label for="txtCantidad">Margen de ganancia</label>
                                      <div class="textbox">
                                        <input type="text" name="txtCantidad" value="1" id="txtCantidad">
                                      </div>
                                    </div>
                                </div><!-- row 2 -->
                                <br>
                                <div class="content_button">
                                    <div class="button">
                                        <label for="">bajar</label>
                                    </div>
                                </div>
                              </div><!-- ## content values ## -->
                              <br>
                              <div class="content_data">
                                <div class="datagrid">
                                    <div class="encabezado">
                                      <div class="cell descripcion">Descripcion</div>
                                      <div class="cell presentacion">Presentación</div>
                                      <div class="cell cantidad">Cantidad</div>
                                      <div class="cell precio_unidad">Precio unidad</div>
                                    </div>
                                </div>
                              </div><!-- ## content data ## -->

                </div><!-- Box: Uno -->
              </div>
          </div>




    </body>
</html>
