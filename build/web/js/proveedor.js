/* 1. Buscar proveedores */
    read_Proveedores().then(function(Proveedores){

                /* Limpiar lista */
                  $('div#listProveedores div.row').remove();

                for(i in Proveedores){
                    /* Crear objeto */
                        var row = document.createElement('div');
                            row.setAttribute('class','row');
                            row.setAttribute('data-id',Proveedores[i].Id_proveedor);
                            row.setAttribute('data-nit',Proveedores[i].Nit);
                            row.setAttribute('data-contacto',Proveedores[i].Contacto);
                            row.setAttribute('data-ciudad',Proveedores[i].Ciudad);
                            row.setAttribute('data-direccion',Proveedores[i].Direccion);
                            row.setAttribute('data-telefono_1',Proveedores[i].Telefono_1);
                            row.setAttribute('data-telefono_2',Proveedores[i].Telefono_2);
                            row.setAttribute('data-email',Proveedores[i].Email);
                            row.setAttribute('data-banco',Proveedores[i].Banco);
                            row.setAttribute('data-tipo_cuenta',Proveedores[i].Tipo_cuenta);
                            row.setAttribute('data-numero_cuenta',Proveedores[i].Numero_cuenta);
                            row.setAttribute('data-titular_cuenta',Proveedores[i].Titular_cuenta);
                            row.setAttribute('data-estado',Proveedores[i].Estado);
                            row.setAttribute('data-fecha_creacion',Proveedores[i].Fecha_creacion);
                        var proveedor = document.createElement('div');
                            proveedor.setAttribute('class','proveedor');
                            proveedor.innerHTML = Proveedores[i].Razon_social;
                            row.appendChild(proveedor);

                            if(i>=20){
                                row.setAttribute('class','row hidden');
                            }else{/* Cantidad de items visibles */
                                document.getElementById('listProveedores').setAttribute('data-items',i);
                            }
                            document.getElementById('listProveedores').appendChild(row);
                }
    })/* 1. Leer proveedores */




$(document).on('ready', function(){


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

        var pmtId_proveedor =    __('txtBuscador_proveedor').getAttribute('data-id_proveedor');
        var pmtRazon_social = __('txtRazon_social').value;
        var pmtNit = __('txtNit').value;
        var pmtContacto = __('txtContacto').value;
        var pmtCiudad = __('txtCiudad').value;
        var pmtDireccion = __('txtDireccion').value;
        var pmtTelefono_1 = __('txtTelefono_1').value;
        var pmtTelefono_2 = __('txtTelefono_2').value;
        var pmtEmail = __('txtEmail').value;
        var pmtBanco = __('txtBanco').value;
        var pmtTipo_cuenta = __('txtTipo_cuenta').value;
        var pmtNumero_cuenta = __('txtNumero_cuenta').value;
        var pmtTitular_cuenta = __('txtTitular_cuenta').value;

        create_update_Proveedor(pmtId_proveedor,pmtRazon_social,pmtNit,pmtContacto,pmtCiudad,pmtDireccion,pmtTelefono_1,pmtTelefono_2,
          pmtEmail,pmtBanco,pmtTipo_cuenta,pmtNumero_cuenta,pmtTitular_cuenta);
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
