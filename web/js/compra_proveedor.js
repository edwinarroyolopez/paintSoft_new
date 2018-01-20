
   var json_proveedores;
   
   
            /* Búsqueda de proveedores */
    function get_Proveedores(){
      
        $.post('ctrlproveedor',{Action:2},function(json){

                   var jSon =   jQuery.parseJSON($.trim(json));
                       json_proveedores = jSon;
                
                for(i in jSon){
                    /* Crear objeto */
                    var iProveedor = document.createElement('div');
                        iProveedor.setAttribute('class','iProveedor');
                        iProveedor.setAttribute('data-id',jSon[i].Id);
                        iProveedor.setAttribute('data-nit',jSon[i].Nit);
                        iProveedor.setAttribute('data-telefono',jSon[i].Telefono_1);
                        iProveedor.setAttribute('data-ciudad',jSon[i].Ciudad);
                        iProveedor.innerHTML=jSon[i].Razon_social;

                        document.getElementById('cbProveedor').appendChild(iProveedor);
                }
            
        });
    }        




$(document).on('ready', function(){
    /* Loading proveedores */
        get_Proveedores();
    
});
  
                  
                  