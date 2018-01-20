
$(document).on('ready', function(){


        $('div.setter').on('focusout','input#txtGrupo',function(e){
              //search_document_Grupo();
              setTimeout(function(){
                  $('div#listGrupos').addClass('hidden');
              },500);
        });/* Busca el # de documento en la lista de grupos:
              Si lo encuentra debe cargar los datos: Editar grupo */

            $('div.searcher').on('focusin','input#txtBuscador_grupo',function(e){
                $('div#listGrupos').removeClass('hidden');
            });/* Hace visible la lista de grupos */

            $('div.searcher').on('focusout','input#txtBuscador_grupo',function(e){
                setTimeout(function(){
                    $('div#listGrupos').addClass('hidden');
                },500);
            });/* Hace invisible la lista de clientes */

           $('div.searcher').on('keypress','input#txtBuscador_grupo',function(e){

                        var filtro = $(this).val()+e.key;

                        if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                            e.preventDefault();
                        }
                           /*Busca filtro en cada fila de la lista */
                         search_text_list('div#listGrupos div.row',filtro,20);
           });/* Busca grupos en la lista */


           $('div#listGrupos').on('click','div.row',function(){


           });/* Selecciona grupo de la lista */


           $('div#removeGrupo').on('dblclick',function(e){
             console.log('Eliminando grupo...');
               delete_Grupo();
           });/* Elimina un grupo  */


});/* End document */



function almacenar_Fraccion(e){
        create_update_Fracciones(e);
}
