/*
    Este script es usado para gesionar las funciones asociadas al script: ctrlGrupo

    Funciones:
          1. focusin: txtBuscador_grupo
          2. focusout: txtBuscador_grupo
          3. selected row: listGrupos
          4. clean fields for addGrupo: addGrupo
          5. remove grupo: removeGrupo
          6. almacena grupo: btnAlmacenar_grupo
          7. Lee grupos: function: read_Grupos(list) -> ctrlGrupo

*/

  /* 1. Buscar grupos */
      read_Grupos().then(function(Grupos){

            console.log('Grupos... encontrados...')

                  /* Limpiar lista */
                  $('div#listGrupos div.row').remove();

                  for (i in Grupos){

                         var row = document.createElement('div');
                             row.setAttribute('class','row');
                             row.setAttribute('data-id',Grupos[i].Id_grupo);
                             row.setAttribute('data-grupo',Grupos[i].Descripcion);
                             row.setAttribute('data-gramo',Grupos[i].Gramo);
                             row.setAttribute('data-estado',Grupos[i].Estado);
                             row.setAttribute('data-fecha_creacion',Grupos[i].Fecha_creacion);
                         var grupo = document.createElement('div');
                             grupo.setAttribute('class','grupo');
                             grupo.innerHTML = Grupos[i].Descripcion;
                             row.appendChild(grupo);

                         if(i>=20){
                             row.setAttribute('class','row hidden');
                         }else{/* Cantidad de items visibles */
                             document.getElementById('listGrupos').setAttribute('data-items',i);
                         }
                         document.getElementById('listGrupos').appendChild(row);
                   }
      })/* ##  Busca grupos ## */



$(document).on('ready', function(){



/* 1. focusin: txtBuscador_grupo */
        $('div.searcher').on('focusin','input#txtBuscador_grupo',function(e){
            $('div#listGrupos').removeClass('hidden');
        });/* Hace visible fla lista de grupos */

/* 2. focusout: txtBuscador_grupo */
        $('div.searcher').on('focusout','input#txtBuscador_grupo',function(e){
            setTimeout(function(){
                $('div#listGrupos').addClass('hidden');
            },500);
        });/* Hace invisible la lista de clientes */

/* 3. selected row: listGrupos */
        $('div#listGrupos').on('click','div.row',function(){

                /* Getter */
                 var id_grupo = $(this).attr('data-id');
                 var descripcion = $(this).text();
                 var gramo = (($(this).attr('data-gramo')=='f') ? false : true);
                 var estado = parseInt($(this).attr('data-estado'));
                 var fecha_creacion = $(this).attr('data-fecha_creacion');

                 __('info_productos_grupo').innerHTML = Math.floor((Math.random() * 100) + 1)
                 __('info_estado_grupo').innerHTML = ((estado==1) ? 'Activo' : 'Inactivo')
                 __('info_gramo_grupo').innerHTML = ((gramo==false) ? 'No' : 'Si')

                   console.log(eval(gramo));
                     console.log('checkbox: '+document.getElementById('chkGramo').checked);
                   /* carga datos a la vista */
                   //load_info_Grupo(id_grupo,descripcion,estado,fecha_creacion);
                   __('msgOperationGrupo').innerHTML = 'Editar grupo';
                   __('txtGrupo').value = descripcion;
                   __('txtBuscador_grupo').setAttribute('data-id_grupo',id_grupo);
                   document.getElementById('chkGramo').checked = eval(gramo)

                   console.log('checkbox: '+document.getElementById('chkGramo').checked);

                   console.log('Antes de leer presentaciones');
                   /* Debe cargar presentaciones de este grupo */

                   read_Presentaciones(id_grupo).then(function(Presentaciones){

                           /* Limpiar lista */
                           $('div#listPresentacion div.item').remove();


                               for (i in Presentaciones){

                                        var item = document.createElement('div');
                                            item.setAttribute('class','item');
                                            item.setAttribute('data-id',Presentaciones[i].Id_presentacion);
                                            item.setAttribute('data-fraccionable',Presentaciones[i].Fraccionable);
                                            item.setAttribute('data-estado',Presentaciones[i].Estado);
                                            item.setAttribute('data-fecha_creacion',Presentaciones[i].Fecha_creacion);
                                        var presentacion = document.createElement('div');
                                            presentacion.setAttribute('class','presentacion');
                                            presentacion.innerHTML = Presentaciones[i].Descripcion;
                                            presentacion.onclick =  function() {select_Presentacion(this)};
                                            item.appendChild(presentacion);
                                            var content_add = create_content_add_fraccion()
                                            item.appendChild(content_add);

                                            /* Debería cargar las fracciones de cada presentacion */
                                            read_Fracciones(Presentaciones[i].Id_presentacion,item);

                                        if(i>=20){
                                            item.setAttribute('class','row hidden');
                                        }else{/* Cantidad de items visibles */
                                            document.getElementById('listPresentacion').setAttribute('data-items',i);
                                        }
                                        document.getElementById('listPresentacion').appendChild(item);
                                }


                   })/* Leer presentaciones */

                   setTimeout(function(){
                         __('selectGrupo').innerHTML = descripcion;
                         __('selectGrupo').setAttribute('data-id_grupo',id_grupo);
                         /* hace visible el crud */
                         __('crudPresentacion').setAttribute('class','content_crud');
                         __('cleanPresentacion').setAttribute('class','hidden');
                   },500);

        });/* Selecciona grupo de la lista */

/* 4. clean fields for addGrupo: addGrupo */
        $('div#addGrupo').on('click',function(e){

             console.log('Prepara interfaz para almacenar un nuevo grupo...');
                 clean_Grupo();
                 __('cleanPresentacion').children[0].innerHTML = 'Limpiando campos!';
                 setTimeout(function(){
                       __('cleanPresentacion').children[0].innerHTML = 'Selecciona un grupo';
                       __('txtGrupo').focus();
                 },1500);

        });/* Prepara interfaz para almacenar un nuevo grupo */

/* 5. remove grupo: removeGrupo */
        $('div#removeGrupo').on('click',function(e){
           //    __('resultOperationGrupo').innerHTML = '¿Vas a eliminar un grupo?';
               console.log('¿Vas a eliminar un grupo?');
        });/* Elimina un grupo  */

        $('div#removeGrupo').on('dblclick',function(e){
            delete_Grupo().then(function(estado){

                       if(estado<0){/* No se puede eliminar grupo, porque hay productos asociados a este  */
                           __('cleanPresentacion').children[0].innerHTML = 'No se puede eliminar, existen productos asociados a este grupo!';
                       }else{
                             read_Grupos('listGrupos');
                           __('cleanPresentacion').children[0].innerHTML = 'Grupo eliminado!';
                       }

                      clean_Grupo();
                      setTimeout(function(){
                           __('cleanPresentacion').children[0].innerHTML = 'Selecciona un grupo';/* clean result */

                      },1500);
            });
        });/* Elimina un grupo  */

/* 6. almacena grupo: btnAlmacenar_grupo */
        $('div#btnAlmacenar_grupo').on('click',function(e){
                 create_update_Grupo().then(function(r){
                     read_Grupos('listGrupos');
                     clean_Grupo();
                 });
        });/* Almacena grupo */

/* 7. Lee grupos: function: read_Grupos(list) -> ctrlGrupo */
        read_Grupos('listGrupos');




        $('div.setter').on('focusout','input#txtGrupo',function(e){
              //search_document_Grupo();
              setTimeout(function(){
                  $('div#listGrupos').addClass('hidden');
              },500);
        });/* Busca el # de documento en la lista de grupos:
              Si lo encuentra debe cargar los datos: Editar grupo */
            /* lista grupos */



           $('div.searcher').on('keypress','input#txtBuscador_grupo',function(e){

                        var filtro = $(this).val()+e.key;

                        if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                            e.preventDefault();
                        }
                           /*Busca filtro en cada fila de la lista */
                         search_text_list('div#listGrupos div.row',filtro,20);
           });/* Busca grupos en la lista */

            /* lista grupo para productos */
           $('div#setterProducto').on('focusin','input#txtGrupo_producto',function(e){
               $('div#listGrupos_productos').removeClass('hidden');
           });/* Hace visible la lista de grupos */




});/* End document */
