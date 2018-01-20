/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('ready',function(){
    
    $('div#content_fields').on('focusin','input#txtTipo_gasto',function(){
        $('div#list_Tipo_gasto').removeClass('hidden');
    });
      $('div#content_fields').on('focusout','input#txtTipo_gasto',function(){
          setTimeout(function(){
               $('div#list_Tipo_gasto').addClass('hidden');
          },200);
    });
    
    $('div#list_Tipo_gasto').on('click','div.item',function(){
        
            var id_tipo = $(this).attr('data-id_tipo_gasto');
            var tipo = $(this).text();
            document.getElementById('txtTipo_gasto').value = tipo;
            document.getElementById('txtTipo_gasto').setAttribute('data-id_tipo',id_tipo);
        
    });
    
    $('div#content_button').on('click','div#btn_add_Gasto',function(){
            
                    var Descripcion = document.getElementById('txtDescripcion').value;
                    var Id_tipo = document.getElementById('txtTipo_gasto').getAttribute('data-id_tipo');
                    var Tipo = document.getElementById('txtTipo_gasto').value;
                    var Valor = document.getElementById('txtValor_gasto').value;

                    $.post('ctrlgasto',{A:1,Descripcion:Descripcion,Id_tipo:Id_tipo,Valor:Valor},function(r){
                            console.log('Id: '+r);
                    });

                    /* Agregar al datagrid */
                    var row = document.createElement('div');
                        row.setAttribute('class','row');

                    var descripcion = document.createElement('div');
                        descripcion.setAttribute('class','descripcion');
                        descripcion.innerHTML = Descripcion;

                    var tipo = document.createElement('div');
                        tipo.setAttribute('class','tipo');
                        tipo.innerHTML = Tipo;

                    var valor = document.createElement('div');
                        valor.setAttribute('class','valor');
                        valor.innerHTML = Valor;

                        row.appendChild(descripcion);
                        row.appendChild(tipo);
                        row.appendChild(valor);

                        document.getElementById('datagrid_Gastos').appendChild(row);
                
                /* Limpiar campos */
                    document.getElementById('txtDescripcion').value = '';
                    document.getElementById('txtTipo_gasto').value = '';
                    document.getElementById('txtValor_gasto').value = '';
    });
    
    
    /* Trae los gastos de hoy */
        getGastos_hoy();
});

function getGastos_hoy(){
    
                /*
                    <div class="row">
                        <div class="descripcion">Arriendo mes de Abril</div>
                        <div class="tipo">Mensual</div>
                        <div class="valor">800.000</div>
                    </div>
                 */

                $.post('ctrlgasto',{A:2},function(json){

                    
                        console.log(json);
                        
                            var json_Gastos = jQuery.parseJSON(json);

                            for(i in json_Gastos){

                                    var row = document.createElement('div');
                                        row.setAttribute('class','row');
                                        row.setAttribute('data-id',json_Gastos[i].Id_gasto);

                                    var descripcion = document.createElement('div');
                                        descripcion.setAttribute('class','descripcion');
                                        descripcion.innerHTML = json_Gastos[i].Descripcion;

                                    var tipo = document.createElement('div');
                                        tipo.setAttribute('class','tipo');
                                        tipo.innerHTML = json_Gastos[i].Tipo;
                                        
                                    var Gasto = parseInt(json_Gastos[i].Valor);
                                    
                                            if(json_Gastos[i].Tipo==='Mensual'){
                                                Gasto = parseInt(Gasto/26); /* Un mes laboral tiene "26 días " */
                                            }
                                        
                                    var valor = document.createElement('div');
                                        valor.setAttribute('class','valor');
                                        valor.innerHTML = Gasto;
                                        
                                        row.appendChild(descripcion);
                                        row.appendChild(tipo);
                                        row.appendChild(valor);

                                        document.getElementById('datagrid_Gastos').appendChild(row);
                            }
                        
                });
    
}