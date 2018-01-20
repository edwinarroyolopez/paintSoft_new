<%--
    Document   : cliente
    Created on : 08-jul-2016, 4:04:36
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cliente</title>
        <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style"/>
        <link rel="stylesheet" href="css/standar.css" title="Style"/>
        <link rel="stylesheet" href="css/cliente.css" title="Style"/>
        <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/cliente/ctrlCliente.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/cliente.js"></script>
        <!-- Js -->
    </head>
    <body>

        <div id="universe" spellcheck="false">
                <!-- Menú -->
               <section id="left">
                    <ul id="navigationMenu">
                       <li> <a class="client" href="#"><span>Clientes</span></a></li>
                       <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                       <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                       <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                       <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                       <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                       <li><a class="sale" href="gastos.jsp"><span>Gastos</span></a></li>
                       <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
                       <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                   </ul>
               </section>

                  <!-- Contenedor central -->
               <section id="center">
                   <div class="title">
                       <div class="label">Clientes</div>
                   </div>
                   <br>
                   
                   
                   <a id="descargar_clientes" class="hidden">Descargar clientes</a>
                   
                         
                   <div class="container">
                       <div class="tabMenu">
                           <div class="tab isSelect" id="tabRegistro">Registrar</div>
                           <div class="tab" id="tabHistorial">Historial</div>
                       </div>
                       <div class="frame isVisible" id="frmRegistro">


                           <div class="box">
                                     <div class="content_crud" id="crudCliente">
                                         <!-- searcher -->
                                         <div class="content_search">
                                             <div class="searcher">
                                                 <div class="fieldSearch">
                                                     <input class="txtSearch" data-id_cliente="0" id="txtBuscador_cliente" placeholder="..."></input>
                                                 </div>
                                                 <div class="label">Ingrese cliente</div>
                                                 <div class="list hidden" id="listClientes"></div>
                                             </div>
                                         </div>
                                         <!-- driver -->
                                         <div class="driver">
                                           <div style="margin:auto;max-width:max-content;">
                                                <!-- operations -->
                                                 <div class="operations">
                                                   <div class="add" id="addCliente"></div>
                                                   <div class="remove" id="removeCliente"></div>
                                                 </div>
                                                 <!-- profile info -->
                                                 <div class="profile_info">
                                                   <div class="info">
                                                     <div class="label">Ingreso</div>
                                                     <div class="value" id="info_fecha_ingreso"></div>
                                                   </div>
                                                   <div class="info">
                                                     <div class="label">Facturas</div>
                                                     <div class="value" id="info_facturas"></div>
                                                   </div>
                                                   <div class="info">
                                                     <div class="label">V. Facturas</div>
                                                     <div class="value" id="info_vfacturas"></div>
                                                   </div>
                                                   <div class="info">
                                                     <div class="label">Deuda</div>
                                                     <div class="value" id="info_deuda"></div>
                                                   </div>
                                                   <div class="info">
                                                     <div class="label">Estado</div>
                                                     <div class="value" id="info_estado"></div>
                                                   </div>
                                                 </div>
                                               </div>
                                         </div>
                                         <!-- setter -->
                                         <div class="setter" id="setterCliente">
                                              <div class="head"><div class="label" id="msgOperationCliente">Nuevo cliente</div></div>
                                              <div class="content_box" >
                                                <div class="box">
                                                  <div class="field">
                                                      <div class="label"><label for="txtDocumento">Documento</label></div>
                                                      <div class="textbox"><input type="text" id="txtDocumento" placeholder="1038115788"></div>
                                                  </div>
                                                    <div class="field">
                                                        <div class="label"><label for="txtNombre">Nombre</label></div>
                                                        <div class="textbox"><input type="text" id="txtNombre"  placeholder="Albert Einstein"></div>
                                                    </div>
                                                     <div class="field">
                                                        <div class="label"><label for="txtTelefono">Teléfono</label></div>
                                                        <div class="textbox"><input type="text" id="txtTelefono" placeholder="3017752393"></div>
                                                    </div>
                                                </div>
                                                <div class="box">
                                                    <div class="field">
                                                        <div class="label"><label for="txtDireccion">Dirección</label></div>
                                                        <div class="textbox"><input type="text" id="txtDireccion" placeholder="Cll 8 # 1G - 12"></div>
                                                    </div>
                                                    <div class="field">
                                                        <div class="label"><label for="txtCiudad">Ciudad</label></div>
                                                        <div class="textbox"><input type="text" id="txtCiudad" placeholder="Caucasia"></div>
                                                    </div>
                                                    <div class="field">
                                                        <div class="label"><label for="txtEmail">Email</label></div>
                                                        <div class="textbox"><input type="text" id="txtEmail" placeholder="zeroed@gmail.com"></div>
                                                    </div>
                                                </div>
                                              </div>
                                              <!-- resultado de operación -->
                                              <div class="result">
                                                  <div class="label" id="resultOperationCliente"></div>
                                              </div>
                                              <!-- Botón almacenar  -->
                                              <div class="content_button">
                                                <div class="button" id="btnAlmacenar">
                                                  <div class="label">Ingresar</div>
                                                </div>
                                              </div>
                                         </div>
                                     </div>
                           </div>

                       </div>
                       <!-- Buscar  -->
                       <div class="frame" id="frmHistorial">

                           <h4>Historial!</h4>

                       </div>
               </section>

        </div><!-- Universe -->


    </body>
</html>
