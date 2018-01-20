var consecutivo_Factura;

/* Resumen de  factura ---> Variables globales */
        var gValor_neto = 0;
        var gDescuento = 0;
        var gSubtotal = 0;
        var gIva = 0;
        var gTotal = 0;
    /* Resumen de  factura ---> Variables globales */

function set_valor_formula(pmtPrecio_unidad,pmtCantidad,pmtDescuento,pmtIva){
    
                   
                   var precio = pmtPrecio_unidad*(1 - pmtDescuento)*pmtCantidad;
                       precio = parseInt(precio);
    
                    /* Resumen factura  */
                    gValor_neto = gValor_neto + pmtPrecio_unidad*pmtCantidad;
                    gDescuento = gDescuento + parseInt(pmtDescuento*pmtCantidad*pmtPrecio_unidad);
                    gSubtotal = gValor_neto - gDescuento;
                    gIva = gIva + parseInt(precio*pmtIva);
                    gTotal = gSubtotal + gIva;
                   
                    document.getElementById('info_valor_neto').innerHTML = gValor_neto;
                    document.getElementById('info_descuento').innerHTML= gDescuento;
                    document.getElementById('info_subtotal').innerHTML= gSubtotal;
                    document.getElementById('info_iva').innerHTML= gIva;
                    document.getElementById('info_total').innerHTML= gTotal;
    
}

function limpiar_totalizadores(){
          gValor_neto = 0;
          gDescuento = 0;
          gSubtotal = 0;
          gIva = 0;
          gTotal = 0;
}


/* jQuery ******* jQuery ******* jQuery ******* jQuery */
$(document).on('ready', function(){
    
    
    /* Cargar fecha de factura*/
    fechaFactura();
    function fechaFactura(){
        var Hoy =   new Date();
        var dd = Hoy.getDate();
        var mm = Hoy.getMonth()+1; //hoy es 0!
        var yyyy = Hoy.getFullYear();
        /* Dar formato */
        if(dd<10) {dd='0'+dd} 
        if(mm<10) {mm='0'+mm} 
        document.getElementById('txtFecha').value = dd+'/'+mm+'/'+yyyy;
        
        yyyy = yyyy.toString().substring(2,4);
        consecutivo_Factura = mm+dd+yyyy;
       // var fecha = dd+'/'+mm+'/'+yyyy;
      //   $.post('ctrlfactura',{fmPago: 3,Fecha: fecha,Action: 5}, function(response){});
        
    }
    
    getConsecutivo();
    
    function getConsecutivo(){
      //  document.getElementById('txtFactura').value = consecutivo_Factura;
        fechaFactura();
        /* Buscar si existe... Cuantas facturas se han guardado hoy! ---> El numero + 1 Define el consecutivo */
         var fecha = document.getElementById('txtFecha').value;
        
        $.post('ctrlfactura',{Action:0,Fecha:fecha},function(r){
            
            var consecutivo = parseInt(r)+1;
            
            
            if(consecutivo<10){
                consecutivo_Factura = consecutivo_Factura + '00'+consecutivo;
            }else if(consecutivo>=10 && consecutivo<100){
                consecutivo_Factura = consecutivo_Factura + '0'+consecutivo;
            }else{
                consecutivo_Factura = consecutivo_Factura +consecutivo;
            }
            
            document.getElementById('txtFactura').value = consecutivo_Factura;
            
        })
        
    }
    
    
    
    /*  TABS NAVEGACION  */
        $('div.tabMenu').on('click','div.tab',function(){


                   /* Tab Select*/                 
                   $("div.tab").removeClass('isSelect');/* Quita la selección en las tabs*/
                   $(this).addClass('isSelect');/* Selecciona esta tab */
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');
                   
                   
                   var Opcion = $(this).text();
                   
                   console.log('Opcion: '+Opcion);
                   
            /* DETERMINAR CUAL DE LOS FORMULARIOS SE HARÁ VISIBLE SEGUN LA TAB SELECCIONADA */
                   switch(Opcion){
                       case 'Facturas': 
                                $('div#frmFactura').addClass('isVisible'); 
                                   getFacturas_venta();
                                   /* Crea lista de productos para devoluciones */
                                   set_list_productos_devoluciones(Json_Productos);
                           break;
                        case 'Nueva venta': 
                                 $('div#frmVenta').addClass('isVisible');
                                  adaptarTamanoBuscador();
                           break;
                       case 'Descripcion': 
                                 $('div#frmDescripcion').addClass('isVisible');
                           break;
                       case 'Configuración': 
                                 $('div#frmConfiguracion').addClass('isVisible');
                                 /* Aquí debería cargar los productos: venta_configuracion.js */
                                 carga_productos_configuracion();
                           break;
                       case 'Ventas realizadas': 
                                 $('div#frmVentas_realizadas').addClass('isVisible');
                                 /* Aquí debería cargar los productos: venta_configuracion.js */
                                 
                           break;   
                   }
            
            var id = $(this).attr('id');


        });
     /* END ***  TABS NAVEGACION  *** END */
     
  

    /*   BUSQUEDA CON CAJA DE TEXTO   */
        
        /* Key press */
              $('div#frmBusqueda').on('keypress','input#txtSearch',function(e){
                 
                 var texto = $(this).val()+e.key;
                 
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                 
                  buscaProveedor(texto);
              
             });
             
         /* Key down */
         $('div#frmBusqueda').on('keydown','input#txtSearch',function(e){
                  
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                  
                if(e.keyCode==8){/* Retroceso */
                    var texto = $(this).val();
                    texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                    buscaProveedor(texto);
                }
               });
               
               
               
         /* Busca proveedor */
         function buscaProveedor(texto){
               
                        $("div#frmBusqueda div.item").each(function(){
                           /* Saca el id de cada item */
                            var id = $(this).attr('id');
                            var razon_social = $('div#'+id+' div.razon_social').text();/* Extrae la razon social*/

                            if (razon_social.indexOf(texto)!=-1) {
                                    $(this).removeClass('proveedorHidden');
                             }else{
                                    $(this).addClass('proveedorHidden');
                             }
                        });
           }
        
    /* END ***  BUSQUEDA CON CAJA DE TEXTO *** END  */

    
    /* Venta */
    function adaptarTamanoBuscador(){
        var height = $('div#mVenta').css('height');
        var width = $('div#mVenta').css('width');
       $('div#buscador').css('height',height);
       $('div#buscador').css('width',width);
    }
    /* Busquedas --- */
    $('div.marco').on('click','div.field',function(){
        
        var Id = $(this).attr('id');
        switch (Id){
            case 'sCliente':
                adaptarTamanoBuscador();
                $('div#buscador').addClass('isVisible');
                $('div#buscador').attr('data-objeto','Cliente');
                $('input#txtSearch').attr('data-objeto','Cliente');
                 document.getElementById('lblSelectObject').innerHTML= 'Seleccionar cliente';
                 document.getElementById('txtSearch').setAttribute('placeholder','Seleccione cliente');
                /* Busqueda ---> Sql */
         
                        $.post('ctrlcliente',{
                                            Action: 2
                                        }, function(response){
                                      
                              var jSon =   jQuery.parseJSON($.trim(response));
                              
                              document.getElementById('results').innerHTML = "";
                              for (i in jSon){
                              //   alert("Id: "+jSon[i].Id+" Nombre: "+jSon[i].Nombre +" Documento: "+jSon[i].Documento);
                                     var item = document.createElement('div');
                                     item.setAttribute('class','item');
                                      item.setAttribute('data-id',jSon[i].Id);
                                     var nombre = document.createElement('div');
                                     nombre.setAttribute('class','nombre');
                                     nombre.innerHTML = jSon[i].Nombre;
                                     var documento = document.createElement('div');
                                     documento.setAttribute('class','documento');
                                     documento.innerHTML = jSon[i].Documento;
                                     item.appendChild(nombre);
                                     item.appendChild(documento);
                                     document.getElementById('results').appendChild(item);
                               }
                                           
                        });
                    
                break;
            case 'sProducto':
                  adaptarTamanoBuscador();
                $('div#buscador').addClass('isVisible');
                $('div#buscador').attr('data-objeto','Producto');
                $('input#txtSearch').attr('data-objeto','Producto');
                 document.getElementById('lblSelectObject').innerHTML= 'Seleccionar producto';
                 document.getElementById('txtSearch').setAttribute('placeholder','Seleccione producto');
                /* Limpia busqueda */
                 document.getElementById('results').innerHTML = "";
                 /* Busqueda de productos */
                  $.post('ctrlproducto',{
                                            Action: 2
                                        }, function(response){
                                      
                              var jSon =   jQuery.parseJSON($.trim(response));
                              
                              document.getElementById('results').innerHTML = "";
                              for (i in jSon){
                              //   alert("Id: "+jSon[i].Id+" Nombre: "+jSon[i].Nombre +" Documento: "+jSon[i].Documento);
                                     var item = document.createElement('div');
                                     item.setAttribute('class','item');
                                     item.setAttribute('data-id',jSon[i].Id);
                                     var descripcion = document.createElement('div');
                                     descripcion.setAttribute('class','descripcion');
                                     descripcion.innerHTML = jSon[i].Descripcion;
                                     var codigo = document.createElement('div');
                                     codigo.setAttribute('class','codigo');
                                     codigo.innerHTML = jSon[i].Codigo;
                                     item.appendChild(descripcion);
                                     item.appendChild(codigo);
                                     document.getElementById('results').appendChild(item);
                               }
                                           
                        });   
                    
                    
               break;
        }
        
        
    });
    /* Seleccion de item */
    $('div#buscador').on('click','div#search div.item',function(){
       
       var objeto = document.getElementById('txtSearch').getAttribute('data-objeto');
        alert(objeto);
        
        switch(objeto){
            case 'Cliente':
                    /* Objeto: Cliente */
                    var nombre = $(this).children('div.nombre');
                    var documento = $(this).children('div.documento');
                    document.getElementById('txtNombre').innerHTML = nombre.html();
                    document.getElementById('txtDocumento').innerHTML = documento.html();

                break;
            case 'Producto':
                    var descripcion = $(this).children('div.descripcion');
                    var codigo = $(this).children('div.codigo');
                    document.getElementById('txtProducto').innerHTML = descripcion.html();
                    document.getElementById('txtCodigo').innerHTML = codigo.html();
                break;
        }
                    /* Quitar buscador */
               $('div#buscador').removeClass('isVisible');
              
    });
    
    /* Filtro: txtSearch */
    $('div#buscador').on('keypress','input#txtSearch',function(e){
        
        
        /* Cliente */
          var valor = $(this).val()+e.key;
          var filtro;
          if( isNaN(valor) ) {
                filtro = "div.nombre";
          }else{
              filtro = "div.documento";
          }
          
       
           $("div#search div.item").each(function(){
                           /* Saca el id de cada item */
                            var vFiltro = $(this).children(filtro).html();
               
                            if (vFiltro.indexOf(valor)!=-1) {
                                    $(this).removeClass('isHidden');
                             }else{
                                    $(this).addClass('isHidden');
                             }
                             
            });
        
        
    });
    
    /* Búsqueda de productos */
     /* Key press */
              $('div#buscador').on('keypress','input#txtSearch_Producto',function(e){
                 
                 var texto = $(this).val()+e.key;
                 
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                 // buscaProveedor(texto);
              
             });
             
         /* Key down */
         $('div#buscador').on('keydown','input#txtSearch_Producto',function(e){
                  
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                  
                if(e.keyCode==8){/* Retroceso */
                    var texto = $(this).val();
                    texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                   buscaProveedor(texto);
             }
               });
               
               
    /*  Button Add Item  */
    $('div.contentButton').on('click','div#btnAddItem',function(){
                
                /* Actualiza el consecutivo */
                     getConsecutivo();
                
                
                /* Validación ---> Cajas de texto */
                    var control = 0;
                    $('div.set_Producto input').each(function(){
                        
                            if($(this).val()===''){/* La caja está vacía? */
                                control = control + 1;
                                $(this).focus();
                            }
                    });
                    
                    if(control>0){/* Si hay alguna caja vacía: Impide que la fila ingrese al dataGrid */
                        console.log('Error: Caja vacía!');
                        return;
                    }
                   
                   var id_producto = document.getElementById('info_descripcion').getAttribute('data-id');
                   var descripcion = document.getElementById('info_descripcion').innerHTML;
                   var codigo = document.getElementById('info_descripcion').getAttribute('data-codigo');
                   var unidad = document.getElementById('txt_sell_Unidad').value;
                   var id_unidad = document.getElementById('txt_sell_Unidad').getAttribute('data-id');
                   var tipo = parseInt(document.getElementById('txt_sell_Unidad').getAttribute('data-tipo'));
                   var cantidad = parseInt(document.getElementById('txt_sell_Cantidad').value);
                   var precio_unidad = parseInt(document.getElementById('txt_sell_Precio').value);
                   var descuento = parseFloat(document.getElementById('txt_sell_Descuento').value)/100;
                   var iva = 0;
                   
                   var precio = precio_unidad*(1 - descuento)*cantidad;
                       precio = parseInt(precio);
                       
                   /* Resumen factura  */
                    gValor_neto = gValor_neto + precio_unidad*cantidad;
                    gDescuento = gDescuento + parseInt(descuento*cantidad*precio_unidad);
                    gSubtotal = gValor_neto - gDescuento;
                    gIva = gIva + parseInt(precio*iva);
                    gTotal = gSubtotal + gIva;
                                     
                   /* Validar ---> : No repetir filas */
                   var id_fila = 'p'+id_producto+'u'+id_unidad;
                   
                   if(tipo>0){/* Fracción */
                       id_fila = id_fila+'f';
                   }
                   
                   
                    if ($("div#"+id_fila).length) {/* Existe un item: Actualizar fila  */
                        
                        /* Sacar el valor de la fila de la totalización --> */
                    var precio_anterior = parseInt($("div#"+id_fila).children('div.precio').children('div').text());  
                    var descuento_anterior = parseInt($("div#"+id_fila).children('div.descuento').text()); 
                    
                   
                            gValor_neto = gValor_neto - precio_anterior;
                            console.log('Total a: '+gTotal);
                            gSubtotal = gSubtotal - precio_anterior;
                            gTotal = gSubtotal + gIva;
                            
                            console.log('Total despues: '+gTotal);
                            console.log('Precio anterior: '+precio_anterior);
                        
                        $("div#"+id_fila).children('div.unidad').html(unidad);
                        $("div#"+id_fila).children('div.precio_unidad').children('div').html(precio_unidad);  
                        $("div#"+id_fila).children('div.cantidad').html(cantidad);
                        $("div#"+id_fila).children('div.descuento').html(descuento);
                        $("div#"+id_fila).children('div.precio').children('div').html(precio);    
                        $("div#"+id_fila).attr('data-tipo',tipo);
                        
                        
                            if(tipo>0){/* Fracción */
                                var restante = parseFloat(document.getElementById('Item_empezado').getAttribute('data-restante'));
                                var resta_inventario = document.getElementById('Item_empezado').getAttribute('data-resta_inventario');
                                var id_fraccion = document.getElementById('txt_sell_Unidad').getAttribute('data-id_fraccion');
                                
                                    console.log('Resta de inventario: '+resta_inventario);
                                    
                                 $("div#"+id_fila).attr('data-id_fraccion',id_fraccion);
                                 $("div#"+id_fila).attr('data-restante',restante);
                                 $("div#"+id_fila).attr('data-resta_inventario',resta_inventario);
                            }else{/* Eliminar datos de Fraccion */
                                 $("div#"+id_fila).removeAttr('data-id_fraccion');
                                 $("div#"+id_fila).removeAttr('data-restante');
                                 $("div#"+id_fila).removeAttr('data-resta_inventario');
                            }
                        
                   }else{  
                        addRow(id_fila,id_producto,id_unidad,tipo,descripcion,codigo,unidad,cantidad,precio_unidad,iva,descuento,precio);
                    }
                    
                    /* Variables totalizadoras  */
                    document.getElementById('info_valor_neto').innerHTML = gValor_neto;
                    document.getElementById('info_descuento').innerHTML= gDescuento;
                    document.getElementById('info_subtotal').innerHTML= gSubtotal;
                    document.getElementById('info_iva').innerHTML= gIva;
                    document.getElementById('info_total').innerHTML= gTotal;
                    
                    
                
                   /***  Limpiar campos  ***/
                                            /* Unidad de medida */
                       document.getElementById('txt_sell_Unidad').value = '';
                      // document.getElementById('txt_sell_Unidad').removeAttribute('data-id_fraccion');
                     //  document.getElementById('txt_sell_Unidad').removeAttribute('data-id');
                     //  document.getElementById('txt_sell_Unidad').removeAttribute('data-tipo');
                       
                       document.getElementById('txt_sell_Cantidad').value = '';
                       document.getElementById('txt_sell_Precio').value = '';
                       document.getElementById('txt_sell_Descuento').value = '';
                       $('div#Item_empezado').children('div.label').addClass('hidden');
                       
                      // document.getElementById('txt_search_producto').focus();
                       
                       
                   
               });
               
               function addRow(pmtId_fila,pmtId_producto,pmtId_unidad,pmtTipo,pmtDescripcion,pmtCodigo,pmtUnidad,
                               pmtCantidad,pmtPrecio_unidad,pmtIva,pmtDescuento,pmtPrecio){
                   
                   
                   
                   var fila = document.createElement('div');
                       fila.setAttribute('class','fila');
                       fila.setAttribute('data-idproducto',pmtId_producto);
                       fila.setAttribute('id',pmtId_fila);
                       fila.setAttribute('data-idunidad',pmtId_unidad);
                       fila.setAttribute('data-tipo',pmtTipo);
                       fila.setAttribute('data-iva',pmtIva);
                       fila.setAttribute('data-descuento',pmtDescuento);
                       
                       if(pmtTipo>0){/* Fracción */
                           var restante = document.getElementById('Item_empezado').getAttribute('data-restante');
                           var resta_inventario = document.getElementById('Item_empezado').getAttribute('data-resta_inventario');
                           var id_fraccion = document.getElementById('txt_sell_Unidad').getAttribute('data-id_fraccion');
                             fila.setAttribute('data-id_fraccion',id_fraccion);
                             fila.setAttribute('data-restante',restante);
                             fila.setAttribute('data-resta_inventario',resta_inventario);
                       }
                       
                   /* Codigo */    
                   var codigo = document.createElement('div');    
                       codigo.setAttribute('class','codigo');
                       codigo.innerHTML = pmtCodigo;
                   /* Descripción */
                   var descripcion = document.createElement('div');    
                       descripcion.setAttribute('class','descripcion');
                   var div_descripcion = document.createElement('div');
                       div_descripcion.innerHTML = pmtDescripcion;
                       descripcion.appendChild(div_descripcion);
                   /* Unidad */    
                   var unidad = document.createElement('div');    
                       unidad.setAttribute('class','unidad');
                       unidad.setAttribute('data-id',pmtId_unidad);
                       unidad.innerHTML = pmtUnidad;    
                   /* Precio Unidad */
                   var precio_unidad = document.createElement('div');    
                       precio_unidad.setAttribute('class','precio_unidad');
                   var div_precio_unidad = document.createElement('div');    
                       div_precio_unidad.innerHTML = pmtPrecio_unidad;
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
                       
               }
               
        $('div#frmVenta').on('click','div#btnAlmacenar',function(e){
                    
                     
                    /* Validaciones ---> Cliente */
                        var id_cliente = document.getElementById('fila_cliente').getAttribute('data-id');
                        console.log('Id cliente: ' + id_cliente);
                        if(id_cliente === null){
                                /* Evita que continúe con el proceso de almacenamiento, porque no ha seleccionado
                                  un cliente */
                                document.getElementById('txt_search_cliente').focus();
                                return;
                        }
                    
                    /* Validaciones ---> Productos */
                        var cantidad_formulas = $('div#dataProducto div.row_formula').length;
                        var cantidad_productos = $('div#dataProducto div.fila').length;
                    
                        if((cantidad_formulas===0) && (cantidad_productos===0) ){
                                /* Se detiene el proceso de almacenamiento hasta que seleccione un producto */
                                document.getElementById('txt_search_producto').focus();
                                return;
                        }
                        
                        
                        /* Validar forma de pago */
                         var forma_pago = parseInt(document.getElementById('fmPago').getAttribute('data-value'));
                        
                         if((forma_pago<0) ){
                                /* Se detiene el proceso de almacenamiento hasta que seleccione una forma de pago */
                                $('div#fmPago').addClass('fm_pago_error');
                                return;
                        }
            
                          /* if ( typeof x === 'undefined') 
                             if(id_formula !== void 0){ */
                    
                    /* Crea los json para cada grupo*/
                     var json_encabezado = get_json_encabezado();
                     var json_detalle_producto = JSON.stringify(get_json_detalle_producto()); 
                     var json_detalle_formula = JSON.stringify(get_json_detalle_formula());/* Convierte en Strin al Json */

               
                 $.post('ctrlfactura',{Action:6,JSON_encabezado:json_encabezado,
                                       JSON_detalle_producto:json_detalle_producto,
                                       JSON_detalle_formula:json_detalle_formula},function(r){ });


                                var factura = document.getElementById('txtFactura').value;
                                  limpiar_campos();
                                  limpiar_totalizadores();

                             /* Abrir factura en una nueva pestaña */
                                 setTimeout(function(){
                                     var a = document.createElement('a');
                                     a.target ='_blank';
                                     a.href = '/paintSoft/pdf/set'+factura+'.pdf';
                                     a.click();

                                            getConsecutivo();
                                            fechaFactura();

                                   },3000);     
                                                 
        });
               
               
                /* Configuración de forma de pago */
     $('div#fmPago').on('click',function(){
                                
                               $('div#fmPago').removeClass('fm_pago_error');
                               
                                var opcion = $(this).attr('data-value');
                          
                                switch (opcion){
                                        case '-1': 
                                            $(this).html('Contado');
                                            $(this).attr('data-value',0);
                                            $(this).removeClass('credito');
                                            $(this).addClass('contado');
                                            break;
                                        case '0': 
                                            $(this).html('8 Días');
                                            $(this).attr('data-value',1);
                                            $(this).removeClass('contado');
                                            $(this).addClass('credito');
                                            break;
                                        case '1': 
                                           $(this).html('15 Días');
                                           $(this).attr('data-value',2);
                                            break;
                                        case '2': 
                                           $(this).html('30 Días');
                                           $(this).attr('data-value',3);
                                            break;
                                        case '3': 
                                            $(this).html('Contado');
                                            $(this).attr('data-value',0);
                                            $(this).removeClass('credito');
                                            $(this).addClass('contado');
                                }
                                
                                opcion = parseInt(opcion);
                                if(opcion<3){
                                    $('div#Contado').addClass('hidden');
                                    $('div#Credito').removeClass('hidden');
                                }else{/* Contado */
                                    $('div#Credito').addClass('hidden');
                                    $('div#Contado').removeClass('hidden');
                                }
                                
                                /* Anticipo en 0 */
                                document.getElementById('txtAnticipo').value = 0;
                                
                        });

/* Eliminar fila del data grid */
$(document).on('keydown',function(e){
  /*  console.log('Tecla: '+e.keyCode); */
});

});