function create_update_Grupo(){

          let control =  validate_fields('setterGrupo');

          if(control>0){return;}/* Existe almenos un campo vacío */

          var id_grupo =    __('txtBuscador_grupo').getAttribute('data-id_grupo');
          var descripcion =     __('txtGrupo').value;
          var gramo =     __('chkGramo').checked? true: false;

               /* Almacena grupo */
                      let response = {};

                      const promise = new Promise(function (resolve, reject) {

                                    setTimeout(function(){

                                          $.post('../ctrlgrupo',{Id_grupo: id_grupo,
                                                              Descripcion: descripcion,
                                                              Gramo: gramo, Estado: 1,A: 1
                                                  }, function(r){/* Callback ...   */

                                                        if(r != ''){
                                                          response = r;
                                                        }
                                                        resolve(response)
                                          });

                                    }, 1000);/* setTimeout */

                                    if (!response) {
                                      reject(new Error('No almacena grupo!'))
                                    }
                      })/* promise */

                      return promise

}/* create update grupo */

function delete_Grupo(){

      let id_grupo = parseInt(__('selectGrupo').getAttribute('data-id_grupo'));

      /* hace invisible el crud presentacion */
          __('crudPresentacion').setAttribute('class','content_crud hidden');
          __('cleanPresentacion').removeAttribute('class');
          __('cleanPresentacion').children[0].innerHTML = 'Eliminando grupo...';

      if(id_grupo>0){

              /* Elimina grupo */
                     let response = {};

                     const promise = new Promise(function (resolve, reject) {

                                   setTimeout(function(){

                                         $.post('../ctrlgrupo',{Id_grupo: id_grupo,A: 4}, function(r){/* Callback ...   */

                                                 if(r != ''){
                                                   response = r;
                                                 }
                                                 resolve(response)
                                         });

                                   }, 1000);/* setTimeout */

                                   if (!response) {
                                     reject(new Error('No elimina grupo!'))
                                   }
                     })/* promise */

                     return promise


      }else {/* No se ha seleccionado un grupo para eliminar */
                    __('cleanPresentacion').children[0].innerHTML = 'Necesitas seleccionar un grupo!';
                      setTimeout(function(){
                            __('cleanPresentacion').children[0].innerHTML = 'Selecciona un grupo';
                      },1500);
      }

}/* remove cliente */

function read_Grupos(){

              console.log('Buscando... grupos...');

                /* Lee grupos */
                   let list = {};

                   const promise = new Promise(function (resolve, reject) {

                              $.post('../ctrlgrupo',{A:2}, function(grupos){
                                      if(grupos != ''){
                                        list = JSON.parse(grupos);
                                      }
                                      resolve(list)
                              });

                             if (!list) {
                               reject(new Error('No se encontraron grupos!'))
                             }
                   })/* promise */

                   return promise

}/* Lee grupos */


function load_info_Grupo(id_cliente,nombre,documento,telefono,direccion,ciudad,email,estado,fecha_creacion){

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
           read_statistics_Grupo();
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
                                clean_Grupo();
                                __('txtGrupo').value = document_grupo;
                           }
                 }/* control */

        });

}/* search document grupo */

function read_statistics_Grupo(){

            let id_grupo = parseInt(__('txtBuscador_grupo').getAttribute('data-id_grupo'));

            $.post('../ctrlgrupo',{A:3,Id_grupo:id_grupo}, function(json_statistics){

                    console.log('json statistics: '+json_statistics);

                    var Statistics = JSON.parse($.trim(json_statistics));

                    __('info_facturas').innerHTML = Statistics.Facturas;
                    __('info_vfacturas').innerHTML = number_format(Statistics.VFacturas,0);
                    __('info_deuda').innerHTML = number_format(Statistics.Deuda,0);

                  });
}


function clean_Grupo(){
    /* clean */
        clean_fields('setterGrupo');
        __('txtBuscador_grupo').value = '';
        __('txtBuscador_grupo').setAttribute('data-id_grupo',0);
        __('msgOperationGrupo').innerHTML = 'Nuevo grupo';
        __('txtGrupo').value = '';
        __('chkGramo').checked = false;
    /* info */
        __('selectGrupo').innerHTML = 'Selecciona un grupo';
        __('selectGrupo').setAttribute('data-id_grupo',0);
        /* hace invisible el crud presentacion */
        __('crudPresentacion').setAttribute('class','content_crud hidden');
        __('cleanPresentacion').removeAttribute('class');
        document.getElementById('info_productos_grupo').innerHTML = ''
        document.getElementById('info_estado_grupo').innerHTML = ''
        document.getElementById('info_gramo_grupo').innerHTML = ''
}
