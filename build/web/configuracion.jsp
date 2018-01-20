<%--
    Document   : configuracion
    Created on : 24/01/2017, 08:47:01 PM
    Author     : Zero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Configuracion</title>
           <!-- Estilos -->
        <link rel="stylesheet" href="css/controllers.css" title="Style"/>
        <link rel="stylesheet" href="css/generals.css" title="Style"/>
        <link rel="stylesheet" href="css/configuracion.css" title="Style">
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/generals."></script>
        <script language="JavaScript" type="text/javascript" src="js/configuracion.js"></script>
    </head>
    <body>


        <section id="container">
            <!-- Titulo -->
            <div id="titulo">
                <div class="label">Configuración de datos</div>
            </div>
            <!-- Menú -->
            <div class="menu">
                <div class="mItem" id="mImportar">
                    <div class="label">Importar</div>
                </div>
                <div class="mItem" id="mExportar">
                    <div class="label">Exportar</div>
                </div>
            </div>
            <!--   -->
            <section id="center">
                <div class="left">
                    <div id="search_table">
                        <div class="textbox"><input type="text" id="txtTable" placeholder="selecciona tabla"></div>
                    </div>
                    <div class="encabezado"><div class="label">Tablas</div></div>
                    <div id="dataTable">
                        <!-- Items: tablas -->

                    </div>
                </div>
                <div class="right">
                    <div id="seleccion">
                        <div id="tabla_seleccionada">Seleccione tabla</div>
                        <div id="data"></div>
                    </div>

                </div>
            </section>



        </section>



    </body>
</html>
