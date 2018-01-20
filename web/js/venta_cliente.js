
 /* Funciona para todas las listas: Formulario ---> Fómulas */
    function busqueda_List(pmtTexto,pmtList,pmtChild){
        
        
        pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */
              
           /* Recorro cada fila de la lista */
         $('div#'+pmtList+' div.item').each(function(){
             
            var  row = $(this).children(pmtChild).text();/* Contiene exto de la fila */
                 row = row.toLowerCase();
                 
                 var i = 0; /* Controla número de filas visibles */
                 
                  if (row.indexOf(pmtTexto)!==-1) {/* Existen resultados*/
                                    
                                    i = i + 1;/* Solo puedo hacer visible a 14 Items */
                                    
                                    if(i<=15){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                    
                             }else{/* No coincide con texto entrante */
                                    $(this).addClass('hidden');
                             }
         });
        
    }
    
    var json_clientes;

  function carga_Clientes(){
       
         $.post('ctrlcliente',{Action: 2 }, function(json){
                                      
                              var jSon =   jQuery.parseJSON($.trim(json));
                                  json_clientes = jSon;
                              
                              /* Limpiar lista */
                              $('div#listClientes div.item').remove();
                              
                              for (i in jSon){
                                  
                                     var item = document.createElement('div');
                                     item.setAttribute('class','item');
                                     item.setAttribute('data-id',jSon[i].Id);
                                     item.setAttribute('data-telefono',jSon[i].Telefono);
                                     item.setAttribute('data-direccion',jSon[i].Direccion);
                                     item.setAttribute('data-ciudad',jSon[i].Ciudad);
                                     item.setAttribute('data-email',jSon[i].Email);
                                     var nombre = document.createElement('div');
                                     nombre.setAttribute('class','nombre');
                                     nombre.innerHTML = jSon[i].Nombre;
                                     var documento = document.createElement('div');
                                     documento.setAttribute('class','documento');
                                     documento.innerHTML = jSon[i].Documento;
                                     item.appendChild(nombre);
                                     item.appendChild(documento);
                                     
                                     if(i>=14){
                                         item.setAttribute('class','item hidden');
                                     }else{/* Cantidad de items visibles */
                                         document.getElementById('listClientes').setAttribute('data-items',i);
                                     }
                                     document.getElementById('listClientes').appendChild(item);
                               }
                                           
                        });
       console.log('Se recargaron los clientes!');
       
    }/* Fin carga de clientes */


$(document).on('ready', function(){
    
                    carga_Clientes();
                    
                    
                    /* Seleccionar cliente */ 
                    $('div#listClientes').on('click','div.item',function(){
                                    /* Getter */
                                    var nombre = $(this).children('div.nombre').html();
                                    var id_cliente = $(this).attr('data-id');
                                    var documento = $(this).children('div.documento').html();
                                    var telefono = $(this).attr('data-telefono');
                                    var direccion = $(this).attr('data-direccion');
                                    var ciudad = $(this).attr('data-ciudad');
                                    var email = $(this).attr('data-email');

                                    /* Setter */
                                    document.getElementById('fila_cliente').setAttribute('data-id',id_cliente);
                                    document.getElementById('txt_search_cliente').value = nombre;
                                    document.getElementById('txt_search_cliente').setAttribute('data-id',id_cliente);
                                    document.getElementById('data_documento').innerHTML = documento;
                                    document.getElementById('data_telefono').innerHTML = telefono;
                                    document.getElementById('data_direccion').innerHTML = direccion;
                                   // document.getElementById('data_email').innerHTML = email;
                                    document.getElementById('data_city').innerHTML = ciudad;

                                    /* Esconder lista */
                                    $('div#listClientes').addClass('hidden');

                    });/* Fin seleccionar cliente */

                   /* Hacer visible la lista de clientes */
                   $('div#s_busqueda_cliente').on('focusin','input#txt_search_cliente',function(){
                       $('div#listClientes').removeClass('hidden');
                   });
                   /* Esconder lista de clientes */
                   $('div#s_busqueda_cliente').on('focusout','input#txt_search_cliente',function(){
                       setTimeout(function(){
                           $('div#listClientes').addClass('hidden');
                           $('div#sin_resultados').addClass('hidden');
                           /* Resetear lista de clientes*/
                           var i = 0;
                             $("div#s_busqueda_cliente div.item").each(function(){
                                 i = i + 1;
                                 if(i<=14){$(this).removeClass('hidden')}

                             });
                       },500);

                   });

                    /* Búsqueda de clientes  */
                    $('div#s_busqueda_cliente').on('keypress','input#txt_search_cliente',function(e){

                                var texto = $(this).val()+e.key;
                                /* Evita la acción cuando es la tecla Enter */
                                if(e.keyCode==13){e.preventDefault();}

                                busqueda_List(texto,'listClientes','div.nombre');

                    });

                    $('div#s_busqueda_cliente').on('keydown','input#txt_search_cliente',function(e){

                        /* Evita la acción cuando es la tecla Enter */
                //            if(e.keyCode==13){ e.preventDefault();}
                //            
                //            
                //            /* Retroceso: Se hace búsqueda con un caracter menos */  
                //            if(e.keyCode==8){
                //                var texto = $(this).val();
                //                texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                //                buscar_Clientes(texto);
                //            }
                    });
                    
                    /* button btn_cerrar_add_Cliente */
                    $('div#add_Cliente').on('click','div#btn_cerrar_add_Cliente',function(){
                            
                            /* Cierra form add CLiente */
                            $('div#add_Cliente').addClass('hidden');
                        
                    });
                    
                    $('div#s_busqueda_cliente').on('click','div#btn_open_add_Cliente',function(){
                        
                            /* Hace visible el form para add Cliente en ventas */
                             $('div#add_Cliente').removeClass('hidden');
                        
                    });
                    
                     $('div#add_Cliente').on('click','div#btn_add_Cliente',function(){
                         
                             console.log('Has almacenado un cliente!');
                             /* Parámetros
                                Nombre --> 1
                                Documento ---> 1
                                Telefono  ---> 1
                                Direccion ---> 0
                                Ciudad ---> 1
                                Email ---> 0
                             */
                             var nombre = document.getElementById('txt_Nombre_add_Cliente').value;
                             var documento = document.getElementById('txt_Documento_add_Cliente').value;
                             var telefono = document.getElementById('txt_Telefono_add_Cliente').value;
                             var ciudad = document.getElementById('txt_Ciudad_add_Cliente').value;
                             
                             
                             
                             $.post('ctrlcliente',{Action:1,Nombre:nombre,Documento:documento,Telefono:telefono,Ciudad:ciudad,
                                                   Id_cliente:0,Direccion:'N/A',Email:'N/A'},function(id_cliente){
                                                   
                                            console.log('ID cliente: '+id_cliente);

                                            /* Item para la lista de clientes */
                                            var item = document.createElement('div');
                                                item.setAttribute('class','item');
                                                item.setAttribute('data-id',id_cliente);
                                                item.setAttribute('data-telefono',telefono);
                                                item.setAttribute('data-direccion','N/A');
                                                item.setAttribute('data-ciudad',ciudad);
                                                item.setAttribute('data-email','N/A');
                                                
                                            var div_nombre = document.createElement('div');
                                                div_nombre.setAttribute('class','nombre');
                                                div_nombre.innerHTML = nombre;
                                                
                                            var div_documento = document.createElement('div');
                                                div_documento.setAttribute('class','documento');
                                                div_documento.innerHTML = documento;
                                            
                                                item.appendChild(div_nombre);
                                                item.appendChild(div_documento);
                                            
                                                /* Agregar al principio */
                                                
                                                 var primera_fila = document.getElementById('listClientes').getElementsByTagName('div')[1];
                                                     document.getElementById('listClientes').insertBefore(item,primera_fila);
                                                
                                                /* Hace invisible al contenedor */
                                                    $('div#add_Cliente').addClass('hidden');
                                                    /* Hace visible a la lista de clientes */
                                                    document.getElementById('txt_search_cliente').focus();
                             });
                         
                                /* Limpia */
                                       document.getElementById('txt_Nombre_add_Cliente').value = '';
                                       document.getElementById('txt_Documento_add_Cliente').value = '';
                                       document.getElementById('txt_Telefono_add_Cliente').value = '';
                                       document.getElementById('txt_Ciudad_add_Cliente').value = '';

                            
                         
                     });
    
});