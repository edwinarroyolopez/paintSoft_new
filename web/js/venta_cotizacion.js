$(document).on('ready',function(){
    
    
        /* Click en botón cotización */
        $('div#contentBtn').on('click','div#btnCotizacion',function(){
            
            
                var json_encabezado_cotizacion = get_json_encabezado_cotizacion();
                var json_detalle_cotizacion =  JSON.stringify(get_json_detalle_producto_cotizacion()); 
                
                    console.log('Json encabezado: '+json_encabezado_cotizacion);
                    console.log('Json detalle: '+json_detalle_cotizacion);
                    
                     $.post('ctrlcotizacion',{A:1,JSON_encabezado:json_encabezado_cotizacion,
                                       JSON_detalle_producto:json_detalle_cotizacion},function(r){ });
                                   
                                   
                             /* Abrir factura en una nueva pestaña */
                                 setTimeout(function(){
                                     var a = document.createElement('a');
                                     a.target ='_blank';
                                     a.href = '/paintSoft/pdf/prevCotizacion.pdf';
                                     a.click();


                                   },3000);     
            
        });
    
});


function get_json_encabezado_cotizacion(){
    
                    var id_cliente = document.getElementById('txt_search_cliente').getAttribute('data-id');
                    var factura = 'Cotización';
                    var forma_pago = 'Cotización';
                    var descuento = document.getElementById('info_descuento').innerHTML;
                    var iva = document.getElementById('info_iva').innerHTML;
                    var total = parseInt(document.getElementById('info_total').innerHTML);
                    var fecha = document.getElementById('txtFecha').value;
                      
                      /* Para factura pdf */
                      var cliente = document.getElementById('txt_search_cliente').value;
                      var nit = document.getElementById('data_documento').innerHTML;
                      var ciudad = document.getElementById('data_city').innerHTML;
                      var telefono = document.getElementById('data_telefono').innerHTML;
                      var direccion = document.getElementById('data_direccion').innerHTML;
                    
                   /* JSON ---> Encabezado */
                    var json_encabezado = '{"Id_cliente":'+id_cliente+', "Factura":"'+factura+
                                          '", "Forma_pago":"'+forma_pago+
                                          '", "Descuento":"'+descuento +'", "Iva":"'+iva+
                                          '", "Total":"'+total+'", "Fecha":"'+fecha+
                                          '", "Cliente":"'+cliente+'", "Nit":"'+nit+
                                          '", "Ciudad":"'+ciudad+'", "Telefono":"'+telefono+
                                          '", "Direccion":"'+direccion+'"}';
    
    return json_encabezado;
}


/* Obtiene una variable json con la información necesaria de los 
   productos para almacenar la factura */
function get_json_detalle_producto_cotizacion(){
    
        
        var json_detalle_producto =  new Array();

                        $("div#dataProducto div.fila").each(function(){
                                    
                                     var id_producto = $(this).attr('data-idproducto');
                                     var codigo = $(this).children('div.codigo').html();
                                     var descripcion = $(this).children('div.descripcion').children('div').html();
                                     var unidad = $(this).children('div.unidad').html();
                                     var cantidad = $(this).children('div.cantidad').html();
                                     var precio_unidad = $(this).children('div.precio_unidad').children('div').html();
                                     var descuento = $(this).children('div.descuento').html();
                                     /* Parámetros de fracciones */
                                   
                                     
                                         var fila = new Array();
                                         
                                             fila = {Codigo:codigo,Id_producto:id_producto,Descripcion:descripcion,Unidad:unidad,
                                                     Cantidad:cantidad,Precio_unidad:precio_unidad,Descuento:descuento};
                                         /* Se agrega producto al json */
                                       json_detalle_producto[json_detalle_producto.length] = fila;
                        });
                        
                    return json_detalle_producto;
}