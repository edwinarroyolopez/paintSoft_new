                <!DOCTYPE html>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" href="../css/controllers.css" title="Style">
                <link rel="stylesheet" href="../css/generals.css" title="Style">
                <link rel="stylesheet" href="../css/menu.css" title="Style">
                <link rel="stylesheet" href="../css/standar.css" title="Style">
                <link rel="stylesheet" href="../css/producto.css" title="Style">

                  <!-- Js -->
                 <script language="JavaScript" type="text/javascript" src="../js/jquery-1.9.1.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/generals.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlFraccion.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlPresentacion.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/presentacion.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/fraccion.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/producto/ctrlGrupo.js"></script>
                 <script language="JavaScript" type="text/javascript" src="../js/producto/grupo.js"></script>

                  <!--  formulario: grupos -->
                 <div class="frame isVisible" id="frmGrupo">
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
