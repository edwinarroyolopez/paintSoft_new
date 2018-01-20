function select_row_marca(row){

    var id_marca = row.getAttribute('data-id_marca');
    var marca = row.innerText;

    __('txtMarca_producto').setAttribute('data-id_marca',id_marca);
    __('txtMarca_producto').value = marca;
}


$(document).on('ready',function(){

        $('div.field').on('focusin','input#txtMarca_producto',function(e){
            $('div#listMarcas').removeClass('hidden');
        });/* Hace visible la lista de productos */

        $('div.field').on('focusout','input#txtMarca_producto',function(e){
            setTimeout(function(){
                $('div#listMarcas').addClass('hidden');
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
