
$(document).on('ready', function(){

            /* Carga clientes */
              read_Clientes();

        $('div.tabMenu').on('click','div.tab',function(e){

                   /* Tab Select*/
                   $("div.tab").removeClass('isSelect');
                   $(this).addClass('isSelect');
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');

                   var Opcion = $(this).text();

                   switch(Opcion){
                        case 'Registrar':
                              $('div#frmRegistro').addClass('isVisible');
                            break;
                        case 'Historial':
                                  $('div#frmHistorial').addClass('isVisible');
                            break;
                   }

        });/* select tab */

        $('div.setter').on('focusout','input#txtDocumento',function(e){
              search_document_Cliente();
              setTimeout(function(){
                  $('div#listClientes').addClass('hidden');
              },500);
        });/* Busca el # de documento en la lista de clientes:
              Si lo encuentra debe cargar los datos: Editar cliente */

            $('div.searcher').on('focusin','input#txtBuscador_cliente',function(e){
                $('div#listClientes').removeClass('hidden');
            });/* Hace visible la lista de clientes */

            $('div.searcher').on('focusout','input#txtBuscador_cliente',function(e){
                setTimeout(function(){
                    $('div#listClientes').addClass('hidden');
                },500);
            });/* Hace invisible la lista de clientes */

           $('div.searcher').on('keypress','input#txtBuscador_cliente',function(e){

                        var filtro = $(this).val()+e.key;

                        if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                            e.preventDefault();
                        }
                           /*Busca filtro en cada fila de la lista */
                         search_text_list('div#listClientes div.row',filtro,20);
           });/* Busca clientes en la lista */


           $('div#listClientes').on('click','div.row',function(){

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
                      load_info_Cliente(id_cliente,nombre,documento,telefono,direccion,ciudad,email,estado,fecha_creacion);


           });/* Selecciona cliente de la lista */

           $('div#btnAlmacenar').on('click',function(e){
                 create_update_Cliente();
           });/* Almacena cliente */

           $('div#addCliente').on('click',function(e){
                console.log('Prepara interfaz para almacenar un nuevo cliente...');
                  __('resultOperationCliente').innerHTML = 'Limpiando campos!';
                    setTimeout(function(){
                          __('resultOperationCliente').innerHTML = '';
                          clean_Cliente();
                          __('txtDocumento').focus();
                    },1500);

           });/* Prepara interfaz para almacenar un nuevo cliente */

           $('div#removeCliente').on('click',function(e){
                  __('resultOperationCliente').innerHTML = '¿Vas a eliminar un cliente?';
           });/* Elimina un cliente  */

           $('div#removeCliente').on('dblclick',function(e){
                delete_Cliente();
           });/* Elimina un cliente  */

});/* End document */
