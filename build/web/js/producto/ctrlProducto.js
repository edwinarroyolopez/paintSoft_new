/* ctrlProducto
      1. create_update_Producto
      2.
*/

/* 1. create_update_Producto */
        function create_update_Producto(pmtId_producto,pmtId_grupo,pmtId_marca,pmtDescripcion,pmtList_presentaciones){
                  /* Almacena producto */
                       let response = {};

                         const promise = new Promise(function (resolve, reject) {

                                       setTimeout(function(){

                                             $.post('../ctrlproducto',{Id_producto:pmtId_producto,
                                                                       Id_grupo:pmtId_grupo,
                                                                       Id_marca:pmtId_marca,
                                                                       Descripcion:pmtDescripcion,
                                                                       List_presentaciones:pmtList_presentaciones,
                                                                       A: 1}, function(r){/* Callback ...   */

                                                     if(r != ''){
                                                       response = r;
                                                     }
                                                     resolve(response)
                                             });

                                       }, 1000);/* setTimeout */

                                       if (!response) {
                                         reject(new Error('No almacena producto!'))
                                       }
                         })/* promise */

                         return promise

        }/* ## create update producto ## */


/* 2. Lee productos */
        function read_Productos(){

                  console.log('Buscando productos...');

                    /* Lee productos */
                       let list = {};

                       const promise = new Promise(function (resolve, reject) {

                                  $.post('../ctrlproducto',{A:2}, function(productos){
                                          if(productos != ''){
                                            list = JSON.parse(productos);
                                          }
                                          resolve(list)
                                  });

                                 if (!list) {
                                   reject(new Error('No se encontraron productos!'))
                                 }
                       })/* promise */

                       return promise
        }/* ## Lee productos ## */



/* 3. Elimina producto */
        function remove_Producto(pmtId_producto){

                    /* Lee productos */
                       let res = {};

                       const promise = new Promise(function (resolve, reject) {

                                 if(pmtId_producto>0){

                                         $.post('../ctrlproducto',{Id_producto: pmtId_producto,A: 4}, function(r){
                                                 if(r != ''){
                                                   res = r;
                                                 }
                                                 resolve(res)
                                         });

                                        if (!res) {
                                          reject(new Error('No se pudo eliminar el producto!'))
                                        }

                                 }else{
                                   console.log('Debes seleccionar un producto para eliminar...')
                                   resolve(0)
                                 }
                       })/* promise */

                       return promise
        }/* ## remove producto ## */


/* 4. Datos de un producto */
            function data_Producto(pmt_id_producto){

                      console.log('Buscando datos del producto...');
                        /* Busca datos del producto */
                           let producto = {};

                           const promise = new Promise(function (resolve, reject) {

                                      $.post('../ctrlproducto',{A:3,Id_producto:pmt_id_producto}, function(data){
                                              if(data != ''){
                                                producto = JSON.parse(data);
                                              }
                                              resolve(producto)
                                      });

                                     if (!producto) {
                                       reject(new Error('No se encontraron datos del producto!'))
                                     }
                           })/* promise */

                           return promise
            }/* ## Datos de un producto  ## */


function read_maximo_codigo(pmtId_grupo,pmtId_marca){

  /* Read  maximo codigo de un grupo && una marca */

              let codigo = {};

                const promise = new Promise(function (resolve, reject) {

                              setTimeout(function() {

                                          $.post('ctrlproducto',{
                                                    Id_grupo: pmtId_grupo,
                                                    Id_marca: pmtId_marca,
                                                    A: 5}, function(codigo){/* Callback ...   */

                                                          if(codigo!=''){
                                                            var part_codigo = parseInt(codigo.substring(6,9));/* sustrae el codigo */
                                                                part_codigo = part_codigo + 1;/* nuevo codigo */
                                                                codigo = part_codigo;
                                                                /* formatear */
                                                          }else{
                                                            codigo = '01';
                                                          }

                                                          resolve(codigo);
                                          });

                              }, 1000);/* setTimeout */

                              if (!codigo) {
                                reject(new Error('No existen productos asociados a esa marca y ese grupo!'))
                              }
                })/* promise */

                return promise
}/* read_maximo_codigo */
