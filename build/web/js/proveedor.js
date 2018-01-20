$(document).on('ready', function(){

     /* Carga proveedores */
        read_Proveedores();

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

        $('div.setter').on('focusout','input#txtNit',function(e){
              search_nit_Proveedor();
              setTimeout(function(){
                  $('div#listProveedores').addClass('hidden');
              },500);
        });/* Busca el # de documento en la lista de proveedores:
              Si lo encuentra debe cargar los datos: Editar proveedor */

    $('div.searcher').on('focusin','input#txtBuscador_proveedor',function(){
        $('div#listProveedores').removeClass('hidden');
    });/* Hace invisible la lista de proveedores */

     $('div.searcher').on('focusout','input#txtBuscador_proveedor',function(){
        setTimeout(function(){$('div#listProveedores').addClass('hidden');},500);
    });/* Hace invisible la lista de proveedores */

    $('div.searcher').on('keypress','input#txtBuscador_proveedor',function(e){

                 var filtro = $(this).val()+e.key;

                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  search_text_list('div#listProveedores div.row',filtro,20);
    });/* Busca proveedores en la lista */


     $('div#listProveedores').on('click','div.row',function(){
              /* Getter */

                 var id_proveedor = parseInt($(this).attr('data-id'));
                 var proveedor = $(this).text();
                 var nit = $(this).attr('data-nit');
                 var contacto = $(this).attr('data-contacto');
                 var ciudad = $(this).attr('data-ciudad');
                 var direccion = $(this).attr('data-direccion');
                 var telefono_1 = $(this).attr('data-telefono_1');
                 var telefono_2 = $(this).attr('data-telefono_2');
                 var email = $(this).attr('data-email');
                 var banco = $(this).attr('data-banco');
                 var tipo_cuenta = $(this).attr('data-tipo_cuenta');
                 var numero_cuenta = $(this).attr('data-numero_cuenta');
                 var titular_cuenta = $(this).attr('data-titular_cuenta');
                 var estado = $(this).attr('data-titular_cuenta');
                 var fecha_creacion = $(this).attr('data-fecha_creacion');

         /* carga datos a la vista */
         load_info_Proveedor(id_proveedor,proveedor,nit,contacto,ciudad,
                                      direccion,telefono_1,telefono_2,email,banco,
                                      tipo_cuenta,numero_cuenta,titular_cuenta,
                                      estado,fecha_creacion);

     });/* Selecciona proveedor de la lista */


  $('div#btnAlmacenar').on('click',function(e){
        create_update_Proveedor();
   });/* Almacena proveedores */

   $('div#addProveedor').on('click',function(e){
        console.log('Prepara interfaz para almacenar un nuevo proveedor...');
          __('resultOperationProveedor').innerHTML = 'Limpiando campos!';
            setTimeout(function(){
                  __('resultOperationProveedor').innerHTML = '';
                  clean_Proveedor();
                  __('txtNit').focus();
            },1500);

   });/* Prepara interfaz para almacenar un nuevo proveedor */


    $('div#removeProveedor').on('click',function(e){
           __('resultOperationProveedor').innerHTML = '¿Vas a eliminar un proveedor?';
    });/* Elimina un proveedor  */

    $('div#removeProveedor').on('dblclick',function(e){
         delete_Proveedor();
    });/* Elimina un proveedor  */

});
