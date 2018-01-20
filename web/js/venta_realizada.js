/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('ready',function(){
   
    $('div#searcher_date').on('click','div#btnBusqueda',function(){
        
        console.log('Buscando...');
        var fecha_busqueda = document.getElementById('txt_fecha_busqueda').value;
        
            /* Limpia lista */
                $('div#datagrid_ventas_realizadas div.row').remove();
        
        $.post('ctrlfactura',{Action:10,Fecha_busqueda:fecha_busqueda},function(json){
            
            console.log('Ventas realizadas: '+ json);
            var facturas = 0;
            var ventas = 0;
            var creditos = 0;
            var caja = 0;
            
            var json_facturas = JSON.parse(json);
            
                for(i in json_facturas){
                    
                        var row = document.createElement('div');
                            row.setAttribute('class','row');

                        var factura = document.createElement('div');
                            factura.setAttribute('class','factura');
                            factura.innerHTML = json_facturas[i].Factura;
                            
                        var cliente = document.createElement('div');
                            cliente.setAttribute('class','cliente');
                            cliente.innerHTML = json_facturas[i].Cliente;

                        var forma_pago = document.createElement('div');
                            forma_pago.setAttribute('class','forma_pago');
                            forma_pago.innerHTML = json_facturas[i].Forma_pago;

                        var valor = document.createElement('div');
                            valor.setAttribute('class','valor');
                            valor.innerHTML = json_facturas[i].Valor;

                            /* Se agregan celdas */
                                row.appendChild(factura);
                                row.appendChild(cliente);
                                row.appendChild(forma_pago);
                                row.appendChild(valor);

                            /* Agrega fila al datagrid */
                                document.getElementById('datagrid_ventas_realizadas').appendChild(row);
                                
                                facturas = facturas + 1;
                                ventas = ventas + parseInt(json_facturas[i].Valor);
                                
                                if(json_facturas[i].Forma_pago!=='Contado'){
                                    creditos = creditos + parseInt(json_facturas[i].Valor);
                                }
                }
                    caja = ventas - creditos;
                        /* Encabezado */
                    document.getElementById('info_cantidad_facturas').innerHTML = facturas;
                    document.getElementById('info_ventas_facturas').innerHTML = ventas;
                    document.getElementById('info_credito_facturas').innerHTML = creditos;
                    document.getElementById('info_caja_facturas').innerHTML = caja;
            
        });
        
    });
    
});