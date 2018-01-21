

/* 1. create_update_Proveedor */
        function create_update_Proveedor(pmtId_proveedor,pmtRazon_social,pmtNit,pmtContacto,pmtCiudad,pmtDireccion,
          pmtTelefono_1,pmtTelefono_2,pmtEmail,pmtBanco,pmtTipo_cuenta,pmtNumero_cuenta,pmtTitular_cuenta){
                  /* Almacena proveedor */
                       let response = {};

                         const promise = new Promise(function (resolve, reject) {

                                   $.post('ctrlproveedor',{
                                              Id_proveedor: pmtId_proveedor,
                                              Razon_social: pmtRazon_social,
                                              Nit: pmtNit,
                                              Contacto: pmtContacto,
                                              Ciudad: pmtCiudad,
                                              Direccion: pmtDireccion,
                                              Telefono_1: pmtTelefono_1,
                                              Telefono_2: pmtTelefono_2,
                                              Email: pmtEmail,
                                              Banco: pmtBanco,
                                              Tipo_cuenta: pmtTipo_cuenta,
                                              Numero_cuenta: pmtNumero_cuenta,
                                              Titular_cuenta: pmtTitular_cuenta,
                                              Estado:1,
                                              A: 1
                                          }, function(r){/* Callback ...   */

                                              if(r != ''){
                                                response = r;
                                              }
                                              resolve(response)
                                    });

                                   if (!response) {
                                     reject(new Error('No almacena proveedor!'))
                                   }
                         })/* promise */

                         return promise

        }/* ## create update Proveedor ## */


function delete_Proveedor(){

      let id_proveedor = parseInt(__('txtBuscador_proveedor').getAttribute('data-id_proveedor'));

      console.log('Eliminar... id_proveedor: '+id_proveedor);
      if(id_proveedor>0){


                  __('resultOperationProveedor').innerHTML = 'Eliminando proveedor...';

                  $.post('ctrlproveedor',{Id_proveedor: id_proveedor,A: 4}, function(r){/* Callback ...   */
                                 console.log('estado: '+r);

                             setTimeout(function(){/*  */
                                     __('resultOperationProveedor').innerHTML = 'Proveedor eliminado satisfactoriamente!';
                                     clean_Proveedor();
                                     setTimeout(function(){
                                           __('resultOperationProveedor').innerHTML = '';/* clean result */
                                           read_Proveedores();/* Actualiza lista de proveedores */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un proveedor para eliminar*/
                    __('resultOperationProveedor').innerHTML = 'Necesitas seleccionar un proveedor para eliminar!';
                      setTimeout(function(){
                            __('resultOperationProveedor').innerHTML = '';
                      },1500);
      }

}/* remove proveedor */


/* 2. Lee proveedores */
        function read_Proveedores(){

                    /* Lee proveedores */
                       let list = {};

                       const promise = new Promise(function (resolve, reject) {

                                  $.post('../ctrlproveedor',{A:2},function(proveedores){
                                          if(proveedores != ''){
                                            list = JSON.parse(proveedores);
                                          }
                                          resolve(list)
                                  });

                                 if (!list) {
                                   reject(new Error('No se encontraron proveedores!'))
                                 }
                       })/* promise */

                       return promise
        }/* ## Lee proveedores ## */



function load_info_Proveedor(id_proveedor,proveedor,nit,contacto,ciudad,
                             direccion,telefono_1,telefono_2,email,banco,
                             tipo_cuenta,numero_cuenta,titular_cuenta,
                             estado,fecha_creacion){

      /* Setter */
           __('txtBuscador_proveedor').setAttribute('data-id_proveedor',id_proveedor);
           __('txtBuscador_proveedor').value = proveedor;
              __('txtRazon_social').value = proveedor;
              __('txtNit').value = nit;
              __('txtContacto').value = contacto;
              __('txtCiudad').value = ciudad;
              __('txtDireccion').value = direccion;
              __('txtTelefono_1').value = telefono_1;
              __('txtTelefono_2').value = telefono_2;
              __('txtEmail').value = email;
              __('txtBanco').value = banco;
              __('txtTipo_cuenta').value = tipo_cuenta;
              __('txtNumero_cuenta').value = numero_cuenta;
              __('txtTitular_cuenta').value = titular_cuenta;
              __('msgOperationProveedor').innerHTML = 'Editar Proveedor';

           /* Busca estadisticas del proveedor */
              read_statistics_Proveedor();
           /* */
             if(estado<0){estado='mora';}else{estado='activo';}
           __('info_estado').innerHTML =  estado;
           __('info_fecha_ingreso').innerHTML =  fecha_creacion;

}
function search_nit_Proveedor(){

    /* Buscar documento dentro de la lista */
      var nit_proveedor = __('txtNit').value;
      console.log('nit: '+nit_proveedor);
      let control = 0;

        /* Recorre cada fila de la lista */
        $('div#listProveedores div.row').each(function(){
                 var row = $(this).attr('data-nit');/* Contiene el texto de la fila */

                 if(control===0){
                           if (row ===nit_proveedor) {/* Proveedor contenido en la lista */

                                   /* Getter */
                                       var id_proveedor = $(this).attr('data-id');
                                       var proveedor = $(this).text();
                                       var id_proveedor = $(this).attr('data-id');
                                       var nit = $(this).attr('data-nit');
                                       var contacto = $(this).attr('data-contacto');
                                       var ciudad = $(this).attr('data-ciudad');
                                       var direccion = $(this).attr('data-direccion');
                                       var telefono_1 = $(this).attr('data-telefono_1');
                                       var telefono_2 = $(this).attr('data-telefono_2');
                                       var email = $(this).attr('data-email');
                                       var banco = $(this).attr('data-banco');
                                       var tipo_cuenta = $(this).attr('data-tipo_cuenta');
                                       var numero_cuenta = $(this).attr('data-numero_cuenta');
                                       var titular_cuenta = $(this).attr('data-titular_cuenta');
                                       var estado = $(this).attr('data-titular_cuenta');
                                       var fecha_creacion = $(this).attr('data-fecha_creacion');

                                      /* carga datos a la vista */
                                      load_info_Proveedor(id_proveedor,proveedor,nit,contacto,ciudad,
                                                                   direccion,telefono_1,telefono_2,email,banco,
                                                                   tipo_cuenta,numero_cuenta,titular_cuenta,
                                                                   estado,fecha_creacion);

                                control = 1;/* Detiene la búsqueda */
                           }else{
                                /* Limia info */
                                clean_Proveedor();
                                __('txtNit').value = nit_proveedor;
                           }
                 }/* control */

        });

}/* search document proveedor */

function read_statistics_Proveedor(){

            let id_proveedor = parseInt(__('txtBuscador_proveedor').getAttribute('data-id_proveedor'));

            $.post('ctrlproveedor',{A:3,Id_proveedor:id_proveedor}, function(json_statistics){

                        console.log('json statistics: '+json_statistics);

                    var Statistics =   JSON.parse($.trim(json_statistics));

                    __('info_facturas').innerHTML = Statistics.Facturas;
                    __('info_vfacturas').innerHTML = number_format(Statistics.VFacturas,0);
                    __('info_deuda').innerHTML = number_format(Statistics.Deuda,0);

                  });
}


function clean_Proveedor(){
    /* clean */
        clean_fields('setterProveedor');
        __('txtBuscador_proveedor').value = '';
        __('txtBuscador_proveedor').setAttribute('data-id_proveedor',0);
        __('msgOperationProveedor').innerHTML = 'Nuevo proveedor';

        /* info */
        __('info_fecha_ingreso').innerHTML ='';
        __('info_vfacturas').innerHTML ='';
        __('info_facturas').innerHTML = '';
        __('info_deuda').innerHTML = '';
        __('info_estado').innerHTML ='';

}
