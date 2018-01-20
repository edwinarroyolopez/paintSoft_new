
function get_json_encabezado(){
    
                    var id_cliente = document.getElementById('txt_search_cliente').getAttribute('data-id');
                    var factura = document.getElementById('txtFactura').value;
                    var forma_pago = parseInt(document.getElementById('fmPago').getAttribute('data-value'));
                    var vencimiento = document.getElementById('txtFecha').value;
                    var saldo = 0;
                    var descuento = document.getElementById('info_descuento').innerHTML;
                    var iva = document.getElementById('info_iva').innerHTML;
                    var total = parseInt(document.getElementById('info_total').innerHTML);
                    var anticipo = total;
                    var fecha = document.getElementById('txtFecha').value;
            
                     if(forma_pago>0){
                          anticipo = parseInt(document.getElementById('txtAnticipo').value);
                          saldo = total - anticipo;/* Generar intereses minimos */
                      }
                      
                      /* Para factura pdf */
                      var cliente = document.getElementById('txt_search_cliente').value;
                      var nit = document.getElementById('data_documento').innerHTML;
                      var ciudad = document.getElementById('data_city').innerHTML;
                      var telefono = document.getElementById('data_telefono').innerHTML;
                      var direccion = document.getElementById('data_direccion').innerHTML;
                    
                   /* JSON ---> Encabezado */
                    var json_encabezado = '{"Id_cliente":'+id_cliente+', "Factura":"'+factura+
                                          '", "Forma_pago":'+forma_pago+', "Anticipo":"'+anticipo+
                                          '", "Vencimiento":"'+vencimiento+'", "Saldo":"'+saldo+
                                          '", "Descuento":"'+descuento +'", "Iva":"'+iva+
                                          '", "Total":"'+total+'", "Fecha":"'+fecha+
                                          '", "Cliente":"'+cliente+'", "Nit":"'+nit+
                                          '", "Ciudad":"'+ciudad+'", "Telefono":"'+telefono+
                                          '", "Direccion":"'+direccion+'"}';
    
    return json_encabezado;
}

/* Obtiene una variable json con la información necesaria de los 
   productos para almacenar la factura */
function get_json_detalle_producto(){
    
        
        var json_detalle_producto =  new Array();
        var j = 0;
        
              /* Almacenar detalle de factura */
                   $("div#dataProducto div.fila").each(function(){
                                    
                                    /* Saca el id de cada item */
                                     var id = $(this).attr('id');
                                     var id_producto = $(this).attr('data-idproducto');
                                     var codigo = $(this).children('div.codigo').html();
                                     var descripcion = $(this).children('div.descripcion').children('div').html();
                                     var unidad = $(this).children('div.unidad').html();
                                     var id_unidad = $(this).attr('data-idunidad');
                                     var tipo = parseInt($(this).attr('data-tipo'));
                                     var cantidad = $(this).children('div.cantidad').html();
                                     var precio_unidad = $(this).children('div.precio_unidad').children('div').html();
                                     var iva = $(this).attr('data-iva');
                                     var descuento = $(this).children('div.descuento').html();
                                     /* Parámetros de fracciones */
                                     var restante = 0;
                                     var resta_inventario = 0;
                                     var id_fraccion = 0;

                                     if(tipo>0){/* Es fracción */
                                          restante = $(this).attr('data-restante');
                                          resta_inventario = $(this).attr('data-resta_inventario');
                                          id_fraccion = $(this).attr('data-id_fraccion');
                                      }
                                        
                                         var fila = new Array();
                                         
                                             fila = {Codigo:codigo,Id_producto:id_producto,Descripcion:descripcion,Id_unidad:id_unidad,
                                                     Unidad:unidad,Tipo:tipo,Id_fraccion:id_fraccion,Cantidad:cantidad,Precio_unidad:precio_unidad,
                                                     Descuento:descuento,Iva:iva,Estado:1,Restante:restante,Resta_inventario:resta_inventario};
                                         /* Se agrega producto al json */
                                       json_detalle_producto[json_detalle_producto.length] = fila;
                        });
                        
                    return json_detalle_producto;
}

/* Obtiene el json con el que almacenara el detalle de las formulas */
function get_json_detalle_formula(){
    
        /* La formula se manda en forma de json */
        var json_detalle_formula = new Array();
        
              /* Almacenar detalle de factura */
                     $("div#dataProducto div.row_formula").each(function(){
                                    
                                  /* if ( typeof x === 'undefined') 
                                  
                                   if(id_formula !== void 0){ */
                         
                                /* Información para el detalle de la fórmula */
                                     var id_formula = $(this).attr('data-id_formula');
                                     var codigo = $(this).children('div.codigo').text();
                                     var descripcion = $(this).children('div.descripcion').children('div').text();
                                     
                                     var unidad = $(this).children('div.unidad').text();
                                     var id_unidad = $(this).attr('data-medida');
                                     var cantidad = $(this).children('div.cantidad').text();
                                     var precio_unidad = $(this).children('div.precio_unidad').children('div').text();
                                     var iva = 0;
                                     var descuento = $(this).children('div.descuento').text();
                                     /* Parámetros de fracciones */
                                
                                        var posicion =  parseInt($(this).attr('data-posicion'));
                                        var fila = new Array();
                                        
                                        var json_productos_formula =  get_Json_productos_formula();
                                            
                                        var list_colores  =  json_productos_formula[posicion].listColores;
                                        
                                        fila = {Codigo:codigo,Id_formula:id_formula,Descripcion:descripcion,Id_unidad:id_unidad,
                                                Unidad:unidad,Cantidad:cantidad,Precio_unidad:precio_unidad,Descuento:descuento,
                                                Iva:iva,List_colores:list_colores};
                                     
                                               
                                     json_detalle_formula[json_detalle_formula.length] = fila;
                        });
                        
                    return json_detalle_formula;
                    
}

function limpiar_campos(){
    
                        /* Limpiar campos */
                           
                                /* Forma de pago */
                            document.getElementById('fmPago').setAttribute('data-value',0);
                            document.getElementById('fmPago').setAttribute('class','contado');
                            document.getElementById('fmPago').innerHTML = 'Contado';
                                /* Búsqueda de cliente  */
                            document.getElementById('txt_search_cliente').value = '';
                            document.getElementById('fila_cliente').removeAttribute('data-id');
                            document.getElementById('txt_search_cliente').removeAttribute('data-id');
                            document.getElementById('data_documento').innerHTML ='Seleccione';
                            document.getElementById('data_city').innerHTML ='Seleccione';
                            document.getElementById('data_direccion').innerHTML ='Seleccione';
                            document.getElementById('data_telefono').innerHTML ='Seleccione';
                                /* Búsqueda de producto */
                            document.getElementById('txt_search_producto').value = '';
                                /* Lista de unidades de medida */
                             $('div#info_unidades div.item').remove();       
                                /* Filas de datagrid  */
                             $('div#dataProducto div.fila').remove();
                             $('div#dataProducto div.row_formula').remove();
                             /* Resetea la variable que contiene las fórmulas */
                             reset_Json_productos_formula();
                                /* Resumen de factura */
                            document.getElementById('info_valor_neto').innerHTML='seleccione';
                            document.getElementById('info_descuento').innerHTML='seleccione';
                            document.getElementById('info_subtotal').innerHTML='seleccione';
                            document.getElementById('info_iva').innerHTML='seleccione';
                            document.getElementById('info_total').innerHTML='seleccione';
                                /* Pago de factura */
                             $('div#Contado').removeClass('hidden');
                             $('div#Credito').addClass('hidden');
                            document.getElementById('txtAnticipo').value='';
                                    /* Campos Add Item */
                                                      /* Unidad de medida */
                            document.getElementById('txt_sell_Unidad').value = '';
                            document.getElementById('txt_sell_Unidad').removeAttribute('data-id_fraccion');
                            document.getElementById('txt_sell_Unidad').removeAttribute('data-id');
                            document.getElementById('txt_sell_Unidad').removeAttribute('data-tipo');

                            document.getElementById('txt_sell_Cantidad').value = '';
                            document.getElementById('txt_sell_Precio').value = '';
                            document.getElementById('txt_sell_Descuento').value = '';
                            $('div#Item_empezado').children('div.label').addClass('hidden');    
}



$(document).on('ready',function(){
    
     $("div#dataProducto").on('click','div.fila',function(){
         
                console.log('Has dado click sobre la fila!');
                /* Primero quitar pintura de todas las filas  */
                   $('div#dataProducto div.fila').removeClass('pintar_fila');
                /* Ahora pintar la fila seleccionada */
                   $(this).addClass('pintar_fila');

                   /* Hacer visible boton eliminar  fila */
                   var id_fila = $(this).attr('id');
                   $('div#btnEliminar_fila').removeClass('hidden');
                   $('div#btnEliminar_fila').attr('data-id_fila',id_fila);
     });
    
    $('div#Operation').on('click','div#btnEliminar_fila',function(){
                    
                     
                    /* Hacer invisible el boton eliminar fila */
                     $('div#btnEliminar_fila').addClass('hidden');
                     var id_fila = $(this).attr('data-id_fila');

        
        
                   /* restar valores de variables globales totalizadoras  */
                   var precio_fila = parseInt($('div#'+id_fila).children('div.precio').children('div').text());
                        
                        gValor_neto = gValor_neto - precio_fila;
                        gSubtotal = gValor_neto;
                        gTotal = gSubtotal;
                   
                        /* Actualizar valores de variables totalizadoras */
                        document.getElementById('info_subtotal').innerHTML = gSubtotal;
                        document.getElementById('info_valor_neto').innerHTML = gValor_neto;
                        document.getElementById('info_total').innerHTML = gTotal;
                   
                    /* Eliminar fila */
                    $('div#'+id_fila).remove();
                    
    });
    
    
});