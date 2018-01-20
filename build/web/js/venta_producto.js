 var Json_Productos = new Array();
 
 
 function set_list_productos_venta(json_productos){
                             
                              /* Limpia listProducto */
                              $('div#listProducto div.item').remove();
                              
                              
                              for (i in json_productos){
                              
                                            var item = document.createElement('div');
                                            item.setAttribute('class','item');
                                            item.setAttribute('data-id',json_productos[i].Id);
                                            item.setAttribute('data-id_medida',json_productos[i].Id_medida);
                                            item.setAttribute('data-marca',json_productos[i].Marca);
                                            item.setAttribute('data-grupo',json_productos[i].Grupo);

                                            var descripcion = document.createElement('div');
                                            descripcion.setAttribute('class','descripcion');
                                            descripcion.innerHTML = json_productos[i].Descripcion;
                                            var codigo = document.createElement('div');
                                            codigo.setAttribute('class','codigo');
                                            codigo.innerHTML = json_productos[i].Codigo;
                                            item.appendChild(descripcion);
                                            item.appendChild(codigo);

                                            if(i>=10){
                                                item.setAttribute('class','item hidden');
                                            }else{/* Cantidad de items visibles */
                                                document.getElementById('listProducto').setAttribute('data-items',i);
                                            }

                                        document.getElementById('listProducto').appendChild(item);
                               }
    }/* Fin carga de productos */


function getProductos(){
                $.post('ctrlproducto',{ Action: 3}, function(json_productos){
                    
                    /* Variable global de productos*/
                        Json_Productos = jQuery.parseJSON($.trim(json_productos));
                        
                    
                    /* Lista de productos: Venta */
                        set_list_productos_venta(Json_Productos);
                    /* Lista de productos para configurar precios */
                        setProductos_configuracion(Json_Productos);
                });
}

$(document).on('ready', function(){

/* Carga productos ---> Clientes ---> Formulas cada 30s */
   /*  setInterval(function(){
         
        carga_Productos();
        carga_Clientes();
        getFormulas();
        
       
    },30000); */

    /* Trae los productos */
    getProductos();
    
    
    /* Seleccionar producto */
    $('div#listProducto').on('click','div.item',function(){
      
                /* Búsqueda de: Id unidad de medida -  Unidad de medidad - Stock con Id producto*/
                var  id_producto = $(this).attr('data-id');
                var  id_medida = $(this).attr('data-id_medida');
                var  codigo = $(this).children('div.codigo').text();
                var marca = $(this).attr('data-marca');
                var grupo = $(this).attr('data-grupo');

                var descripcion = $(this).children('div.descripcion').html();
                document.getElementById('txt_search_producto').value = descripcion;
                document.getElementById('info_descripcion').innerHTML = descripcion;
                document.getElementById('info_descripcion').setAttribute('data-id',id_producto);
                document.getElementById('info_descripcion').setAttribute('data-codigo',codigo);
                document.getElementById('info_codigo').innerHTML = codigo;
                document.getElementById('info_marca').innerHTML= marca;
                document.getElementById('info_grupo').innerHTML = grupo;
           

                    $('div#info_unidades div.item').remove();

                        $.post('ctrlinventario',{Control:0,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
                                  function(r){/* Colocar valores en existencias */
                                      
                                        var jSon =   jQuery.parseJSON($.trim(r));

                                        for (i in jSon){                                  
                                            /* Filtrar - Actualizar Stock */
                                               var item = document.createElement('div');
                                               item.setAttribute('class','item');
                                               item.setAttribute('data-id_unidad_medida',jSon[i].Id);
                                               item.setAttribute('data-precio',jSon[i].Precio_venta);
                                               item.setAttribute('data-iva',jSon[i].Iva);
                                               var unidad = document.createElement('div');
                                               unidad.setAttribute('class','unidad');
                                               unidad.innerHTML = jSon[i].Unidad_medida;
                                               var disponible = document.createElement('div');
                                               disponible.setAttribute('class','disponible');
                                               disponible.innerHTML = jSon[i].Stock;
                                               item.appendChild(unidad);
                                               item.appendChild(disponible);
                                         document.getElementById('info_unidades').appendChild(item);
                                         }
                          });

                  
                  setTimeout(function(){/* Actualiza Stock */
                      
                            $('div#listProducto').addClass('hidden');
                            
                                $.post('ctrlinventario',{Control:1,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
                                  function(response){/* Colocar valores en existencias */

                                    var jSon = jQuery.parseJSON($.trim(response));

                                        $("div#info_unidades div.item").each(function(){
                                           
                                            for(i in jSon){

                                                var Id_unidad_medida = parseInt($(this).attr('data-id_unidad_medida'));

                                                if(Id_unidad_medida===jSon[i].Id){
                                                     $(this).children('div.disponible').html(jSon[i].Stock);
                                                     $(this).attr('data-precio',jSon[i].Precio_venta);
                                                     $(this).attr('data-iva',jSon[i].Iva);
                                                }
                                            }
                                       });   
                                 });
                        },200);
                  
            
    });
   /* Hacer visible lista de productos */
   $('div#cell_search_producto').on('focusin','input#txt_search_producto',function(){
       $('div#listProducto').removeClass('hidden');
       document.getElementById('txt_search_producto').value = '';
   });
   /* Hacer invisible lista de productos */
   $('div#cell_search_producto').on('focusout','input#txt_search_producto',function(){
        setTimeout(function(){$('div#listProducto').addClass('hidden');},500);
   });
      
      /* Búsqueda de productos  */
    $('div#cell_search_producto').on('keypress','input#txt_search_producto',function(e){
                
        var texto = $(this).val()+e.key;
        /* Evita la acción cuando es la tecla Enter */
        if(e.keyCode==13){e.preventDefault();}
         buscar_Productos(texto);    
    });
    $('div#cell_search_producto').on('keydown','input#txt_search_producto',function(e){
          
        /* Evita la acción cuando es la tecla Enter */
            if(e.keyCode==13){ e.preventDefault();}
            
            /* Retroceso: Se hace búsqueda con un caracter menos */  
            if(e.keyCode==8){
                var texto = $(this).val();
                texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                buscar_Productos(texto);
            }
    });
    
    function buscar_Productos(valor){
        
        valor = valor.toLowerCase();
        
        
          var i = 0;
           $("div#cell_search_producto div.item").each(function(){
                           /* Saca el id de cada item */
                            var descripcion = $(this).children('div.descripcion').html();
                            var codigo = $(this).children('div.codigo').html();
                            var valor_item = descripcion+codigo;
                            
                            valor_item = valor_item.toLowerCase();
                            
                            if (valor_item.indexOf(valor)!=-1) {/* Existen resultados*/
                                    
                                    $('div#sin_resultados').addClass('hidden');
                                    
                                    /* Solo puedo hacer visible a 14 Items */
                                    i = i + 1;
                                    if(i<=14){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                    
                             }else{
                                    $(this).addClass('hidden');
                                    
                                    /* Control: No exiten resultados*/
                                    if(i==0){
                                        $('div#sin_resultados').removeClass('hidden');
                                    }
                                    
                             }
            });        
    }/* Fin método búsqueda productos */
   
   /* Seleccionar unidad de medida  */
   $('div#info_unidades').on('click','div.item',function(){
       
      
                    var unidad_medida = $(this).children('div.unidad').text();
                    var id_unidad_medida = $(this).attr('data-id_unidad_medida');
                    var id_producto = document.getElementById('info_descripcion').getAttribute('data-id');
                    var precio_unidad = $(this).attr('data-precio');
                    var iva = $(this).attr('data-iva');
                    
                       /* FrmVenta --> venta_producto.js --> div#info_unidades --> click div.item --> L:194 */
                    var unidades_enteras = $(this).children('div.disponible').text();
                    document.getElementById('txt_sell_Unidad').setAttribute('data-unidades_enteras',unidades_enteras);


                    document.getElementById('txt_sell_Precio').value = precio_unidad;
                    document.getElementById('txt_sell_Precio').setAttribute('data-iva',iva);
                    document.getElementById('txt_sell_Unidad').value = unidad_medida; 
                    document.getElementById('txt_sell_Unidad').setAttribute('data-id',id_unidad_medida); 
                    document.getElementById('txt_sell_Unidad').removeAttribute('data-id_fraccion');
                    document.getElementById('txt_sell_Unidad').setAttribute('data-tipo',0);/*  1: Fraccion --- 0: Entero*/
                    document.getElementById('txt_sell_Cantidad').value = 1;
               //     document.getElementById('txt_sell_Cantidad').removeAttribute('readonly'); /* Desbloquear cantidad */
                    document.getElementById('txt_sell_Descuento').value = 0;
                    /* Foco a cantidad */
                    document.getElementById('txt_sell_Cantidad').focus(); 
                    $('div#Item_empezado').children('div.label').addClass('hidden');


                    $('div#listFracciones div.item').remove();

                    /* Si la unidad de medida es fraccionable, entonces buscar sus fracciones */
                     $.post('ctrlinventario',{Action: 4,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida}, function(r){
                         
                         var jSon = jQuery.parseJSON($.trim(r));

                         for(i in jSon){
                             /* Lista de fracciones */
                             var item = document.createElement('div');
                                 item.setAttribute('class','item');
                                 item.setAttribute('data-id',jSon[i].Id);
                                 item.setAttribute('data-proporcion',jSon[i].Proporcion);
                                 item.setAttribute('data-precio',jSon[i].Precio_fraccion);
                                 item.innerHTML = jSon[i].Fraccion;
                                 document.getElementById('listFracciones').appendChild(item);
                         }

                     });
                     
                       /* Buscar peso y precio de gramo de poliuretanos   */
                    var grupo = document.getElementById('info_grupo').innerHTML;
                    grupo = grupo.toLowerCase();
                    
                  if(grupo==='bicapa' || grupo==='poliuretano'){
                      console.log('Es bicapa o poliuretano');
                      /* Hace la busqueda de precio del gramo y el peso */
                    /* Busca peso de unidad medida y producto --> Poliuretano o Bicapa */
                            $.post('ctrlpeso',{A:1,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(r){
                                
                                        var json_peso = $.parseJSON($.trim(r));
                                        var peso = parseInt(json_peso[0].Peso);
                                        var precio_gramo = parseInt(json_peso[0].Precio_gramo);    
                                        
                                        document.getElementById('txt_sell_Unidad').setAttribute('data-precio_gramo',precio_gramo);
                                        document.getElementById('txt_sell_Unidad').setAttribute('data-peso',peso);
                                        document.getElementById('txt_sell_Unidad').setAttribute('data-proporcion',1);
                                    
                                /* Agregar Item de gramo */
                                    
                                    
                            });
                  }
                     
                     
                     
                     
       
   });
   
    $('div.set_Producto').on('focusin','input#txt_sell_Unidad',function(){
        $('div#listFracciones').removeClass('hidden');
   });
    $('div.set_Producto').on('focusout','input#txt_sell_Unidad',function(){
        setTimeout(function(){$('div#listFracciones').addClass('hidden');},500);
   });
   
   $('div#listFracciones').on('click','div.item',function(){
       
                    var precio_fraccion = $(this).attr('data-precio');
                    var id_fraccion = $(this).attr('data-id');
                    var fraccion = $(this).text();
                    var proporcion = parseFloat($(this).attr('data-proporcion'));

                    document.getElementById('txt_sell_Precio').value = precio_fraccion;
                    document.getElementById('txt_sell_Unidad').value = fraccion; 
                    document.getElementById('txt_sell_Unidad').setAttribute('data-tipo',1);/* 0: Entero --- 1: Fraccion */
                    document.getElementById('txt_sell_Unidad').setAttribute('data-id_fraccion',id_fraccion);
                    document.getElementById('txt_sell_Unidad').setAttribute('data-proporcion',proporcion);/* Requerido para calcular peso gramo gastado */
                    document.getElementById('txt_sell_Cantidad').value = 1;

                    /* Parámetros */
                     var id_producto = document.getElementById('info_descripcion').getAttribute('data-id');
                     var id_unidad_medida = document.getElementById('txt_sell_Unidad').getAttribute('data-id');
                     
                     /* Requerido para productos que no se venden por gramo  */
                     var requerido = proporcion.toFixed(5);
                     
                     
                      /* Calcular peso a descargar si es un poliuretano o bicapa */
                                     var grupo = document.getElementById('info_grupo').innerHTML;
                                         grupo = grupo.toLowerCase();

                                        if(grupo==='bicapa' || grupo==='poliuretano'){
                                             /* Hace la busqueda de precio del gramo y el peso */
                                                 var cantidad = parseInt(document.getElementById('txt_sell_Cantidad').value);
                                                 /* Peso entero  --- Proporción seleccionada */
                                                 var peso = parseFloat(document.getElementById('txt_sell_Unidad').getAttribute('data-peso'));
                                                     peso = peso.toFixed(5);
                                                     proporcion = proporcion.toFixed(5);
                                                     
                                                 /*  Recalcula el peso ---> Será el valor a almacenado */
                                                     requerido = peso*proporcion*cantidad;
                                                     
                                                 var fraccion = $(this).text();
                                                 
                                                 if(fraccion==='gramo'){/* No funciona igual */
                                                        requerido = cantidad;
                                                     /* Requerido será igual a lo que halla en cantidad "1" 
                                                        ¿Cómo está manejando AddItem las cantidades respecto al peso que hay que restar ?
                                                        */         
                                                 }
                                        }
                                        /* Hasta este punto todo parece muy normal */
                     
                     
                                        
                     /* Busca la existencia de productos empezados */
                     $.post('ctrlinventario',{Action:5,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(restante){

                                $('div#Item_empezado').children('div.label').removeClass('hidden');
                                $('div#Item_empezado').children('div').html('Item empezado contiene: '+restante);
                                document.getElementById('Item_empezado').setAttribute('data-resta_inventario',0);
                                document.getElementById('Item_empezado').setAttribute('data-bd_restante',restante);
                                restante = parseFloat(restante);
                                restante = restante.toFixed(5);


                                 if(restante>0){/* Comparar valor requerido con restante 
                                                     ---> Mensaje: Hay items empezados */

                                                    if(requerido>restante){/* Hay que empezar un nuevo item */

                                                                var unidades_enteras = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-unidades_enteras'));

                                                                   if(unidades_enteras>0){/* Puedo vender */

                                                                               /* Bicapa o poliuretano */
                                                                              if(grupo==='bicapa' || grupo==='poliuretano'){
                                                                                  /* Conversion de unidad entera a gramos */
                                                                                  var peso_unidad = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-peso'));
                                                                                  /* Contiene peso restante empezado + el peso de la unidad  - requerido */
                                                                                  restante = (restante + peso_unidad) - requerido;

                                                                              }else{/* Productos que manejan fracciones de 0 - 0.99 */
                                                                                       requerido = requerido - restante;
                                                                                       restante = 1 - requerido;/* Estado --> 1: Hay un item empezado */
                                                                              }

                                                                           /* RESTAMOS UNO A INVENTARIO */
                                                                           document.getElementById('Item_empezado').setAttribute('data-resta_inventario',1);

                                                                   }else{ /* No hay suficiente para vender */
                                                                        $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                                                   }

                                                    }else{/* Igual o mayor: Hay suficiente para entregar el valor requerido */
                                                        restante = restante - requerido;
                                                        /* Si restante es cero, significa que podemos colocar el item
                                                         en tblProductoEmpezado: Estado --> 0: No hay productos empezados*/
                                                    }

                                 }else{/* Empezar un item  ---> Mensaje: No hay items empezados */
                                   //  restante = 1 - requerido;
                                                        /* Verificar que existan unidades enteras */
                                                          var unidades_enteras = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-unidades_enteras'));

                                                           if(unidades_enteras>0){/* Puedo vender */

                                                                       /* Bicapa o poliuretano */
                                                                      if(grupo==='bicapa' || grupo==='poliuretano'){
                                                                          /* Conversion de unidad entera a gramos */
                                                                          var peso_unidad = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-peso'));
                                                                          /* Contiene peso restante empezado + el peso de la unidad  - requerido */
                                                                          restante =  peso_unidad - requerido;
                                                                      }else{
                                                                          restante = 1 - requerido;/* Estado --> 1: Hay un item empezado */
                                                                      }

                                                                   /* RESTAMOS UNO A INVENTARIO */
                                                                   document.getElementById('Item_empezado').setAttribute('data-resta_inventario',1);

                                                           }else{ /* No hay suficiente para vender */
                                                                $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                                           }
                                 }
                                 /* Estos datos deben ir con la fila del data grid: Hasta que 
                                    pueda listas de objetos crear objetos */
                              document.getElementById('Item_empezado').setAttribute('data-restante',restante);
                              document.getElementById('Item_empezado').setAttribute('data-requerido',requerido);
                              
                     });
   });
   
   
   /* Recalcula los valores: ---> Requerido ---> Restante ---> Resta de inventario */
   $('div.set_Producto').on('focusout','input#txt_sell_Cantidad',function(){
       
       /* Todo este lío se presenta si es una fracción */
            var fraccion = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-tipo'));
            
            if(fraccion>0){
                        /* Bicapas - Poliuretanos  */
                        var grupo = document.getElementById('info_grupo').innerHTML;
                            grupo = grupo.toLowerCase();
                        var peso = 0;

                        var restante = parseFloat(document.getElementById('Item_empezado').getAttribute('data-bd_restante'));
                        var proporcion = parseFloat(document.getElementById('txt_sell_Unidad').getAttribute('data-proporcion'));
                        var cantidad = parseInt($(this).val());
                        var requerido = cantidad*proporcion;


                        if(restante>0){/* Vamos a calcular sobre un item empezado */
                                
                                console.log('Restante es mayor que cero!');
                            
                                  if(grupo==='bicapa' || grupo==='poliuretano'){
                                            peso = parseFloat(document.getElementById('txt_sell_Unidad').getAttribute('data-peso'));
                                            requerido = peso*cantidad*proporcion;
                                            
                                            /* Gramos */
                                            if(proporcion===1){
                                                requerido = cantidad;
                                            }
                                  }


                                  /* Calcular suficiencia de cantidad empezada */
                                  if(restante>requerido){
                                      /* Puedo vender */
                                         restante = restante - requerido;
                                      /* No resto del inventario ninguna unidad entera */
                                      document.getElementById('Item_empezado').setAttribute('data-resta_inventario',0);

                                  }else{
                                      /* No hay suficiente con el item empezado ---> Empezar uno nuevo */
                                        var unidades_enteras = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-unidades_enteras'));

                                            if(unidades_enteras>0){
                                                /* Puedo vender */
                                                        if(grupo==='bicapa' || grupo==='poliuretano'){
                                                                 restante = restante + peso;/* Sumo una unidad entera */
                                                         }else{
                                                                 restante = restante + 1;/* Empiezo una nueva unidad */
                                                          }

                                                          /* Validar que requerido no sea mayor, puesto que una fraccion no puede ser mayor que la unidad */
                                                          if(restante>requerido){
                                                              /* Puedo vender */
                                                              restante = restante - requerido;

                                                                /* RESTAMOS UNO A INVENTARIO */
                                                                document.getElementById('Item_empezado').setAttribute('data-resta_inventario',1);

                                                          }else{/* No se permite la venta, porque la fracción es mayor que la unidad */
                                                                $(this).val('1');
                                                              return;
                                                          }

                                            }else{/* No hay suficiente para vender */
                                                 $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                            }
                                  }


                        }else{/* Se empezará un nuevo item */

                                 var unidades_enteras = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-unidades_enteras'));

                                  if(unidades_enteras>0){/* Puedo vender */

                                            if(grupo==='bicapa' || grupo==='poliuretano'){
                                                    /* Calcula */
                                                        peso = parseFloat(document.getElementById('txt_sell_Unidad').getAttribute('data-peso'));
                                                        requerido = peso*cantidad*proporcion;
                                                        
                                                        /* Gramos */
                                                        if(proporcion===1){
                                                            requerido = cantidad;
                                                        }
                                                        
                                                        if(peso>requerido){/* Puedo vender */
                                                                restante = peso - requerido;
                                                        }else{/* No se permite la venta, porque la fracción es mayor que la unidad */
                                                                $(this).val('1');
                                                              return;
                                                        }
                                             }else{

                                                 if(1>requerido){/* Puedo vender */
                                                            restante = 1 - requerido;
                                                 }else{/* No se permite la venta, porque la fracción es mayor que la unidad */
                                                                $(this).val('1');
                                                              return;
                                                 }

                                             }

                                  }else{/* No hay suficiente para vender */
                                         $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                  }

                        }

                         /* Estos datos deben ir con la fila del data grid: Hasta que 
                                            pueda listas de objetos crear objetos */
                                      document.getElementById('Item_empezado').setAttribute('data-restante',restante);
                                      document.getElementById('Item_empezado').setAttribute('data-requerido',requerido);

               }
    
   });
   
});


    