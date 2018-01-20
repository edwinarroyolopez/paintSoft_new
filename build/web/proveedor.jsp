<%--
    Document   : proveedor
    Created on : 24-jul-2016, 15:08:24
    Author     : Zero
--%>

<%@page import = "model.vo.ProveedorVO"
        import = "model.dao.ProveedorDAO"
        import = "java.util.LinkedList"
       %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Proveedor</title>
         <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/proveedor.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/proveedor.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/proveedor/ctrlProveedor.js"></script>

        <!-- Js -->
    </head>
    <body>

        <div id="universe" spellcheck="false">

          <!-- Menú -->
        <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="#"><span>Proveedores</span></a></li>
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
                <div class="label">Proveedores</div>
            </div>
             <br>

                 <a id="descargar_proveedores" class="hidden">Descargar proveedores</a>

             <div class="container">
                 <div class="tabMenu">
                   <div class="tab isSelect" id="tabRegistro">Registrar</div>
                   <div class="tab" id="tabHistorial">Historial</div>
                </div>
                <!-- formulario -->
                 <div class="frame isVisible" id="frmRegistro">

                    <div class="box">
                      <div class="content_crud" id="crudProveedor">
                          <!-- searcher -->
                          <div class="content_search">
                              <div class="searcher">
                                  <div class="fieldSearch">
                                      <input class="txtSearch" data-id_proveedor="0" id="txtBuscador_proveedor" placeholder="..."></input>
                                  </div>
                                  <div class="label">Ingrese proveedor</div>
                                  <div class="list hidden" id="listProveedores"></div>
                              </div>
                          </div>
                          <!-- driver -->
                          <div class="driver">
                            <div style="margin:auto;max-width:max-content;">
                                 <!-- operations -->
                                  <div class="operations">
                                    <div class="add" id="addProveedor"></div>
                                    <div class="remove" id="removeProveedor"></div>
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
                          <div class="setter" id="setterProveedor">
                               <div class="head"><div class="label" id="msgOperationProveedor">Nuevo proveedor</div></div>
                               <div class="content_box" >
                                 <div class="box">
                                       <div class="field">
                                           <div class="label"><label for="txtNit">Nit</label></div>
                                           <div class="textbox"><input type="text" id="txtNit" placeholder="1038115788-1"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtRazon_social">Razón social</label></div>
                                           <div class="textbox"><input type="text" id="txtRazon_social" placeholder="Microsoft corp"></div>
                                       </div>
                                        <div class="field">
                                           <div class="label"><label for="txtContacto">Contacto</label></div>
                                           <div class="textbox"><input type="text" id="txtContacto" placeholder="Steven Spielberg"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtCiudad">Ciudad</label></div>
                                           <div class="textbox"><input type="text" id="txtCiudad" placeholder="Caucasia"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtDireccion">Dirección</label></div>
                                           <div class="textbox"><input type="text" id="txtDireccion" placeholder="Cll 8 # 1G - 12"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtTelefono_1">Teléfono 1</label></div>
                                           <div class="textbox"><input type="text" id="txtTelefono_1" placeholder="3017752393"></div>
                                       </div>
                                 </div>
                                 <div class="box">
                                       <div class="field">
                                           <div class="label"><label for="txtTelefono_2">Teléfono 2</label></div>
                                           <div class="textbox"><input type="text" id="txtTelefono_2" placeholder="8381753"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtEmail">Email</label></div>
                                           <div class="textbox"><input type="text" id="txtEmail" placeholder="zeroed@gmail.com"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtBanco">Banco</label></div>
                                           <div class="textbox"><input type="text" id="txtBanco" placeholder="Bancolombia"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtTipo_cuenta">Tipo de cuenta</label></div>
                                           <div class="textbox"><input type="text" id="txtTipo_cuenta" placeholder="Ahorros"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtNumero_cuenta">Numero de cuenta</label></div>
                                           <div class="textbox"><input type="text" id="txtNumero_cuenta" placeholder="37157383001"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtTitular_cuenta">Titular de cuenta</label></div>
                                           <div class="textbox"><input type="text" id="txtTitular_cuenta" placeholder="Steve Jobs"></div>
                                       </div>
                                 </div>
                               </div>
                               <!-- resultado de operación -->
                               <div class="result">
                                   <div class="label" id="resultOperationProveedor"></div>
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

                 <div class="frame" id="frmHistorial">
                    <h3>Historial!</h3>
                 </div>

             </div>
         </section>

        </div>

    </body>
</html>
