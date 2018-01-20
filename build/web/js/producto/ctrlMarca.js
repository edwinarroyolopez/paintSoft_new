/* 1. Create update marca */
        function create_update_Marca(pmtId_marca,pmtDescripcion,pmtEstado){
                /* Almacena marca */
                     let response = {};

                       const promise = new Promise(function (resolve, reject) {

                               $.post('../ctrlmarca',{Id_marca:pmtId_marca,Descripcion:pmtDescripcion,Estado:pmtEstado,A:1}, function(r){/* Callback ...   */

                                       if(r != ''){
                                         response = r;
                                       }
                                       resolve(response)
                               });

                               if (!response) {
                                 reject(new Error('No almacena marca!'))
                               }
                       })/* promise */
                       return promise
        }/* ## create update marca ## */

/* 2. Read marcas */
      function read_Marcas(){

                    console.log('Buscando... marcas...');

                      /* Lee marcas */
                         let list = {};

                         const promise = new Promise(function (resolve, reject) {

                                    $.post('../ctrlmarca',{A:2}, function(marcas){
                                            if(marcas != ''){
                                              list = JSON.parse(marcas);
                                            }
                                            resolve(list)
                                    });

                                   if (!list) {
                                     reject(new Error('No se encontraron marcas!'))
                                   }
                         })/* promise */

                         return promise
      }/* ## Lee marcas ## */
