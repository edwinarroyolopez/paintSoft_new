        <!-- Estilos -->
        <link rel="stylesheet" href="../css/controllers.css" title="Style">
        <link rel="stylesheet" href="../css/generals.css" title="Style">
        <link rel="stylesheet" href="../css/menu.css" title="Style">
        <link rel="stylesheet" href="../css/standar.css" title="Style">
        <link rel="stylesheet" href="../css/producto.css" title="Style">
          <!-- Js -->
         <script language="JavaScript" type="text/javascript" src="../js/jquery-1.9.1.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/generals.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlMarca.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlPresentacion.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlProducto.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlGrupo.js"></script>
         <script language="JavaScript" type="text/javascript" src="../js/producto/producto.js"></script>

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
                                             <div class="add" id="addProducto"></div>
                                             <div class="remove" id="removeProducto"></div>
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
                                                <div class="textbox"><input type="text" id="txtGrupo" placeholder="Poliuretano"></div>
                                                <div class="label">Grupo</div>
                                                <div class="list hidden" id="listGrupos"></div>
                                            </div>
                                            <div class="field">
                                                <div class="textbox"><input type="text" id="txtMarca" placeholder="Caralz" data-id_marca="0"></div>
                                                <div class="label">Marca</div>
                                                <div class="list hidden" id="listMarcas">

                                                    <div class="content_add"><!-- Agregar marcas -->
                                                           <div class="button_add" id="bnt_add_marca">
                                                              <div class="label">+</div>
                                                            </div>
                                                            <div class="hidden" id="setter_marca">
                                                                <div class="head">
                                                                    <div class="label">Nueva marca</div>
                                                                </div>
                                                                <div class="field_add" id="field_marca">
                                                                    <div class="textbox">
                                                                      <input type="text" placeholder="..." id="txtEdit_marca" data-id_marca="0">
                                                                    </div>
                                                                  </div>
                                                                  <div class="button_add" id="btn_almacenar_marca">
                                                                    <div class="label">almacenar</div>
                                                                  </div>
                                                            </div>
                                                      </div><!--## Agregar marcas ## -->
                                                  </div><!-- ##  List marcas ## -->
                                                </div>
                                            </div>
                                            <div id="content_codigo"><div id="codigo_producto">CODIGO</div></div>
                                            <div id="content_descripcion">
                                                <div class="field">
                                                    <div class="textbox">
                                                      <input type="text" id="txtDescripcion_producto" data-id_producto="0" placeholder="Esmalte...">
                                                    </div>
                                                    <div class="label">Descripcion</div>
                                                </div>
                                            </div>
                                            <div id="content_presentaciones"></div>
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
