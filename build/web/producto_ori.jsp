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
        <script language="JavaScript" type="text/javascript" src="js/producto/ctrlMarca.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto/ctrlFraccion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto/ctrlPresentacion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto/ctrlProducto.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/marca.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/presentacion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/fraccion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto/ctrlGrupo.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/grupo.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_medida.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_grupo.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_fraccion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/medida.js"></script>
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

               <!--  formulario: productos -->
                 <div class="frame isVisible" id="frmProducto">
                   <div class="box">
                     <div class="content_crud" id="crudProducto">
                               <div class="box">
                                 <!-- searcher -->
                                 <div class="content_search">
                                     <div class="searcher">
                                         <div class="fieldSearch">
                                             <input class="txtSearch" data-id_grupo="0" id="txtBuscador_producto" placeholder="..."></input>
                                         </div>
                                         <div class="label">Ingrese producto</div>
                                         <div class="list hidden" id="listProductos"></div>
                                     </div>
                                 </div>
                                 <!-- driver -->
                                 <div class="driver">
                                   <div style="margin:auto;max-width:max-content;">
                                          <!-- operations -->
                                           <div class="operations">
                                             <div class="add" id="addGrupo"></div>
                                             <div class="remove" id="removeGrupo"></div>
                                           </div>
                                          <!-- profile info -->
                                           <div class="profile_info">
                                             <div class="info">
                                               <div class="label">Productos</div>
                                               <div class="value" id="info_productos">10</div>
                                             </div>
                                             <div class="info">
                                               <div class="label">Gramo</div>
                                               <div class="value" id="info_vfacturas">SI</div>
                                             </div>
                                             <div class="info">
                                               <div class="label">Estado</div>
                                               <div class="value" id="info_estado"></div>
                                             </div>
                                           </div>
                                   </div>
                                 </div>
                                 <!-- setter -->
                                 <div class="setter" id="setterProducto">
                                      <div class="content_box" >
                                        <div class="box">
                                          <div class="head"><div class="label" id="msgOperationProducto">Nuevo producto</div></div>
                                            <div class="field">
                                                <div class="textbox"><input type="text" id="txtGrupo_producto" placeholder="Poliuretano"></div>
                                                <div class="label">Grupo</div>
                                                <div class="list hidden" id="listGrupos_productos"></div>
                                            </div>
                                            <div class="field">
                                                <div class="textbox"><input type="text" id="txtMarca_producto" placeholder="Caralz" data-id_marca="0"></div>
                                                <div class="label">Marca</div>
                                                <div class="list hidden" id="listMarcas"></div>
                                            </div>
                                            <div id="content_codigo"><div id="codigo_producto">CODIGO</div></div>
                                            <div id="content_descripcion">
                                                <div class="field">
                                                    <div class="textbox">
                                                      <input type="text" id="txtDescripcion_producto" placeholder="Esmalte...">
                                                    </div>
                                                    <div class="label">Descripcion</div>
                                                </div>
                                            </div>
                                            <div class="field" id="fieldGramo">
                                                <div class="checkbox"><input type="checkbox" id="chkGramo"  name="chkGramo"/>
                                                  <label for="chkGramo">Galon</label></div>
                                            </div>
                                            <div class="field" id="fieldGramo">
                                                <div class="checkbox"><input type="checkbox" id="chkGramo"  name="chkGramo"/>
                                                  <label for="chkGramo">1/4 Galon</label></div>
                                            </div>
                                            <!-- resultado de operación -->
                                           <!-- <div class="result">
                                                <div class="label" id="resultOperationGrupo"></div>
                                            </div> -->
                                            <!-- Botón almacenar  -->
                                            <div class="content_button">
                                              <div class="button" id="btnAlmacenar_producto">
                                                <div class="label">Ingresar</div>
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                 </div>
                         </div><!-- Box: Uno -->
                       </div>
                   </div>
                 </div>


                  <!--  formulario: grupos -->
                 <div class="frame" id="frmGrupo">
                                              <div class="box">
                                                <div class="content_crud" id="crudGrupo">
                                                          <div class="box">
                                                            <!-- searcher -->
                                                            <div class="content_search">
                                                                <div class="searcher">
                                                                    <div class="fieldSearch">
                                                                        <input class="txtSearch" data-id_grupo="0" id="txtBuscador_grupo" placeholder="..."></input>
                                                                    </div>
                                                                  <!--  <div class="label">Ingrese grupo</div> -->
                                                                    <div class="list hidden" id="listGrupos"></div>
                                                                </div>
                                                            </div>
                                                            <!-- driver -->
                                                            <div class="content_select">
                                                                <div class="label" id="selectGrupo" data-id_grupo="0">Selecciona un grupo</div>
                                                            </div>
                                                            <div class="driver">
                                                              <div style="margin:auto;max-width:max-content;">
                                                                     <!-- operations -->
                                                                      <div class="operations">
                                                                        <div class="add" id="addGrupo"></div>
                                                                        <div class="remove" id="removeGrupo"></div>
                                                                      </div>
                                                                     <!-- profile info -->
                                                                      <div class="profile_info">
                                                                        <div class="info">
                                                                          <div class="label">Productos</div>
                                                                          <div class="value" id="info_productos_grupo">10</div>
                                                                        </div>
                                                                        <div class="info">
                                                                          <div class="label">Estado</div>
                                                                          <div class="value" id="info_estado_grupo"></div>
                                                                        </div>
                                                                          <div class="info">
                                                                          <div class="label">Gramo</div>
                                                                          <div class="value" id="info_gramo_grupo"></div>
                                                                        </div>
                                                                      </div>
                                                              </div>
                                                            </div>
                                                            <!-- setter -->
                                                            <div class="setter" id="setterGrupo">
                                                                 <div class="content_box" >
                                                                   <div class="box">
                                                                     <div class="head"><div class="label" id="msgOperationGrupo">Nuevo grupo</div></div>
                                                                       <div class="field">
                                                                           <div class="textbox"><input type="text" id="txtGrupo" placeholder="Poliuretano"></div>
                                                                       </div>
                                                                       <div class="field" id="fieldGramo">
                                                                           <div class="checkbox">
                                                                             <input type="checkbox" id="chkGramo"  name="chkGramo"></input>
                                                                             <label for="chkGramo">Gramo</label></div>
                                                                       </div>
                                                                       <!-- resultado de operación -->
                                                                      <!-- <div class="result">
                                                                           <div class="label" id="resultOperationGrupo"></div>
                                                                       </div> -->
                                                                       <!-- Botón almacenar  -->
                                                                       <div class="content_button">
                                                                         <div class="button" id="btnAlmacenar_grupo">
                                                                           <div class="label">Ingresar</div>
                                                                         </div>
                                                                       </div>
                                                                   </div>
                                                                 </div>
                                                            </div>
                                                    </div><!-- Box: Uno -->

                                                    <div class="box">
                                                            <div class="content_select">
                                                                <div class="label" id="selectGrupo" data-id_grupo="0">Selecciona un grupo</div>
                                                            </div>
                                                            <!-- driver -->
                                                            <div class="driver">
                                                              <div style="margin:auto;max-width:max-content;">
                                                                     <!-- operations -->
                                                                      <div class="operations">
                                                                        <div class="add" id="addGrupo"></div>
                                                                        <div class="remove" id="removeGrupo"></div>
                                                                      </div>
                                                                     <!-- profile info -->
                                                                      <div class="profile_info">
                                                                        <div class="info">
                                                                          <div class="label">Productos</div>
                                                                          <div class="value" id="info_productos">10</div>
                                                                        </div>
                                                                        <div class="info">
                                                                          <div class="label">V. Grupo</div>
                                                                          <div class="value" id="info_vfacturas"></div>
                                                                        </div>
                                                                        <div class="info">
                                                                          <div class="label">Estado</div>
                                                                          <div class="value" id="info_estado"></div>
                                                                        </div>
                                                                      </div>
                                                              </div>
                                                            </div>
                                                            <div id="cleanPresentacion">
                                                                <div class="label">Selecciona un grupo</div>
                                                            </div>
                                                            <div id="crudPresentacion" class="content_crud hidden">
                                                                  <div class="setter" id="setterPresentacion">
                                                                    <div class="content_box">
                                                                         <div class="box">
                                                                           <div class="head">
                                                                             <div class="label" id="msgOperationPresentacion">Nueva presentación</div>
                                                                             <div id="btn_remove_presentacion"></div>
                                                                           </div>
                                                                             <div class="field">
                                                                                 <div class="textbox"><input type="text" id="txtPresentacion" data-id_presentacion="0" placeholder="Galon"></div>
                                                                             </div>
                                                                             <div class="result">
                                                                               <div class="label" id="resultOperationPresentacion"></div>
                                                                             </div>
                                                                             <!-- Botón almacenar  -->
                                                                             <div class="content_button">
                                                                               <div class="button" id="btnAlmacenar_presentacion">
                                                                                 <div class="label">Ingresar</div>
                                                                               </div>
                                                                             </div>
                                                                         </div>
                                                                       </div>
                                                                  </div><!-- setter presentacion -->

                                                                  <div id="listPresentacion">
                                                                        <div class="item">

                                                                            <div class="row">
                                                                                <div class="fraccion">
                                                                                  <div class="label">1/8 Galon</div>
                                                                                </div>
                                                                                <div class="proporcion">
                                                                                  <div class="label">0.125</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="fraccion">
                                                                                  <div class="label">1/16 Galon</div>
                                                                                </div>
                                                                                <div class="proporcion">
                                                                                  <div class="label">0.0625</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="item">
                                                                            <div class="">Galon</div>
                                                                            <div class="row">
                                                                                <div class="fraccion">
                                                                                  <div class="label">1/8 Galon</div>
                                                                                </div>
                                                                                <div class="proporcion">
                                                                                  <div class="label">0.125</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="fraccion">
                                                                                  <div class="label">1/16 Galon</div>
                                                                                </div>
                                                                                <div class="proporcion">
                                                                                  <div class="label">0.0625</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                      </div><!-- lista de presentaciones -->
                                                    </div><!-- Box: Dos -->


                                                </div>
                                      </div>


                            <!-- END *** Grupo de productos *** END -->
                            <!-- Forma fisica de  -->
                                <div id="forma_fisica" data-estado="0">
                                    <div class="label">Líquido</div>
                                </div>




                     </div>
                </div>
                 <!-- END ***  CONFIGURACIÓN  *** END -->


                 <hr>
                   <iframe src="producto/producto.jsp" style="border:none;"></iframe>

                </div>
            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->


        </section>
         <!-- END *** CONTENEDOR PRINCIPAL *** END -->

         </div>


    </body>
</html>
