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
        document.getElementById('txtFecha_factura').value = dd+'/'+mm+'/'+yyyy;
        
       // var fecha = dd+'/'+mm+'/'+yyyy;
      //   $.post('ctrlfactura',{fmPago: 3,Fecha: fecha,Action: 5}, function(response){});
        
    }
    
    /* Seleciona tab */
        $('div.tabMenu').on('click','div.tab',function(){
                
                       /* Tab Select*/                 
                   $("div.tab").removeClass('isSelect');/* Quita la selección en las tabs*/
                   $(this).addClass('isSelect');/* Selecciona esta tab */
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');
                
                var tab = $(this).text();
                
                        /* DETERMINAR CUAL DE LOS FORMULARIOS SE HARÁ VISIBLE SEGUN LA TAB SELECCIONADA */
                        switch(tab){
                            case 'Ingresar Compra': 
                                     $('div#frmIngresarCompra').addClass('isVisible'); 
                                
                                break;
                             case 'Estado de facturas': 
                                      $('div#frmFacturas').addClass('isVisible');
                                      
                                break;
                            case 'Opcion 3': 
                                
                                break;
                            case 'Opcion 4': 
                                   
                                break;
                            case 'Opcion 5': 
                                     
                                break;
                            default:
                                        console.log('No es una opción aún!');
                                break;
                        }
                
                
        });
   
    /* Configuración de forma de pago */
     $('div#fmPago').on('click',function(){
                                
                               
                                var opcion = $(this).attr('data-value');
                          
                                switch (opcion){
                                    case '0': 
                                        $(this).html('15 Días');
                                        $(this).attr('data-value',1);
                                        $(this).removeClass('contado');
                                       $(this).addClass('credito');
                                        break;
                                    case '1': 
                                       $(this).html('30 Días');
                                       $(this).attr('data-value',2);
                                        break;
                                    case '2': 
                                       $(this).html('45 Días');
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
                                    $('div#fila_contado').addClass('hidden');
                                    $('div#fila_credito').removeClass('hidden');
                                }else{/* Contado */
                                    $('div#fila_credito').addClass('hidden');
                                    $('div#fila_contado').removeClass('hidden');
                                }
                                
                                /* Colocar valores de anticipo en ceros y fecha actual */
                                var hoy = document.getElementById('txtFecha_factura').value;
                                    document.getElementById('txtFechaAnticipo').value = hoy;
                                    document.getElementById('txtAnticipo').value = 0;
                                
                        });
    
    /* Buscar proveedor */
    
    /* Focus In: Aparece */
    $('div#frmIngresarCompra').on('focusin','input#txtProveedor',function(){
        $('div#cbProveedor').css('display','block');
    });
    /* Focus Out: Desaparece */
     $('div#frmIngresarCompra').on('focusout','input#txtProveedor',function(){
        setTimeout(function(){$('div#cbProveedor').css('display','none');},200);
    });
    
    /* Select Combobox: Item */
    $('div#frmIngresarCompra').on('click','div.iProveedor',function(){
        var pmtId_proveedor = $(this).attr('data-id');
        document.getElementById('txtProveedor').value = $(this).text();
        document.getElementById('txtProveedor').setAttribute('data-id',pmtId_proveedor);
        
        /* Info: Nit - Telefono - Ciudad */
        var nit = $(this).attr('data-nit');
        var telefono = $(this).attr('data-telefono');
        var ciudad = $(this).attr('data-ciudad');
        
        document.getElementById('info_proveedor_nit').innerHTML=nit;
        document.getElementById('info_proveedor_telefono').innerHTML=telefono;
        document.getElementById('info_proveedor_ciudad').innerHTML=ciudad;
        
    });
    
    /* END *** Buscar proveedor *** END */
    
    /* Busqueda de productos */
    
    /* Focus: Aparece y desaparece lista de productos */
            $('div#frmIngresarCompra').on('focusin','input#txtSearchProducto',function(){
                    $('div#listProducto').css('display','block');
            });
             $('div#frmIngresarCompra').on('focusout','input#txtSearchProducto',function(){
                setTimeout(function(){$('div#listProducto').css('display','none');},200);            
            });
    /* END *** Focus: Aparece y desaparece lista de productos  *** END */
    
    /* Key press */
             $('div#frmIngresarCompra').on('keypress','input#txtSearchProducto',function(e){
                 
                             var texto = $(this).val()+e.key;
                                /* Evita la acción cuando es la tecla Enter */
                            if(e.keyCode==13){e.preventDefault();}

                             busqueda_List(texto,'listProducto','item');
             });
             
     /* END *** key press *** END */
               $('div#frmIngresarCompra').on('keydown','input#txtSearchProducto',function(e){
                  
//                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
//                     e.preventDefault();
//                 }
//                  
//                   if(e.keyCode==8){/* Retroceso */
//                        
//                       var texto = $(this).val();
//                       
//                        texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
//                        buscaProducto(texto);
//                   }
               });
               
                /* Key press */
             $('div#frmIngresarCompra').on('keypress','input#txtProveedor',function(e){
                 
                             var texto = $(this).val()+e.key;
                                /* Evita la acción cuando es la tecla Enter */
                            if(e.keyCode==13){e.preventDefault();}

                             busqueda_List(texto,'cbProveedor','iProveedor');
                             
              
             });


    /* END *** Busqueda de productos *** END */
    
    /* Selecciona producto  */ 
        $('div#listProducto').on('click','div.item',function(){
          

                        var id = $(this).attr('data-id');
                        var descripcion = $(this).children('div.descripcion').html();
                        var codigo = $(this).children('div.codigo').html();
                        var grupo = $(this).children('div.grupo').html();
                        var id_grupo = parseInt($(this).children('div.grupo').attr('data-id'));
                        var marca = $(this).attr('data-marca');
                        var id_medida = $(this).attr('data-id_medida');

                       document.getElementById('info_producto_marca').innerHTML = marca;
                       document.getElementById('info_producto_codigo').innerHTML = codigo;
                       document.getElementById('info_producto_grupo').innerHTML = grupo;
                       document.getElementById('info_producto_grupo').setAttribute('data-id',id_grupo);

                       document.getElementById('txtSearchProducto').value = descripcion;
                       document.getElementById('txtSearchProducto').setAttribute('data-id',id);

                       $('div#cbUnidadMedida div.item').remove();

                       /* Seleccionar las unidades de medida basado en la seleccion del producto  */ 
                       $.post('ctrlinventario',{Control:0 ,Id_producto: id,Id_medida:id_medida,Action: 1},
                                function(r){/* Colocar valores en existencias */
    
                                  var jSon = jQuery.parseJSON($.trim(r));

                                    for(i in jSon){

                                        if(jSon[i].Id>0){

                                                    $('div#fDisponible').addClass('hidden');
                                                    $('div#fUnidadMedida').removeClass('hidden');
                                                    $('div#fDisponible').attr('data-estado',0);

                                                 /* Trae las unidades de medida que pertenezcan al producto ---> Stock: 0 */
                                                         var item = document.createElement('div');
                                                         item.setAttribute('class','item');
                                                         item.setAttribute('data-id',jSon[i].Id);
                                                         item.setAttribute('data-id_medida',jSon[i].Id_medida);
                                                         item.setAttribute('data-precio_venta',jSon[i].Precio_venta);
                   //                                      item.setAttribute('data-id_grupo',jSon[i].Id_grupo);

                                                         var unidad = document.createElement('div');
                                                         unidad.setAttribute('class','unidad');
                                                         unidad.innerHTML = jSon[i].Unidad_medida;

                                                         var cantidad = document.createElement('div');
                                                         cantidad.setAttribute('class','cantidad');
                                                         cantidad.innerHTML = jSon[i].Stock;

                                                         item.appendChild(unidad);
                                                         item.appendChild(cantidad);
                                                         document.getElementById('cbUnidadMedida').appendChild(item);

                                                         document.getElementById('txtUnidadMedida').focus();

                                              }else{/* Producto no contiene unidades de medida */
                                                    $('div#fUnidadMedida').addClass('hidden');
                                                    $('div#fDisponible').removeClass('hidden');
                                                    $('div#fDisponible').attr('data-estado',1);

                                                    document.getElementById('stock_producto').innerHTML = jSon[i].Stock;
                                                    document.getElementById('txtPrecioUnidad').focus();

                                              }

                                    }

                                });


                                 setTimeout(function(){

                                         /* Actualiza Stock */
                                            $.post('ctrlinventario',{Control:1,Id_producto: id,Id_medida:id_medida,Action: 1},
                                              function(r){/* Colocar valores en existencias */

                                                var jSon = jQuery.parseJSON($.trim(r));

                                                    $("div#cbUnidadMedida div.item").each(function(){

                                                        for(i in jSon){

                                                            var Id_unidad_medida = parseInt($(this).attr('data-id'));

                                                            if(Id_unidad_medida===jSon[i].Id){
                                                                 $(this).children('div.cantidad').html(jSon[i].Stock);
                                                                 $(this).attr('data-precio_venta',jSon[i].Precio_venta);
                                                            }

                                                        }
                                                   });   
                                             });
                                    },500);
                        
            });
                      
    
    /* END *** Selecciona producto *** END */ 
    
     /* Focus In: Aparece */
    $('div#frmIngresarCompra').on('focusin','input#txtUnidadMedida',function(){
        $('div#cbUnidadMedida').css('display','block');
    });
    /* Focus Out: Desaparece */
     $('div#frmIngresarCompra').on('focusout','input#txtUnidadMedida',function(){
        setTimeout(function(){$('div#cbUnidadMedida').css('display','none');},200);
    });
    
    /* Select Combobox: Item */
    $('div#cbUnidadMedida').on('click','div.item',function(){
        

                    var id = $(this).attr('data-id');
                    var unidad = $(this).children('div.unidad').html();
                    var precio_venta = $(this).attr('data-precio_venta');


                    document.getElementById('txtUnidadMedida').value = unidad;
                    document.getElementById('txtPrecioVenta').value = precio_venta;
                    document.getElementById('txtUnidadMedida').setAttribute('data-id',id);

                         /* Busca las cantidades en inventario del producto en sus diferentes unidades de medida */
                        var id_unidad_medida = id;
                        var id_producto = document.getElementById('txtSearchProducto').getAttribute('data-id');


                        /* Sector - Fracciones */
                        document.getElementById('fracciones_unidad_medida').innerHTML = $(this).text();
                        /* Eliminar filas */
                        $('div#fracciones div.fila_fracciones').remove();

                        $.post('ctrlmedida',{Id_unidad_medida: id_unidad_medida,Id_producto: id_producto,Action: 6}, function(r){

                                var jSon = jQuery.parseJSON($.trim(r));
                                for(i in jSon){
                                    /* Setear fracciones */
                                    var fila_fracciones = document.createElement('div');
                                    fila_fracciones.setAttribute('class','fila_fracciones');
                                    fila_fracciones.setAttribute('data-id',jSon[i].Id);
                                    fila_fracciones.setAttribute('data-proporcion',jSon[i].Proporcion);

                                    var fraccion = document.createElement('div');
                                    fraccion.setAttribute('class','fraccion');
                                    fraccion.innerHTML = jSon[i].Fraccion;

                                    var valor = document.createElement('input');
                                    valor.setAttribute('type','text');
                                    valor.setAttribute('id','V'+jSon[i].Id);
                                    valor.value = jSon[i].Precio_fraccion;
                                    valor.setAttribute('class','valor');

                                    fila_fracciones.appendChild(fraccion);
                                    fila_fracciones.appendChild(valor);
                                    document.getElementById('fracciones').appendChild(fila_fracciones);

                                }
                        });
                        
                        
                            /* Busca el peso de los poliuretanos o bicapas */
                                var grupo = document.getElementById('info_producto_grupo').innerHTML;
                                    grupo = grupo.toLowerCase();/* Minúsculas */
                                    
                                if(grupo==='bicapa' || grupo==='poliuretano'){
                                    
                                              /* Busca peso de unidad medida y producto --> Poliuretano o Bicapa */
                                              $.post('ctrlpeso',{A:1,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(r){
                                                       var json_peso = $.parseJSON($.trim(r));
                                                       var peso = parseInt(json_peso[0].Peso);                                                       
                                                       document.getElementById('fracciones_unidad_medida').setAttribute('data-peso',peso);
                                              });
                                }

                        document.getElementById('txtPrecioUnidad').focus();
    });
    
    
    
    /* END *** Buscar Unidad de Medida *** END */
    
    
    /* Variables globales -- Factura */
        var gNeto = 0;
        var gDescuento = 0;
        var gSubtotal = 0;
        var gIva = 0;
        var gTotal = 0;
    
    /* --- Agregar Item a factura  --- */
    
    $('div#frmIngresarCompra').on('click','div#btnAddItem',function(){
        
        
        
                 /* Validación ---> Cajas de texto */
                    var control = 0;
                    $('div#sProducto input').each(function(){
                        
                        if(control===0){
                             if($(this).val()===''){/* La caja está vacía? */
                                control = control + 1;
                                $(this).focus();
                            }
                        }else{
                            return;
                        }
                           
                    });
                    
                    if(control>0){/* Si hay alguna caja vacía: Impide que la fila ingrese al dataGrid */
                        console.log('Error: Caja vacía!');
                        return;
                    }
        
        
                /* Parámetros para data grid */
                var codigo = document.getElementById('info_producto_codigo').innerHTML;
                var id_producto = document.getElementById('txtSearchProducto').getAttribute('data-id');
                var descripcion = document.getElementById('txtSearchProducto').value;
                var marca = document.getElementById('info_producto_marca').innerHTML;
                var grupo = document.getElementById('info_producto_grupo').innerHTML;

                /* Establece si el producto que se agregará al dataGrid contieno o no
                   unidades de medida */
                var estado_unidad = parseInt(document.getElementById('fDisponible').getAttribute('data-est-ado'));
                var unidad_medida;
                var id_unidad;

                    if(estado_unidad>0){/* No contiene unidades de medida */
                        unidad_medida = 'N/A';
                        id_unidad = 0;
                    }else{
                        unidad_medida = document.getElementById('txtUnidadMedida').value;
                        id_unidad = document.getElementById('txtUnidadMedida').getAttribute('data-id');
                    }


                /* ¿Cómo manejar iva aquí? */
                var precio_unidad = parseInt(document.getElementById('txtPrecioUnidad').value);
                var precio_venta = parseInt(document.getElementById('txtPrecioVenta').value);
                var cantidad = parseInt(document.getElementById('txtCantidad').value);
                var margen = document.getElementById('Margen_ganancia').getAttribute('data-margen');
                        
                        /* ¿Cómo manejar iva aquí? */
                    var iva = parseFloat(document.getElementById('txtIva').value/100);
                    var estado_iva = parseInt(document.getElementById('Iva_incluido').getAttribute('data-estado'));
                    var precio_iva = 0;
                    
                        if(estado_iva===0){/* Iva incluido */
                                 precio_iva = precio_unidad*iva;
                                 precio_unidad = precio_unidad - precio_iva; /* Quita el iva al precio de la unidad */
                        }
                        
                      /* Descuento */   /* El descuento se aplica antes del iva: SIN IVA INCLUIDO */
                        var descuento = parseFloat(document.getElementById('txtDescuento').value/100);
                            descuento = parseInt(descuento*precio_unidad);
                            
                            precio_iva = parseInt((precio_unidad + precio_iva - descuento)*iva);/* Aplico iva a precio con el descuento */
                        
                            descuento = descuento*cantidad;
                            gDescuento = gDescuento + descuento;
                            document.getElementById('info_descuento').innerHTML = gDescuento;
                            
                            
                                /* Precio entero */
                                 precio_unidad = parseInt(precio_unidad);
                                /* Valor neto */
                            var valor_neto = (precio_unidad + precio_iva)*cantidad;/* Agrego iva y quito descuento */
                                gNeto = gNeto + valor_neto - precio_iva*cantidad;
                                document.getElementById('info_valor_neto').innerHTML = gNeto;
                                /* Subtotal */
                                 gSubtotal = gNeto - gDescuento;
                                 document.getElementById('info_subtotal').innerHTML = gSubtotal;
                                /* Iva */
                                 gIva = gIva + precio_iva*cantidad;
                                 document.getElementById('info_iva').innerHTML = gIva;
                                /* Total */
                                 gTotal = gSubtotal+gIva;
                                 document.getElementById('info_total').innerHTML = gTotal;
        
                /* Validar que no se repita el mismo idproducto y el mismo idunidad */
                 var id_fila = "p"+id_producto+"u"+id_unidad;
                 
                 if ($("div#"+id_fila).length) {/* Existe un item  */

                            console.log('Existe una fila con el mismo id!');
                            
                                /* Restamos los valores anteriores */
                                var rDescuento =  $("div#"+id_fila).attr('data-descuento');
                                var rIva = parseFloat($("div#"+id_fila).attr('data-iva'));
                                var rCantidad = parseInt($("div#"+id_fila + " div.cantidad").html());
                                var rPrecio_unidad = parseInt($("div#"+id_fila + " div.preciounidad div").html());
                                var rEstado_iva = parseInt($("div#"+id_fila).attr('data-estado_iva'));
                                
                                /*Actualizar valores globales */
                                    gNeto = gNeto - rCantidad*rPrecio_unidad;
                                
                                    if(rEstado_iva===0){
                                         rPrecio_unidad = parseInt(rPrecio_unidad + (rPrecio_unidad/((1-rIva)*100))*(rIva*100));
                                    }
                                    
                               
                                
                                gDescuento = gDescuento - rCantidad*rPrecio_unidad*rDescuento;
                                gSubtotal = gNeto - gDescuento; 
                                gIva = parseInt(gIva - ((rCantidad*rPrecio_unidad - rCantidad*rPrecio_unidad*descuento)*rIva));
                                gTotal = gSubtotal+gIva;
                                
                                console.log('Estado de iva: '+estado_iva);
                                
                                /* Actualizar valores de la fila */
                                $("div#"+id_fila).attr('data-descuento',descuento);
                                $("div#"+id_fila).attr('data-iva',iva);
                                $("div#"+id_fila).attr('data-margen',margen);
                                $("div#"+id_fila).attr('data-estado_iva',estado_iva);
                                $("div#"+id_fila).attr('data-precioventa',precio_venta);
                                /* Childs */
                                $("div#"+id_fila + " div.cantidad").html(cantidad);
                                $("div#"+id_fila + " div.preciounidad div").html(precio_unidad);
                                $("div#"+id_fila + " div.descuento").html(descuento);
                                $("div#"+id_fila + " div.iva").html(iva);
                                $("div#"+id_fila + " div.precio  div").html(valor_neto);
                                /* Actualizar valores del resumen */
                                document.getElementById('info_valor_neto').innerHTML = gNeto;
                                document.getElementById('info_descuento').innerHTML = gDescuento;
                                document.getElementById('info_subtotal').innerHTML = gSubtotal;
                                document.getElementById('info_iva').innerHTML = gIva;
                                document.getElementById('info_total').innerHTML = gTotal;

                                /* Elimina - Crea actualizada lista de fracciones en la fila */
                                $('div#'+id_fila).children('div.listFracciones').remove();
                                addListFracciones(id_fila);
                              /* Limpiar campos */
                                 limpiarCamposProducto();

                }else{/* No existe el elemento */
                        addItem(id_fila,id_producto,codigo,descripcion,marca,unidad_medida,id_unidad,cantidad,precio_unidad,precio_venta,valor_neto,descuento,iva,estado_iva,margen,grupo);
                        addListFracciones(id_fila);
                        /* Limpiar campos */
                              limpiarCamposProducto();
                }
       //  document.getElementById('txtSearchProducto').focus();
         
        
    });
    
    function addListFracciones(pmtId_fila){
        /* Crear lista de fracciones para agregar a la fila  */
                var listFracciones = document.createElement('div');
                listFracciones.setAttribute('class','listFracciones');
                
                $("div#fracciones div.fila_fracciones").each(function(){
                    /* Recorre cada fraccion de medida */
                           /* Item */
                           var item = document.createElement('div');
                           item.setAttribute('class','item');
                           item.setAttribute('data-id',$(this).attr('data-id'));
                           /* Fraccion */
                           var fraccion = document.createElement('div');
                           fraccion.setAttribute('class','fraccion');
                           fraccion.innerHTML = $(this).children('div.fraccion').html();
                           /* Precio fracción */
                           var precio_fraccion = document.createElement('div');
                           precio_fraccion.setAttribute('class','precio_fraccion');
                           precio_fraccion.innerHTML =$(this).children('input:text').val();
                           item.appendChild(fraccion);
                           item.appendChild(precio_fraccion);
                           listFracciones.appendChild(item);
                           
                });
                document.getElementById(pmtId_fila).appendChild(listFracciones);
    }
    
    function addItem(pmtId_fila,pmtId_producto, pmtCodigo, pmtDescripcion, pmtMarca, pmtUnidad,pmtId_unidad, pmtCantidad, pmtPrecioUnidad,pmtPrecioVenta, pmtValor, pmtDescuento, pmtIva,pmtEstado_iva,pmtMargen, pmtGrupo){
        
                        /* Fila */
                        var fila = document.createElement('div');
                        fila.setAttribute('class','fila');
                        fila.setAttribute('id',pmtId_fila);
                        fila.setAttribute('data-idproducto',pmtId_producto);
                        fila.setAttribute('data-idunidad',pmtId_unidad);
                        fila.setAttribute('data-precioventa',pmtPrecioVenta);
                        fila.setAttribute('data-iva',pmtIva);
                        fila.setAttribute('data-estado_iva',pmtEstado_iva);
                        fila.setAttribute('data-descuento',pmtDescuento);
                        fila.setAttribute('data-margen',pmtMargen);
                        fila.setAttribute('data-marca',pmtMarca);
                        fila.setAttribute('data-grupo',pmtGrupo);
                        /* Codigo */
                        var codigo = document.createElement('div');
                        codigo.setAttribute('class','codigo');
                        codigo.innerHTML = pmtCodigo;
                        /* Descripcion */
                        var descripcion = document.createElement('div');
                        descripcion.setAttribute('class','descripcion');
                        var div_d = document.createElement('div');
                        div_d.innerHTML =    pmtDescripcion;
                        descripcion.appendChild(div_d);
                        /* Unidad de Medida */
                        var unidad = document.createElement('div');
                        unidad.setAttribute('class','unidad');
                        unidad.innerHTML = pmtUnidad;
                        /* Cantidad */
                        var cantidad = document.createElement('div');
                        cantidad.setAttribute('class','cantidad');
                        cantidad.innerHTML = pmtCantidad;
                        /* Precio Unidad */
                        var precio_unidad = document.createElement('div');
                        precio_unidad.setAttribute('class','preciounidad');
                        var div_pu = document.createElement('div');
                        div_pu.innerHTML = pmtPrecioUnidad;
                        precio_unidad.appendChild(div_pu);        
                        /* Iva */
                        var iva = document.createElement('div');
                        iva.setAttribute('class','iva');
                        iva.innerHTML = pmtIva;
                        /* Descuento */
                        var descuento = document.createElement('div');
                        descuento.setAttribute('class','descuento');
                        descuento.innerHTML = pmtDescuento;
                        /* Valor */
                        var valor = document.createElement('div');
                        valor.setAttribute('class','precio');
                        var div_p = document.createElement('div');
                        div_p.innerHTML = pmtValor;
                        valor.appendChild(div_p);

                        /* Agregar columnas */
                        fila.appendChild(codigo);
                        fila.appendChild(descripcion);
                        fila.appendChild(unidad);
                        fila.appendChild(cantidad);
                        fila.appendChild(precio_unidad);
                        fila.appendChild(iva);
                        fila.appendChild(descuento);
                        fila.appendChild(valor);
                        document.getElementById('dtFacturaCompra').appendChild(fila);

    }
    
    function limpiarCamposProducto(){
        /* Producto */
                    document.getElementById('txtSearchProducto').value = '';
                    document.getElementById('txtSearchProducto').setAttribute('data-id','');
                    document.getElementById('info_producto_codigo').innerHTML = '';
                    document.getElementById('info_producto_marca').innerHTML = '';
                    document.getElementById('info_producto_grupo').innerHTML = '';
        
        /* Cajas de texto */
                    document.getElementById('txtUnidadMedida').value = "";/* data-id */
                    document.getElementById('cbUnidadMedida').innerHTML = '';
                    document.getElementById('txtPrecioUnidad').value = "";
                    document.getElementById('txtCantidad').value = "";
                    document.getElementById('txtIva').value = "";
                    document.getElementById('txtDescuento').value = "";
                    document.getElementById('txtPrecioVenta').value = "";
                    document.getElementById('precioSugerido').innerHTML = "";/* setter */
                    document.getElementById('Margen_ganancia').innerHTML = "";/* data-margen */
                    document.getElementById('Margen_ganancia').innerHTML = "";/* data-margen */
        
        /* Fracciones */
                    $('div#fracciones div.fila_fracciones').remove();
                     document.getElementById('fracciones_unidad_medida').innerHTML = 'seleccione';

                     var fila_fracciones = document.createElement('div');
                     fila_fracciones.setAttribute('class','fila_fracciones');
                     fila_fracciones.setAttribute('style','text-align:center;');
                     fila_fracciones.innerHTML='Seleccione unidad de medida';
                     document.getElementById('fracciones').appendChild(fila_fracciones);
         
         /* Foco a: txtSearchProducto limpio */
        
    }    
      /* --- Agregar Item a factura --- END */
    
        /* Load */
    cargaProdcutos();
    
    
    /* Carga de productos para comprar */
        function cargaProdcutos(){
       
            
             $.post('ctrlproducto',{Action: 3}, function(r){
                        
                       
                        var jSon = jQuery.parseJSON($.trim(r));
                        
                        for(i in jSon){
                            
                            var item = document.createElement('div');
                            item.setAttribute('class','item');
                            item.setAttribute('data-id',jSon[i].Id);
                            item.setAttribute('data-marca',jSon[i].Marca);
                            item.setAttribute('data-id_medida',jSon[i].Id_medida);
                            
                            var descripcion = document.createElement('div');
                            descripcion.setAttribute('class','descripcion');
                            descripcion.innerHTML=jSon[i].Descripcion;
                            
                            var codigo = document.createElement('div');
                            codigo.setAttribute('class','codigo');
                            codigo.innerHTML=jSon[i].Codigo;
                            
                            var grupo = document.createElement('div');
                            grupo.setAttribute('class','grupo');
                            grupo.setAttribute('data-id',jSon[i].Id_grupo);
                            grupo.innerHTML=jSon[i].Grupo;
                            
                            item.appendChild(descripcion);
                            item.appendChild(grupo);
                            item.appendChild(codigo);
                            
                            if(i>=10){
                                 item.setAttribute('class','item hidden');
                            }
                            
                            document.getElementById('listProducto').appendChild(item);
                        }

                                
             });
           
       }
       
       
  
    
     /* END *** Carga de productos para comprar *** END */
    
    
    /* Ingresar Factura  */

    
    /* Seleccionar las filas del datagrid: dtFacturaCompra */
    $('div#dtFacturaCompra').on('click','div.fila', function(){
                    
                    var id_fila = $(this).attr('id');
                    
                    /* Hace visible button eliminar */
                        $('div#btnEliminar_fila').removeClass('hidden');
                    /* Asociar a la fila */
                        $('div#btnEliminar_fila').attr('data-id_fila',id_fila);

                /* Montar a campos */
                    var codigo = $(this).children('div.codigo').text();
                    var id_producto = $(this).attr('data-idproducto');
                    var descripcion = $(this).children('div.descripcion').children('div').text();
                    var marca = $(this).attr('data-marca');
                    var grupo = $(this).attr('data-grupo');
                    var unidad_medida = $(this).children('div.unidad').text();
                    var id_unidad_medida = $(this).attr('data-idunidad');
                    var precio_unidad = parseInt($(this).children('div.preciounidad').children('div').text());
                    var cantidad = $(this).children('div.cantidad').text();
                    var iva = parseFloat($(this).attr('data-iva'));
                        document.getElementById('Iva_incluido').setAttribute('class','excluido');
                        document.getElementById('Iva_incluido').innerHTML='Excluido';
                    var descuento = $(this).children('div.descuento').html();
                    var precio_venta = $(this).attr('data-precioventa');

                    var estado_iva =  parseInt($(this).attr('data-estado_iva'));

                        if(estado_iva===0){
                            precio_unidad = parseInt(precio_unidad + (precio_unidad/((1-iva)*100))*(iva*100));
                            
                            /* Iva incluido */
                            document.getElementById('Iva_incluido').setAttribute('class','');
                            document.getElementById('Iva_incluido').innerHTML='Incluido';
                        }

                    /* Producto */
                    document.getElementById('info_producto_codigo').innerHTML = codigo;
                    document.getElementById('txtSearchProducto').value = descripcion;
                    document.getElementById('txtSearchProducto').setAttribute('data-id',id_producto);
                    document.getElementById('info_producto_marca').innerHTML = marca;
                    document.getElementById('info_producto_grupo').innerHTML = grupo;

                    document.getElementById('txtUnidadMedida').value = unidad_medida;
                    document.getElementById('txtUnidadMedida').setAttribute('data-id',id_unidad_medida);
                    document.getElementById('cbUnidadMedida').innerHTML = '';/* Limpia lista */
                    document.getElementById('txtPrecioUnidad').value = precio_unidad;
                    document.getElementById('txtCantidad').value = cantidad;
                    document.getElementById('txtIva').value = iva*100;
                    document.getElementById('txtDescuento').value = descuento*100;

                    document.getElementById('txtPrecioVenta').value = precio_venta;
                    calcula_Precio_sugerido();
                    calcularMargen();

                        var id_fila = $(this).attr('id');
                        $('div#fracciones div.fila_fracciones').remove();

                        /* Fracciones */
                         $('div#'+id_fila+' div.item').each(function(){


                                var id = $(this).attr('data-id');
                                var descripcion = $(this).children('div.fraccion').text();
                                var precio_fraccion = $(this).children('div.precio_fraccion').text();

                                    /* Setear fracciones */
                                    var fila_fracciones = document.createElement('div');
                                    fila_fracciones.setAttribute('class','fila_fracciones');
                                    fila_fracciones.setAttribute('data-id',id);

                                    var fraccion = document.createElement('div');
                                    fraccion.setAttribute('class','fraccion');
                                    fraccion.innerHTML = descripcion;

                                    var valor = document.createElement('input');
                                    valor.setAttribute('type','text');
                                    valor.setAttribute('id','V'+id);
                                    valor.setAttribute('value',precio_fraccion);
                                    valor.setAttribute('class','valor');

                                    fila_fracciones.appendChild(fraccion);
                                    fila_fracciones.appendChild(valor);
                                    document.getElementById('fracciones').appendChild(fila_fracciones);


                         });
            
    });
    
    
    /* Sector -  Calcular precio sugerido */
     $('div#frmIngresarCompra').on('focusout','input#txtDescuento',function(){
        /* Calcular precio sugerido */
         calcula_Precio_sugerido();
    });
    $('div#frmIngresarCompra').on('focusout','input#txtPrecioUnidad',function(){
        
        var isPrecioSugerido = document.getElementById('precioSugerido').getAttribute('setter');
            isPrecioSugerido = parseInt(isPrecioSugerido);
        if(isPrecioSugerido===1){/* Recalcular precio sugerido */
                calcula_Precio_sugerido();
        }
    });
    
    
    $('div.datagrid').on('click','div#btnEliminar_fila',function(){
                /* Hacen invisible boton eliminar */
                $('div#btnEliminar_fila').addClass('hidden');

                var id_fila = $(this).attr('data-id_fila');

                    /* Recalcular variables globales */
                        var estado_iva =  parseInt($('div#'+id_fila).attr('data-estado_iva'));
                        var iva = parseFloat($('div#'+id_fila).attr('data-iva'));
                        var descuento = parseFloat($('div#'+id_fila).attr('data-descuento'));
                        var precio_unidad = parseInt($('div#'+id_fila).children('div.preciounidad').text());    
                        var cantidad = parseInt($('div#'+id_fila).children('div.cantidad').text());    
                        
                            gNeto = gNeto - precio_unidad*cantidad;
                            gSubtotal = gNeto - descuento*cantidad*precio_unidad;
                            
                            if(estado_iva===0){
                                precio_unidad = parseInt(precio_unidad + (precio_unidad/((1-iva)*100))*(iva*100));
                            }
                        
                            gIva = gIva - parseInt(cantidad*precio_unidad*iva);
                            gTotal = gSubtotal + gIva;
                            
                            /* Set etiquetas totalizadoras  */
                            document.getElementById('info_valor_neto').innerHTML=gNeto;
                            document.getElementById('info_descuento').innerHTML=gDescuento;
                            document.getElementById('info_subtotal').innerHTML=gSubtotal;
                            document.getElementById('info_iva').innerHTML = gIva;
                            document.getElementById('info_total').innerHTML = gTotal;
                            
                        
                /* Elimina fila */
                    $('div#'+id_fila).remove(); 
                /* Limpiar campos  */
                       limpiarCamposProducto();
        
            
    });
    
    /* Focus precio de venta  */
     $('div#frmIngresarCompra').on('focusout','input#txtPrecioVenta',function(){
                    calcularMargen();

                    /* Calcular precios de fracción */
                    var precio_venta = parseInt($(this).val());

                    $('div#fracciones div.fila_fracciones').each(function(){

                                var proporcion = parseFloat($(this).attr('data-proporcion'));
                                var precio_fraccion = 0;
                                
                                if(proporcion<1){/* Todas las fracciones */
                                    precio_fraccion = parseInt(proporcion*precio_venta)+800;
                                }else{/* gramo */
                                    var peso = parseInt(document.getElementById('fracciones_unidad_medida').getAttribute('data-peso'));
                                        precio_fraccion = parseInt(precio_venta/peso);
                                }
                                /* Asigna valor a caja de texto relacionada con la fracción */
                                $(this).children('input.valor').val(precio_fraccion);
                                
                    });
    });
    
    function calcularMargen(){
        
           /* Iva incluido en el precio de la unidad */
                   var precio_sugerido = parseInt(document.getElementById('precioSugerido').innerHTML);
                   var precio_unidad = parseInt(document.getElementById('txtPrecioUnidad').value);
                   var precio_venta = document.getElementById('txtPrecioVenta').value;
        
                  
                   if(precio_venta.length===0){
                        document.getElementById('Margen_ganancia').innerHTML = '';
                   }else{/* Contiene texto */
                        precio_venta = parseInt(document.getElementById('txtPrecioVenta').value);
                       
                       
                        var diferencia_sugerida = precio_sugerido - precio_unidad; 
                        var diferencia_establecida = precio_venta - precio_unidad; 

                        var porcentaje = (diferencia_establecida*0.20)/diferencia_sugerida;
                        porcentaje = parseInt(porcentaje*100);/* Hacerlo entero */
                        document.getElementById('Margen_ganancia').innerHTML = String(porcentaje)+'%';
                        document.getElementById('Margen_ganancia').setAttribute('data-margen',porcentaje);
                   
                    }
        
        
    }
   
    /* Sector - Iva */
    $('div#fIva').on('click','div#Iva_incluido',function(){
        var estado = $('div#Iva_incluido').attr('data-estado');
            estado = parseInt(estado);
        
        if(estado>0){
            $('div#Iva_incluido').removeClass('excluido');
            $('div#Iva_incluido').attr('data-estado',0);
            $('div#Iva_incluido').html('Incluido');
            
            /* Recalcular precio sugerido */
            
        }else{/* Pasa a ser excluido */
            $('div#Iva_incluido').addClass('excluido');
            $('div#Iva_incluido').attr('data-estado',1);
            $('div#Iva_incluido').html('Excluido');
        }
        
        var isPrecioSugerido = document.getElementById('precioSugerido').getAttribute('setter');
            isPrecioSugerido = parseInt(isPrecioSugerido);
        
        if(isPrecioSugerido===1){
            /* Recalcular precio sugerido */
                calcula_Precio_sugerido();
        }
        
    });
    
    /* Sector - Calculo precio sugerido */
    function calcula_Precio_sugerido(){
        var precio_unidad = parseInt(document.getElementById('txtPrecioUnidad').value);
        var iva_incluido = document.getElementById('Iva_incluido').getAttribute('data-estado');
            iva_incluido = parseInt(iva_incluido);
        
         
            if(iva_incluido>0){/* No se incluye iva */
                var iva = parseFloat(document.getElementById('txtIva').value);
                    iva = iva/100;
                    precio_unidad =  precio_unidad*iva +precio_unidad;
            }
            
                var precio_sugerido = precio_unidad/0.80;
                document.getElementById('precioSugerido').innerHTML = precio_sugerido;
                document.getElementById('precioSugerido').setAttribute('setter','1');
        
    }
    
    /* Sector - Comprobante de pago */
    /* Contado */
    $('div#sPago_factura').on('click','div#comprobante_contado',function(){
        Comprobante_pago('Contado');
    });
    /* Credito */
    $('div#sPago_factura').on('click','div#comprobante_credito',function(){
        Comprobante_pago('Crédito');
    });
    function Comprobante_pago(pmtTipo){
    //    alert(pmtTipo);
    }
    
    /* Sector Ingresar factura */
    $('div#sIngresar_factura').on('click','div#btnIngresar_factura',function(){
        
            /* Validación: Proveedor */
            var proveedor = document.getElementById('txtProveedor').value;
                /* Proveedor no seleccionado */    
                if(proveedor===''){
                    document.getElementById('txtProveedor').focus();
                    return;
                }
            /* Validación: Número de factura */
            var numero_factura = document.getElementById('txtNumero').value;
                /* No ha ingresado el número de la factura*/    
                if(numero_factura===''){
                    document.getElementById('txtNumero').focus();
                    return;
                }
                
                /* Recorre filas */
                    var control_filas = 0;
                    $('div#dtFacturaCompra div.fila').each(function(){
                        control_filas = control_filas + 1;
                    });
                    
                    if(control_filas===0){/* No hay filas */
                        document.getElementById('txtSearchProducto').focus();
                        return;
                    }
                
                                                /* ENCABEZADO */
        /* Parámetros: Facturas */
        var numero_factura = document.getElementById('txtNumero').value;
        var fecha_factura = document.getElementById('txtFecha_factura').value;
        var forma_pago = document.getElementById('fmPago').getAttribute('data-value');
        var id_proveedor = document.getElementById('txtProveedor').getAttribute('data-id');
        
         /* Parámetros: Resumen de factura */
        var descuento = document.getElementById('info_descuento').innerHTML;
        var iva = document.getElementById('info_iva').innerHTML;
        var total = document.getElementById('info_total').innerHTML;
        
        /* Parámetros: Pago de factura */
        var anticipo = total;/* Contado momentaneamente */
        forma_pago = parseInt(forma_pago);
        
        if(forma_pago>0){/* Crédito */
            anticipo = document.getElementById('txtAnticipo').value;/* Valor anticipo */
        }
        
                var vencimiento_factura = document.getElementById('txtFecha_factura').value;
                var saldo = total - anticipo;

                /* Encabezado de factura */
                var json_encabezado = JSON.stringify({Numero: numero_factura,Id_proveedor: id_proveedor,Forma_pago: forma_pago,Anticipo: anticipo,
                                                      Vencimiento: vencimiento_factura,Saldo: saldo,Descuento: descuento,Iva: iva,Total: total, Fecha: fecha_factura});
                                  
                var json_detalle = JSON.stringify(get_json_detalle_producto()); 
                
                    console.log('json detalle: ' + json_detalle);
                
                
                    /* Almacena factura */
                $.post('ctrlfactura',{json_Encabezado:json_encabezado,json_Detalle:json_detalle,Action:1},function(Id){
                    console.log('Id encabezado: ' + Id);
                });     
                 
                    /* Limpiar - Ingresar factura */
                 limpiar_IngresarFactura();
                                
    });
    
    /* Limpiar - Ingresar factura */
    function limpiar_IngresarFactura(id_encabezado){
            
            id_encabezado = parseInt(id_encabezado) + 1;
        
        /* Encabezado */
            document.getElementById('txtNumero').value = '';
            document.getElementById('txtNumero').setAttribute('data-id',id_encabezado);
                                            /* Forma de pago */
            document.getElementById('fmPago').setAttribute('data-value',0);
            document.getElementById('fmPago').setAttribute('class','contado');
            document.getElementById('fmPago').innerHTML = 'Contado';
                                            /* Información de proveedor */
            document.getElementById('txtProveedor').value='';
            document.getElementById('txtProveedor').setAttribute('data-id','');
            document.getElementById('info_proveedor_nit').innerHTML = 'seleccione';
            document.getElementById('info_proveedor_telefono').innerHTML = 'seleccione';
            document.getElementById('info_proveedor_ciudad').innerHTML = 'seleccione';
        /* Producto */
             document.getElementById('txtSearchProducto').value = '';
             document.getElementById('txtSearchProducto').setAttribute('data-id','');
             document.getElementById('info_producto_codigo').innerHTML = '';
             document.getElementById('info_producto_marca').innerHTML = '';
             document.getElementById('info_producto_grupo').innerHTML = '';
        /* Fracciones */
             document.getElementById('fracciones_unidad_medida').innerHTML = '';
        
        /* Data Grid */
            $('div#dtFacturaCompra div.fila').remove();
        
        /* Resumen: Factura */
            document.getElementById('info_valor_neto').innerHTML = 'seleccione';
            document.getElementById('info_descuento').innerHTML = 'seleccione';
            document.getElementById('info_subtotal').innerHTML = 'seleccione';
            document.getElementById('info_iva').innerHTML = 'seleccione';
            document.getElementById('info_total').innerHTML = 'seleccione';
        
        
    }
    
});

/* Funciona para todas las listas: Formulario ---> Fómulas */
    function busqueda_List(pmtTexto,pmtList,pmtChild){
        

                pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */
                
                  var i = 0; /* Controla número de filas visibles */
                  
                   /* Recorro cada fila de la lista */
                 $('div#'+pmtList+' div.'+pmtChild).each(function(){

                               var  row = $(this).text();/* Contiene exto de la fila */
                                    row = row.toLowerCase();


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
    
    function get_json_detalle_producto(){
        
         
        var json_detalle_producto =  new Array();
        
              /* Recorrer cada producto en datagrid */
                   $("div#dtFacturaCompra div.fila").each(function(){
                                        
                                        var id_fila = $(this).attr('id'); 
                                        var id_producto = $(this).attr('data-idproducto');
                                        var id_unidad = $(this).attr('data-idunidad');
                                        var cantidad = parseInt($(this).children('div.cantidad').html());
                                        var precio_unidad = parseInt($(this).children('div.preciounidad').children('div').html());
                                        var precio_venta = parseInt($(this).attr('data-precioventa'));
                                        var iva = parseFloat($(this).children('div.iva').html());
                                        var descuento = parseFloat($(this).children('div.descuento').html());
                                        var margen = parseFloat($(this).attr('data-margen'));
                  
                                        /* Agregar iva a precio de unidad */
                                           precio_unidad = parseInt(precio_unidad*iva + precio_unidad);
                        
                                        /* Recorrer fracciones */
                                        var json_fraccion = new Array();
                                        
                                        $('div#'+id_fila+' div.item').each(function(){
                                                    
                                            
                                                    var id_fraccion = $(this).attr('data-id');
                                                    var precio_fraccion = parseInt($(this).children('div.precio_fraccion').text());
                                                        /* Fraccion -> json */
                                                    var fraccion = new Array();
                                                        fraccion = {Id_fraccion: id_fraccion,Precio_fraccion: precio_fraccion}
                                                        
                                                        json_fraccion[json_fraccion.length] = fraccion;
                                         });
                                            /* Fila -> json */
                                         var fila = new Array();
                                             fila = {Id_producto: id_producto,Id_unidad: id_unidad,Cantidad: cantidad,Precio_unidad: precio_unidad,
                                                     Precio_venta: precio_venta,Margen_ganancia: margen,Descuento: descuento,Iva: iva, Json_Fraccion:json_fraccion};
                                                 
                                         /* Se agrega producto al json */
                                       json_detalle_producto[json_detalle_producto.length] = fila;
                        });/* Fin --- Recorrer filas del data grid */
             
                        
                    return json_detalle_producto;
                    
    }
    
    