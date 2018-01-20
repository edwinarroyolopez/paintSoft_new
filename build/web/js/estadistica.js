/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('ready',function(){
    
    getGasto_ganancia_diaria();
    
    
});


function getGasto_ganancia_diaria (){
    
    $.post('ctrlestadistica',{A:1},function(json){
        
         console.log(json);
        
        var json_gasto_ganancia = JSON.parse(json);
        
        document.getElementById('info_ganancia').innerHTML = json_gasto_ganancia[0].Ganancia;
        document.getElementById('info_gasto').innerHTML = json_gasto_ganancia[0].Gasto;
        
        
    });
    
}