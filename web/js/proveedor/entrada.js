/* 1. Buscar proveedores */
    read_Proveedores().then(function(Proveedores){

                /* Limpiar lista */
                  $('div#listProveedores div.row').remove();

                for(i in Proveedores){
                    /* Crear objeto */
                        var row = document.createElement('div');
                            row.setAttribute('class','row');
                            row.setAttribute('data-id',Proveedores[i].Id_proveedor);
                            row.setAttribute('data-nit',Proveedores[i].Nit);
                            row.setAttribute('data-contacto',Proveedores[i].Contacto);
                            row.setAttribute('data-ciudad',Proveedores[i].Ciudad);
                            row.setAttribute('data-direccion',Proveedores[i].Direccion);
                            row.setAttribute('data-telefono_1',Proveedores[i].Telefono_1);
                            row.setAttribute('data-telefono_2',Proveedores[i].Telefono_2);
                            row.setAttribute('data-email',Proveedores[i].Email);
                            row.setAttribute('data-banco',Proveedores[i].Banco);
                            row.setAttribute('data-tipo_cuenta',Proveedores[i].Tipo_cuenta);
                            row.setAttribute('data-numero_cuenta',Proveedores[i].Numero_cuenta);
                            row.setAttribute('data-titular_cuenta',Proveedores[i].Titular_cuenta);
                            row.setAttribute('data-estado',Proveedores[i].Estado);
                            row.setAttribute('data-fecha_creacion',Proveedores[i].Fecha_creacion);
                        var proveedor = document.createElement('div');
                            proveedor.setAttribute('class','proveedor');
                            proveedor.innerHTML = Proveedores[i].Razon_social;
                            row.appendChild(proveedor);

                            if(i>=20){
                                row.setAttribute('class','row hidden');
                            }else{/* Cantidad de items visibles */
                                document.getElementById('listProveedores').setAttribute('data-items',i);
                            }
                            document.getElementById('listProveedores').appendChild(row);
                }
    })/* 1. Leer proveedores */


    /* 2. Buscar productos */
        read_Productos().then(function(Productos){

                    /* Limpiar lista */
                    $('div#listProductos div.row').remove();

                      for (i in Productos){

                                 var row = document.createElement('div');
                                     row.setAttribute('class','row');
                                     row.setAttribute('data-id_producto',Productos[i].Id_producto);
                                     row.setAttribute('data-id_grupo',Productos[i].Id_grupo);
                                     row.setAttribute('data-id_marca',Productos[i].Id_marca);
                                     row.setAttribute('data-estado',Productos[i].Estado);
                                     row.setAttribute('data-fecha_creacion',Productos[i].Fecha_creacion);
                                     row.setAttribute('data-fecha_modificacion',Productos[i].Fecha_modificacion);
                                 var descripcion = document.createElement('div');
                                     descripcion.setAttribute('class','descripcion');
                                     descripcion.innerHTML = Productos[i].Descripcion;;
                                     row.appendChild(descripcion);

                                 if(i>=20){
                                     row.setAttribute('class','row hidden');
                                 }else{/* Cantidad de items visibles */
                                     document.getElementById('listProductos').setAttribute('data-items',i);
                                 }
                                 document.getElementById('listProductos').appendChild(row);
                       }
        })/* 2. Leer productos */

/* eventos */
$(document).on('ready', function(){

    /* 1. Visibilidad de la lista de proveedores */
        $('input#txtBuscador_proveedor').on('focusin',function(){
          $('div#listProveedores').removeClass('hidden')
        })
        $('input#txtBuscador_proveedor').on('focusout',function(){
          setTimeout(function(){$('div#listProveedores').addClass('hidden')},200)
        })/* ## visibilidad de proveedores ##*/

    /* 2. Visibilidad de la lista de productos */
        $('input#txtBuscador_producto').on('focusin',function(){
          $('div#listProductos').removeClass('hidden')
        })
        $('input#txtBuscador_producto').on('focusout',function(){
            setTimeout(function(){$('div#listProductos').addClass('hidden')},200)
        })/* ## visibilidad de productos ##*/

    /* 3. Selecciona un proveedor */
        $('div#listProveedores').on('click','div.row',function(){
              __('info_proveedor').innerText =$(this).children('div.proveedor').html()
              __('info_nit').innerHTML = $(this).attr('data-nit')
              __('info_ciudad').innerHTML = $(this).attr('data-ciudad')
              __('info_telefono').innerHTML = $(this).attr('data-telefono_1')
        })/* ## Selecciona un proveedor ## */

    /* 4. Selecciona un producto */
        $('div#listProductos').on('click','div.row',function(){
            __('info_producto').innerText = $(this).children('div.descripcion').html()
            __('info_producto').setAttribute('data-id_producto',$(this).attr('data-id_producto'))

            var id_producto = $(this).attr('data-id_producto')
            /* Buscar presentaciones */
              data_Producto(id_producto).then(function(data){

                    $('div#content_presentaciones div.presentacion').remove()

                    var presentaciones = JSON.parse(data.Presentaciones).presentaciones

                    for(i in presentaciones){
                          /* crear presentaciones */
                          var presentacion = document.createElement('div')
                              presentacion.setAttribute('class','presentacion default')
                              presentacion.setAttribute('data-id_presentacion',presentaciones[i].Id_presentacion)
                          var text = document.createElement('span')
                              text.setAttribute('class','text')
                              text.innerText = presentaciones[i].Presentacion
                          // var x = document.createElement('span')
                          //     x.setAttribute('class','x')
                              presentacion.appendChild(text)
                              // presentacion.appendChild(x)
                              __('content_presentaciones').appendChild(presentacion)
                    }

              })
        })/* ## Selecciona un producto ## */

   /* 5. Control de cantidad */
        $('div.control').on('click','div.incrementa',function(){
            __('txtCantidad').value = parseInt(__('txtCantidad').value) + 1
        })
        $('div.control').on('click','div.decrementa',function(){
            __('txtCantidad').value = parseInt(__('txtCantidad').value) - 1
        })/* ## Control de cantidad ##*/



  /* 6. Bajar presentación */
      $('div.content_button').on('click','div#btnBajar',function(){
          console.log('Bajando...');

          var producto = __('info_producto').innerHTML
          var id_producto = __('info_producto').getAttribute('data-id_producto')
          var presentacion = __('info_presentacion').innerHTML
          var id_presentacion = __('info_presentacion').getAttribute('data-id_presentacion')
          var cantidad = parseInt(__('txtCantidad').value)
          var precio_unidad = parseInt(__('txtPrecio_unidad').value)
          var precio_venta = parseInt(__('txtPrecio_venta').value)
          var descuento = parseInt(__('txtDescuento').value)
          var precio_sugerido = parseInt(__('txtPrecio_sugerido').value)
          var margen_ganancia = parseInt(__('txtMargen_ganancia').value)

          /* construir fila */      console.log('despues!');

          add_row(id_producto,producto,id_presentacion,presentacion,cantidad,precio_unidad,precio_venta,descuento,precio_sugerido,margen_ganancia)
          limpiar_valores()
     })
    /* ## Bajar presentación ## */

  /* 7. add row */
      function add_row(pmtId_producto,pmtProducto,pmtId_presentacion,pmtPresentacion,pmtCantidad,pmtPrecio_unidad,pmtPrecio_venta,pmtDescuento,pmtPrecio_sugerido,pmtMargen_ganancia){

              var row = document.createElement('div')
                  row.setAttribute('class','row')
                  row.setAttribute('data-id_producto',pmtId_producto)
                  row.setAttribute('data-id_presentacion',pmtId_presentacion)
                  row.setAttribute('data-precio_venta',pmtPrecio_venta)
                  row.setAttribute('data-descuento',pmtDescuento)
                  row.setAttribute('data-precio_sugerido',pmtPrecio_sugerido)
                  row.setAttribute('data-margen_ganancia',pmtMargen_ganancia)
              var numero = document.createElement('div')
                  numero.setAttribute('class','cell numero')
                  numero.innerHTML=1
              var descripcion = document.createElement('div')
                  descripcion.setAttribute('class','cell descripcion')
                  descripcion.innerHTML=pmtProducto
              var presentacion = document.createElement('div')
                  presentacion.setAttribute('class','cell presentacion')
                  presentacion.innerHTML=pmtPresentacion
              var cantidad = document.createElement('div')
                  cantidad.setAttribute('class','cell cantidad')
                  cantidad.innerHTML=pmtCantidad
              var precio_unidad = document.createElement('div')
                  precio_unidad.setAttribute('class','cell precio_unidad')
                  precio_unidad.innerHTML=pmtPrecio_unidad
                  row.appendChild(numero)
                  row.appendChild(descripcion)
                  row.appendChild(presentacion)
                  row.appendChild(cantidad)
                  row.appendChild(precio_unidad)
                  __('dataCompra').appendChild(row)

      }/* ## add row ## */

  /* 8. Remove row */
      function remove_row(){

      }/* ## add row ## */


  /*  Logica de eventos presentaciones */
  /* 9. Click: Presentacion default */
      $('div.content_presentaciones').on('click','div.default',function(){
          var id_presentacion = $(this).attr('data-id')

          $('div.content_presentaciones div').removeClass('selected')
          $(this).addClass('selected')
          __('info_presentacion').innerHTML = $(this).text()
          __('info_presentacion').setAttribute('data-id_presentacion',$(this).attr('data-id_presentacion'))

          limpiar_valores()

      })/* ## Click: Presentacion default ## */

  /* 10. Selecciona una fila */
    $('div#dataCompra').on('click','div.row',function(){

        /* debería cargar datos a los campos */
        __('txtCantidad').value=$(this).children('div.cantidad').html()
        __('txtPrecio_unidad').value=$(this).children('div.precio_unidad').html()
        __('txtPrecio_venta').value=$(this).attr('data-precio_venta')
        __('txtDescuento').value=$(this).attr('data-descuento')
        __('txtPrecio_sugerido').value=$(this).attr('data-precio_sugerido')
        __('txtMargen_ganancia').value=$(this).attr('data-margen_ganancia')
        /* producto - presentacion */
        __('info_producto').innerHTML = $(this).children('div.descripcion').html()
        __('info_producto').setAttribute('data-id_producto',$(this).attr('data-id_producto'))
        __('info_presentacion').innerHTML = $(this).children('div.presentacion').html()
        __('info_presentacion').setAttribute('data-id_presentacion',$(this).attr('data-id_presentacion'))

        /* Recorre todas las presentaciones hasta que encuentre la que tiene este id */
          var id_presentacion = $(this).attr('data-id_presentacion')

          $('div.content_presentaciones div.presentacion').each(function(){

                $(this).removeClass('selected')

                if(id_presentacion==$(this).attr('data-id_presentacion')){
                      $(this).find('span.x').remove()
                      /* debe permitirle "borrar la fila" */
                      $(this).append('<span class="x"></span>');
                      $(this).addClass('custom')
                      $(this).addClass('selected')
                      $(this).removeClass('default')
                }

          })


    })

  /* 11. Limpiar campos */
    function limpiar_valores(){
          $('div.content_values input').each(function(){

              var id = $(this).attr('id')

              if(id!='txtCantidad'){
                  $(this).val('')
              }else{
                  $(this).val('1')
              }

          })
    }/* ## limpiar_valores ## */

    /* 12. Busca datos de la presentacion en el datagrid y los carga en las cajas de texto */
    $('div.content_presentaciones').on('click','div.custom',function(){

          /* verificar que tenga un hermano span.x */

           if(typeof($(this).children('span.x').html())  != "undefined") {
                /* Cargar datos de la fila asociada a la presentacion  */
                /* foco */
                $('div.presentacion').removeClass('selected')
                $(this).addClass('selected')

                /* Eliminar la fila que contenga esta presentacion y este producto */
                var id_producto = __('info_producto').getAttribute('data-id_producto')
                var id_presentacion = $(this).attr('data-id_presentacion')

                  $('div#dataCompra div.row').each(function(){

                        if($(this).attr('data-id_producto')==id_producto && $(this).attr('data-id_presentacion')==id_presentacion ){
                              /* debería cargar datos a los campos */
                              __('txtCantidad').value=$(this).children('div.cantidad').html()
                              __('txtPrecio_unidad').value=$(this).children('div.precio_unidad').html()
                              __('txtPrecio_venta').value=$(this).attr('data-precio_venta')
                              __('txtDescuento').value=$(this).attr('data-descuento')
                              __('txtPrecio_sugerido').value=$(this).attr('data-precio_sugerido')
                              __('txtMargen_ganancia').value=$(this).attr('data-margen_ganancia')
                              /* producto - presentacion */
                              __('info_producto').innerHTML = $(this).children('div.descripcion').html()
                              __('info_producto').setAttribute('data-id_producto',$(this).attr('data-id_producto'))
                              __('info_presentacion').innerHTML = $(this).children('div.presentacion').html()
                              __('info_presentacion').setAttribute('data-id_presentacion',$(this).attr('data-id_presentacion'))
                        }

                  })
           }


    })


    /* 13 Elimina la fila relacionada con la presentacion */
    $('div.content_presentaciones').on('click','span.x',function(){
      console.log('x');
              $('div.presentacion').removeClass('selected')

              console.log('Eliminar fila!');
              console.log($(this).parent().attr('data-id_presentacion'))

              /* Elimina estilos */
              $(this).parent().removeClass('selected')
              $(this).parent().removeClass('custom')
              $(this).parent().addClass('default')

              /* Eliminar la fila que contenga esta presentacion y este producto */
              var id_producto = __('info_producto').getAttribute('data-id_producto')
              var id_presentacion = $(this).parent().attr('data-id_presentacion')

              $('div#dataCompra div.row').each(function(){

                  if($(this).attr('data-id_producto')==id_producto && $(this).attr('data-id_presentacion')==id_presentacion ){
                      $(this).remove()
                  }

              })
              /* Quitar botón eliminar */
                $(this).remove()
                limpiar_valores()

    })

})




/**/
