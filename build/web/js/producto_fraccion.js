

$(document).on('ready',function(){
    
    
    $('div#listFracciones').on('click','div.fila',function(){
        
            /* Despintar --- > Pintar filas */
                 $('div#listFracciones div.fila').removeClass('fila_seleccionada');
                 $(this).addClass('fila_seleccionada');
                 
                 
                  var id_fraccion = $(this).attr('data-id');
                 /* Se asigna un id a la fila */
                 $(this).attr('id','f'+id_fraccion);
                 
                
                 /* Opción de modificar - Eliminar */
                  $('div#btnEliminar_fraccion').removeClass('hidden');
                  $('div#btnEliminar_fraccion').attr('data-id_fraccion',id_fraccion);
                  
    });
    
    $('div#listFracciones').on('click','div#btnEliminar_fraccion',function(){
        

                var id_unidad_medida = $('div#selectUnidadMedida').attr('data-id');
                var id_fraccion = $(this).attr('data-id_fraccion');

                $.post('ctrlfraccion',{A:1,Id_unidad_medida:id_unidad_medida,Id_fraccion:id_fraccion},function(r){
                    console.log(r);
                });

                /* Oculta botón eliminar */
                $(this).addClass('hidden');
                /* Elimina fila */
                $('div#f'+id_fraccion).remove();
                
            
    });
    
});