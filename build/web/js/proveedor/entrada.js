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
            var id_producto = $(this).attr('data-id_producto')
            /* Buscar presentaciones */
              data_Producto(id_producto).then(function(data){

                    $('div#content_presentaciones div.presentacion').remove()

                    var presentaciones = JSON.parse(data.Presentaciones).presentaciones

                    for(i in presentaciones){
                          /* crear presentaciones */
                          var presentacion = document.createElement('div')
                              presentacion.setAttribute('class','presentacion')
                              presentacion.setAttribute('id',presentaciones[i].Id_presentacion)
                          var text = document.createElement('span')
                              text.setAttribute('class','text')
                              text.innerText = presentaciones[i].Presentacion
                          var x = document.createElement('span')
                              x.setAttribute('class','x')
                              presentacion.appendChild(text)
                              presentacion.appendChild(x)
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

})
