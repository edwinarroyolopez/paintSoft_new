    var json_Facturas_Compras;

function getFacturas_compra(){
    
        $.post('ctrlfactura',{Action:11},function(json_facturas_compra){
                
                console.log('json facturas compra: '+json_facturas_compra);
                
                /* Parse a Json js */
                json_facturas_compra = JSON.parse(json_facturas_compra);
                json_Facturas_Compras = json_facturas_compra;
                
                for(i in json_facturas_compra){
                       
                       var item = document.createElement('div');
                           item.setAttribute('class','item');
                           item.setAttribute('data-id_proveedor',json_facturas_compra[i].Id_proveedor);
                           item.setAttribute('data-documento',json_facturas_compra[i].Nit);
                           item.setAttribute('data','factura');
                           item.setAttribute('data-id_factura',json_facturas_compra[i].Id_factura);
                           item.setAttribute('data-valor',json_facturas_compra[i].Valor);
                           item.setAttribute('data-saldo',json_facturas_compra[i].Saldo);
                                /* Limita items visibles a 15*/
                                    if(i>15){
                                           item.setAttribute('class','item hidden');
                                    }
                           
                           /* Top */
                       var top = document.createElement('div');
                           top.setAttribute('class','top');
                           
                                    /* Top - Left */
                                 var numero = document.createElement('div');
                                     numero.setAttribute('class','numero');
                                     numero.innerHTML = json_facturas_compra[i].Numero;
                                 var estado = document.createElement('div');
                                     
                                         /* Validar estado */
                                             var state = parseInt(json_facturas_compra[i].Estado);
                                                 if(state===0){
                                                     state = 'Abierta';
                                                     estado.setAttribute('class','estado abierta');
                                                     
                                                  var saldo =  parseInt(document.getElementById('s'+json_facturas_compra[i].Id_proveedor).innerHTML);
                                                      saldo = saldo + json_facturas_compra[i].Saldo;
                                                      document.getElementById('s'+json_facturas_compra[i].Id_proveedor).innerHTML = saldo;
                                                     
                                                 }else{
                                                     state = 'Cerrada';
                                                     estado.setAttribute('class','estado cerrada');
                                                 }
                                                 
                                                 
                                     estado.innerHTML = state;

                                     top.appendChild(numero);
                                     top.appendChild(estado);
                           /* Bottom */
                           var bottom = document.createElement('div'); 
                               bottom.setAttribute('class','bottom');
                               
                                var forma_pago = document.createElement('div');
                                    forma_pago.setAttribute('class','forma_pago');
                                    /* Validar forma de pago */
                                        var setForma_pago = parseInt(json_facturas_compra[i].Forma_pago);
                                    forma_pago.setAttribute('data-forma_pago',setForma_pago);
                                            if(setForma_pago===0){
                                                setForma_pago = 'Contado';
                                            }else{
                                                setForma_pago = 'Crédito';
                                            }
                                    forma_pago.innerHTML = setForma_pago;
                                var razon_social = document.createElement('div');
                                    razon_social.setAttribute('class','razon_social');
                                    razon_social.innerHTML = json_facturas_compra[i].Razon_social;
                                    
                                    bottom.appendChild(forma_pago);
                                    bottom.appendChild(razon_social);
                                    
                                    item.appendChild(top);
                                    item.appendChild(bottom);
                               
                           document.getElementById('listFacturas').appendChild(item);
                }
                
        });    
}/*  ---> get Facturas */




$(document).on('ready',function(){
    
          /* Cargar facturas */
                setTimeout(function(){
                      setProveedores_listFactura(json_proveedores);
                      getFacturas_compra();
                },3000);
                
        
        
            $('div#buscador_facturas').on('focusin','input#txt_buscador_factura',function(e){
                $('div#listFacturas').removeClass('hidden');
            }); /* Focus in txt buscador factura */


            $('div#buscador_facturas').on('focusout','input#txt_buscador_factura',function(e){
                setTimeout(function(){ $('div#listFacturas').addClass('hidden');},200);
            }); /* Focus out txt buscador factura */
        
          $('div#buscador_facturas').on('keypress','input#txt_buscador_factura',function(e){
         
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#listFacturas div.item',filtro,15);
        });       
        /* Keydown ---> tct_buscador_formula */
        $('div#buscador_facturas').on('keydown','input#txt_buscador_factura',function(e){

                      if(e.keyCode===8){/* Retroceso */
                           var filtro = $(this).val();
                               filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                               buscar_texto_list('div#listFacturas div.item',filtro,15);
                      }
        });
        
        $('div#listFacturas').on('click','div.item',function(){
            
            
                           /* Eliminar residuos de  navegación */
                         $('div#contenido_factura').removeClass('pos_proveedor');
                         $('div#contenido_factura').removeClass('pos_factura');
                         $('div#contenido_factura').removeClass('pos_pendientes');
                    
            
                    var data = $(this).attr('data');
                    
                      var id_proveedor = parseInt($(this).attr('data-id_proveedor'));
                      
                      if(data==='factura'){
                                    /* Colocar el contenido de factura en posición: Factura */
                                    $('div#contenido_factura').addClass('pos_factura');

                                    var documento = $(this).attr('data-documento');
                                    var razon_social = $(this).children('div.bottom').children('div.razon_social').text();


                                    var numero = $(this).children('div.top').children('div.numero').text();
                                    var id_factura = $(this).attr('data-id_factura');
                                    var estado =$(this).children('div.top').children('div.estado').text();
                                    var forma_pago = $(this).children('div.bottom').children('div.forma_pago').attr('data-forma_pago');
                                        forma_pago = parseInt(forma_pago);
                                    var valor = $(this).attr('data-valor');;
                                    var saldo =$(this).attr('data-saldo');
                                        
                                        
                                          /* Habilita button add Abono */
                                                $('div#btnAdd_abono_factura').removeClass('hidden');
                                                    if(forma_pago>0){/* Trae abonos */
                                                       getAbonos_compra(id_factura);
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
                                        
                                    /* setter --- Factura */
                                    document.getElementById('fatura_detalle').innerHTML = numero;
                                    document.getElementById('fatura_detalle').setAttribute('data-id_factura',id_factura);
                                    document.getElementById('estado_factura').innerHTML = estado;
                                    document.getElementById('forma_pago_factura').innerHTML = forma_pago;
                                    document.getElementById('valor_factura').innerHTML = valor;
                                    document.getElementById('saldo_factura').innerHTML = saldo;
                                    /* setter --- Proveedor */
                                    document.getElementById('fd_documento').innerHTML = documento;
                                    document.getElementById('fd_proveedor').innerHTML = razon_social;
                                    document.getElementById('fd_proveedor').setAttribute('data-id_proveedor',id_proveedor);
                                    
                                    /* Trae el detalle de la factura comprada y lo setea en el datagrid */
                                    getFactura_detalle_compra(id_factura);
                          
                      }else{/* Proveedor */
                          
                                 /* Colocar el contenido de factura en posición: Proveedor */
                             $('div#contenido_factura').addClass('pos_proveedor');
                             
                            var proveedor = $(this).children('div.top').children('div.proveedor').text();
                            var documento = $(this).children('div.bottom').children('div.documento').text();
                            var saldo = $(this).children('div.bottom').children('div.saldo').text();

                            document.getElementById('proveedor_descripcion').innerHTML = proveedor;
                            document.getElementById('proveedor_descripcion').setAttribute('data-id_proveedor',id_proveedor);
                            document.getElementById('proveedor_documento').innerHTML = documento;
                            document.getElementById('proveedor_saldo').innerHTML = saldo;

                            /* Cargar facturas relacionadas con este proveedor */
                                var json = json_Facturas_Compras;
                                    /* Limpia el contenedor para agregarle nuevas facturas */
                                    $('div#facturas_proveedor div.factura').remove();
                               
                                for(i in json){
                                                
                                                 var Id_proveedor = parseInt(json[i].Id_proveedor);
                                                        
                                                    if(id_proveedor===Id_proveedor){
                                                        

                                                                /* Crear facturas del proveedor */
                                                                        var Id_factura = json[i].Id_factura;
                                                                        var Numero = json[i].Numero;
                                                                        var Estado = parseInt(json[i].Estado);
                                                                            if(Estado===0){
                                                                                    Estado='Abierta';
                                                                            }else{
                                                                                    Estado='Cerrada';
                                                                            }
                                                                        
                                                                        var Valor = json[i].Valor;
                                                                        var Saldo = json[i].Saldo;

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
                                                                                var Forma_pago = parseInt(json[i].Forma_pago);
                                                                            forma_pago.setAttribute('data-forma_pago',Forma_pago);    
                                                                            
                                                                                        switch(Forma_pago){
                                                                                            case 0: Forma_pago = 'Contado';
                                                                                                break;
                                                                                            case 1: Forma_pago = '8 Días';
                                                                                                break;
                                                                                            case 2:Forma_pago = '15 Días';
                                                                                                break; 
                                                                                            case 3:Forma_pago = '30 Días';
                                                                                                break;
                                                                                        }
                                                                            
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

                                                                            document.getElementById('facturas_proveedor').appendChild(factura);
                                                       }
                                                
                                }
                          
                      }
            
        });
            /* Secciona una factura dentro de la lista de facturas de un proveedor */
        $('div#facturas_proveedor').on('click','div.factura',function(){
                            
                            /* Se mueve hacía detalle de factura */
                            $('div#contenido_factura').addClass('pos_factura');
                            
                            var id_proveedor = document.getElementById('proveedor_descripcion').getAttribute('data-id_proveedor');
                            var documento = document.getElementById('proveedor_documento').innerHTML;
                            var razon_social = document.getElementById('proveedor_descripcion').innerHTML;
                            
                            var numero = $(this).children('div.numero').text();
                            var id_factura = $(this).attr('data-id_factura');
                            var estado =$(this).children('div.estado').text();
                            var forma_pago = $(this).children('div.forma_pago').text();
                            var valor = $(this).children('div.valor').children('div').text();
                            var saldo =$(this).children('div.valor').attr('data-saldo');
                            
                            /* setter --- Factura */
                            document.getElementById('fatura_detalle').innerHTML = numero;
                            document.getElementById('fatura_detalle').setAttribute('data-id_factura',id_factura);
                            document.getElementById('estado_factura').innerHTML = estado;
                            document.getElementById('forma_pago_factura').innerHTML = forma_pago;
                            document.getElementById('valor_factura').innerHTML = valor;
                            document.getElementById('saldo_factura').innerHTML = saldo;
                            /* setter --- Proveedor */
                            document.getElementById('fd_documento').innerHTML = documento;
                            document.getElementById('fd_proveedor').innerHTML = razon_social;
                            document.getElementById('fd_proveedor').setAttribute('data-id_proveedor',id_proveedor);
                            
                            
                            /* Trae abonos de factura seleccionada */
                                 forma_pago = parseInt($(this).children('div.forma_pago').attr('data-forma_pago'));
                                 if(forma_pago>0){/* Trae abonos */
                                         getAbonos_compra(id_factura);
                                     }
        });/* Selecciona una factura dentro de la lista de facturas de un proveedor */
        
        
        $('div#accion_detalle_factura').on('click','div#btnAdd_abono_factura',function(){
                
                        /* Hace visible el contenedor dende se relaizan los abonos */
                    $('div#content_add_abono_factura').removeClass('hidden');
                    
                    /* set encabezado abonos */
                    var proveedor = document.getElementById('fd_proveedor').innerHTML;
                    var saldo = document.getElementById('saldo_factura').innerHTML;
                    
                    $('div#content_proveedor_factura').children('div.value').text(proveedor);
                    $('div#content_saldo_factura').children('div.value').text(saldo);
                    
                    
                    
        });/* Abre sector de abonos */
            
        $('div#content_add_abono_factura').on('click','div#btnClose_abono',function(){
                        /* Hace visible el contenedor dende se relaizan los abonos */
                    $('div#content_add_abono_factura').addClass('hidden');
                    
        });/* Cierra sector de abonos */
        
        
        $('div#set_abono').on('click','div#btn_realizar_abono',function(){
            
                    /* Parámetros */
                    var id_factura = document.getElementById('fatura_detalle').getAttribute('data-id_factura');
                    var valor = document.getElementById('txt_valor_abono').value;
                    var medio = document.getElementById('txt_medio_abono').value;
                    var receptor = document.getElementById('txt_receptor_abono').value;
                    var responsable = document.getElementById('txt_responsable_abono').value;

                    $.post('ctrlabono',{A:4,Id_factura:id_factura,
                                        Valor:valor,Medio:medio,Receptor:receptor,
                                        Responsable:responsable},function(r){

                    });
                            
                            /* Limpia campos */;
                        document.getElementById('txt_valor_abono').value = '';
                        document.getElementById('txt_medio_abono').value = '';
                        document.getElementById('txt_receptor_abono').value = '';
                        document.getElementById('txt_responsable_abono').value = '';

            
            
        });/* Realizar abono abono*/
    
});/* Fin --> Ready*/



function setProveedores_listFactura(json_proveedores){

                for(i in json_proveedores){
                        /* Contenido del json clientes */
                        var Id = json_proveedores[i].Id;
                        var Nombre = json_proveedores[i].Razon_social;
                        var Documento = json_proveedores[i].Nit ;
                        var Telefono = json_proveedores[i].Telefono_1;
                 /*           var Email = json_clientes[i].Email;  */
                        var Direcion = json_proveedores[i].Direccion;
                        var Ciudad = json_proveedores[i].Ciudad;         
                        

                        /* Crear item */
                        var item = document.createElement('div');
                            item.setAttribute('class','item');
                            item.setAttribute('data','proveedor');
                            item.setAttribute('data-telefono',Telefono);
                            item.setAttribute('data-ciudad',Ciudad);
                            item.setAttribute('data-direccion',Direcion);
                            item.setAttribute('data-id_proveedor',Id);
                            
                        var proveedor = document.createElement('div');
                            proveedor.setAttribute('class','proveedor');
                            proveedor.innerHTML = Nombre;


                            /* Cupo ---> Pendiente */

                        var top = document.createElement('div');
                            top.setAttribute('class','top');
                            top.appendChild(proveedor);
                            
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
    }/* Busca texto dentro de list */

function getFactura_detalle_compra(pmtId_factura){
    
            /* Limpia filas del datagrid */
                $('div#datagrid_detalle_factura div.fila').remove();
            
            $.post('ctrlfactura',{Action:12,Id_factura:pmtId_factura},function(json_detalle_compra){
                   
                        /*
                                "{\"Id_detalle\":"+Id_detalle+
                                ",\"Id_encabezado_factura\":"+Id_encabezado_factura+
                                ",\"Id_unidad\":"+Id_unidad+
                                ",\"Cantidad\":"+Cantidad+
                                ",\"Precio_unidad\":"+Precio_unidad+
                                ",\"Descuento\":"+Descuento+
                                ",\"Iva\":"+Iva+
                                ",\"Estado\":"+Estado+
                                ",\"Id_producto\":"+Id_producto+
                                ",\"Descripcion\":\""+Descripcion+
                                "\",\"Codigo\":\""+Codigo+ 
                                "\",\"Unidad\":\""+Unidad+"\"}";
                        */
                       
                       json_detalle_compra = JSON.parse(json_detalle_compra);
                       
                       for(i in json_detalle_compra){

                                    /* setter datagrid */
                                    var fila = document.createElement('div');
                                        fila.setAttribute('class','fila');
                                        fila.setAttribute('data-id_detalle',json_detalle_compra[i].Id_detalle);
                                        fila.setAttribute('data-id_producto',json_detalle_compra[i].Id_producto);
                                        fila.setAttribute('data-id_unidad',json_detalle_compra[i].Id_unidad);

                                            /* Código */
                                        var codigo = document.createElement('div');
                                            codigo.setAttribute('class','codigo');
                                            codigo.innerHTML = json_detalle_compra[i].Codigo;
                                            /* Descripcion */
                                        var descripcion = document.createElement('div');
                                            descripcion.setAttribute('class','descripcion');
                                            descripcion.innerHTML = json_detalle_compra[i].Descripcion;
                                            /* Unidad */
                                        var unidad = document.createElement('div');
                                            unidad.setAttribute('class','unidad');
                                            unidad.innerHTML = json_detalle_compra[i].Unidad;
                                            /* Precio unidad */
                                        var precio_unidad = document.createElement('div');
                                            precio_unidad.setAttribute('class','precio_unidad');        
                                            precio_unidad.innerHTML = json_detalle_compra[i].Precio_unidad;
                                            /* Cantidad */
                                        var cantidad = document.createElement('div');
                                            cantidad.setAttribute('class','cantidad');
                                            cantidad.innerHTML = json_detalle_compra[i].Cantidad;
                                            /* Descuento */
                                        var descuento = document.createElement('div');
                                            descuento.setAttribute('class','descuento');
                                            descuento.innerHTML = json_detalle_compra[i].Descuento;
                                            /* Precio */
                                        var precio = document.createElement('div');
                                            precio.setAttribute('class','precio');
                                                    var Precio = parseInt(json_detalle_compra[i].Cantidad)*parseInt(json_detalle_compra[i].Precio_unidad);
                                            precio.innerHTML = Precio;

                                            /* set a fila */
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

function getAbonos_compra(pmtId_factura){
        
        /**/
        $.post('ctrlabono',{A:5,Id_factura:pmtId_factura},function(json_abonos){
            /* setea el json en esta etiqueta ;) */
                document.getElementById('content_abonos_factura').setAttribute('data-json_abonos',json_abonos);
          });
        
}/* Trae abonos de una factura de compra */