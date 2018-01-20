
var json_productos_configuacion;

function setProductos_configuracion(pmtJson_productos){
    /* Set variable local */
    json_productos_configuacion = pmtJson_productos;
 //   console.log('Productos para configuracion seteados!' + JSON.stringify(json_productos_configuacion));
}

/* Craga de productos cuando se selecciona la tab configuración */
function carga_productos_configuracion(){
                                console.log('Ingresa a cargar productos!');
                                
                              /* Limpia list_pp_listProducto */
                              $('div#list_pp_producto div.item').remove();
                              
                              for (i in json_productos_configuacion){
                              
                                        var item = document.createElement('div');
                                        item.setAttribute('class','item');
                                        item.setAttribute('data-id',json_productos_configuacion[i].Id);
                                        item.setAttribute('data-id_medida',json_productos_configuacion[i].Id_medida);
                                        item.setAttribute('data-marca',json_productos_configuacion[i].Marca);
                                        item.setAttribute('data-grupo',json_productos_configuacion[i].Grupo);

                                        var descripcion = document.createElement('div');
                                        descripcion.setAttribute('class','descripcion');
                                        descripcion.innerHTML = json_productos_configuacion[i].Descripcion;
                                        var codigo = document.createElement('div');
                                        codigo.setAttribute('class','codigo');
                                        codigo.innerHTML = json_productos_configuacion[i].Codigo;
                                        item.appendChild(descripcion);
                                        item.appendChild(codigo);

                                        if(i>=10){
                                            item.setAttribute('class','item hidden');
                                        }else{/* Cantidad de items visibles */
                                            document.getElementById('list_pp_producto').setAttribute('data-items',i);
                                        }

                                        document.getElementById('list_pp_producto').appendChild(item);
                               }
    }

$(document).on('ready',function(){
    
        /*Click sobre item de la lista */
        $('div#list_pp_producto').on('click','div.item',function(){
            
                /* Debe crearse la lista de unidades de medidia relacionada con este producto */
                 var id_producto = $(this).attr('data-id');
                 var id_medida = $(this).attr('data-id_medida');
                 
                    /* Configuración de lista unidad de medida */    
                       $('div#list_pp_unidad_medida div.item').remove();
                       $('div#list_pp_precio_fracciones').removeClass('hidden');
                       $('div#list_pp_precio_fracciones').addClass('hidden');
                       

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
                                               item.appendChild(unidad);
                                               document.getElementById('list_pp_unidad_medida').appendChild(item);
                                         }
                        });
                        
                        var producto = $(this).children('div.descripcion').text();
                        var grupo = $(this).attr('data-grupo');
                            document.getElementById('txt_pp_search_producto').value = producto;
                            document.getElementById('txt_pp_search_producto').setAttribute('data-id',id_producto);
                            document.getElementById('txt_pp_search_producto').setAttribute('data-grupo',grupo);
                            
                            
                            
                            setTimeout(function(){/* Actualiza Stock */
                      
                            //$('div#listProducto').addClass('hidden');
                            
                                $.post('ctrlinventario',{Control:1,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
                                  function(response){/* Colocar valores en existencias */

                                    var jSon = jQuery.parseJSON($.trim(response));

                                        $("div#list_pp_unidad_medida div.item").each(function(){
                                           
                                            for(i in jSon){

                                                var Id_unidad_medida = parseInt($(this).attr('data-id_unidad_medida'));

                                                if(Id_unidad_medida===jSon[i].Id){
                                              //       $(this).children('div.disponible').html(jSon[i].Stock);
                                                     $(this).attr('data-precio',jSon[i].Precio_venta);
                                             //        $(this).attr('data-iva',jSon[i].Iva);
                                                }
                                            }
                                       });   
                                 });
                        },200);
                            
                            
                        
        });/* div#list_pp_producto div.item: Click ---> Fin */
    
        
        $('div#list_pp_unidad_medida').on('click','div.item',function(){

                    /* Se deben cargar los precios del producto en la unidad de medida seleccionada */
                    var id_producto = document.getElementById('txt_pp_search_producto').getAttribute('data-id');
                    var id_unidad_medida = $(this).attr('data-id_unidad_medida');
                    
                    document.getElementById('encabezado_unidad_medida').setAttribute('data-id_unidad_medida',id_unidad_medida);
                    
                    /* Precio de venta */
                    var precio_venta = $(this).attr('data-precio');
                    document.getElementById('txt_pp_precio_venta').value = precio_venta;
                    
                    
                    /* Forma un objeto html con las fracciones pertenecientes a 
                       esta unidad de medida y al producto */
                           getFracciones(id_unidad_medida,id_producto);
                    
                       var grupo = document.getElementById('txt_pp_search_producto').getAttribute('data-grupo');
                           grupo = grupo.toLowerCase();
                           
                           console.log('Grupo: ' + grupo);
                           
                    if(grupo==='poliuretano' || grupo==='bicapa'){
                        /* El grupo es poliuretano o bicapa --->
                          Hay que verificar que tenga asignado el campo peso ---> tblPeso */
                          /* Colocar txtPeso --->  */
                            var precio_gramo = 0;
                            
                            /* Busca peso de unidad medida y producto --> Poliuretano o Bicapa */
                            $.post('ctrlpeso',{A:1,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(r){
                                
                                        var json_peso = $.parseJSON($.trim(r));
                                        var peso = parseInt(json_peso[0].Peso);
                                          precio_gramo = parseInt(json_peso[0].Precio_gramo);
                                          
                                           /* Relay, para que la unidad de media alcance a crearse */
                                           setTimeout(function(){
                                                console.log('Precio gramo: '+precio_gramo);
                                                /* A este punto este input debería estar creado */
                                                  document.getElementById('txtPrecio_gramo').value = precio_gramo;
                                                  document.getElementById('txtPrecio_gramo').setAttribute('data-peso',peso);
                                           },500);
                            });
                            
                           
                        
                    }else{
                          /* Hacer invisible el campo peso ---> Elimina redundancia  */
                            $('div#Peso').children('div.child').removeClass('hidden');
                            $('div#Peso').children('div.child').addClass('hidden');
                    }

                    
                
        });/* div#list_pp_unidad_medida div.item: Click ---> Fin */
        
        
        $('div#pp_Search_producto').on('focusin','input#txt_pp_search_producto',function(){
            
                /* Hace a la lista de productos visible */
               $('div#list_pp_producto').removeClass('hidden');
               
        });/* txt_pp_search_producto: focusin ---> Fin */
        
        $('div#pp_Search_producto').on('focusout','input#txt_pp_search_producto',function(){
            /* Tiempo de respuesta */
            setTimeout(function(){
                    /* Hace a la lista de productos invisible */
                   $('div#list_pp_producto').addClass('hidden');
            },200);
        });/* txt_pp_search_producto */
        
        $('div#pp_Search_producto').on('keypress','input#txt_pp_search_producto',function(e){
            /* Búsqueda por texto  */
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#list_pp_producto div.item',filtro,10);
        });/* txt_pp_search_producto: keypress  ---> Fin  */
        
        
         $('div#pp_Search_producto').on('keypress','input#txt_pp_search_producto',function(e){
            /* Búsqueda por texto  */
                    if(e.keyCode===8){/* Retroceso */
                        var filtro = $(this).val();
                            filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                            buscar_texto_list('div#list_pp_producto div.item',filtro,10);
                   }
        });/* txt_pp_search_producto: keydown  ---> Fin  */
        
        
        /* Calcula valor de fracciones */
        $('div.precio_superior').on('focusout','input#txt_pp_precio_venta',function(){
            
                        var precio_venta = parseInt($(this).val());

                        $('div#list_pp_precio_fracciones div.fila_fracciones').each(function(){

                                var proporcion = parseFloat($(this).attr('data-proporcion'));
                                var precio_fraccion = parseInt(proporcion*precio_venta);

                                $(this).children('input').val(precio_fraccion);

                                var fraccion = $(this).children('div.fraccion').text();

                                console.log('Fraccion: '+fraccion);

                                if(fraccion==='gramo'){/* Bicapas o poluretanos! ---> ??? ??? ??? */
                                    
                                    var peso = parseInt(document.getElementById('txtPrecio_gramo').getAttribute('data-peso'));
                                        precio_fraccion = parseInt(precio_venta/peso) + 1; 
                                        console.log('Precio fraccion: '+precio_fraccion);
                                        $(this).children('input').val(precio_fraccion);
                                }


                        });
        });
        
        /*  Click en botón almacenar  */
        $('div#sector_precio_producto').on('click','div#btn_set_precio',function(){
            
            
                var id_producto = document.getElementById('txt_pp_search_producto').getAttribute('data-id');
                var id_unidad_medida = document.getElementById('encabezado_unidad_medida').getAttribute('data-id_unidad_medida');
                
                var precio_venta = document.getElementById('txt_pp_precio_venta').value;
                var precio_gramo = 0;
                
                var grupo = document.getElementById('txt_pp_search_producto').getAttribute('data-grupo');
                    grupo = grupo.toLowerCase();
                    
                    if(grupo==='bicapa' || grupo==='poliuretano'){
                        precio_gramo = document.getElementById('txtPrecio_gramo').value;
                    }
                
                
                /* Almacena precio de venta */
                          $.post('ctrlinventario',{
                                Id_producto: id_producto,
                                Id_unidad_medida: id_unidad_medida,
                                Precio_venta: precio_venta,
                                Precio_gramo: precio_gramo,
                                Action: 11
                            }, function(r){
                                            console.log(r);
                                            /* Limpia */
                                            document.getElementById('txt_pp_precio_venta').value = '';
                                        });
                                        
                
                /* Almacena precio de fracciones */
                            setTimeout(function(){
                                            /* Almacenar valores de las fracciones */
                                                $('div#list_pp_precio_fracciones div.fila_fracciones').each(function(){

                                                            var id_fraccion = $(this).attr('data-id');
                                                            var precio_fraccion = $(this).children('input.valor').val();
                                                            console.log('Precio fraccion:'+precio_fraccion);
                                                            $.post('ctrlfactura',{
                                                                        Id_producto: id_producto,
                                                                        Id_unidad: id_unidad_medida,
                                                                        Id_fraccion: id_fraccion,
                                                                        Precio_fraccion: precio_fraccion,
                                                                        Action: 4
                                                                    }, function(r){
                                                                        console.log(r);
                                                                    });
                                                                    /* Limpia */
                                                                    $(this).children('input.valor').val('');
                                                                    
                                                    });
                            },300);

            
            
            
            
        });    
        
        
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
         }/* Buscador de texto ---> Fin */
         
         
             function getFracciones(id_unidad_medida,id_producto){
                
                        /* Trae todas las fracciones de un una unidad de medida ---> Con sus precios */
                        $.post('ctrlmedida',{Id_unidad_medida: id_unidad_medida, Id_producto:id_producto,Action: 6}, function(r){
                               /* Trae las fracciones que corresponden a la unidad de medida */
                                console.log("r: "+r);

                                var jSon = jQuery.parseJSON($.trim(r));
                                    
                                    /* Reset ---> Fracciones */
                                    $('div#list_pp_precio_fracciones').removeClass('hidden'); 
                                    $('div#list_pp_precio_fracciones div.fila_fracciones').remove(); 
                                
                                if('[]'===r){/* No retorna ningún resultado */
                                       $('div#list_pp_precio_fracciones').addClass('hidden'); 
                                }else{
                                        $('div#list_pp_precio_fracciones').removeClass('hidden'); 
                                }

                                for(i in jSon){
                                            /* Setear fracciones */
                                            var fila_fracciones = document.createElement('div');
                                            fila_fracciones.setAttribute('class','fila_fracciones');
                                            fila_fracciones.setAttribute('data-id',jSon[i].Id);
                                            fila_fracciones.setAttribute('data-proporcion',jSon[i].Proporcion);

                                            var fraccion = document.createElement('div');
                                            fraccion.setAttribute('class','fraccion');
                                            fraccion.innerHTML = jSon[i].Fraccion;

                                            //var precio = parseFloat(jSon[i].Proporcion)*parseInt(precio_venta) + 1000;
                                              var precio = parseFloat(jSon[i].Precio_fraccion);

                                           var valor = document.createElement('input');
                                               valor.setAttribute('type','text');
                                               valor.setAttribute('id','V'+jSon[i].Id);
                                               valor.setAttribute('class','valor');
                                               valor.setAttribute('placeholder','5.000');
                                               valor.setAttribute('value',precio);
                                               
                                               /* Asigno un Id particular a esta fracción */
                                               if(jSon[i].Fraccion==='gramo'){
                                                   valor.setAttribute('id','txtPrecio_gramo');
                                                   console.log('Fraccion: '+jSon[i].Fraccion);
                                               }

                                            fila_fracciones.appendChild(fraccion);
                                            fila_fracciones.appendChild(valor);
                                            document.getElementById('list_pp_precio_fracciones').appendChild(fila_fracciones);
                                }
                        });
            }
         
         
         
        
        
        
        
    
});