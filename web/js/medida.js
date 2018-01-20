$(document).on('ready', function(){
    
    cargaMedida();
    
    function cargaMedida(){
        
                    $.post('ctrlmedida',{ Action: 8}, function(response){
                         
                         var jSon =   jQuery.parseJSON($.trim(response));
                         
                         for(i in jSon){
                               /* Hacer que se cree el item */
                                var item = document.createElement('div');
                                    item.setAttribute('class','item');
                                    item.setAttribute('data-id',jSon[i].Id);
                                    item.innerHTML = jSon[i].Medida;
                                    document.getElementById('cbgrupoMedida').appendChild(item);
                         }
                    });
    }
    
    
    
            
    
    
});

