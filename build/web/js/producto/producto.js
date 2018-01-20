/*
    Este script es usado para gesionar las funciones asociadas al script: ctrlProducto

    Funciones:
          1. focusin: txtBuscador_grupo
          2. focusout: txtBuscador_grupo
          3. selected row: listGrupos
          4. clean fields for addGrupo: addGrupo
          5. remove grupo: removeGrupo
          6. almacena grupo: btnAlmacenar_grupo
          7. Lee grupos: function: read_Grupos(list) -> ctrlGrupo

*/

/* Búsquedas para formar las listas
    ¿Podría usar java?
*/

  /* 1. Buscar productos */
      read_Productos().then(function(Productos){

                  console.log('Productos... encontrados...');

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
                                   row.onclick =  function() {select_row_producto(this)};
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
      })/* 1. Leer productos */


  /* 2. Buscar grupos */
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

  /* 3. Buscar marcas */
    read_Marcas().then(function(Marcas){
        console.log('marcas encontradas...')
        console.log(Marcas)

        /* Limpiar lista */

                for (i in Marcas){

                        /* objeto row marca */
                        var row = document.createElement('div');
                            row.setAttribute('class','row');
                            row.setAttribute('data-id_marca',Marcas[i].Id_marca);
                            row.onclick = function(){select_row_marca(this);};
                        var marca = document.createElement('div');
                            marca.setAttribute('class','marca');
                        var label_marca = document.createElement('div');
                            label_marca.setAttribute('class','label');
                            label_marca.innerHTML = Marcas[i].Descripcion;
                            marca.appendChild(label_marca);
                            row.appendChild(marca);

                         /* identificar item */
                         __('listMarcas').appendChild(row);
                 }
    })

/* 4. Busca presentaciones asociadas a un grupo */
function data_Presentaciones(pmtId_grupo){

            /*   */
               let res = {}

               const promise = new Promise(function (resolve, reject) {

                           read_Presentaciones(pmtId_grupo).then(function(Presentaciones){

                                   $('div#content_presentaciones div.field').remove()

                                             for(i in Presentaciones){

                                                   var field = document.createElement('div')
                                                       field.setAttribute('class','field')

                                                   var checkbox = document.createElement('div')
                                                       checkbox.setAttribute('class','checkbox')

                                                   var input = document.createElement('input')
                                                       input.setAttribute('data-id',Presentaciones[i].Id_presentacion)
                                                       input.setAttribute('type','checkbox')
                                                       input.setAttribute('value',Presentaciones[i].Descripcion)
                                                   var label = document.createElement('label')
                                                       label.setAttribute('for','checkbox')
                                                       label.innerHTML = Presentaciones[i].Descripcion

                                                       checkbox.appendChild(input)
                                                       checkbox.appendChild(label)
                                                       field.appendChild(checkbox)
                                                       document.getElementById('content_presentaciones').appendChild(field)
                                              }

                                                  if(Presentaciones != ''){
                                                    res = Presentaciones;
                                                  }
                                                  resolve(res)

                                                 if (!res) {
                                                   reject(new Error('No se encontraron presentaciones para este grupo!'))
                                                 }
                           })/* Leer presentaciones */

               })/* promise */

              return promise

}/* Presentaciones de un grupo */

/* Selecciona un producto */
        function select_row_producto(row){

                  var descripcion = row.children[0].innerHTML
                  var id_producto = row.getAttribute('data-id_producto')
                  var id_grupo = row.getAttribute('data-id_grupo')
                  var id_marca = row.getAttribute('data-id_marca')
                  var estado = row.getAttribute('data-estado')
                  var Producto = {}

                /* 1. Buscar datos especificos del producto */
                  data_Producto(id_producto).then(function(producto){
                    console.log('Datos del producto encontrados!');
                    console.log(producto);
                    Producto = producto;
                  })

                  __('txtDescripcion_producto').value = descripcion
                  __('txtDescripcion_producto').setAttribute('data-id_producto',id_producto)

                  __('txtGrupo').setAttribute('data-id_grupo',id_grupo)
                  __('txtMarca').value = id_marca
                  __('txtMarca').setAttribute('data-id_marca',id_marca)
                  __('codigo_producto').innerHTML = row.getAttribute('data-codigo')


                    /* 3. Selecciona grupo */
                      $("div#listGrupos div.row").each(function(){

                            if($(this).attr('data-id')==id_grupo){
                                    var grupo = $(this).children('div.grupo').html()
                                    __('txtGrupo').value = grupo
                                    return false;
                            }
                              console.log($(this).children('div.grupo').html())
                      })


                      /* 2. Busca las presentaciones del grupo asociado al producto seleccionado */
                        data_Presentaciones(id_grupo).then(function(res){

                                  /* 4. Recorrer presentaciones y checkear las que están asociadas a este producto */
                                  $('div#content_presentaciones input').each(function(){

                                          var id_presentacion = $(this).attr('data-id')

                                          console.log('id presentacion -> input: ' + id_presentacion)

                                          console.log(Producto)

                                          Presentaciones = JSON.parse(Producto.Presentaciones).presentaciones

                                          console.log(Presentaciones)

                                          for(i in Presentaciones){

                                                if(Presentaciones[i].Id_presentacion==id_presentacion){
                                                    $(this).attr('checked','true')
                                                }
                                              //console.log(Producto[i])
                                          }
                                  })
                        })
        }/* Selecciona producto */

/* Selecciona marca */
      function select_row_marca(row){

          var id_marca = row.getAttribute('data-id_marca');
          var marca = row.innerText;

          __('txtMarca').setAttribute('data-id_marca',id_marca);
          __('txtMarca').value = marca;

          setTimeout(function(){
                var class_css = $('div#setter_marca').attr('class')
                if(class_css=='hidden'){
                  $('div#listMarcas').addClass('hidden');
                }else{/* Debería poder editar - eliminar la marca */
                    console.log('Listo para eliminar marca!')
                }
          },400)
      }


$(document).on('ready', function(){

    $('div.content_add').on('click','div#bnt_add_marca',function(){

          var class_css = $('div#setter_marca').attr('class')

          if(class_css=='hidden'){
              $('div#setter_marca').removeClass('hidden')
          }else{
             $('div#setter_marca').addClass('hidden')
          }

    })/* add marca */

    $('div#setter_marca').on('click','div#btn_almacenar_marca',function(){

            console.log('Almacenando marca...')

            var id_marca = __('txtEdit_marca').getAttribute('data-id_marca')
            var descripcion = __('txtEdit_marca').value

            create_update_Marca(id_marca,descripcion,1).then(function(res){
              console.log(res)
            })


    })/* Almacenar marca */



/* 1. focusin: txtGrupo */
          $('div.box').on('focusin','input#txtGrupo',function(e){
              $('div#listGrupos').removeClass('hidden');
          });/* Hace visible fla lista de grupos */

/* 2. focusout: txtGrupo */
          $('div.box').on('focusout','input#txtGrupo',function(e){
              setTimeout(function(){
                  $('div#listGrupos').addClass('hidden');
              },500);
          });/* Hace invisible la lista de clientes */


/* 3. focusin: txtMarca */
          $('div.box').on('focusin','input#txtMarca',function(e){
              $('div#listMarcas').removeClass('hidden');
          });/* Hace visible fla lista de grupos */

/* 2. focusout: txtGrupo */
          $('div.box').on('focusout','input#txtMarca',function(e){
              setTimeout(function(){

                  var class_css = $('div#setter_marca').attr('class')
                  if(class_css=='hidden'){
                    $('div#listMarcas').addClass('hidden');
                  }

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

                 __('txtGrupo').setAttribute('data-id_grupo',id_grupo)
                 __('txtGrupo').value = descripcion

                 /* 1. Carga presentaciones asociadas al grupo  */
                     data_Presentaciones(id_grupo);

        });/* Selecciona grupo de la lista */






/* 1. Almacenar producto: btnAlmacenar_producto */
        $('div.content_button').on('click','div#btnAlmacenar_producto',function(){

            console.log('Almacena producto!')
            var id_producto = __('txtDescripcion_producto').getAttribute('data-id_producto')
            var id_grupo = __('txtGrupo').getAttribute('data-id_grupo')
            var id_marca = __('txtMarca').getAttribute('data-id_marca')
            var descripcion = __('txtDescripcion_producto').value


                  var list_presentaciones =  new Array();

                    /* Presentaciones asociadas al producto */

                              var id_presentacion = $(this).attr('data-id')
                              $('div#content_presentaciones input:checked').each(function(){
                              var presentacion = new Array();
                                  presentacion = {Id_presentacion: id_presentacion};
                                  /* Se agrega la presentacion */
                                  list_presentaciones[list_presentaciones.length] = presentacion;


                    })
                    /* parsing json to string */

                    list_presentaciones = JSON.stringify({"data":[{presentaciones:list_presentaciones}]});

              console.log(list_presentaciones);

            /* Primero: Almaceno el producto */
                create_update_Producto(id_producto,id_grupo,id_marca,descripcion,list_presentaciones).then(function(res_id_producto){

                          console.log(res_id_producto)
                          console.log(' Producto almacenado!')
                });
        })/* Create update Producto */

        /* Eliminar producto */
        $('div.operations').on('click','div#removeProducto',function(){

              console.log('Eliminando producto...');
              var id_producto = __('txtDescripcion_producto').getAttribute('data-id_producto')

              remove_Producto(id_producto).then(function(res){
                  console.log(res);
                  console.log('Producto eliminado...');

                  clean_Producto()
              })

        })
        $('div.operations').on('click','div#addProducto',function(){
            console.log('Limpiando campos...');
            /* Limpiando campos */
              clean_Producto()
        })

        /* Limpiar campos */
        function clean_Producto(){

              /**/
                __('txtGrupo').setAttribute('data-id_grupo','0')
                __('txtGrupo').value = ''
                __('txtMarca').setAttribute('data-id_marca','0')
                __('txtMarca').value = ''

                $('div#content_presentaciones div.field').remove()
                __('txtDescripcion_producto').setAttribute('data-id_producto','0')
                __('txtDescripcion_producto').value = ''
        }



        /* Lista de productos */
        $('div.searcher').on('focusin','input#txtBuscador_producto',function(e){
            $('div#listProductos').removeClass('hidden');
        });/* Hace visible la lista de productos */

        $('div.searcher').on('focusout','input#txtBuscador_producto',function(e){
            setTimeout(function(){
                $('div#listProductos').addClass('hidden');
            },500);
        });/* Hace invisible la lista de productos */

       $('div.searcher').on('keypress','input#txtBuscador_producto',function(e){

                    var filtro = $(this).val()+e.key;

                    if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                        e.preventDefault();
                    }
                       /*Busca filtro en cada fila de la lista */
                     search_text_list('div#listGrupos div.row',filtro,20);
       });/* Busca grupos en la lista */




});
