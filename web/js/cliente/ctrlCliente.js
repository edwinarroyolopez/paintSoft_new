function create_update_Cliente(){

          let control =  validate_fields('setterCliente');

          console.log('Control: '+ control);

          if(control>0){return;}/* Existe almenos un campo vacío */

          var id_cliente =    __('txtBuscador_cliente').getAttribute('data-id_cliente');
          var txtNombre =     __('txtNombre').value;
          var txtDocumento =  __('txtDocumento').value;
          var txtTelefono =   __('txtTelefono').value;
          var txtDireccion =  __('txtDireccion').value;
          var txtCiudad =     __('txtCiudad').value;
          var txtEmail =      __('txtEmail').value;

               $.post('ctrlcliente',{
                         Id_cliente: id_cliente,
                         Nombre: txtNombre,
                         Documento: txtDocumento,
                         Telefono: txtTelefono,
                         Direccion: txtDireccion,
                         Ciudad: txtCiudad,
                         Email: txtEmail,
                         Estado: 1,
                         A: 1
                       }, function(r){/* Callback ...   */

                              console.log('id cliente: '+r);

                           /* Clean fields */
                              read_Clientes();
                              clean_fields('setterCliente');
               });

}/* create update cliente */

function delete_Cliente(){

      let id_cliente = parseInt(__('txtBuscador_cliente').getAttribute('data-id_cliente'));

      console.log('Eliminar... id_cliente: '+id_cliente);
      if(id_cliente>0){


                  __('resultOperationCliente').innerHTML = 'Eliminando cliente...';

                  $.post('ctrlcliente',{Id_cliente: id_cliente,A: 4}, function(r){/* Callback ...   */
                                 console.log('estado: '+r);

                             setTimeout(function(){/*  */
                                     __('resultOperationCliente').innerHTML = 'Cliente eliminado satisfactoriamente!';
                                     clean_Cliente();
                                     setTimeout(function(){
                                           __('resultOperationCliente').innerHTML = '';/* clean result */
                                           read_Clientes();/* Actualiza lista de clientes */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un cliente para eliminar*/
                    __('resultOperationCliente').innerHTML = 'Necesitas seleccionar un cliente para eliminar!';
                      setTimeout(function(){
                            __('resultOperationCliente').innerHTML = '';
                      },1500);
      }

}/* remove cliente */

function read_Clientes(){
            $.post('ctrlcliente',{A:2}, function(json_clientes){
                                
                               
                         /*       var elem = document.getElementById('descargar_clientes');
                                      elem.download = "clientes.json";
                                      elem.href = "data:application/octet-stream," + encodeURIComponent(json_clientes);
                               */
                              
                              var json_Clientes = JSON.parse($.trim(json_clientes));

                              /* Limpiar lista */
                              $('div#listClientes div.row').remove();

                              for (i in json_Clientes){

                                     var row = document.createElement('div');
                                         row.setAttribute('class','row');
                                         row.setAttribute('data-id',json_Clientes[i].Id_cliente);
                                         row.setAttribute('data-documento',json_Clientes[i].Documento);
                                         row.setAttribute('data-telefono',json_Clientes[i].Telefono);
                                         row.setAttribute('data-direccion',json_Clientes[i].Direccion);
                                         row.setAttribute('data-ciudad',json_Clientes[i].Ciudad);
                                         row.setAttribute('data-email',json_Clientes[i].Email);
                                         row.setAttribute('data-estado',json_Clientes[i].Estado);
                                         row.setAttribute('data-fecha_creacion',json_Clientes[i].Fecha_creacion);
                                     var nombre = document.createElement('div');
                                         nombre.setAttribute('class','nombre');
                                         nombre.innerHTML = json_Clientes[i].Nombre;
                                         row.appendChild(nombre);

                                     if(i>=20){
                                         row.setAttribute('class','row hidden');
                                     }else{/* Cantidad de items visibles */
                                         document.getElementById('listClientes').setAttribute('data-items',i);
                                     }
                                     document.getElementById('listClientes').appendChild(row);
                               }
                  });
}
function load_info_Cliente(id_cliente,nombre,documento,telefono,direccion,ciudad,email,estado,fecha_creacion){

      /* Setter */
           __('txtBuscador_cliente').setAttribute('data-id_cliente',id_cliente);
           __('txtBuscador_cliente').value = nombre;
           __('txtNombre').value = nombre;
           __('txtDocumento').value = documento;
           __('txtTelefono').value = telefono;
           __('txtDireccion').value = direccion;
           __('txtCiudad').value = ciudad;
           __('txtEmail').value = email;
           __('msgOperationCliente').innerHTML = 'Editar Cliente';

           /* Busca estadisticas del cliente */
           read_statistics_Cliente();
           /* */
             if(estado<0){estado='mora';}else{estado='activo';}
           __('info_estado').innerHTML =  estado;
           __('info_fecha_ingreso').innerHTML =  fecha_creacion;

}
function search_document_Cliente(){

    /* Buscar documento dentro de la lista */
      var document_cliente = __('txtDocumento').value;
      console.log('documento: '+document_cliente);
      let control = 0;

        /* Recorre cada fila de la lista */
        $('div#listClientes div.row').each(function(){
                 var row = $(this).attr('data-documento');/* Contiene el texto de la fila */

                 if(control===0){
                           if (row ===document_cliente) {/* Cliente contenido en la lista */

                                   /* Getter */
                                    var id_cliente = $(this).attr('data-id');
                                    var nombre = $(this).text();
                                    var documento = $(this).attr('data-documento');
                                    var telefono = $(this).attr('data-telefono');
                                    var direccion = $(this).attr('data-direccion');
                                    var ciudad = $(this).attr('data-ciudad');
                                    var email = $(this).attr('data-email');
                                    var estado = parseInt($(this).attr('data-estado'));
                                    var fecha_creacion = $(this).attr('data-fecha_creacion');

                                      /* carga datos a la vista */
                                      load_info_Cliente(id_cliente,nombre,documento,telefono,direccion,
                                                        ciudad,email,estado,fecha_creacion);

                                control = 1;/* Detiene la búsqueda */
                           }else{
                                /* Limia info */
                                clean_Cliente();
                                __('txtDocumento').value = document_cliente;
                           }
                 }/* control */

        });

}/* search document cliente */

function read_statistics_Cliente(){

            let id_cliente = parseInt(__('txtBuscador_cliente').getAttribute('data-id_cliente'));

            $.post('ctrlcliente',{A:3,Id_cliente:id_cliente}, function(json_statistics){

                        console.log('json statistics: '+json_statistics);

                    var Statistics =   JSON.parse($.trim(json_statistics));

                    __('info_facturas').innerHTML = Statistics.Facturas;
                    __('info_vfacturas').innerHTML = number_format(Statistics.VFacturas,0);
                    __('info_deuda').innerHTML = number_format(Statistics.Deuda,0);

                  });
}


function clean_Cliente(){
    /* clean */
        clean_fields('setterCliente');
        __('txtBuscador_cliente').value = '';
        __('txtBuscador_cliente').setAttribute('data-id_cliente',0);
        __('msgOperationCliente').innerHTML = 'Nuevo cliente';
        /* info */

        __('info_fecha_ingreso').innerHTML ='';
        __('info_vfacturas').innerHTML ='';
        __('info_facturas').innerHTML = '';
        __('info_deuda').innerHTML = '';
        __('info_estado').innerHTML ='';

}
