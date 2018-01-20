function __(id){
    return document.getElementById(id);
}

function clean_fields(setter){
      $('div#'+ setter +' input').each(function(e){
          $(this).val('');
      });

}/* clean fields */

function validate_fields(setter){

      let control = 0;
      $('div#'+ setter +' input:text').each(function(e){
              if(control<1){
                    if($(this).val()===''){
                        control = 1;
                        $(this).focus();
                    }
              }
      });
      return control;

}/* validate fields */


function search_text_list(list,filtro,limit){

                   /* Manejar cómo minusculas */
                     filtro = filtro.toLowerCase();
                     var i = 0;
                     /* Recorre cada fila de la lista */
                     $(list).each(function(){
                             /* Saca el id de cada item */
                              var texto = $(this).text().toLowerCase();/* Contiene el texto de la fila */

                              if (texto.indexOf(filtro)!==-1) {/* Filtro está contenido en el texto */
                                      /* Controla el limite de items visibles */
                                     if(i<limit){
                                         $(this).removeClass('hidden');
                                      }else{
                                           $(this).addClass('hidden');
                                      }
                                      i = i + 1;

                              }else{
                                      $(this).addClass('hidden');
                              }
                     });
 }/* search in list */

 function number_format(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + '.' + '$2');

    return amount_parts.join('.');
}
