function create_formula(){



}
function read_formula(start,control,section){

      /* Read  formulas */
                   $.post('ctrlformula',{A:4,Control:control},function(json_formulas){

                            /* Parse from string to json */
                                json_formulas = JSON.parse(json_formulas);

                                console.log("Section: "+section +" Control: "+control + " Start: "+start);

                                  switch (section) {
                                          case 0:/* Formula manager */
                                                    create_list_formulas(start,json_formulas);
                                            break;
                                          case 1:/* Sales */
                                                    create_list_formulas(start,json_formulas);
                                              break;
                                          case 2:
                                                break;
                                  }/* switch */
                   });/* post  */

}
function update_formula(){}
function delete_formula(){}


/* create components with js */
        function create_list_formulas(start,json_formulas){

                    for(i=start; i<json_formulas.length; i++){
                                        /* Aquí debo crear los objetos: list */
                                      var row = document.createElement('div');
                                            row.setAttribute('class','row');
                                            row.setAttribute('data-id',json_formulas[i].Id);
                                            row.onclick =  function() {select_row_list_formula(this)};
                                            /* Value */
                                      var value = document.createElement('div');
                                            value.setAttribute('class','value');
                                            value.innerHTML = json_formulas[i].Descripcion;
                                            /* Only 10 visible  */
                                              if(i>=10){
                                                 row.setAttribute('class','row hidden');
                                               }
                                            row.appendChild(value);
                                            document.getElementById('listFormula').appendChild(row);
                                 }/* for */
        }
        function select_row_list_formula(row){


                            /* get values from row data */
                                var id_formula= row.getAttribute('data-id');
                                var formula= row.textContent;

                            /* Search formula colors */
                                      $.post('ctrlformula',{A:8,Id_formula:id_formula},function(json_colors){

                                                      json_colors = $.parseJSON($.trim(json_colors));

                                                      /* Clear listColores */
                                                          $('div#listColores div.row').remove();
                                                        /* set values formula */
                                                            document.getElementById('listColores').setAttribute('data-formula',formula);
                                                            document.getElementById('listColores').setAttribute('data-id_formula',id_formula);

                                                            create_list_colors(json_colors);
                                            });/* post: ctrlformula  */
        }/*  select_row_list_formula  */

        function create_list_colors(json_colors){

                          var precio = 0;

                              for(i=0; i< json_colors.length;i++){
                                      /* Peso gramo */
                                          var row = document.createElement('div');
                                               row.setAttribute('class','row');
                                               row.setAttribute('data-id',json_colors[i].Id_color);
                                               row.setAttribute('data-precio_gramo',json_colors[i].Precio_gramo);
                                               row.setAttribute('data-peso',json_colors[i].Peso);
                                              /* Otros */
                                              row.setAttribute('data-id_producto',json_colors[i].Id_producto);
                                              row.setAttribute('data-peso_medida',json_colors[i].Peso_medida);
                                              row.setAttribute('data-id_um_inventario',json_colors[i].Id_um_inventario);
                                              row.setAttribute('data-cantidad_inventario',json_colors[i].Inventario);
                                              row.setAttribute('data-cantidad_um_inventario',json_colors[i].Cantidad_um_inventario);
                                              row.setAttribute('data-cantidad_empezado',json_colors[i].Empezado);
                                              row.setAttribute('data-id_um_empezado',json_colors[i].Id_um_empezado);
                                              row.setAttribute('data-cantidad_um_empezado',json_colors[i].Cantidad_um_empezado);

                                              /* Validar existencias en inventario --- Empezados */
                                              var inventario = parseInt(json_colors[i].Inventario);
                                              var empezado = parseInt(json_colors[i].Empezado);

                                              /* control de cantidad ---> Quizá los gramos empezados no son suficientes */
                                              if(inventario===0 && empezado===0){
                                                  row.setAttribute('class','row empty');
                                              }else{
                                                      var peso_salida = parseInt(json_colors[i].Peso);

                                                         /* Tabla de salida: Tabla de la que se descuenta */
                                                      if(empezado>peso_salida){/* Es suficiente con el valor empezado? */

                                                                  var restante_empezado = empezado - peso_salida;

                                                                  row.setAttribute('data-tabla_salida',1); /* Tabla empezado */
                                                                  row.setAttribute('data-salida_empezada',peso_salida);
                                                                  row.setAttribute('data-restante_empezada',restante_empezado);
                                                                  row.setAttribute('data-salida_entera',0);
                                                                  row.setAttribute('data-restante_entera',0);

                                                      }else{

                                                          if(inventario>0){/* Cálculos para saber cuanto queda al restar */

                                                                var peso_medida = parseInt(json_colors[i].Peso_medida);
                                                                /* Recoge el peso en las unidades selladas y
                                                                  las unidades empezadas */
                                                                var peso_total = peso_medida*inventario + empezado;

                                                                if(peso_total>peso_salida){/* Hay suficiente para la fórmula */

                                                                          /* Cómo saber cuantas unidades selladas descontar*/

                                                                          var diferencia = peso_total - peso_salida;
                                                                          /* Peso que tiene la unidad que quedará empezada */
                                                                          var restante_empezado = diferencia%peso_medida;
                                                                          /* Unidades enteras resultantes  */
                                                                          var restante_entero = parseInt(diferencia/peso_medida);
                                                                          /* Unidades que se gastaron en la fórmula */
                                                                          var unidades_gastadas = inventario - restante_entero;

                                                                          row.setAttribute('data-tabla_salida',2);
                                                                          row.setAttribute('data-salida_entera',unidades_gastadas);
                                                                          row.setAttribute('data-salida_empezada',peso_salida);
                                                                          row.setAttribute('data-restante_entera',restante_entero);
                                                                          row.setAttribute('data-restante_empezada',restante_empezado);

                                                                  }else{/* No hay en inventario */
                                                                      row.setAttribute('class','row empty');
                                                                  }

                                                                  row.setAttribute('data-tabla_salida',2);/* Tabla inventario */
                                                          }else{
                                                              row.setAttribute('class','row empty');
                                                          }
                                              }
                                }

                                          var color = document.createElement('div');
                                              color.setAttribute('class','color');
                                              color.innerHTML = json_colors[i].Descripcion;

                                          var peso = document.createElement('div');
                                              peso.setAttribute('class','peso');
                                              peso.innerHTML = json_colors[i].Peso;

                                              row.appendChild(color);
                                              row.appendChild(peso);
                                              document.getElementById('listColores').appendChild(row);
                                              /* Recalcula precio */
                                              precio = precio + parseInt(json_colors[i].Precio_gramo)*parseInt(json_colors[i].Peso);

                      }/* Fin --->  for */

                          /* Aplicar modulo 100 a precio */
                             if(precio>0){
                                  precio = parseInt(precio);
                                  var mod = 100 - precio%100;
                                  precio = precio + mod;
                              }
                         document.getElementById('txtPrecio_formula').value = precio;
                         document.getElementById('txtMedida_formula').value = '1/64 Gln';

        }

        function create_list_colors_fast_formula(){
                        /* Control rows visibles  */
                        var k = 0;

                        for(i = 0; i < Json_Productos.length; i++){

                                    var grupo = Json_Productos[i].Grupo;

                                    if( grupo==='Poliuretano' || grupo==='Bicapa' ){
                                                k = k +1;

                                                var row = document.createElement('div');
                                                     row.setAttribute('class','row');
                                                     row.setAttribute('data-id_producto',Json_Productos[i].Id);
                                                     row.setAttribute('data-id_grupo',Json_Productos[i].Id_grupo);
                                                     row.onclick =  function() {select_row_color_fast_formula(this)};

                                                     if(k>7){
                                                        row.setAttribute('class','row hidden');
                                                     }

                                                var description = document.createElement('div');
                                                     description.innerHTML = Json_Productos[i].Descripcion;
                                                     /* add children */
                                                     row.appendChild(description);
                                                     document.getElementById('listColors_fast_formula').appendChild(row);
                                                    /*
                                                        {"Id":13,"Id_grupo":1009,"Id_marca":1009,"Codigo":"MASPOL01",
                                                        "Descripcion":"Masilla Premium","Grupo":"Masillas","Marca":"Poliescol","Id_medida":18}
                                                    */
                                    }/* Poliuretano - Bicapa */
                        }/* for json productos */
        }


        function select_row_color_fast_formula(row){

                      var id_producto = row.getAttribute('data-id_producto');
                      var id_grupo = row.getAttribute('data-id_grupo');
                      var descripcion = row.children[0].textContent;

                      document.getElementById('txt_color_formula').setAttribute('data-id_producto',id_producto);
                      document.getElementById('txt_color_formula').setAttribute('data-id_grupo',id_grupo);
                      document.getElementById('txt_color_formula').value = descripcion;
                      /* Change focus */
                      document.getElementById('txt_weight_formula').focus();
                      document.getElementById('txt_weight_formula').value = '';

                      /* Read others importants datas */
                                $.post('ctrlformula',{A:11,Id_producto:id_producto},function(json_info_color){

                                                      /* get info of selected product */
                                                      json_info_color = $.parseJSON($.trim(json_info_color));

                                                      var id_unidad_medida = json_info_color.Id_unidad_medida;
                                                      var peso_medida = json_info_color.Peso_medida;
                                                      var precio_gramo = json_info_color.Precio_gramo;
                                                      var id_inventario = json_info_color.Id_inventario;
                                                      var id_um_inventario = json_info_color.Id_um_inventario;
                                                      var cantidad_um_inventario = json_info_color.Cantidad_um_inventario;
                                                      var id_empezado = json_info_color.Id_empezado;
                                                      var id_um_empezado = json_info_color.Id_um_empezado;
                                                      var cantidad_empezado = json_info_color.Cantidad_empezado;

                                                        /* Validate  */
                                                          if(id_inventario===0 &&  id_empezado===0){
                                                            /* No hay existencias:  No existe en tabla peso - No existe en tabla empezado */
                                                                      document.getElementById('message_fast_formula').classList.remove("hidden");
                                                                      document.getElementById('message_fast_formula').setAttribute('data-state',1);
                                                          }else{
                                                                      /* set info color */
                                                                      document.getElementById('txt_color_formula').setAttribute('data-id_unidad_medida',id_unidad_medida);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-peso_medida',peso_medida);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-precio_gramo',precio_gramo);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-id_inventario',id_inventario);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-id_um_inventario',id_um_inventario);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-cantidad_um_inventario',cantidad_um_inventario);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-id_empezado',id_empezado);
                                                                      document.getElementById('txt_color_formula').setAttribute('data-cantidad_empezado',cantidad_empezado);
                                                          }/* If validate */


                                      });/* post: ctrlformula  */

        }
        function create_row_color_listcolores(){

                                                          var formula_descripcion = document.getElementById('txt_description_formula').value;
                                                          /* Color */
                                                          var color_descripcion = document.getElementById('txt_color_formula').value;
                                                          var id_producto = document.getElementById('txt_color_formula').getAttribute('data-id_producto');
                                                          var id_grupo = document.getElementById('txt_color_formula').getAttribute('data-id_grupo');
                                                          var id_unidad_medida = parseInt(document.getElementById('txt_color_formula').getAttribute('data-id_unidad_medida'));
                                                          var id_inventario = parseInt(document.getElementById('txt_color_formula').getAttribute('data-id_inventario'));
                                                          var precio_gramo = parseInt(document.getElementById('txt_color_formula').getAttribute('data-precio_gramo'));
                                                          var cantidad_um_inventario = parseInt(document.getElementById('txt_color_formula').getAttribute('data-cantidad_um_inventario'));
                                                          var cantidad_empezado = parseInt(document.getElementById('txt_color_formula').getAttribute('data-cantidad_empezado'));
                                                          var id_empezado = parseInt(document.getElementById('txt_color_formula').getAttribute('data-id_empezado'));
                                                          /* Weight  */
                                                          var peso_color = parseInt(document.getElementById('txt_weight_formula').value);
                                                          var peso_medida = parseInt(document.getElementById('txt_color_formula').getAttribute('data-peso_medida'));

                                                          var precio_formula = parseInt(document.getElementById('txtPrecio_formula').getAttribute('data-precio_formula'));
                                                               precio_formula = precio_formula + precio_gramo*peso_color;

                                                                  if (!document.getElementById('color'+id_producto)) {/* row does not exist */

                                                                              /* Create row color */

                                                                                                 /* set precio formula */
                                                                                                document.getElementById('txtPrecio_formula').setAttribute('data-precio_formula',precio_formula);
                                                                                                document.getElementById('txtPrecio_formula').value = precio_formula;

                                                                                                /* Row listColores */
                                                                                            var row = document.createElement('div');
                                                                                                 row.setAttribute('class','row');
                                                                                                 row.setAttribute('id','color'+id_producto);
                                                                                                 row.setAttribute('data-id_producto',id_producto);
                                                                                                 row.setAttribute('data-id_grupo',id_grupo);
                                                                                                 row.setAttribute('data-id_unidad_medida',id_unidad_medida);
                                                                                                 row.setAttribute('data-id_inventario',id_inventario);
                                                                                                 row.setAttribute('data-precio_gramo',precio_gramo);
                                                                                                 row.setAttribute('data-cantidad_um_inventario',cantidad_um_inventario);
                                                                                                 row.setAttribute('data-cantidad_empezado',cantidad_empezado);
                                                                                                 row.setAttribute('data-id_empezado',id_empezado);
                                                                                                 row.setAttribute('data-peso_color',peso_color);
                                                                                                 row.setAttribute('data-peso_medida',peso_medida);
                                                                                                 row.onclick =  function() {select_row_listColores(this)};
                                                                                                   /* Color */
                                                                                            var color = document.createElement('div');
                                                                                                  color.setAttribute('class','color');
                                                                                                  color.innerHTML = color_descripcion;
                                                                                                    /* Color */
                                                                                             var peso = document.createElement('div');
                                                                                                   peso.setAttribute('class','peso');
                                                                                                   peso.innerHTML = peso_color;

                                                                                                   row.appendChild(color);
                                                                                                   row.appendChild(peso);
                                                                                                   document.getElementById('listColores').appendChild(row);

                                                                   }else{
                                                                            /* Podría actualizar la cantidad ... */
                                                                   }

                                                                 /* Clear */
                                                                 document.getElementById('txt_color_formula').value = '';
                                                                 document.getElementById('txt_weight_formula').value = '';
                                                                 document.getElementById('txt_color_formula').focus();
        }/* create row color listColores */

        /* Select color of listColores */
        function select_row_listColores(row){

                  console.log('Selected color!');
                    var id_row = row.getAttribute('id');

                    /* do visible content button delete formula */
                    document.getElementById('content_button_delete_color').classList.remove("hidden");
                    /* Prepare button delete */
                    document.getElementById('btn_delete_color_fast_formula').setAttribute('data-id_row',id_row);


        }
