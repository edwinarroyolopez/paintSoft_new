
/* Cargar tablas */
         load_Tables();


function load_Tables(){
    
    $.post('ctrlconfiguracion',{Action:0},function(r){

        var jSon = $.parseJSON($.trim(r));
        
        for(i in jSon){
            
            var item = document.createElement('div');
                item.setAttribute('class','item');
                item.innerHTML = jSon[i].Tabla;
                
                document.getElementById('dataTable').appendChild(item);
                
        }
        
        
    });
    
}


$(document).on('ready',function(){
    
    $('section#container').on('click','div#mImportar',function(){
        
        alert('Importar!');
        
    });
    
    
     $('section#container').on('click','div#mExportar',function(){
        
        alert('Exportar!');
        
    });
    
    
    /* Seleccion de tablas */
   $('div#dataTable').on('click','div.item',function(){
      
      var tabla = $(this).html();
      
      $.post('ctrlconfiguracion',{Action:1,Tabla:tabla},function(r){
        
            /* Limpia contenedor: data */
            document.getElementById('data').innerHTML = '';
            
          var jSon = $.parseJSON($.trim(r));
          
          /* jSon[0]  ---> Corresponde al nombre de cada columna */
          var json_columnas = jSon[0].Columnas;
          
          /* Con esta variable creo el encabezado */
          var encabezado = document.createElement('div');
              encabezado.setAttribute('class','encabezado');
              
          for (j in json_columnas){/* Creación de columnas para el encabezado */
              
              var column = document.createElement('div');
                  column.setAttribute('class','column');
                  column.innerHTML = json_columnas[j].Columna;
                  
                  encabezado.appendChild(column);/* add Column */
          }
          
          document.getElementById('data').appendChild(encabezado);
          
         
          
          
            /* Con esta variable creo las filas */
          for(i=1;  i<jSon.length; i++){
              
             // alert('value: '+jSon[i].Id);
              
              /* Define la cantidad de celdas que debo crear */
                for(k=1;k<json_columnas.length;k++){
                        //alert('value: '+jSon[i][k]);
                }
              
          }
           
          
      });
       
       
   });
    
});

