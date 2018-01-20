/* Traer Fórmulas */
var json_formulas = 0;

function getFormulas(){
        console.log('Carga fórmulas!');
        if(json_formulas===0){
            $.post('ctrlformula',{A:4},function(json){

                json_formulas = $.parseJSON($.trim(json));
                set_list_Formulas(json_formulas);

            });
        }
    
}


/* Llena la lista con todas las fórmulas */
   function set_list_Formulas(pmtJson_formulas){
                    /* Limpia lista */
                   $('div#listFormula div.row').remove();
                   
                   for (i in pmtJson_formulas){
                       
                       /* Aquí debo crear los objetos: list */
                       var row = document.createElement('div');
                           row.setAttribute('class','row');
                           row.setAttribute('data-id',pmtJson_formulas[i].Id);
                           
                       var value = document.createElement('div');
                           value.setAttribute('class','value');
                           value.innerHTML = pmtJson_formulas[i].Descripcion;
                           
                           row.appendChild(value);
                           document.getElementById('listFormula').appendChild(row);
                   }
    }




$(document).on('ready',function(){

    
getFormulas(); /* Trae las fórmulas */
carga_Poliuretano_Bicapa();
 
 
function carga_Poliuretano_Bicapa(){
 
        $.post('ctrlformula',{A:1},function(r){
           
            var json_pol_bic = $.parseJSON($.trim(r));
            
            for(i in json_pol_bic){
                /* Creación de list */
                var row = document.createElement('div');
                    row.setAttribute('class','row');
                    row.setAttribute('data-id',json_pol_bic[i].Id);
                    row.setAttribute('data-id_grupo',json_pol_bic[i].Id_grupo);
                    row.setAttribute('data-id_marca',json_pol_bic[i].Id_marca);
                var descripcion = document.createElement('div');
                    descripcion.setAttribute('class','descripcion');
                    descripcion.innerHTML = json_pol_bic[i].Descripcion;
                var codigo = document.createElement('div');
                    codigo.setAttribute('class','codigo');
                    codigo.innerHTML = json_pol_bic[i].Codigo;
                    
                    row.appendChild(descripcion);
                    row.appendChild(codigo);
                    document.getElementById('listProducto').appendChild(row);
            }
           
        });
}


 
 
 /* Selección de una fórmula en la lista */
 $('div#listFormula').on('click','div.row',function(){
     
     
                
     
     
                var formula = $(this).children('div.value').text();
                var id_formula = $(this).attr('data-id');
                document.getElementById('selected_formula').innerHTML = formula;
                document.getElementById('selected_formula').setAttribute('data-id',id_formula);


                    /* Configuración para eliminar */
                        document.getElementById('btn_eliminar_formula').setAttribute('data-id_formula',id_formula);
                        $('div#btn_eliminar_formula').removeClass('hidden');
                        /* Fila seleccionada  --> Para eliminar */
                            $('div#listFormula div.row').removeClass('isSelected')
                            $(this).addClass('isSelected');
                
                
                /* Carga todo lo que tiene que ver con esa formula
                       * Colores
                       * Máquinas 
                  */
                 
                 var area = parseInt(document.getElementById('selected_formula').getAttribute('data-area'));
                 
                 
                 if(area===0){/* Combinación */

                    
                        $.post('ctrlformula',{A:5,Id_formula:id_formula},function(json){
                            
                          
                            /* Reset --->  Colores */
                            $('div#combinacion div.color').addClass('opacidad');
                            $('div#combinacion div.color').children('div.img').children('div.peso').text(0);
                            $('div#combinacion div.color').children('div.descripcion').text('Color');
                            
                            
                            var json_color = $.parseJSON($.trim(json));
                            
                            for(i in json_color){
                                
                                var pos = parseInt(i) + 1;
                                
                                $('div#C'+pos).children('div.img').children('div.peso').text(json_color[i].Peso);
                                $('div#C'+pos).children('div.descripcion').text(json_color[i].Descripcion);
                                $('div#C'+pos).removeClass('opacidad');
                                $('div#C'+pos).attr('data-id',json_color[i].Id_producto);
                            }
                            
                        });
                     
                 }else if(area===2){/* Máquinas */

                                /* Limpia list */
                                $('div#listMaquina_de_Formula div.row').remove();

                                $.post('ctrlmaquina',{Action:5,Id_formula:id_formula},function(json){
                                   /* Trae todas las máquinas que contiene esta formula */
                                          
                                                  var json_maquinas = $.parseJSON($.trim(json));

                                                  for(i in json_maquinas){

                                                          /* Aquí debo crear los objetos: list */
                                                           var row = document.createElement('div');
                                                               row.setAttribute('class','row');
                                                               row.setAttribute('data-id',json_maquinas[i].Id_maquina);

                                                           var value = document.createElement('div');
                                                               value.setAttribute('class','value');
                                                               value.innerHTML = json_maquinas[i].Descripcion;

                                                               row.appendChild(value);
                                                               document.getElementById('listMaquina_de_Formula').appendChild(row);
                                                  }
                                });
                     
                 }
                 
                 
      });

    /* Click sobre filas de la lista de poliuretanos y bicapas */
    $('div#listProducto').on('click','div.row',function(){
        
                $('div#listProducto').addClass('hidden');


                var descripcion =  $(this).children('div.descripcion').text();
                var id_producto =  $(this).attr('data-id');

                document.getElementById('txtColor_formula').value = descripcion;
                document.getElementById('txtColor_formula').setAttribute('data-id',id_producto);

                /* Foco ---> Ingresar peso */
                document.getElementById('txtPeso').focus();
        
        
        
    });
    
    /* Visibilidad de listProducto */
    $('div#fieldSetter').on('focusin','input#txtColor_formula',function(){
        $('div#listProducto').removeClass('hidden');
    });
    $('div#fieldSetter').on('focusout','input#txtColor_formula',function(){
        setTimeout(function(){
            $('div#listProducto').addClass('hidden');
        },200);
        
    });
    
    /* Buscar colores para formula */
    $('div#fieldSetter').on('keypress','input#txtColor_formula',function(e){
       
         
         if(e.keyCode==13){e.preventDefault();}
          /* Retroceso: Se hace búsqueda con un caracter menos */  
         
        var texto = $(this).val()+e.key;
            busqueda_List(texto,'listProducto','div.descripcion');
             console.log(texto);
       
    });
    
    
    /* Visibilidad de listProducto */
    
    $('div#combinacion div.color').addClass('opacidad');
    
    var posicion_color = 0;
    var gramos_formula = 0;
    
    /* Setear color */
    $('div#fieldSetter').on('keydown','input#txtPeso',function(e){
        if(e.keyCode===13){/* Tecla enter */
            posicion_color = posicion_color + 1;
            
            var peso = parseInt(document.getElementById('txtPeso').value);
            var descripcion = document.getElementById('txtColor_formula').value;
            var id_producto = document.getElementById('txtColor_formula').getAttribute('data-id');
            
            gramos_formula = gramos_formula + peso;
            document.getElementById('gramos').innerHTML = gramos_formula;
            
            
            $('div#C'+posicion_color).children('div.img').children('div.peso').text(peso);
            $('div#C'+posicion_color).children('div.descripcion').text(descripcion);
            $('div#C'+posicion_color).attr('data-id',id_producto);
            /* Quitar opacidad */
            $('div#C'+posicion_color).removeClass('opacidad');
            
            /* Limpio cajas */
            document.getElementById('txtPeso').value = '';
            document.getElementById('txtColor_formula').value = '';
            /* Foco ---> */
            document.getElementById('txtColor_formula').focus();
            
        }
    });
    
    $('div#fieldSetter').on('click','div#btnIngresar_formula',function(){
       
       /* Ingresar fórmula */
       var descripcion = document.getElementById('txtDescripcion_formula').value;
       var peso = 59;    
       var medida = '1/64 Gln';
       /* Ingresa fórmula */
       $.post('ctrlformula',{A:2,Descripcion:descripcion,Peso:peso,Medida:medida},function(r){ });
       
            /* Evita que guarde algunos colores en la formula anterior */
                    setTimeout(function(){
                            $('div#combinacion div.color').each(function(){

                                var peso = parseInt($(this).children('div.img').children('div.peso').text());

                                if(peso>0){/* Valores que se ingresarán a la fórmula */

                                    var id_producto = $(this).attr('data-id');

                                    /* Ingresa colores a la fórmula */
                                    $.post('ctrlformula',{A:3,Id_producto:id_producto,Peso:peso},function(r){ });
                                }
                            });
                     },300);
                     
            /* Limpiar ---> Colores */
                setTimeout(function(){
                    
                        $('div#combinacion div.color').addClass('opacidad');
                        $('div#combinacion div.color').children('div.img').children('div.peso').text(0);
                        $('div#combinacion div.color').children('div.descripcion').text('Color');
                    /* Limpiar --> Cajas de texto */
                        document.getElementById('txtDescripcion_formula').value = '';
                    /* Limpiar --> Variables que controlan la posición del color */   
                        posicion_color = 0;
                        gramos_formula = 0;
                },300);
        
        
    });
    
    $('div#navegador').on('click','div.menu_item',function(){
        

                var id_menu = parseInt($(this).attr('data-id'));

                switch(id_menu){
                    case 0:/* Fómulas */
                          $('div#content_set_formula').removeClass('hidden');
                          $('div#content_Maquinas').addClass('hidden');

                          /* Localización */
                          document.getElementById('selected_formula').innerHTML = "Nueva fórmula";
                          document.getElementById('selected_formula').setAttribute('data-area',0);
                        break;
                    case 1:/* Homologar colores */


                        break;
                    case 2:/* Máquinas */
                          $('div#content_Maquinas').removeClass('hidden');
                          $('div#content_set_formula').addClass('hidden');

                           /* Localización */
                          document.getElementById('selected_formula').innerHTML = "Seleccione fórmula";
                          document.getElementById('selected_formula').setAttribute('data-area',2);
                        break;
                }
    });
    
    /* Eliminar fórmulas */
    $('div#buscador_formula').on('click','div#btn_eliminar_formula',function(){
            
            var id_formula = $(this).attr('data-id_formula');
            
      
            /* Elimina formula a travéz de id */
            $.post('ctrlformula',{A:9,Id_formula:id_formula},function(r){
                    console.log('Respuesta: '+r);
            });
            
            
            /* Elimina fila en listFormula */
                $('div#listFormula div.isSelected').remove();
            
            /* Limpia campos */
                    $('div#combinacion div.color').addClass('opacidad');
                    $('div#combinacion div.color').children('div.img').children('div.peso').text(0);
                    $('div#combinacion div.color').children('div.descripcion').text('Color');
                    
                    /* Encabezado superior: selected_formula */
                    document.getElementById('selected_formula').innerHTML = 'Nueva formula';
                    document.getElementById('selected_formula').removeAttribute('data-id');
                    
                    /* Hacer invisible al botón */
                    $(this).attr('class','hidden');

    });
    
    
});