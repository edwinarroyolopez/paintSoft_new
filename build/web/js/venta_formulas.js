

var json_productos_formula = new Array();

function get_Json_productos_formula(){
    return json_productos_formula;
}

function reset_Json_productos_formula(){
    json_productos_formula = new Array();
    console.log("Se hizo reset de productos en formula!");
}

$(document).on('ready',function(){
    
    /* Navegación en  máquinas  ---> Venta fórmulas !*/
   
    
    
   
    
    /* Key press  ---> txt_buscador_formula  */
     $('div#buscador_formula').on('keypress','input#txt_buscador_formula',function(e){
         
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#listFormula div.row',filtro,7);
     });       
     /* Keydown ---> tct_buscador_formula */
     $('div#buscador_formula').on('keydown','input#txt_buscador_formula',function(e){
         
                   if(e.keyCode===8){/* Retroceso */
                        var filtro = $(this).val();
                            filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                            buscar_texto_list('div#listFormula div.row',filtro,7);
                   }
     });
    
    
    /* Focusout - Focusin txtCantidad_fórmula */
    
    $('div#cell_setter_formula').on('focusin','input#txtMedida_formula',function(e){
                  $('div#listUnidad_medida_formula').removeClass('hidden');
    });
    $('div#cell_setter_formula').on('focusout','input#txtMedida_formula',function(e){
                setTimeout(function(){
                    $('div#listUnidad_medida_formula').addClass('hidden');
                },400);
      });
    
    $('div#listUnidad_medida_formula').on('click','div.row',function(){
        
                    var cantidad = parseInt($(this).attr('data-cantidad'));
                     $('div#listColores').attr('data-medida',cantidad);

                    var medida = $(this).text();
                    document.getElementById('txtMedida_formula').value = medida;

                    var precio = 0;

                    /* Recorrer colores y multiplicar gramos por "cantidad" */
                    $('div#listColores div.row').each(function(){

                            /* Actualiza peso ---> Aumenta o disminuye */
                            var peso = parseInt($(this).attr('data-peso'));
                            peso = cantidad*peso;
                            $(this).children('div.peso').text(peso);

                            var precio_gramo = parseInt($(this).attr('data-precio_gramo'));

                            precio = precio + precio_gramo*peso;
                            
                            /* Determinar si hay suficiente producto para hacer una fórmula */
                            
                            var cantidad_empezado = parseInt($(this).attr('data-cantidad_empezado'));
                            var cantidad_inventario = parseInt($(this).attr('data-cantidad_inventario'));
                            
                        //    console.log(' Antes de la condicion: cantidad_empezado>0 ');
                            
                            if(cantidad_empezado>0){/* Hay alguna unidad del producto empezada?*/
                                
                                            if(peso<cantidad_empezado){/* Es menor el peso necesario que el que hay empezado? */

                                                    var restante_empezado = cantidad_empezado - peso;

                                                    $(this).attr('data-tabla_salida',1);
                                                    $(this).attr('data-salida_empezada',peso);
                                                    $(this).attr('data-restante_empezada',restante_empezado);

                                                    /* Quitar clase empty */
                                                    $(this).removeClass('empty');

                                            }else{/* No es suficiente con el peso empezado */
                                                    /* Revisar existencias en inventario */
                                                    if(cantidad_inventario>0){

                                                              var peso_medida = parseInt($(this).attr('data-peso_medida'));
                                                              /* Recoge el peso en las unidades selladas y 
                                                                las unidades empezadas */
                                                              var peso_total = peso_medida*cantidad_inventario + cantidad_empezado;

                                                              if(peso_total>peso){/* Hay suficiente para la fórmula */

                                                                    /* Cómo saber cuantas unidades selladas descontar*/

                                                                    var diferencia = peso_total - peso;
                                                                    /* Peso que tiene la unidad que quedará empezada */
                                                                    var restante_empezado = diferencia%peso_medida;
                                                                    /* Unidades enteras resultantes  */
                                                                    var restante_entero = parseInt(diferencia/peso_medida);
                                                                    /* Unidades que se gastaron en la fórmula */
                                                                    var unidades_gastadas = cantidad_inventario - restante_entero;


                                                                    $(this).attr('data-tabla_salida',2);
                                                                    $(this).attr('data-salida_entera',unidades_gastadas);
                                                                    $(this).attr('data-salida_empezada',peso);
                                                                    $(this).attr('data-restante_entera',restante_entero);
                                                                    $(this).attr('data-restante_empezada',restante_empezado);

                                                                     /* Quitar clase empty */
                                                                      $(this).removeClass('empty');
                                                              }else{/* No hay suficiente */
                                                                      /* Agregar clase empty */
                                                                      $(this).addClass('empty');
                                                              }

                                                    }else{/* No hay existencias */
                                                         /* Agregar clase empty */
                                                          $(this).addClass('empty');
                                                    }
                                            }
                                
                            }else{/* Determinar si hay unidades selladas en inventario --- No hay unidades empezadas */
                                    
                                        /* Revisar existencias en inventario */
                                                    if(cantidad_inventario>0){

                                                                var peso_medida = parseInt($(this).attr('data-peso_medida'));
                                                                var peso_total = peso_medida*cantidad_inventario;

                                                                if(peso_total>peso){/* Hay suficiente para la fórmula */

                                                                      /* Cómo saber cuantas unidades selladas descontar*/

                                                                      var diferencia = peso_total - peso;
                                                                      /* Peso que tiene la unidad que quedará empezada */
                                                                      var restante_empezado = diferencia%peso_medida;
                                                                      /* Unidades enteras resultantes  */
                                                                      var restante_entero = parseInt(diferencia/peso_medida);
                                                                      /* Unidades que se gastaron en la fórmula */
                                                                      var unidades_gastadas = cantidad_inventario - restante_entero;


                                                                      $(this).attr('data-tabla_salida',2);
                                                                      $(this).attr('data-salida_entera',unidades_gastadas);
                                                                      $(this).attr('data-salida_empezada',peso);
                                                                      $(this).attr('data-restante_entera',restante_entero);
                                                                      $(this).attr('data-restante_empezada',restante_empezado);

                                                                       /* Quitar clase empty */
                                                                        $(this).removeClass('empty');
                                                                }else{/* No hay suficiente */
                                                                        /* Agregar clase empty */
                                                                        $(this).addClass('empty');
                                                                }

                                            }else{/* No hay existencias */
                                                 /* Agregar clase empty */
                                                  $(this).addClass('empty');
                                            }
                            }
                            
                        //    $.position('ctrlpeso',{A:4,Id_producto:id_producto,Peso:peso},function(json){});
                    });
                    
                            /* Condicion que precio sea mayor que cero ---> Aplico modulo 100, para justificar el precio */
                           if(precio>0){
                                precio = parseInt(precio);
                                var mod = 100 - precio%100;
                                precio = precio + mod; 
                            }

                           document.getElementById('txtPrecio_formula').value = precio;
    });/* Click sobre list unidad medida: Cambia peso de la formula  ---> End */
   
    
    
    /* Click en boton para insertar fórmula al data grid */
    $('div#frm_buscar_formula').on('click','div#btn_insertar_formula_grid',function(){
        
        var pmtId_formula = document.getElementById('listColores').getAttribute('data-id_formula');
        var pmtFormula = document.getElementById('listColores').getAttribute('data-formula');
        var pmtMedida = document.getElementById('txtMedida_formula').value;
        var pmtCantidad = document.getElementById('txtCantidad_formula').value;
        var pmtPrecio = document.getElementById('txtPrecio_formula').value;
        var pmtDescuento = 0;
        
        /* addRow(id_fila,id_producto,id_unidad,tipo,descripcion,codigo,unidad,cantidad,precio_unidad,iva,descuento,precio); */
            set_valor_formula(pmtPrecio,pmtCantidad,pmtDescuento,0);
            
        
                   var fila = document.createElement('div');
                       fila.setAttribute('class','row_formula');
                       fila.setAttribute('data-id_formula',pmtId_formula);
                       fila.setAttribute('data-id_formula',pmtId_formula);
                       fila.setAttribute('id','f'+pmtId_formula);
                       fila.setAttribute('data-medida',$('div#listColores').attr('data-medida'));/* Medida en entero: 1/64 -->1 *** 1/4 --->16 */
                       fila.setAttribute('data-iva','0');
                       fila.setAttribute('data-descuento','0');
                       
                       
                     /*  if(pmtTipo>0){ Fracción 
                           var restante = document.getElementById('Item_empezado').getAttribute('data-restante');
                           var resta_inventario = document.getElementById('Item_empezado').getAttribute('data-resta_inventario');
                           var id_fraccion = document.getElementById('txt_sell_Unidad').getAttribute('data-id_fraccion');
                             fila.setAttribute('data-id_fraccion',id_fraccion);
                             fila.setAttribute('data-restante',restante);
                             fila.setAttribute('data-resta_inventario',resta_inventario);
                       }  */
                       
                   /* Codigo */    
                   var codigo = document.createElement('div');    
                       codigo.setAttribute('class','codigo');
                       codigo.innerHTML = 'N/A';
                   /* Descripción */
                   var descripcion = document.createElement('div');    
                       descripcion.setAttribute('class','descripcion');
                   var div_descripcion = document.createElement('div');
                       div_descripcion.innerHTML = pmtFormula;
                       descripcion.appendChild(div_descripcion);
                   /* Unidad */    
                   var unidad = document.createElement('div');    
                       unidad.setAttribute('class','unidad');
                       unidad.setAttribute('data-id','0');
                       unidad.innerHTML = pmtMedida;    
                   /* Precio Unidad */
                   var precio_unidad = document.createElement('div');    
                       precio_unidad.setAttribute('class','precio_unidad');
                   var div_precio_unidad = document.createElement('div');    
                       div_precio_unidad.innerHTML = pmtPrecio;
                       precio_unidad.appendChild(div_precio_unidad)
                   /* Cantidad */
                   var cantidad = document.createElement('div');    
                       cantidad.setAttribute('class','cantidad');
                       cantidad.innerHTML = pmtCantidad;   
                  /* Descuento */
                   var descuento = document.createElement('div');    
                       descuento.setAttribute('class','descuento');
                       descuento.innerHTML = pmtDescuento; 
                 /* Precio */
                   var precio = document.createElement('div');    
                       precio.setAttribute('class','precio');
                   var div_precio = document.createElement('div');    
                       div_precio.innerHTML = pmtPrecio;     
                       precio.appendChild(div_precio);
                       
                       fila.appendChild(codigo);
                       fila.appendChild(descripcion);
                       fila.appendChild(unidad);
                       fila.appendChild(precio_unidad);
                       fila.appendChild(cantidad);
                       fila.appendChild(descuento);
                       fila.appendChild(precio);
                       
                       document.getElementById('dataProducto').appendChild(fila);
        
        var i = 0;
        
         var list_colores = new Array();
        
        /* Recorrer cada uno de los colores y asociarlos a la fila */
        $('div#listColores div.row').each(function(){
                   
                    var id_producto = parseInt($(this).attr('data-id_producto'));
                    var id_um_inventario = parseInt($(this).attr('data-id_um_inventario'));
                    var salida_empezada = parseInt($(this).attr('data-salida_empezada'));
                    var restante_empezada = parseInt($(this).attr('data-restante_empezada'));
                    var salida_entera = parseInt($(this).attr('data-salida_entera'));
                    var restante_entera = parseInt($(this).attr('data-restante_entera'));
                    
                    /* Agrega un color a la lista de colores que componen la fórmula */
                    list_colores[list_colores.length] ={Id_producto:id_producto,Id_unidad_medida:id_um_inventario,
                                                        Salida_empezada:salida_empezada,Restante_empezada:restante_empezada,
                                                        Salida_entera:salida_entera,Restante_entera:restante_entera};   
        });
        
                /* Determina posición donde se guardará la lista de colores de esta fórmula */
                fila.setAttribute('data-posicion',json_productos_formula.length);
                /* Agrega una nueva fórmula al json */
                json_productos_formula[json_productos_formula.length] = {Id_formula:pmtId_formula,listColores:list_colores};
                $('div#frm_buscar_formula').addClass('hidden');
        
    });
    
    
    /* Acceder a la zona donde se pueden seleccionar las fórmulas */
    $('div#cell_search_producto').on('click','div#btnAcces_formula',function(){
        
        $('div#frm_buscar_formula').removeClass('hidden');
        /* jsx */
        inicializar_buscador_formula()
        
    });
    
      /* Cerrar sección de fórmulas  */
    $('div.content_button').on('click','div#btnClose_formula',function(){
        
        $('div#frm_buscar_formula').addClass('hidden');
        
    });
    
});


/* Funciones globales */

    
    function buscar_texto_list(list,filtro,limit){
                    
                      /* Manejar cómo minusculas */
                        filtro = filtro.toLowerCase();
                        var i = 0;
                        /* Recorre cada fila de la lista */
                        $(list).each(function(){
                                /* Saca el id de cada item */
                                 var texto = $(this).text().toLowerCase();/* Contiene el texto de la fila */
                                 
                                 if (texto.indexOf(filtro)!==-1) {/* Filtro está contenido en el texto */
                                         /* Controla el limite de items visibles */
                                        if(i<limit){
                                            $(this).removeClass('hidden'); 
                                         }else{
                                              $(this).addClass('hidden');
                                         }
                                         i = i + 1;
                                         
                                 }else{
                                         $(this).addClass('hidden');
                                 }
                        });
    }
