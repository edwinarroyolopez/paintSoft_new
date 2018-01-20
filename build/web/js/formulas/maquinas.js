/* Globales */
var json_marcas = 0;/* Estado inicial */



function getMarcas(){
        
        if(json_marcas===0){/* No ha cargado nada */
             $.post('ctrlmaquina',{Action:3},function(json){
                 
                 /* Asigno el array a una variable global */
                json_marcas =  $.parseJSON($.trim(json));;
                set_list_Marcas(json_marcas);
                
            });
        }
}   

function getModelos(){
      var json_modelos = [{Id:1,Modelo:2000},{Id:2,Modelo:2001},{Id:3,Modelo:2002},
                          {Id:4,Modelo:2003},{Id:5,Modelo:2004},{Id:6,Modelo:2005},
                          {Id:7,Modelo:2006},{Id:8,Modelo:2007},{Id:9,Modelo:2008},
                          {Id:10,Modelo:2009},{Id:11,Modelo:2010},{Id:12,Modelo:2011},
                          {Id:13,Modelo:2012},{Id:14,Modelo:2013},{Id:14,Modelo:2014},
                          {Id:15,Modelo:2015}];
    
    return json_modelos;
}


/* Llena la lista con todas las fórmulas */
   function set_list_Marcas(pmtJson_marcas){
    
                 document.getElementById('estructura_maquina').setAttribute('data-sector',0);
                /* Cambia entorno a Marca*/
                $('div#list_add_maquina').addClass('listMarca');
                document.getElementById('sector_maquina').innerHTML = 'Marca';
              
                /* Debe cargar lista de marcas */
                   $('div#list_add_maquina div.row').remove();
                   
                            for (i in pmtJson_marcas){

                                /* Aquí debo crear los objetos: list */
                                var row = document.createElement('div');
                                    row.setAttribute('class','row');
                                    row.setAttribute('data-id',pmtJson_marcas[i].Id);

                                var value = document.createElement('div');
                                    value.setAttribute('class','value');
                                    value.innerHTML = pmtJson_marcas[i].Marca;

                                    row.appendChild(value);
                                    document.getElementById('list_add_maquina').appendChild(row);
                            }
                   
                  
                
                /* Quita configuraciones anteriores */
                 $('div#list_add_maquina').removeClass('listDescripcion');
    
    }


function set_list_Modelos(){
    
            document.getElementById('estructura_maquina').setAttribute('data-sector',1);
            /* Transforma el entorno a modelo */
             $('div#list_add_maquina').addClass('listModelo');
             document.getElementById('sector_maquina').innerHTML = 'Modelo';
              
                /* Debe cargar lista de modelos */
                          
                   var json_modelos = getModelos();
                       $('div#list_add_maquina div.row').remove();                   
                  
                   for (i in json_modelos){
                       
                       /* Aquí debo crear los objetos: list */
                       var row = document.createElement('div');
                           row.setAttribute('class','row');
                           row.setAttribute('data-id',json_modelos[i].Id);
                           
                       var value = document.createElement('div');
                           value.setAttribute('class','value');
                           value.innerHTML = json_modelos[i].Modelo;
                           
                           row.appendChild(value);
                           document.getElementById('list_add_maquina').appendChild(row);
                   }
                   
                
                /* Quita configuraciones anteriores */
                 $('div#list_add_maquina').removeClass('listMarca');
    
    
}


$(document).on('ready',function(){

    /* Llenar listas */
    set_list_Formulas();
    getMarcas();
    
    
    
    $('div#campo_add_maquina').on('keydown','input#txt_add_Maquina',function(e){
        
        var sector = parseInt(document.getElementById('estructura_maquina').getAttribute('data-sector'));
        
        
        if(e.keyCode===13){
            
            if(sector===0){
                /* Si no hay rows! Debe almacenar una nueva marca */
                    
                    var cantidad_filas = $('div#list_add_maquina').children('div.row').length;
                    
              //      if(cantidad_filas===0){/* Almacenar */
                        var marca = document.getElementById('txt_add_Maquina').value;
                        
                        $.post('ctrlmaquina',{Action:1,Marca:marca},function(id){
                            
                            $('div#marca_maquina').attr('data-id',id);
                            $('div#marca_maquina').children('div.value').text(marca);
                            /* Colocar Id marca en estructura marca */
                        });
                        
            //        }else{/* Seleccionar primera fila: VISIBLE  */
            //            var fila =  $('div#list_add_maquina').children('div.row').text();
                       
         //           }
                
                /* Cargar lista de modelos */
                set_list_Modelos();
                
            }else if(sector===1){
                
           //      alert($('div#list_add_maquina').children('div.row').length);
                
                 document.getElementById('estructura_maquina').setAttribute('data-sector',2);
                /* Transforma el entorno a descripcion --> No realiza búsquedas: Solo almacena */
                 $('div#list_add_maquina').addClass('listDescripcion');
                 document.getElementById('sector_maquina').innerHTML = 'Descripción';
                 
                 /* Debo cargar descripciones que correspondan a la marca y al modelo */
                 
                 
             
                /* Debe almacenar la descripción */
                  $('div#list_add_maquina div.row').remove();
                  
                 /* Quita configuraciones anteriores */
                 $('div#list_add_maquina').removeClass('listModelo');
            }else{
                /* Debe almacenar la descripción */
                   var id_marca = $('div#marca_maquina').children('div.value').attr('data-id');
                   var modelo = $('div#modelo_maquina').children('div.value').text();
                   var descripcion = document.getElementById('txt_add_Maquina').value;
                   
                   $.post('ctrlmaquina',{Action:2,Descripcion:descripcion,Id_marca:id_marca,Modelo:modelo},function(r){
                       
                       /* r: Contiene Id que acaba de ingresar */
                    
                       
                   });
                   
                
                set_list_Marcas(json_marcas);
                /* V */
            }
        }
        
        
        
    });
    
    
    
    /* Click sobre listas diferentes  x clase pero con el mismo Id: list add maquina */
    $('div#add_maquina_sistema').on('click','div.listMarca div.row',function(){
        /* CLICK: Sobre filas de marcas */
        
        /* setear estructura --> Marca */
        var marca = $.trim($(this).text());
        var id = $.trim($(this).attr('data-id'));
        
        $('div#marca_maquina').children('div.value').text(marca);
        $('div#marca_maquina').children('div.value').attr('data-id',id);
        /* Cargar modelos */
         set_list_Modelos();
        
    });
    $('div#add_maquina_sistema').on('click','div.listModelo div.row',function(){
        /* CLICK: Sobre filas de modelos */
                
             
     
     
        /* setear estructura --> Modelo */
        var modelo = $.trim($(this).text());
        var id_modelo = parseInt($.trim($(this).attr('data-id')));
        
        $('div#modelo_maquina').children('div.value').text(modelo)
        $('div#modelo_maquina').children('div.value').attr('data-id',id_modelo);
        /* Se deben cargar las máquinas que pertenzcan a la marca y el modelo seleccionado */
        var id_marca =  parseInt($('div#marca_maquina').children('div.value').attr('data-id'));
        
        
       
             $('div#list_add_maquina div.row').remove();     
        
        $.post('ctrlmaquina',{Action:4,Modelo:modelo,Id_marca:id_marca},function(json){
            
             var json_maquinas =  $.parseJSON($.trim(json));//getMaquinas();
             
                        for(i in json_maquinas){
                                /* Máquinas que cumplen con la marca y el modelo seleccionados */

                                      /* Aquí debo crear los objetos: list */
                                   var row = document.createElement('div');
                                       row.setAttribute('class','row');
                                       row.setAttribute('data-id',json_maquinas[i].Id);

                                   var value = document.createElement('div');
                                       value.setAttribute('class','value');
                                       value.innerHTML = json_maquinas[i].Descripcion;

                                       row.appendChild(value);
                                       document.getElementById('list_add_maquina').appendChild(row);
                         }
            
        });
        
            
            
               /* Configuración de lista para descripción */
                 document.getElementById('estructura_maquina').setAttribute('data-sector',2);
                /* Transforma el entorno a descripcion --> No realiza búsquedas: Solo almacena */
                 $('div#list_add_maquina').addClass('listDescripcion');
                 document.getElementById('sector_maquina').innerHTML = 'Descripción';
             
                  
                 /* Quita configuraciones anteriores */
                 $('div#list_add_maquina').removeClass('listModelo');
            
        
    });
    
        $('div#add_maquina_sistema').on('click','div.listDescripcion div.row',function(){
        /* CLICK: Sobre filas de descripciones */
       
                        /* setear estructura --> Descripcion */
                  var descripcion = $.trim($(this).text());
                  var id_maquina = parseInt($.trim($(this).attr('data-id')));

                  $('div#descripcion_maquina').children('div.value').text(descripcion);
                  $('div#descripcion_maquina').children('div.value').attr('data-id',id_maquina);
                  /* Almacenar máquina si no existe ---> Almacenar relación ---> Cargar en listMaquina_de_Formula */
                  /* Cargar máquina a la formula --> Limpiar ¿Regresar a marca?*/
                  
                  var id_formula = document.getElementById('selected_formula').getAttribute('data-id');
                  
                  
                  $.post('ctrlformula',{A:6,Id_formula:id_formula,Id_maquina:id_maquina},function(r){
                      
                      
                  });


                  /* Carga ---> list Máquina */
                  var row = document.createElement('div');
                      row.setAttribute('class','row');
                      row.setAttribute('data-id',id_maquina);

                  var value = document.createElement('div');
                      value.setAttribute('class','value');
                      value.innerHTML = descripcion;

                      row.appendChild(value);
                      document.getElementById('listMaquina_de_Formula').appendChild(row);

            
       });
    
    /* Reset list add máquina */
        $('div#marca_maquina').on('click','div.value',function(){
            set_list_Marcas(json_marcas);
            /* Quitar clases */
            $('div#list_add_maquina').removeClass('listModelo');
            $('div#list_add_maquina').removeClass('listDescripcion');
            /* Lismpiar estructuras */
            $('div#modelo_maquina').children('div.value').text('');
            $('div#descripcion_maquina').children('div.value').text('');
        });
         $('div#modelo_maquina').on('click','div.value',function(){
            set_list_Modelos();
            /* Quitar clases */
            $('div#list_add_maquina').removeClass('listDescripcion');
            /* Lismpiar estructuras */
            $('div#descripcion_maquina').children('div.value').text('');
            
        });
         $('div#descripcion_maquina').on('click','div.value',function(){});
         
         /* Buscar */
         
    
    
    
});
