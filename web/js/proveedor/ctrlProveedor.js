function create_update_Proveedor(){

          let control =  validate_fields('setterProveedor');

          console.log('Control: '+ control);

          if(control>0){return;}/* Existe almenos un campo vacío */

          var id_proveedor =    __('txtBuscador_proveedor').getAttribute('data-id_proveedor');
          var txtRazon_social = __('txtRazon_social').value;
          var txtNit = __('txtNit').value;
          var txtContacto = __('txtContacto').value;
          var txtCiudad = __('txtCiudad').value;
          var txtDireccion = __('txtDireccion').value;
          var txtTelefono_1 = __('txtTelefono_1').value;
          var txtTelefono_2 = __('txtTelefono_2').value;
          var txtEmail = __('txtEmail').value;
          var txtBanco = __('txtBanco').value;
          var txtTipo_cuenta = __('txtTipo_cuenta').value;
          var txtNumero_cuenta = __('txtNumero_cuenta').value;
          var txtTitular_cuenta = __('txtTitular_cuenta').value;

              $.post('ctrlproveedor',{
                         Id_proveedor: id_proveedor,
                         Razon_social: txtRazon_social,
                         Nit: txtNit,
                         Contacto: txtContacto,
                         Ciudad: txtCiudad,
                         Direccion: txtDireccion,
                         Telefono_1: txtTelefono_1,
                         Telefono_2: txtTelefono_2,
                         Email: txtEmail,
                         Banco: txtBanco,
                         Tipo_cuenta: txtTipo_cuenta,
                         Numero_cuenta: txtNumero_cuenta,
                         Titular_cuenta: txtTitular_cuenta,
                         Estado:1,
                         A: 1
                     }, function(r){/* Callback ...   */

                           console.log('id proveedor: ' +r);

                        /* Clean fields proveedor */
                           read_Proveedores();
                           clean_Proveedor();
               });
}/* create update proveedor */

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

function read_Proveedores(){

  $.post('ctrlproveedor',{A:2},function(json_proveedor){

              //console.log('json proveedor: '+json_proveedor);
                    var elem = document.getElementById('descargar_proveedores');
                        elem.download = "proveedores.json";
                        elem.href = "data:application/octet-stream," + encodeURIComponent(json_proveedor);

            /* Limpiar lista */
            $('div#listProveedores div.row').remove();

            var json_Proveedor = JSON.parse($.trim(json_proveedor));

            for(i in json_Proveedor){
                /* Crear objeto */
                    var row = document.createElement('div');
                        row.setAttribute('class','row');
                        row.setAttribute('data-id',json_Proveedor[i].Id_proveedor);
                        row.setAttribute('data-nit',json_Proveedor[i].Nit);
                        row.setAttribute('data-contacto',json_Proveedor[i].Contacto);
                        row.setAttribute('data-ciudad',json_Proveedor[i].Ciudad);
                        row.setAttribute('data-direccion',json_Proveedor[i].Direccion);
                        row.setAttribute('data-telefono_1',json_Proveedor[i].Telefono_1);
                        row.setAttribute('data-telefono_2',json_Proveedor[i].Telefono_2);
                        row.setAttribute('data-email',json_Proveedor[i].Email);
                        row.setAttribute('data-banco',json_Proveedor[i].Banco);
                        row.setAttribute('data-tipo_cuenta',json_Proveedor[i].Tipo_cuenta);
                        row.setAttribute('data-numero_cuenta',json_Proveedor[i].Numero_cuenta);
                        row.setAttribute('data-titular_cuenta',json_Proveedor[i].Titular_cuenta);
                        row.setAttribute('data-estado',json_Proveedor[i].Estado);
                        row.setAttribute('data-fecha_creacion',json_Proveedor[i].Fecha_creacion);
                    var proveedor = document.createElement('div');
                        proveedor.setAttribute('class','proveedor');
                        proveedor.innerHTML = json_Proveedor[i].Razon_social;
                        row.appendChild(proveedor);

                        if(i>=20){
                            row.setAttribute('class','row hidden');
                        }else{/* Cantidad de items visibles */
                            document.getElementById('listProveedores').setAttribute('data-items',i);
                        }
                        document.getElementById('listProveedores').appendChild(row);
            }
        });
}/* read proveedor */

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
