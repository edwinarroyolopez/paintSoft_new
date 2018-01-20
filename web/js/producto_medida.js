$(document).on('ready',function(){
    
    
    /* Form: *** GRUPO PRODUCTOS *** Agregar medida en sector: Creación de grupos --> Código creado para no
      cambiar de sección a la hora de necesitar una nueva medida. ¿Paso a paso? */
     $('div#sector_add_medida').on('keypress','#txt_new_medida',function(e){
         
      
         if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     
                     /* Validaciones */
                     var Medida = document.getElementById('txt_new_medida').value;
            
            $.post('ctrlmedida',{Action:1,Medida:Medida},function(r){

                        var jSon = $.parseJSON($.trim(r));

                    /* Crear objeto */
                        var item = document.createElement('div');
                            item.setAttribute('class','item');
                            item.setAttribute('data-id',jSon[0].Id);
                            item.innerHTML = jSon[0].Medida;
                            
                            
                            /* Insertamos antes de la primera fila: Para eso la buscamos
                               y luego insertamos antes de esta */
                         var primera_fila = document.getElementById('cbgrupoMedida').getElementsByTagName('div')[0];
                         document.getElementById('cbgrupoMedida').insertBefore(item,primera_fila);

                        /* Limpiar caja de texto */
                        document.getElementById('txt_new_medida').value = '';
                        document.getElementById('txtId_medida').value = '';
                        document.getElementById('txtId_medida').focus();
                        
            });
                    /* Limpiar */
                    document.getElementById('txt_new_medida').value = '';
                    $('div#sector_add_medida').addClass('hidden');
           
                     
                }
         
     });
     
  
    
    /* Mostrar cuadro add medida */
    $('div.plus_medida').on('click','div#show_add_medida',function(){
        
        document.getElementById('sector_add_medida').removeAttribute('class');
        
        setTimeout(function(){
              document.getElementById('sector_add_medida').setAttribute('class','hidden');
        },10000);
        
        
    });
     
     
     /* Unidad medida */                      
      $('div#sector_unidad_medida').on('keypress','input#txt_add_unidad_medida',function(e){
        
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                 
                     /* Validaciones */
                     var Unidad_medida = document.getElementById('txt_add_unidad_medida').value;
                     var Id_medida = document.getElementById('info_medida').getAttribute('data-id');
                     var Id_grupo = document.getElementById('info_grupo').getAttribute('data-id');
                     var Grupo = document.getElementById('info_grupo').innerHTML;
                                 
                                 
                                $.post('ctrlmedida',{ Unidad_medida: Unidad_medida,Id_medida: Id_medida,
                                    Id_grupo: Id_grupo,Action: 2}, function(r){
                                    
                                        var jSon = $.parseJSON($.trim(r));
                                  
                                           /* Hacer que se cree el item */
                                         var item = document.createElement('div');
                                             item.setAttribute('class','item');
                                             item.setAttribute('data-id',jSon[0].Id);
                                             item.setAttribute('data-id_medida',jSon[0].Id_medida);
                                             item.setAttribute('data-id_grupo',jSon[0].Id_grupo);
                                             item.innerHTML = Unidad_medida;

                                         var primera_fila = document.getElementById('list_unidad_medida').getElementsByTagName('div')[0];
                                             document.getElementById('list_unidad_medida').insertBefore(item,primera_fila);
                                             
                            /* List unidades de medidas: Form ---> Fraccionamiento */
                                        var item = document.createElement('div');
                                            item.setAttribute('class','item');
                                            item.setAttribute('data-id',jSon[0].Id);
                                            item.setAttribute('data-id_medida',jSon[0].Id_medida);
                                        var unidad_medida = document.createElement('div');
                                            unidad_medida.setAttribute('class','unidad_medida');
                                            unidad_medida.innerHTML = jSon[0].Unidad_medida;
                                        var grupo = document.createElement('div');
                                            grupo.setAttribute('class','grupo');
                                            grupo.innerHTML = Grupo;

                                            item.appendChild(unidad_medida);
                                            item.appendChild(grupo);
                                        var primera_fila = document.getElementById('listUnidadMedida').getElementsByTagName('div')[0];
                                            document.getElementById('listUnidadMedida').insertBefore(item,primera_fila);

                                             
                                        /* Limpiar caja de texto */
                                        document.getElementById('txt_add_unidad_medida').value = '';
                                       });
                                
                     
                }
        
    });
     
    
    /* Form: Productos  ---> Fracciones 
       Key press --> Caja de texto que realiza búsqueda de unidades de medida */
    
    $('div.search_Unidad_medida').on('keypress','input#txt_search_Unidad_medida',function(e){
       
         var text = $(this).val()+e.key;
                 
               
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                 
                  busqueda_keyPress_Unidad_medida(text);
              
        
        
    });
    
    $('div.search_Unidad_medida').on('keydown','input#txt_search_Unidad_medida',function(e){
       
                  
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                  
                   if(e.keyCode==8){/* Retroceso: Es necesario eliminar un caracter del la cadena */
                        
                       var text = $(this).val();
                       
                        text = text.substring(0,text.length - 1);/* Elimina última letra */
                        busqueda_keyPress_Unidad_medida(text);
                   }
               });
    
    function busqueda_keyPress_Unidad_medida(text){
        
        var i = 0;
                    
                        $("div#listUnidadMedida div.item").each(function(e){
                            
                                var unidad_medida = $(this).text();/* Extrae: Nombre - Grupo */

                                
                                /* Condición: Establece relación entre texto escrito y 
                                   texto contenido en las unidades de medida  ---> -1: No existe relación */
                                if (unidad_medida.indexOf(text)!=-1) {
                                    
                                    
                                    /* Limitar número de productos visibles */
                                        i = i + 1;
                                        if(i<=20){
                                            $(this).removeClass('hidden');
                                        }else{
                                            $(this).addClass('hidden');
                                        }/* Hace invisibles los productos que se encuentran
                                            en el rango del texto pero fuera de la cantidad */
                                 }else{
                                        $(this).addClass('hidden');
                                 }
                             
                        });
        
        
    }
    
    
    /* Combobox cbgrupoMedida */
    $('div#wproductoGrupo').on('focusin','input#txtId_medida',function(){

        $('div#cbgrupoMedida').removeClass('hidden');
        
          /* Reset --->*/
                    listPosicion = [];
                    pos_anterior = pos_actual = 0;
                    cantidad_items = 0;
                var i = 0; 
                
                
                
                /* Recorrerá todos los items, pero solo me interesan los visibles */
                $('div#cbgrupoMedida div.item').each(function(){

                        var Class = $(this).attr('class');
                       

                            if(Class.indexOf('hidden')===-1){/* Verifica si el  item contiene la clase hidden */
                               /* No la contiene: Puedo sumar item a la cantidad de elementos */
                                cantidad_items = cantidad_items + 1;
                                listPosicion.push(i);
                              }
                              i = i + 1;/* Variable usada para definir las posiciones visibles de la lista */ 
                });
                  
                  console.log('List ' + listPosicion.toString());
        
        
        
    });
    
    $('div#wproductoGrupo').on('focusout','input#txtId_medida',function(){
        setTimeout(function(){$('div#cbgrupoMedida').addClass('hidden');},200);
     });
     
     
     $('div#wproductoGrupo').on('click','div#cbgrupoMedida div.item',function(){
                var id = $(this).attr('data-id');
                document.getElementById('txtId_medida').value = $(this).html();
                document.getElementById('txtId_medida').setAttribute('data-id',id);
                
     });
     
       /* KEY DOWN */
    $('div#wproductoGrupo').on('keydown','input#txtId_medida',function(e){
        /* Uso de teclas de dirección */
        updown_List(e,'cbgrupoMedida','div','txtId_medida','');
        
        if(e.keyCode===13){
             // $('input#txtId_medida').focus();
        }
        
     });
    
    
});
