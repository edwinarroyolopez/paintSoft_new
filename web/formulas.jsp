<%--
    Document   : formulas
    Created on : 31/01/2017, 10:02:15 PM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Fórmulas</title>

           <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/formulas.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/formulas/formulas.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/formulas/formula_buscador.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/formulas/maquinas.js"></script>
        <!-- Js -->
    </head>
    <body>

          <div id="universe">
        <!-- MENU NAVEGACION -->
            <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                <li><a class="formula" href="#"><span>Fórmulas</span></a></li>
                <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                <li><a class="formula" href="#"><span>Inventario</span></a></li>
                <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
             </ul>
            </section>
        <!-- END *** MENU NAVEGACION *** END -->

        <div class="container">
            <h2>Fórmulas</h2>


            <br>
            <div id="marco">
                <!-- Navegador  -->
                <div id="navegador">
                        <div class="align">
                            <div class="menu_item" id="mi_Formula" data-id="0">
                                        <div class="icon">+</div>
                                        <div class="label">Formula</div>
                                    </div>
                                    <div class="menu_item" id="mi_Homologar" data-id="1">
                                        <div class="icon">+</div>
                                        <div class="label">Homologar colores</div>
                                    </div>
                                    <div class="menu_item" id="mi_Maquina" data-id="2">
                                        <div class="icon">+</div>
                                        <div class="label">Máquina</div>
                                    </div>
                        </div>
                </div>
                <!-- Contenedor central -->
                <div id="central">
                    <div id="contenedor_nueva_formula"></div>

                    <!-- Configuración: Enlazado al item de navegación ** Fórmula ** -->
                    <div id="contenedor_configuracion">
                        <!-- Buscador fórmula -->
                        <div class="buscador" id="buscador_formula">

                            <div class="encabezado" id="encabezado_formula">
                                <div class="icon">+</div>
                                <div class="label">Fórmula</div>
                            </div>

                            <div class="campo" id="campo_formula">
                                <div class="caja">
                                    <input id="txtFormula" type="text" placeholder="...">
                                </div>
                                <div class="eliminar">
                                    <div id="btn_eliminar_formula"  class="hidden">
                                        <div class="label">Eliminar</div>
                                    </div>
                                </div>
                            </div>
                            <!-- Lista de fórmulas  -->
                            <div class="list" id="listFormula">
                                <div class="head">
                                    <div class="label">Fórmulas</div>
                                </div>
                                <!-- Filas  -->
                            </div>

                        </div>
                        <!-- Configuración de fórmula  -->
                        <div class="seteador" id="seteador_formula">
                            <div class="encabezado" id="encabezado_seteador">
                                <div class="label" id="selected_formula" data-area="0">Nueva formula</div>
                            </div>
                            <div id="content_Maquinas" class="hidden">

                                    <!-- Relación entre máquinas y fórmulas  -->
                                    <div id="relacion_maquina_formula" class="">
                                        <div class="list" id="listMaquina_de_Formula">
                                            <div class="encabezado">
                                                <div class="label">Máquinas</div>
                                            </div>
                                            <!-- Filas -->
                                        </div>
                                    </div>
                                    <!-- Agregar nuevas máquinas a la fórmula -->
                                    <div  id="agregar_maquinas_formula" class="">

                                             <div class="buscador" id="buscador_maquina">

                                                                <div class="encabezado" id="encabezado_maquina" data-area="0">
                                                                    <div class="icon">+</div>
                                                                    <div class="label">Máquina</div>
                                                                </div>



                                                                <div class="campo" id="campo_maquina">
                                                                    <div class="caja">
                                                                        <input id="txtMaquina" type="text" placeholder="...">
                                                                    </div>
                                                                    <div class="editar"></div>
                                                                </div>

                                                                <!-- Agregar nueva máquina al sistema -->
                                                                <div id="add_maquina_sistema" class="hidden">
                                                         <!--           <div class="label">Agregar maquina al sistema</div> -->
                                                                    <div id="estructura_maquina"  data-sector="0">
                                                                        <div class="estructura" id="marca_maquina">
                                                                            <div class="label">Marca</div>
                                                                            <div class="value" id=""></div>
                                                                        </div>
                                                                        <div class="estructura" id="modelo_maquina">
                                                                            <div class="label">Modelo</div>
                                                                            <div class="value" id=""></div>
                                                                        </div>
                                                                        <div class="estructura" id="descripcion_maquina">
                                                                            <div class="label">Descripción</div>
                                                                            <div class="value" id=""></div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="campo" id="campo_add_maquina">
                                                                        <div class="caja">
                                                                            <input id="txt_add_Maquina" type="text" placeholder="...">
                                                                        </div>
                                                                        <div class="editar"></div>
                                                                    </div>
                                                                    <div class="list listMarca" id="list_add_maquina">
                                                                            <div class="head">
                                                                                <div class="label" id="sector_maquina">Marcas</div>
                                                                            </div>
                                                                            <!-- Filas  -->
                                                                    </div>
                                                                </div>

                                                                <!-- Lista de máquinas  -->
                                                                <div class="list" id="listMaquina">
                                                                    <div class="head">
                                                                        <div class="label">Máquinas</div>
                                                                    </div>
                                                                    <!-- Filas  -->
                                                                    <div class="row" data-id="7878">
                                                                        <div class="value">Toyota fortuner 4400</div>
                                                                    </div>
                                                                    <div class="row" data-id="2121">
                                                                        <div class="value">Audi A5 Xtreme montain</div>
                                                                    </div>
                                                                </div>
                                                </div>
                                    </div>

                            </div> <!-- Content Maquinas -->



                            <div id="content_set_formula">
                                <div id='gramos' style="position: absolute;"></div>
                                <div id="fieldSetter">
                                    <div class="segmento" style="width: 180px;">
                                            <div class="field">
                                                <div class="label">Descripción</div>
                                                <div class="caja"><input type="text" id="txtDescripcion_formula"></div>
                                            </div>
                                            <div class="field">
                                                <div class="label">Color</div>
                                                <div class="caja"><input type="text" id="txtColor_formula"></div>
                                                <div id="listProducto" class="hidden"></div>
                                            </div>
                                            <div class="field">
                                                <div class="label">Gramos</div>
                                                <div class="caja"><input type="text" id="txtPeso"></div>
                                            </div>
                                    </div>
                                    <div class="segmento">
                                        <div id="btnIngresar_formula">
                                            <div class="label">Ingresar fórmula</div>
                                        </div>
                                    </div>


                                </div>

                            <!-- Combinación -->
                             <div id="combinacion">
                                <div class="color" id="C1">
                                    <div class="img">
                                        <div class="peso">0</div>
                                        <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C2">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C3">
                                    <div class="img">
                                        <div class="peso">0</div>
                                        <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                 <div class="color" id="C4">
                                    <div class="img">
                                        <div class="peso">0</div>
                                        <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                 <div class="color" id="C5">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C6">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C7">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C8">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C9">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                                <div class="color" id="C10">
                                    <div class="img">
                                         <div class="peso">0</div>
                                         <div class="pie">gr</div>
                                    </div>
                                    <div class="descripcion">Color</div>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>

            </div>





        </div>

        </div>


    </body>
</html>
