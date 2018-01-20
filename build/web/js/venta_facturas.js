
/* Variable global utilizada para almacenar las filas eliminadas,
   servirá para retornar al stock los productos que se han devuelto  */
 var json_detalle_producto = new Array();


$(document).on('ready',function(){
   
   
   /* Cargar facturas --- clientes  */
                setTimeout(function(){
                    setClientes_listFactura(json_clientes);
                    getFacturas_venta();
                },3000);
                
          
          /* Visibilidad de la lista */
          $('div#busqueda_factura_texto').on('focusin','input#txt_search_factura',function(){
                $('div#listFacturas').removeClass('hidden');
          });
          $('div#busqueda_factura_texto').on('focusout','input#txt_search_factura',function(){
                 setTimeout(function(){$('div#listFacturas').addClass('hidden');},200);
          });
          
            /* Key press  ---> buscar facturas  */
            $('div#busqueda_factura_texto').on('keypress','input#txt_search_factura',function(e){

                        var filtro = $(this).val()+e.key;

                        if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                            e.preventDefault();
                        }
                           /*Busca filtro en cada fila de la lista */
                         buscar_texto_list('div#listFacturas div.item',filtro,15);
            });       
            /* Keydown ---> buscar facturas */
            $('div#busqueda_factura_texto').on('keydown','input#txt_search_factura',function(e){

                          if(e.keyCode===8){/* Retroceso */
                               var filtro = $(this).val();
                                   filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                                   buscar_texto_list('div#listFacturas div.item',filtro,15);
                          }
            });
          
          
          
          /* Seleccion: Cliente o Factura */
          $('div#listFacturas').on('click','div.item',function(){
                    
                    /* Reinstanciar variable  */
                        json_detalle_producto = new Array();
                        
                    /* Eliminar residuos de  navegación */
                         $('div#contenido_factura').removeClass('pos_cliente');
                         $('div#contenido_factura').removeClass('pos_factura');
                         $('div#contenido_factura').removeClass('pos_pendientes');
                         $('div#contenido_factura').removeClass('pos_canceladas');
                         
                      var data = $(this).attr('data');

                
                        if(data==='cliente'){
                                /* Datos para el encabezado del cliente  */
                                    var id_cliente = parseInt($(this).attr('data-id_cliente'));
                                    var cliente = $(this).children('div.top').children('div.cliente').text();
                                    var documento = $(this).children('div.bottom').children('div.documento').text(); 
                                    var ciudad = $(this).attr('data-ciudad');
                                    var telefono = $(this).attr('data-telefono');;
                                    var direccion = $(this).attr('data-direccion');
                                    var saldo = $(this).children('div.bottom').children('div.saldo').text(); 
                                    
                                        document.getElementById('cliente_descripcion').innerHTML = cliente;
                                        document.getElementById('cliente_descripcion').setAttribute('data-ciudad',ciudad);
                                        document.getElementById('cliente_descripcion').setAttribute('data-telefono',telefono);
                                        document.getElementById('cliente_descripcion').setAttribute('data-direccion',direccion);
                                        document.getElementById('cliente_documento').innerHTML = documento;
                                        document.getElementById('cliente_saldo').innerHTML = saldo;
                                
                                /* Colocar el contenido de factura en posición: Cliente*/
                                     $('div#contenido_factura').addClass('pos_cliente');
                                     
                                     /* Elimina las facturas creadas */
                                        $('div#facturas_cliente div.factura').remove();
                                     
                                     /* Recorre la lista que contiene las facturas */
                                     $('div#listFacturas div.item').each(function(){
                                            
                                                /* Verificar que tipo de objeto es */
                                                var data = $(this).attr('data');
                                                
                                                if(data==='factura'){
                                                    
                                                    var Id_cliente = parseInt($(this).children('div.bottom').children('div.cliente').attr('data-id_cliente'));
                                                        
                                                    if(id_cliente===Id_cliente){
                                                        

                                                                /* Crear facturas del cliente */
                                                                        var Id_factura = $(this).attr('data-id_factura');
                                                                        var Numero = $(this).children('div.top').children('div.numero').text();
                                                                        var Estado = $(this).children('div.top').children('div.estado').text();
                                                                        var Forma_pago = $(this).children('div.bottom').children('div.forma_pago').text();
                                                                        var Valor = $(this).attr('data-valor');
                                                                        var Saldo = $(this).attr('data-saldo');

                                                                        var factura = document.createElement('div');
                                                                            factura.setAttribute('class','factura');
                                                                            factura.setAttribute('data-id_factura',Id_factura);

                                                                        var numero = document.createElement('div');
                                                                            numero.setAttribute('class','numero');
                                                                            numero.innerHTML = Numero;

                                                                        var estado = document.createElement('div');
                                                                            estado.setAttribute('class','estado cerrada');
                                                                            estado.innerHTML = Estado;
                                                                            
                                                                            if(Estado==='Abierta'){
                                                                                estado.setAttribute('class','estado abierta');
                                                                            }

                                                                        var forma_pago = document.createElement('div');
                                                                            forma_pago.setAttribute('class','forma_pago');
                                                                            forma_pago.innerHTML = Forma_pago;

                                                                        var valor = document.createElement('div');
                                                                            valor.setAttribute('class','valor');
                                                                            valor.setAttribute('data-saldo',Saldo);
                                                                        var label = document.createElement('div');
                                                                            label.innerHTML = Valor;
                                                                            valor.appendChild(label);
                                                                            
                                                                            factura.appendChild(numero);
                                                                            factura.appendChild(estado);
                                                                            factura.appendChild(forma_pago);
                                                                            factura.appendChild(valor);

                                                                            document.getElementById('facturas_cliente').appendChild(factura);
                                                       }
                                                }
                                            
                                     });
                                    
                        }else{/* data = 'factura'*/

                                /* Colocar el contenido de factura en posición: Factura detalle */
                                     $('div#contenido_factura').addClass('pos_factura');
                                     
                                      /* Datos para el encabezado de la factura  */
                                    var id_factura = parseInt($(this).attr('data-id_factura'));
                                        /* Valor */
                                    var valor = parseInt($(this).attr('data-valor'));
                                        document.getElementById('valor_factura').innerHTML = valor;
                                        /* Saldo */
                                    var saldo = parseInt($(this).attr('data-saldo'));
                                        document.getElementById('saldo_factura').innerHTML = saldo;
                                        /* Numero */
                                    var numero = $(this).children('div.top').children('div.numero').text();
                                        document.getElementById('fatura_detalle').innerHTML = numero;
                                        document.getElementById('fatura_detalle').setAttribute('data-id_factura',id_factura);
                                        /* Estado */
                                    var estado = $(this).children('div.top').children('div.estado').text();  
                                        document.getElementById('estado_factura').innerHTML = estado;
                                        
                                        /* Forma de pago */
                                    var forma_pago = parseInt($(this).children('div.bottom').children('div.forma_pago').attr('data-forma_pago')); 
                                        
                                                /* Habilita button add Abono */
                                                $('div#btnAdd_abono_factura').removeClass('hidden');
                                                    if(forma_pago>0){/* Trae abonos */
                                                        getAbonos(id_factura);
                                                    }
                                                
                                                
                                        switch(forma_pago)
                                        {
                                            case 0: forma_pago = 'Contado'; 
                                                     /* Deshabilita button add Abono */
                                                    $('div#btnAdd_abono_factura').addClass('hidden');
                                                break;
                                            case 1: forma_pago = '8 días';
                                                break;
                                            case 2: forma_pago = '15 días';
                                                break;
                                            case 3: forma_pago = '30 días';
                                                break;
                                        }
                                        document.getElementById('forma_pago_factura').innerHTML = forma_pago;
                                        
                                            
                                        
                                        /* Cliente */
                                    var id_cliente = $(this).children('div.bottom').children('div.cliente').attr('data-id_cliente');
                                    var cliente = $(this).children('div.bottom').children('div.cliente').text();
                                    var documento = $(this).children('div.bottom').children('div.cliente').attr('data-documento');
                                    var ciudad = $(this).children('div.bottom').children('div.cliente').attr('data-ciudad');
                                    var telefono = $(this).children('div.bottom').children('div.cliente').attr('data-telefono');
                                    var direccion = $(this).children('div.bottom').children('div.cliente').attr('data-direccion');
                                    
                                        document.getElementById('fd_cliente').innerHTML = cliente;
                                        document.getElementById('fd_cliente').setAttribute('data-id_cliente',id_cliente);
                                        document.getElementById('fd_cliente').setAttribute('data-ciudad',ciudad);
                                        document.getElementById('fd_cliente').setAttribute('data-telefono',telefono);
                                        document.getElementById('fd_cliente').setAttribute('data-direccion',direccion);
                                        document.getElementById('fd_documento').innerHTML = documento;
                                        
                                        /* Trae detalle de factura */
                                        getDetalle_factura(id_factura);
                                        
                        }
              
          });/* Fin --> click: item */
          /* Facturas pendientes */
          $('div#buscador_factura').on('click','div#facturas_pendientes',function(){
                    $('div#contenido_factura').addClass('pos_pendientes');
                    $('div#contenido_factura').removeClass('pos_cliente');
                    $('div#contenido_factura').removeClass('pos_factura');
                    $('div#contenido_factura').removeClass('pos_canceladas');
                    
                                $('div#list_facturas_pendientes div.pendiente').remove();
                                /* Recorre la lista que contiene las facturas */
                                     $('div#listFacturas div.item').each(function(){
                                            
                                                /* Verificar que tipo de objeto es */
                                                var data = $(this).attr('data');
                                                
                                                
                                                if(data==='factura'){
                                                    
                                                    var Id_cliente = parseInt($(this).children('div.bottom').children('div.cliente').attr('data-id_cliente'));
                                                    var Cliente = $(this).children('div.bottom').children('div.cliente').text();
                                                    var Estado = $(this).children('div.top').children('div.estado').text();
                                                        
                                                    if(Estado!=='Cerrada'){
                                                                   
                                                                
                                                                /* Crear facturas del cliente */
                                                                        var Id_factura = $(this).attr('data-id_factura');
                                                                        var Numero = $(this).children('div.top').children('div.numero').text();
                                                                        
                                                                        var Forma_pago = $(this).children('div.bottom').children('div.forma_pago').text();
                                                                        var Valor = $(this).attr('data-valor');
                                                                        var Saldo = $(this).attr('data-saldo');

                                                                        var pendiente = document.createElement('div');
                                                                            pendiente.setAttribute('class','pendiente');
                                                                            pendiente.setAttribute('data-id_factura',Id_factura);

                                                                        var numero = document.createElement('div');
                                                                            numero.setAttribute('class','numero');
                                                                            numero.innerHTML = Numero;
                                                                            
                                                                        var detalle = document.createElement('div');
                                                                            detalle.setAttribute('class','detalle');
                                                                        var informacion_credito = document.createElement('div');
                                                                            informacion_credito.setAttribute('class','informacion_credito');
                                                                            
                                                                        var estado = document.createElement('div');
                                                                            estado.setAttribute('class','estado cerrada');
                                                                        var div_estado = document.createElement('div');
                                                                            div_estado.innerHTML = Estado;
                                                                            estado.appendChild(div_estado);
                                                                            
                                                                            if(Estado==='Abierta'){
                                                                                estado.setAttribute('class','estado abierta');
                                                                            }

                                                                        var forma_pago = document.createElement('div');
                                                                            forma_pago.setAttribute('class','forma_pago');
                                                                        var div_forma_pago = document.createElement('div');
                                                                            div_forma_pago.innerHTML = Forma_pago;
                                                                            forma_pago.appendChild(div_forma_pago);
                                                                            
                                                                            informacion_credito.appendChild(estado);
                                                                            informacion_credito.appendChild(forma_pago);
                                                                            /* Dinero */
                                                                            var dinero = document.createElement('div');
                                                                            dinero.setAttribute('class','dinero');
                                                                            /* Saldo de factura */
                                                                        var saldo = document.createElement('div');
                                                                            saldo.setAttribute('class','saldo');
                                                                        var lblsaldo = document.createElement('div');
                                                                            lblsaldo.setAttribute('class','label');
                                                                            lblsaldo.innerHTML = 'Saldo';
                                                                        var valor_saldo = document.createElement('div');
                                                                            valor_saldo.setAttribute('class','valor_saldo');
                                                                            valor_saldo.innerHTML = Saldo;
                                                                            saldo.appendChild(lblsaldo);
                                                                            saldo.appendChild(valor_saldo);
                                                                            /* Valor de factura */
                                                                        var valor = document.createElement('div');
                                                                            valor.setAttribute('class','valor');
                                                                        var lblvalor = document.createElement('div');
                                                                            lblvalor.setAttribute('class','label');
                                                                            lblvalor.innerHTML='Valor';
                                                                        var valor_factura = document.createElement('div');
                                                                            valor_factura.setAttribute('class','valor_factura');
                                                                            valor_factura.innerHTML = Valor;
                                                                            valor.appendChild(lblvalor);
                                                                            valor.appendChild(valor_factura);
                                                                            
                                                                            dinero.appendChild(saldo);
                                                                            dinero.appendChild(valor);
                                                                            
                                                                            detalle.appendChild(informacion_credito);
                                                                            detalle.appendChild(dinero);
                                                                            
                                                                        var cliente = document.createElement('div');
                                                                            cliente.setAttribute('class','cliente');
                                                                            cliente.innerHTML = Cliente;
                                                                            
                                                                            pendiente.appendChild(numero);
                                                                            pendiente.appendChild(detalle);
                                                                            pendiente.appendChild(cliente);

                                                                            document.getElementById('list_facturas_pendientes').appendChild(pendiente);
                                                       }
                                                }
                                            
                                     });
          });
          
            /* Seleccionar factura pendiente */
            $('div#list_facturas_pendientes').on('click','div.pendiente',function(){
                
                
                
            });
          
          /* Selecciona factura ---> */
          $('div#marco_factura').on('click','div.factura',function(){
                    
                    /* Encabezado */
                    var id_factura = parseInt($(this).attr('data-id_factura'));
                    var numero = $(this).children('div.numero').text();
                    var estado = $(this).children('div.estado').text();
                    var forma_pago = $(this).children('div.forma_pago').text();
                        
                             /* Habilita button add Abono */
                                     $('div#btnAdd_abono_factura').removeClass('hidden');
                                                
                                    if (forma_pago === 'Contado'){
                                             /* Deshabilita button add Abono */
                                            $('div#btnAdd_abono_factura').addClass('hidden');
                                     } 

                    var cliente = document.getElementById('cliente_descripcion').innerHTML;
                    var documento = document.getElementById('cliente_documento').innerHTML;
                    var ciudad = document.getElementById('cliente_descripcion').getAttribute('data-ciudad');
                    var telefono = document.getElementById('cliente_descripcion').getAttribute('data-telefono');
                    var direccion = document.getElementById('cliente_descripcion').getAttribute('data-direccion');
                    var valor = $(this).children('div.valor').children('div').text();
                    var saldo = $(this).children('div.valor').attr('data-saldo');
                    
                        document.getElementById('valor_factura').innerHTML = valor;
                        document.getElementById('saldo_factura').innerHTML = saldo;
                        document.getElementById('fatura_detalle').innerHTML = numero;
                        document.getElementById('forma_pago_factura').innerHTML = forma_pago;
                        document.getElementById('fatura_detalle').setAttribute('data-id_factura',id_factura);
                        document.getElementById('estado_factura').innerHTML = estado;
                        document.getElementById('fd_cliente').innerHTML = cliente;
                        document.getElementById('fd_documento').innerHTML = documento;
                        document.getElementById('fd_cliente').setAttribute('data-ciudad',ciudad);
                        document.getElementById('fd_cliente').setAttribute('data-telefono',telefono);
                        document.getElementById('fd_cliente').setAttribute('data-direccion',direccion);
                    
                    /* Trae detalle de factura */
                        getDetalle_factura(id_factura);
                        
                        $('div#contenido_factura').addClass('pos_factura');
                        $('div#contenido_factura').removeClass('pos_pendientes');
                        $('div#contenido_factura').removeClass('pos_cliente');
                        $('div#contenido_factura').removeClass('pos_canceladas');
              
                        /* Listar abonos */
                          getAbonos(id_factura);
              
          });
          
          /* Selecciona fila de datagrid */
          $('div#datagrid_detalle_factura').on('click','div.fila',function(){
              
                    $('div#datagrid_detalle_factura div.fila').removeClass('selected_fila');
                    $('div#datagrid_detalle_factura div.fila').removeAttr('id');
                    $(this).addClass('selected_fila');
                    $(this).attr('id','selected_fila');
                    
                    /* Hace visible al botón eliminar */
                    $('div#btnEliminar_fila_factura').removeClass('hidden');
            });
          
          /* Eliminar fila de data grid */
          $('div#accion_detalle_factura').on('click','div#btnEliminar_fila_factura',function(){
              
                            /* Paramétros */
                            var id_detalle = $('div#selected_fila').attr('data-id_detalle');
                            var codigo = $('div#selected_fila').children('div.codigo').text();
                            var tipo = parseInt($('div#selected_fila').attr('data-tipo'));
                            /* Todos los id en cero: Es necesario determinar a que tipo de producto pertenece la fila */
                            var id_producto = 0;
                            var id_unidad = 0;
                            var id_fraccion = 0;
                            var id_formula = 0;
                                    
                                        switch(tipo){
                                                    case 0:/* Producto */
                                                            id_producto = $('div#selected_fila').attr('data-id_producto');
                                                            id_unidad = $('div#selected_fila').attr('data-id_unidad_medida');
                                                        break;
                                                    case 1:/* Fracción */
                                                            id_producto = $('div#selected_fila').attr('data-id_producto');
                                                            id_unidad = $('div#selected_fila').attr('data-id_unidad_medida');
                                                            id_fraccion = $('div#selected_fila').attr('data-id_unidad_medida');
                                                        break;
                                                    case 2:/* Fórmula */

                                                        break;
                                                    case 3:/* Fórmula rápida */
                                                            id_formula = $('div#selected_fila').attr('data-id_formula');
                                                        break;
                                         }

                            
                            var cantidad = $('div#selected_fila').children('div.cantidad').text();
                            var precio_unidad = $('div#selected_fila').children('div.precio_unidad').text();
                            var descuento = $('div#selected_fila').children('div.descuento').text();
                            var iva = $('div#selected_fila').attr('data-iva');
                            var estado =  $('div#selected_fila').attr('data-estado');
                            var descripcion = $('div#selected_fila').children('div.descripcion').text();
                            var unidad = $('div#selected_fila').children('div.unidad').text();
                            

                        /* Modifica el valor de la factura al eliminar una fila  */
                            var valor_factura = parseInt(document.getElementById('valor_factura').innerHTML);
                            var valor_fila = parseInt($('div#selected_fila').children('div.precio').text());

                                valor_factura = valor_factura - valor_fila;
                                document.getElementById('valor_factura').innerHTML = valor_factura;

                        /* Elimina fila seleccionada */
                          $('div#datagrid_detalle_factura div.selected_fila').remove()
                          /* Oculta botón eliminar */
                          $('div#btnEliminar_fila_factura').addClass('hidden');

                
                 var fila = new Array();
                 
                     fila = {Id_detalle:id_detalle,Codigo:codigo,Descripcion:descripcion,Id_producto:id_producto,Id_unidad:id_unidad,
                             Id_fraccion:id_fraccion,Id_formula:id_formula,Unidad:unidad,Tipo:tipo,Cantidad:cantidad,
                             Precio_unidad:precio_unidad,Descuento:descuento,Iva:iva,Estado:estado};
                         
                         
                        /* Se agrega producto al json */
                      json_detalle_producto[json_detalle_producto.length] = fila;

                      for(i in json_detalle_producto ){
                       //   console.log(JSON.stringify(json_detalle_producto[i]));
                          
                          var fila_arr = json_detalle_producto[i];
                              console.log('Id fórmula: '+fila_arr.Id_formula);
                      }
          });
         
         $('div#search_producto_factura').on('keypress','input#txt_search_producto_factura',function(e){
                
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#list_producto_factura div.item',filtro,24);
             
         });
         
          $('div#search_producto_factura').on('focusin','input#txt_search_producto_factura',function(e){
                 /* hace visible la lista */
                   $('div#list_producto_factura').removeClass('hidden');
           });
         
          $('div#search_producto_factura').on('focusout','input#txt_search_producto_factura',function(e){
                        setTimeout(function(){ /* Hace invisible la lista */
                               $('div#list_producto_factura').addClass('hidden');
                       },200);
           });
         
         
         $('div#list_producto_factura').on('click','div.item',function(){
             
                var id_producto = $(this).attr('data-id_producto');
                var producto = $(this).text();
                var id_medida = $(this).attr('data-id_medida');
                
                document.getElementById('txt_search_producto_factura').setAttribute('data-id_producto',id_producto);
                document.getElementById('txt_search_producto_factura').value = producto;
             
                /* Busca las unidades de medida */
                    $('div#list_unidad_medida_factura div.item').remove();
                    
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
                                                   document.getElementById('list_unidad_medida_factura').appendChild(item);
                                         }
                          });

                  
                  setTimeout(function(){/* Actualiza Stock */
                      
                            $('div#list_producto_factura').addClass('hidden');
                            
                                $.post('ctrlinventario',{Control:1,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
                                  function(response){/* Colocar valores en existencias */

                                    var jSon = jQuery.parseJSON($.trim(response));

                                        $("div#list_unidad_medida_factura div.item").each(function(){
                                           
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
                
               
                 setTimeout(function(){ /* Hace invisible la lista */
                         $('div#list_producto_factura').addClass('hidden');
                 },200);
               
                
                
                
         });
         
         /* Click en botón: add Prodcuto */
         $('div#accion_detalle_factura').on('click','div#btnAdd_producto_factura',function(){
             console.log('Has dado click en Add Producto!');
             $('div#content_add_producto_factura').removeClass('hidden');
         });
         
         /* Click en botón: add Abono */
         $('div#accion_detalle_factura').on('click','div#btnAdd_abono_factura',function(){
             
                    
                    $('div#content_add_abono_factura').removeClass('hidden');

                    var saldo = document.getElementById('saldo_factura').innerHTML;
                    var cliente = document.getElementById('fd_cliente').innerHTML;

                    $('div#content_saldo_factura').children('div.value').html(saldo);
                    $('div#content_cliente_factura').children('div.value').html(cliente);
             
             
         });
         
         /* abono */
         $('div#set_abono').on('click','div#btn_finalizar_abono',function(){
             
             
                        /* set de variables */
                        var id_factura = document.getElementById('fatura_detalle').getAttribute('data-id_factura');
                        var valor_abono = parseInt(document.getElementById('txtValor_abono').value);
                        var saldo = parseInt($('div#content_saldo_factura').children('div.value').text());
                        var numero = document.getElementById('fatura_detalle').innerHTML;
                        var fecha = document.getElementById('txtFecha').value;
                        
                            saldo = saldo - valor_abono;
                        
                        console.log('Saldo: ' + saldo);

                        $.post('ctrlabono',{A:1,Id_factura:id_factura,Valor_abono:valor_abono},function(s){
                                        /* Limpia */
                                        document.getElementById('txtValor_abono').value = '';
                        });
                        
                                /* Set de etiquetas saldo */
                                document.getElementById('saldo_factura').innerHTML = saldo;
                                $('div#content_saldo_factura').children('div.value').html(saldo);
                        
                        /* Proceso de impresión de los abonos realizados a x factura*/
                        
                        
                        /* Validaciones ---> Json Abono */
                        var json_abono = document.getElementById('list_abono').getAttribute('data-json_abono');
                        
                        if(json_abono === ''){/* Establece que el json está vacío --->  */
                                 /* Crea el json abono  */
                                 json_abono = [{"Id":0,"Id_encabezado_venta":id_factura,"Numero":numero+'-A1',"Valor":valor_abono,"Fecha":fecha}];
                        }else{
                         
                                 /* Convierte de String a Json! */
                                 json_abono = JSON.parse(json_abono);
                                 var k = json_abono.length+1;
                                 /* Agrega un item al json abono */
                                 json_abono[json_abono.length] = {"Id":1000,"Id_encabezado_venta":id_factura,"Numero":numero+'-A'+k,"Valor":valor_abono,"Fecha":fecha}
                             
                        }
                        
                        json_abono = JSON.stringify(json_abono);/* Convierte en Strin al Json */
                        /* Actualiza json --- list_abono */
                        document.getElementById('list_abono').setAttribute('data-json_abono',json_abono);
                        
                        /* Método imprimir */
                        Imprime_historial_abonos();
                        
         });
         
         /* btnImprime_historial */
         
         $('div#list_abono').on('click','div#btnImprime_historial',function(){
                /* Imprime historial de abonos de una factura */
                Imprime_historial_abonos();
         });
         
         /* Button close abono */
         $('div#content_add_abono_factura').on('click','div#btnClose_abono',function(){
             /* Hace invisible seccion de abonos */
             $('div#content_add_abono_factura').addClass('hidden');
             
         });
         
         $('div#f_Factura_detalle').on('click','div#btn_cancelar_factura',function(){
                   
                    var id_factura = document.getElementById('fatura_detalle').getAttribute('data-id_factura');
                    
                     console.log('Has cancelado una factura!  --- Id: '+id_factura);
                    
                    $.post('ctrlfactura',{Action:13,Id_factura:id_factura},function(r){
                            console.log('Id de factura cancelada: '+r);
                        
                    });
                    
             
         });
         /* click en Cancelar factura */
         
         
        $('div#buscador_factura').on('click','div#facturas_canceladas',function(){
                
               
                 /* Eliminar residuos de  navegación */
                         $('div#contenido_factura').removeClass('pos_cliente');
                         $('div#contenido_factura').removeClass('pos_factura');
                         $('div#contenido_factura').removeClass('pos_pendientes');
                         $('div#contenido_factura').removeClass('pos_canceladas');
                         
                         /* Limpia facturas pendientes */
                         $('div#contenido_factura div.pendiente').remove();
                 /* posicion de facturas canceladas */        
                       $('div#contenido_factura').addClass('pos_canceladas');
                       
                       /* Limpía las facturas canceladas */
                       $('div#list_facturas_canceladas div.cancelada').remove();
                       
                
                $.post('ctrlfactura',{Action:14},function(json_facturas_canceladas){
                        
                       
                       
                        
                        var json = JSON.parse(json_facturas_canceladas);
                        
                        for(i in json){
                            
                                var cancelada = document.createElement('div');
                                    cancelada.setAttribute('class','cancelada');
                                    cancelada.setAttribute('data-id_factura_cancelada',json[i].Id_factura_cancelada);
                                    cancelada.setAttribute('data-id_factura_encabezado_venta',json[i].Id_encabezado_venta);

                                var numero = document.createElement('div');
                                    numero.setAttribute('class','numero');
                                    numero.innerHTML = json[i].Factura;

                                var forma_pago = document.createElement('div');
                                    forma_pago.setAttribute('class','forma_pago');
                                            var FPago = parseInt(json[i].Forma_pago);
                                                if(FPago>0){
                                                    FPago = 'Crédito';
                                                }else{
                                                    FPago = 'Contado';
                                                }
                                        var label_fp = document.createElement('div');
                                            label_fp.setAttribute('class','label');
                                            label_fp.innerHTML = 'Forma de pago';
                                        var value_fp = document.createElement('div');
                                            value_fp.setAttribute('class','value');
                                            value_fp.innerHTML = FPago;
                                    forma_pago.appendChild(label_fp);
                                    forma_pago.appendChild(value_fp);
                                    
                                var valor = document.createElement('div');
                                    valor.setAttribute('class','valor');
                                        var label_valor = document.createElement('div');
                                            label_valor.setAttribute('class','label');
                                            label_valor.innerHTML = 'Valor';
                                        var value_valor = document.createElement('div');
                                            value_valor.setAttribute('class','value');
                                            value_valor.innerHTML = json[i].Valor;
                                    valor.appendChild(label_valor);
                                    valor.appendChild(value_valor);
                                    
                                var cliente = document.createElement('div');
                                    cliente.setAttribute('class','cliente');
                                    cliente.innerHTML = json[i].Cliente;
                                    
                                    cancelada.appendChild(numero);
                                    cancelada.appendChild(forma_pago);
                                    cancelada.appendChild(valor);
                                    cancelada.appendChild(cliente);
                                    
                                document.getElementById('list_facturas_canceladas').appendChild(cancelada);
                        }
                        
                });
                
        });/* Buscador de facturas canceladas --- */
         
         
         
    
});/* Fin document ready */

function Imprime_historial_abonos(){
    
    
                /* Datos del cliente */
                        var cliente = document.getElementById('fd_cliente').innerHTML;
                        var nit = document.getElementById('fd_documento').innerHTML;
                        /* Parámetros ---> pendientes */
                        var ciudad = document.getElementById('fd_cliente').getAttribute('data-ciudad');
                        var telefono =  document.getElementById('fd_cliente').getAttribute('data-telefono');
                        var direccion =  document.getElementById('fd_cliente').getAttribute('data-direccion');
                
                /* Datos de la factura */
                        var fecha = document.getElementById('txtFecha').value;
                        var numero = document.getElementById('fatura_detalle').innerHTML;
                        var valor_factura = document.getElementById('valor_factura').innerHTML;
                        var saldo_factura = document.getElementById('saldo_factura').innerHTML;
                        var estado_factura = document.getElementById('estado_factura').innerHTML;
                        
                        
                        /* json abonos */
                        var json_abono = $('div#list_abono').attr('data-json_abono');


                        /* Ingreso el "json completo" al controlador para imprimirlo */
                               $.post('ctrlabono',{A:3,Cliente:cliente,Nit:nit,Ciudad:ciudad,
                                                       Telefono:telefono,Direccion:direccion,Fecha:fecha,
                                                       Numero:numero,Valor_factura:valor_factura,
                                                       Saldo_factura:saldo_factura,Estado_factura:estado_factura,
                                                       json_Abono:json_abono},function(r){
                                                       
                                                          /* Abrir factura en una nueva pestaña */
                                                            setTimeout(function(){
                                                                    var a = document.createElement('a');
                                                                    a.target ='_blank';
                                                                    a.href = '/paintSoft/pdf/abono'+numero+'.pdf';
                                                                    a.click();

                                                              },3000);     

                               });

    
    
}


function setClientes_listFactura(json_clientes){

                for(i in json_clientes){
                        /* Contenido del json clientes */
                        var Id = json_clientes[i].Id;
                        var Nombre = json_clientes[i].Nombre;
                        var Documento = json_clientes[i].Documento ;
                        var Telefono = json_clientes[i].Telefono;
                 /*           var Email = json_clientes[i].Email;  */
                        var Direcion = json_clientes[i].Direccion;
                        var Ciudad = json_clientes[i].Ciudad;             

                        /* Crear item */
                        var item = document.createElement('div');
                            item.setAttribute('class','item');
                            item.setAttribute('data','cliente');
                            item.setAttribute('data-telefono',Telefono);
                            item.setAttribute('data-ciudad',Ciudad);
                            item.setAttribute('data-direccion',Direcion);
                            item.setAttribute('data-id_cliente',Id);
                            
                        var cliente = document.createElement('div');
                            cliente.setAttribute('class','cliente');
                            cliente.innerHTML = Nombre;


                            /* Cupo ---> Pendiente */

                        var top = document.createElement('div');
                            top.setAttribute('class','top');
                            top.appendChild(cliente);
                            
                        var documento = document.createElement('div');
                            documento.setAttribute('class','documento');
                            documento.innerHTML = Documento;
                            
                        var saldo = document.createElement('div');
                            saldo.setAttribute('class','saldo');
                            saldo.setAttribute('id','s'+Id);
                            saldo.innerHTML = 0;
                            
                        var bottom = document.createElement('div');
                            bottom.setAttribute('class','bottom');
                            bottom.appendChild(documento);
                            bottom.appendChild(saldo);
                            
                            item.appendChild(top);
                            item.appendChild(bottom);
                            document.getElementById('listFacturas').appendChild(item);
                            
                }
    
}

/* Trae facturas de venta */
function getFacturas_venta(){


            $.post('ctrlfactura',{Action:8},function(json){
                    
                  
                    var json_facturas_venta = JSON.parse(json);
                    
                    for(i in json_facturas_venta){
                        
                                /* Datos del json */
                                var Id_factura = json_facturas_venta[i].Id_factura;
                                var Numero = json_facturas_venta[i].Numero;
                                var Forma_pago = json_facturas_venta[i].Forma_pago;
                                var Valor = json_facturas_venta[i].Valor;
                                var Saldo = json_facturas_venta[i].Saldo;
                                var Estado = json_facturas_venta[i].Estado;
                                var Id_cliente = json_facturas_venta[i].Id_cliente;
                                var Cliente = json_facturas_venta[i].Cliente;
                                var Documento = json_facturas_venta[i].Documento;
                                var Ciudad = json_facturas_venta[i].Ciudad;
                                var Telefono = json_facturas_venta[i].Telefono;
                                var Direccion = json_facturas_venta[i].Direccion;

                                /* Formar items para la lista */
                                var item = document.createElement('div');
                                    item.setAttribute('class','item');
                                    item.setAttribute('data','factura');
                                    item.setAttribute('data-id_factura',Id_factura);
                                    item.setAttribute('data-valor',Valor);
                                    item.setAttribute('data-saldo',Saldo);

                                var top = document.createElement('div');
                                    top.setAttribute('class','top');

                                var numero = document.createElement('div');
                                    numero.setAttribute('class','numero');
                                    numero.innerHTML = Numero;

                                var estado = document.createElement('div');

                                                if(Estado===1){/* Cerrada */
                                                    Estado = 'Cerrada';
                                                    estado.setAttribute('class','estado cerrada');
                                                }else{/* Abierta */
                                                    Estado = 'Abierta';
                                                    estado.setAttribute('class','estado abierta');
                                                  var saldo =  parseInt(document.getElementById('s'+Id_cliente).innerHTML);
                                                      saldo = saldo + Saldo;
                                                      document.getElementById('s'+Id_cliente).innerHTML = saldo;
                                                }

                                    estado.innerHTML = Estado;

                                    top.appendChild(numero);
                                    top.appendChild(estado);

                                var bottom = document.createElement('div');
                                    bottom.setAttribute('class','bottom');

                                var cliente = document.createElement('div');
                                    cliente.setAttribute('class','cliente');
                                    cliente.setAttribute('data-id_cliente',Id_cliente);
                                    cliente.setAttribute('data-documento',Documento);
                                    cliente.setAttribute('data-ciudad',Ciudad);
                                    cliente.setAttribute('data-telefono',Telefono);
                                    cliente.setAttribute('data-direccion',Direccion);
                                    cliente.innerHTML = Cliente;

                                var forma_pago = document.createElement('div');
                                    forma_pago.setAttribute('data-forma_pago',Forma_pago);
                                             if(Forma_pago===0){/* Contado */
                                                    Forma_pago = 'Contado';
                                                    forma_pago.setAttribute('class','forma_pago contado');
                                                }else{/* Crédito */
                                                    Forma_pago = 'Crédito';
                                                    forma_pago.setAttribute('class','forma_pago credito');
                                                }
                                    forma_pago.innerHTML = Forma_pago;

                                    bottom.appendChild(forma_pago);
                                    bottom.appendChild(cliente);

                                    item.appendChild(top);
                                    item.appendChild(bottom);
                                    document.getElementById('listFacturas').appendChild(item);
                    }/* Fin for */
            });
    
}

/* Detalle factura */
function getDetalle_factura(pmtId_factura){
    
        $.post('ctrlfactura',{Action:9,Id_factura:pmtId_factura},function(json){
            
            
            var json_detalle_factura = $.parseJSON($.trim(json));
            
                    /* Limpia filas del datagrid */
                    $('div#datagrid_detalle_factura div.fila').remove();
                    
                for(i in json_detalle_factura){
                            /* Paramétros */
                            var Id = json_detalle_factura[i].Id_detalle;
                            var Id_unidad = json_detalle_factura[i].Id_unidad;
                            var Tipo = parseInt(json_detalle_factura[i].Tipo);
                            var Id_fraccion = json_detalle_factura[i].Id_fraccion;
                            var Cantidad = json_detalle_factura[i].Cantidad;
                            var Precio_unidad = json_detalle_factura[i].Precio_unidad;
                            var Descuento = json_detalle_factura[i].Descuento;
                            var Iva = json_detalle_factura[i].Iva;
                            var Estado = json_detalle_factura[i].Estado;
                            var Id_producto = json_detalle_factura[i].Id_producto;
                            var Id_formula = json_detalle_factura[i].Id_formula;
                            var Descripcion = json_detalle_factura[i].Descripcion;
                            var Codigo = json_detalle_factura[i].Codigo;
                            var Unidad = json_detalle_factura[i].Unidad;
                            
                            var fila = document.createElement('div');
                                fila.setAttribute('class','fila');
                                fila.setAttribute('data-id_detalle',Id);
                                fila.setAttribute('data-estado',Estado);
                                fila.setAttribute('data-tipo',Tipo);
                                
                                    /* Tipo de fila */
                                switch(Tipo){
                                    case 0:/* Producto */
                                            fila.setAttribute('data-id_producto',Id_producto);
                                            fila.setAttribute('data-id_unidad_medida',Id_unidad);
                                        break;
                                    case 1:/* Fracción */
                                            fila.setAttribute('data-id_producto',Id_producto);
                                            fila.setAttribute('data-id_unidad_medida',Id_unidad);
                                            fila.setAttribute('id','fr'+Id_fraccion);
                                            fila.setAttribute('data-id_fraccion',Id_fraccion);
                                            fila.setAttribute('class','fila fraccion');
                                        break;
                                    case 2:/* Fórmula */
                                           
                                        break;
                                    case 3:/* Fórmula */
                                            fila.setAttribute('data-id_formula',Id_formula);
                                            fila.setAttribute('id','fm'+Id_formula);
                                            fila.setAttribute('class','fila formula');
                                        break;
                                }
                                
                                /* Iva */
                                fila.setAttribute('data-iva',Iva);

                                /* Código */
                            var codigo = document.createElement('div');
                                codigo.setAttribute('class','codigo');
                                codigo.innerHTML=Codigo;
                                /* Descripción */
                            var descripcion = document.createElement('div');
                                descripcion.setAttribute('class','descripcion');
                                descripcion.innerHTML=Descripcion;    
                                /* Unidad */
                            var unidad = document.createElement('div');
                                unidad.setAttribute('class','unidad');
                                unidad.innerHTML=Unidad;    
                                /* Precio_unidad */
                            var precio_unidad = document.createElement('div');
                                precio_unidad.setAttribute('class','precio_unidad');
                                precio_unidad.innerHTML=Precio_unidad; 
                                /* Cantidad */
                            var cantidad = document.createElement('div');
                                cantidad.setAttribute('class','cantidad');
                                cantidad.innerHTML=Cantidad; 
                                /* Descuento */
                            var descuento = document.createElement('div');
                                descuento.setAttribute('class','descuento');
                                descuento.innerHTML=Descuento; 
                                 /* Precio */
                            var precio = document.createElement('div');
                                precio.setAttribute('class','precio');
                                precio.innerHTML=parseInt(Cantidad)*parseInt(Precio_unidad); 
                                
                                fila.appendChild(codigo);
                                fila.appendChild(descripcion);
                                fila.appendChild(unidad);
                                fila.appendChild(precio_unidad);
                                fila.appendChild(cantidad);
                                fila.appendChild(descuento);
                                fila.appendChild(precio);
                                
                                document.getElementById('datagrid_detalle_factura').appendChild(fila);
                }
            
        });       
}

function set_list_productos_devoluciones(json_productos){
        
        /* Limpia lista */
        $('div#list_producto_factura div.item').remove();
        
        for(i in json_productos){
            
            var item = document.createElement('div');
                item.setAttribute('class','item');
                item.setAttribute('data-id_producto',json_productos[i].Id);
                item.setAttribute('data-id_medida',json_productos[i].Id_medida);
                item.innerHTML = json_productos[i].Descripcion;
                
                
                
                if(i>23){
                    item.setAttribute('class','item hidden');
                }
                
                document.getElementById('list_producto_factura').appendChild(item);

        }
    
}

function getAbonos(pmtId_factura){
    
            $.post('ctrlabono',{A:2,Id_factura:pmtId_factura},function(json_abono){
                    
                    console.log('json abonos: '+json_abono);
                    /* Limpia abonos*/
                     document.getElementById('list_abono').setAttribute('data-json_abono',json_abono);
                    
                //    var json_Abono = JSON.parse(json_abono);
                    
                  /*  for(i in json_Abono){
                        
                            var item = document.createElement('div');
                                item.setAttribute('class','item hidden');
                                item.setAttribute('data-id',json_Abono[i].Id);
                                item.setAttribute('data-id_factura',json_Abono[i].Id_encabezado_venta);
                                item.setAttribute('data-numero',json_Abono[i].Id);
                                item.setAttribute('data-valor',json_Abono[i].Valor);
                                item.setAttribute('data-fecha',json_Abono[i].Fecha);
                                item.innerHTML = json_Abono[i].Numero;

                            document.getElementById('list_abono').appendChild(item);
                    } */
                
            });
    
    
}