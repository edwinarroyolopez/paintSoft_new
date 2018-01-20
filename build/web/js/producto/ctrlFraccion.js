
function create_update_Fracciones(e){

          let control =  validate_fields('fieldFraccion');

          console.log('Control: '+ control);

          if(control>0){return;}/* Existe almenos un campo vacío */

                  e.parentElement.setAttribute('class','fieldFraccion hidden');

                  let id_presentacion = e.parentElement.parentElement.parentElement.getAttribute('data-id');/* item */;
                  let fraccion = __('txtFraccion').value;
                  let proporcion = __('txtProporcion').value;

                  console.log('fraccion: '+fraccion+' proporcion: '+proporcion +' id presentacion: ' + id_presentacion);


               $.post('../ctrlfraccion',{
                         Id_presentacion: id_presentacion,
                         Fraccion: fraccion,
                         Proporcion: proporcion,
                         A: 1
                       }, function(id_fraccion){/* Callback ...   */
                          /* recargar fracciones de esta presentacion */
                          console.log('id fraccion: '+id_fraccion);
                          let item = e.parentElement.parentElement.parentElement;

                          var row = create_row_fraccion(id_fraccion,fraccion,proporcion)
                              item.appendChild(row);

               });

}/* create update fraccion */

function delete_Fraccion(){

      let id_fraccion = parseInt(__('selectGrupo').getAttribute('data-id_grupo'));

      console.log('Eliminar... id_fraccion: '+id_fraccion);

      /* hace invisible el crud presentacion */
          __('crudPresentacion').setAttribute('class','content_crud hidden');
          __('cleanPresentacion').removeAttribute('class');
          __('cleanPresentacion').children[0].innerHTML = 'Eliminando grupo...';

      if(id_grupo>0){

                  $.post('../ctrlgrupo',{Id_grupo: id_grupo,A: 4}, function(estado){/* Callback ...   */

                                 console.log('estado: '+estado);

                             setTimeout(function(){/*  */
                                      if(estado<0){/* No se puede eliminar grupo, porque hay productos asociados a este  */
                                          __('cleanPresentacion').children[0].innerHTML = 'No se puede eliminar, existen productos asociados a este grupo!';
                                      }else{
                                          __('cleanPresentacion').children[0].innerHTML = 'Grupo eliminado!';
                                      }

                                     clean_Grupo();
                                     setTimeout(function(){
                                          __('cleanPresentacion').children[0].innerHTML = 'Selecciona un grupo';/* clean result */
                                           read_Grupos();/* Actualiza lista de grupos */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un grupo para eliminar */
                    __('cleanPresentacion').children[0].innerHTML = 'Necesitas seleccionar un grupo!';
                      setTimeout(function(){
                            __('cleanPresentacion').children[0].innerHTML = 'Selecciona un grupo';
                      },1500);
      }

}/* remove fraccion */

function read_Fracciones(pmtId_presentacion,pmtItem){

            /* limpiar item */
            /* Elimina elementos */
          /*  var rows = pmtItem.children;

              for (var i = 0; i < rows.length; i++) {
                  if(rows[i].getAttribute('class')=='row'){
                     rows[i].parentNode.removeChild(rows[i]);
                  }
              } */

            $.post('../ctrlfraccion',{Id_presentacion:pmtId_presentacion,A:2}, function(json_fracciones){

                            console.log('json json_fracciones: '+json_fracciones);

                              var json_Fracciones = JSON.parse($.trim(json_fracciones));

                              /* Limpiar lista */

                              for (i in json_Fracciones){

                                      var id_fraccion = json_Fracciones[i].Id_fraccion;
                                      var fraccion = json_Fracciones[i].Fraccion;
                                      var proporcion = json_Fracciones[i].Proporcion;
                                      var row = create_row_fraccion(id_fraccion,fraccion,proporcion);
                                       /* identificar item */
                                       pmtItem.appendChild(row);
                               }
                  });
}
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

            $.post('ctrlgrupo',{A:3,Id_grupo:id_grupo}, function(json_statistics){

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

}

/* objeto row fraccion */
function create_row_fraccion(pmtId_fraccion,pmtFraccion,pmtProporcion){
        var row = document.createElement('div');
            row.setAttribute('class','row');
            row.setAttribute('data-id_fraccion',pmtId_fraccion);
        var fraccion = document.createElement('div');
            fraccion.setAttribute('class','fraccion');
        var label_fraccion = document.createElement('div');
            label_fraccion.setAttribute('class','label');
            label_fraccion.innerHTML = pmtFraccion;
            fraccion.appendChild(label_fraccion);
        var proporcion = document.createElement('div');
            proporcion.setAttribute('class','proporcion');
        var label_proporcion = document.createElement('div');
            label_proporcion.setAttribute('class','label');
            label_proporcion.innerHTML = pmtProporcion;
            proporcion.appendChild(label_proporcion);
            row.appendChild(fraccion);
            row.appendChild(proporcion);

            return row;
}
