/* 1. Create - update presentacion */
        function create_update_Presentacion(){

                  let control =  validate_fields('setterPresentacion');

                  console.log('Control: '+ control);

                  if(control>0){return;}/* Existe almenos un campo vacío */

                  var id_presentacion = __('txtPresentacion').getAttribute('data-id_presentacion');
                  var id_grupo =    __('selectGrupo').getAttribute('data-id_grupo');
                  var descripcion =     __('txtPresentacion').value;

                      console.log('Antes del controlador presentacion...');

                       $.post('../ctrlpresentacion',{
                                 Id_presentacion: id_presentacion,
                                 Descripcion: descripcion,
                                 Fraccionable: true,
                                 Id_grupo: id_grupo,
                                 Estado: 1,
                                 A: 1
                               }, function(r){/* Callback ...   */

                                      console.log('id presentacion: '+r);

                                   /* Clean fields */
                                      read_Presentaciones(id_grupo);
                                      clean_Presentacion();
                       });

        }/* ## create update presentacion ## */

/* 2. Read presentaciones de un grupo */
        function read_Presentaciones(pmtId_grupo){

                    console.log('Buscando presentaciones... de un grupo...');

                      /* Busca datos del producto */
                         let list = {};

                         const promise = new Promise(function (resolve, reject) {

                                  $.post('../ctrlpresentacion',{Id_grupo:pmtId_grupo,A:2}, function(presentaciones){
                                            if(presentaciones != ''){
                                              list = JSON.parse(presentaciones);
                                            }
                                            resolve(list)
                                    });

                                   if (!list) {
                                     reject(new Error('No se encontraron presentaciones para este grupo!'))
                                   }
                         })/* promise */

                         return promise
        }/* ## Read presentaciones de un grupo ## */
