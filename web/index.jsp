
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>paintSoft</title>
            <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
            
            <link rel="stylesheet" href="css/controllers.css" title="Style"/>
            <link rel="stylesheet" href="css/generals.css" title="Style"/>

            <style type="text/css">

                i{
                    font: normal normal normal 18px/1 FontAwesome;
                    height: 128px;
                    width: 128px;
                }

                i:before {content: "\f0c2";}


            </style>
            <script type="text/javascript" >

                $(document).on('ready',function(){



                        $('div#left').on('click','div#btnLlenar',function(){


                            /* Setter: Parámetros */
                            var ingresos = document.getElementById('txtIngresos').value;
                            var egresos = document.getElementById('txtEgresos').value;

                            /* Limpiar campos */
                            document.getElementById('txtIngresos').value = '';
                            document.getElementById('txtEgresos').value = '';

                            $.post('ctrlproductogrupo',{Action:4,Ingresos:ingresos,Egresos:egresos},function(r){

                                alert(r);

                            });

                            document.getElementById('txtIngresos').focus();

                        });


                });

            </script>
            <style type="text/css">
                section#body{

                }

                section#body div.divisor{
                    border: 1px solid rgba(69,100,150,1);
                    border-radius: 3px;
                    display: inline-block;
                    height: 350px;
                    vertical-align: top;
                    width: 250px;
                }

                section#body div.divisor div.Encabezado{
                    background: rgba(180,200,100,1);
                    border-bottom: 1px solid rgba(80,100,120,1);
                    font-style: oblique;
                    height: 20px;
                    text-align: center;
                }
                section#body div.divisor div.field{
                    padding: 5px;
                }
                section#body div.divisor div.field div.label,
                section#body div.divisor div.field div.textbox{
                    display: inline-block;
                    vertical-align: top;
                    width: 80px;
                }
                section#body div.divisor div.field div.textbox input{
                    text-decoration: none;

                }
                section#body div.divisor div.field div.button{
                    background: rgba(87, 92, 198,1);
                    border-radius: 5px;
                    color: rgba(220,220,220,1);
                    cursor: pointer;
                    height: 30px;
                    margin: auto;
                    width: 100px;
                }

                section#body div.divisor div.field div.button:hover{

                }
                section#body div.divisor div.field div.button div.label{
                    text-align: center;
                    padding: 5px;
                }



            </style>
    </head>
    <body>

        <section id="body">
            <div class="divisor" id="left">
                <div class="Encabezado">Campos para almacenar en pdf!</div>

                                <div class="field">
                                    <div class="label">Ingresos</div>
                                    <div class="textbox"><input type="text" id="txtIngresos"></div>
                                </div>
                                <div class="field">
                                    <div class="label">Egresos</div>
                                    <div class="textbox"><input type="text" id="txtEgresos"></div>
                                </div>
                                <div class="field">
                                    <div class="button" id="btnLlenar"><div class="label">Llenar</div></div>
                                </div>

                              <input name="Enviar" type="submit" value="Enviar">

            </div>
            <div class="divisor" id="center">
                <i></i>


            </div>


        </section>


    </body>
</html>
