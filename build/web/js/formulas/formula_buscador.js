
$(document).on('ready',function(){
    
    $('div#buscador_formula').on('keypress','input#txtFormula',function(e){
        
         if(e.keyCode==13){e.preventDefault();}
          /* Retroceso: Se hace búsqueda con un caracter menos */  
         
        var texto = $(this).val()+e.key;
            busqueda_List(texto,'listFormula','div.value');
            
    });
     $('div#buscador_formula').on('keydown','input#txtFormula',function(e){
         
         
         /* Evita la acción cuando es la tecla Enter */
            if(e.keyCode==13){ e.preventDefault();}
            
            /* Retroceso: Se hace búsqueda con un caracter menos */  
            if(e.keyCode==8){
                var texto = $(this).val();
                    texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                    if(texto.length>0){
                        busqueda_List(texto,'listFormula','div.value');
                    }else{
                        /* Hace visible las primeras 15 filas */
                        var i = 0;
                        $('div#listFormula div.row').each(function(){
                            
                            if(i<=14){
                                $(this).removeClass('hidden');
                            }
                            i = i + 1;
                            
                        });
                    }
            }
         
     });
    
   
    
    
    /*  */
    $('div#buscador_maquina').on('click','div#encabezado_maquina',function(){
        
        var area = parseInt($(this).attr('data-area'));
            
            if(area===0){/* Sección de búsqueda máquina */
                /* Se hacen invisibles los componentes */
                    $('div#campo_maquina').addClass('hidden');
                    $('div#listMaquina').addClass('hidden');
                /* Visible sección */
                    $('div#add_maquina_sistema').removeClass('hidden');
                    
                    
                    $(this).attr('data-area',1);/* Cambia de area */
                    
                   
                       /* Creo nuevamente la lista marcas */
                        set_list_Marcas(json_marcas);
                        
                   
                    
            }else{/* Sección agregar máquina*/
                
                /* Visible sección */
                    $('div#add_maquina_sistema').addClass('hidden');
                /* Se hacen invisibles los componentes */
                    $('div#campo_maquina').removeClass('hidden');
                    $('div#listMaquina').removeClass('hidden');
                
                     $(this).attr('data-area',0);/* Cambia de area */
            }
        
        
        
    });
    
    
    
    
                 /* Se hacen invisibles los componentes */
                    $('div#campo_maquina').addClass('hidden');
                    $('div#listMaquina').addClass('hidden');
                /* Visible sección */
                    $('div#add_maquina_sistema').removeClass('hidden');
    
});


 /* Funciona para todas las listas: Formulario ---> Fómulas */
    function busqueda_List(pmtTexto,pmtList,pmtChild){
        
        pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */
       
        
       
           /* Recorro cada fila de la lista */
         $('div#'+pmtList+' div.row').each(function(){
             
            var  row = $(this).children(pmtChild).text();/* Contiene exto de la fila */
                 row = row.toLowerCase();
                 
                 var i = 0; /* Controla número de filas visibles */
                 
                  if (row.indexOf(pmtTexto)!==-1) {/* Existen resultados*/
                                    
                                    i = i + 1;/* Solo puedo hacer visible a 14 Items */
                                    
                                    if(i<=15){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                    
                             }else{/* No coincide con texto entrante */
                                    $(this).addClass('hidden');
                             }
         });
        
    }