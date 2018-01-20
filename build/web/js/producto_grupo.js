
   /* Form: Producto ----> Grupo: textbox --- lista 
       Uso de teclas de dirección para seleccionar items de la lista */
    
    /* Globales ----> */
    var pos_anterior = 0, pos_actual = 0;/* Define la posición en la que se encuentra foco */
    var cantidad_items = 0; /* Cuantos items tiene la lista */
    var listPosicion = [];
    

    /* Uso de teclas de direccion para moverse entre los items de arriba a abajo */
    function updown_List(e, pmtParent,pmtChild, textbox_local){
        
        var pmtKeyCode = e.keyCode;
        
        
        if(pmtKeyCode===38){/* Up arrow */
                
                  pos_anterior = pos_actual;
                  pos_actual = pos_actual - 1;
                  
            /* Control de rango de selección de filas */
                if((pos_actual === -1)){
                        
                        pos_actual = cantidad_items -1;
                        pos_anterior = 0;
                        /* Se posiciona el foco en la última fila */
                        var filaNext = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]];
                        filaNext.setAttribute('class','item row_selected');
                    /* Quito selección de la primera fila --> La mando a la última */
                        var filaPrev = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_anterior]];
                            filaPrev.setAttribute('class','item');
                            return; /* Hasta aquí ---> Retorno! */
                }
                
                
                    /* Quita el atributo que permite que la fila esté seleccionada */
               var filaPrev = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_anterior]];
                   filaPrev.setAttribute('class','item');
                   /* Coloca el atributo que permite que la fila esté seleccionada */
               var filaNext = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]];
                   filaNext.setAttribute('class','item row_selected');
                   
                 //   console.log('End --> Down Posición: '+posicion);

            }else if(pmtKeyCode===40){/* Down arrow */
                    
                    console.log('Ant: '+pos_anterior +' Act: ' + pos_actual + 'Cantidad: '+cantidad_items);
                    
                        if(pos_anterior === pos_actual){/* Control: Define que esta es la primera vez que se presiona la tecla */
                            pos_anterior = cantidad_items - 1;
                            pos_actual = 0;
                             console.log('pos ant == pos act');
                        }else{/* Continua con el ciclo */
                            pos_anterior = pos_actual;
                            pos_actual = pos_actual + 1;
                            console.log('pos ant != pos act');
                        }
                        
                        
                    if(pos_actual===cantidad_items){/* Pasa de la última fila a la primera */
                         
                            pos_actual = 0;
                            pos_anterior = cantidad_items -1;/* Última posición */
                            
                            var filaNext = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]];
                                filaNext.setAttribute('class','item row_selected');
                                
                                /* Eliminar efecto de última fila */
                                var filaPrev = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_anterior]];
                                    filaPrev.setAttribute('class','item');
                                return;/* No me interesa que haga algo más */
                    }
                    
                                  /* Quita selección de la fila anterior */
                             var filaPrev = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_anterior]];
                                 filaPrev.setAttribute('class','item');
                             var filaNext = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]];
                                 filaNext.setAttribute('class','item row_selected'); 
                                
                                 
                              //   console.log('End --> Up Posición: '+posicion);
                                 
       
        }else if(pmtKeyCode===13 || pmtKeyCode===39){/* Press: Enter */
            
            /* El primero visible */
            
           var text_Fila = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]].innerHTML;
           var id_Fila = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]].getAttribute('data-id');
               document.getElementById(textbox_local).value = text_Fila;
               document.getElementById(textbox_local).setAttribute('data-id',id_Fila);
              
               /* Reset ---> List */ 
                 var fila_selected = document.getElementById(pmtParent).getElementsByTagName(pmtChild)[listPosicion[pos_actual]];
                     fila_selected.setAttribute('class','item');
                     pos_actual = pos_anterior = 0;
                     $('div#'+pmtParent).addClass('hidden');
        }
        
    }





$(document).on('ready',function(){

   
    cargaGrupos();
    cargaGrupoMarca();
    
    /* Cargar grupos */
    function cargaGrupos(){
        
          $.post('ctrlmedida',{ Action: 10}, function(r){
                  
                    
                         var jSon =   jQuery.parseJSON($.trim(r));
                         
                         for(i in jSon){
                             
                                    /* Combobox  */
                                    var item = document.createElement('div');
                                        item.setAttribute('class','item');
                                        item.setAttribute('id','G'+jSon[i].Id);
                                        item.setAttribute('data-id',jSon[i].Id);
                                        item.innerHTML = jSon[i].Grupo; 
                                        document.getElementById('cbGrupoMarca').appendChild(item); 

                                     /* Combobox: Crear producto */
                                     var item_ = document.createElement('div');
                                         item_.setAttribute('class','item');
                                         item_.setAttribute('data-id',jSon[i].Id);
                                         item_.innerHTML =jSon[i].Grupo; ;

                                     /* Data grupos */  
                                     var row = document.createElement('div');
                                         row.setAttribute('class','row');
                                     var codigo = document.createElement('div');
                                         codigo.setAttribute('class','codigo');
                                         codigo.innerHTML = jSon[i].Id;
                                     var grupo = document.createElement('div');
                                         grupo.setAttribute('class','grupo');
                                         grupo.setAttribute('data-id',jSon[i].Id);
                                         grupo.innerHTML = jSon[i].Grupo;
                                     var medida = document.createElement('div');
                                         medida.setAttribute('class','medida');
                                         medida.setAttribute('data-id',jSon[i].Id_medida);
                                         medida.innerHTML = jSon[i].Medida;
                                         
                                         row.appendChild(codigo);
                                         row.appendChild(grupo);
                                         row.appendChild(medida);


                                         if(i>25){/* Las listas solo pueden mostrar 15 items */
                                             item.setAttribute('class','item hidden');
                                             item_.setAttribute('class','item hidden');
                                         //    row.setAttribute('class','row hidden');
                                          }
                                          
                                             /* Add child to parent */
                                           document.getElementById('cbGrupoProducto').appendChild(item_); 
                                           document.getElementById('cbGrupoMarca').appendChild(item); 
                                           document.getElementById('dataGrupo').appendChild(row);
                                    
                         }
                    });
    }
    function cargaGrupoMarca(){
        
                    $.post('ctrlmedida',{ Action: 9}, function(r){
                         
                         var jSon =   jQuery.parseJSON($.trim(r));
                         
                         
                         for(i in jSon){
                               /* Hacer que se cree el item */
                                var row = document.createElement('div');
                                    row.setAttribute('class','row hidden');
                                    row.setAttribute('data-id_marca',jSon[i].Id_marca);
                                    row.setAttribute('data-id_grupo',jSon[i].Id_grupo);
                                var grupo = document.createElement('div');
                                    grupo.setAttribute('class','grupo');
                                    grupo.innerHTML = jSon[i].Grupo; 

                                    row.appendChild(grupo);
                                    document.getElementById('dataGrupoMarca').appendChild(row);
                         }
                    });
    }
    
    
    
    
    $('div#dataGrupo').on('click','div.row',function(){
        
        
        $('div#dataGrupo div.row').removeClass('grupo_selected');
        $(this).addClass('grupo_selected');
      
        var Id_grupo = parseInt($(this).children('div.grupo').attr('data-id'));
        var Id_medida = parseInt($(this).children('div.medida').attr('data-id'));
        var Grupo = $(this).children('div.grupo').text();
        var Medida = $(this).children('div.medida').text();
        
        document.getElementById('info_grupo').innerHTML = Grupo;
        document.getElementById('info_grupo').setAttribute('data-id',Id_grupo);
        document.getElementById('info_medida').innerHTML = Medida;
        document.getElementById('info_medida').setAttribute('data-id',Id_medida);
        
        /* Resetea la lista */
        $('div#list_unidad_medida div.item').remove();
        
              /* Buscar unidades de medidas */
         $.post('ctrlmedida',{Id_medida: Id_medida,Id_grupo: Id_grupo, Action: 4}, function(r){

                var jSon =   jQuery.parseJSON($.trim(r));
                                
                for(i in jSon){
                     
                        if(Id_medida===jSon[i].Id_medida && Id_grupo===jSon[i].Id_grupo){/* Filtrar */

                            var item = document.createElement('div');
                                item.setAttribute('class','item');
                                item.setAttribute('data-id',jSon[i].Id);
                                item.setAttribute('data-id_medida',jSon[i].Id_medida);
                                item.setAttribute('data-id_grupo',jSon[i].Id_grupo);
                                item.innerHTML = jSon[i].Unidad_medida;
                                document.getElementById('list_unidad_medida').appendChild(item);
                        }
                }
             
         });
         
         document.getElementById('txt_add_unidad_medida').focus();
        
        
        
    });
    
    
    /* FOCUS: Contar elementos en la lista */
      /* Visibilidad e invisibilidad de cbGrupo de productos  */
            $('div#frmProducto').on('focusin','input#txtSGrupoProducto',function(){

                document.getElementById('txtSGrupoProducto').value = '';
                
                
                /* Hace visible list */
                $('div#cbGrupoProducto').removeClass('hidden');
                  
                /* Reset --->*/
                    listPosicion = [];
                    pos_anterior = pos_actual = 0;
                    cantidad_items = 0;
                var i = 0; 
                
                
                /* Recorrerá todos los items, pero solo me interesan los visibles */
                $('div#cbGrupoProducto div.item').each(function(){

                            var Class = $(this).attr('class');

                            if(Class.indexOf('hidden')===-1){/* Verifica si el  item contiene la clase hidden */
                               /* No la contiene: Puedo sumar item a la cantidad de elementos */
                                cantidad_items = cantidad_items + 1;
                                listPosicion.push(i);
                              }
                              i = i + 1;/* Variable usada para definir las posiciones visibles de la lista */ 
                });
                
                    buscar_Grupos('');
                
                  console.log('List ' + listPosicion.toString());
                  
            });
            
             $('div#frmProducto').on('focusout','input#txtSGrupoProducto',function(){
                 
                 /* Reset ---> List */
//                 var fila_selected = document.getElementById('cbGrupoProducto').getElementsByTagName('div')[pos_actual];
//                     fila_selected.setAttribute('class','item');
//                     pos_anterior = pos_actual = 0;
                     
                 setTimeout(function(){ $('div#cbGrupoProducto').addClass('hidden');},200);
                 
            });
            
  
    /* KEY PRESS */
    $('div#frmProducto').on('keypress','input#txtSGrupoProducto',function(e){
        
            
    });
    /* KEY DOWN */
    $('div#frmProducto').on('keydown','input#txtSGrupoProducto',function(e){
        /* Uso de teclas de dirección */
        updown_List(e,'cbGrupoProducto','div','txtSGrupoProducto','txtSMarca');
        
        if(e.keyCode===13){
              $('input#txtSMarca').focus();
        }
        
        
        /* Búsqueda de grupos de producto */
         var texto = $(this).val()+e.key;/* Asigno el texto que hay dentro de la caja */
         
          if(e.keyCode==8){
                texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
            }
            
            
            if(e.keyCode!==37  && e.keyCode!==38 && e.keyCode!==39 && e.keyCode!==40){
                buscar_Grupos(texto);
            }
            
            
        
     });
     
     
     /* Búsqueda grupo de productos */
       function buscar_Grupos(valor){
        
        valor = valor.toLowerCase();
        
        /* Hago visible e invisibles a los items */
//         $("div#cbGrupoProducto div.item").remnoveClass('hidden');
//         $("div#cbGrupoProducto div.item").addClass('hidden'); 
//         
          var i = 0;
           $("div#cbGrupoProducto div.item").each(function(){
               
               
                            var valor_item = $(this).html()
                            
                            valor_item = valor_item.toLowerCase();
                            
                            if (valor_item.indexOf(valor)!==-1) {/* Existen resultados*/
                                    
                                    //$('div#sin_resultados').addClass('hidden');
                                    
                                    /* Solo puedo hacer visible a 14 Items */
                                    i = i + 1;
                                    if(i<=25){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                    
                             }else{
                                    $(this).addClass('hidden');
                                    
                                    /* Control: No exiten resultados*/
                                    if(i==0){
                                      //  $('div#sin_resultados').removeClass('hidden');
                                    }
                                    
                             }
            });        
    }/* Fin método búsqueda productos */
     
     
    
    /* Selección de item en lista Grupo producto */
            $('div#frmProducto').on('click','div#cbGrupoProducto div.item',function(){
                
                                
                  var grupo = $(this).html();
                  var id_grupo = $(this).attr('data-id');
                  
                  document.getElementById('txtSGrupoProducto').value = grupo;
                  document.getElementById('txtSGrupoProducto').setAttribute('data-id',id_grupo);
                  document.getElementById('txtSMarca').focus();
                  
            });
    
            /* Buscar marcas relacionadas con el grupo seleccionado */
            function getMarcasByGroup(pmtId_grupo){
                    
                    $("div#cbMarca div.item").addClass('hidden');
                     
                    /* Filtrar marcas */
                    $.post('ctrlmarca',{Id_grupo:pmtId_grupo,Action:3},function(r){
                            
                                console.log('Retorno con id grupo: ' + r);
                                
                                 var jSon =  jQuery.parseJSON($.trim(r));
                                    
                                    /* Reset ---> */
                                    cantidad_items = 0;
                                    listPosicion = [];
                             
                                    document.getElementById('cbMarca').textContent = '';
                                   
                                      for(i in jSon){
                                                
                                            /* Combobox marcas */
                                              var item = document.createElement('div');
                                              item.setAttribute('class','item');
                                              item.setAttribute('data-id',jSon[i].Id);
                                              item.innerHTML = jSon[i].Marca;
                                              document.getElementById('cbMarca').appendChild(item);
                                                   
                                              cantidad_items = cantidad_items + 1;
                                              listPosicion.push(i);/* Posición de item visible */

                                           }
                               
                    });
                
                
            }
    
    
    
    
    
    /* Marca ---->  */
    $('div#frmProducto').on('focusin','input#txtSMarca',function(){
                
                /* Hace visible list */
                $('div#cbMarca').removeClass('hidden');
                    
                  var id_grupo = document.getElementById('txtSGrupoProducto').getAttribute('data-id');
                  getMarcasByGroup(id_grupo);
                  $(this).val('');
                  
     });
            
             $('div#frmProducto').on('focusout','input#txtSMarca',function(){
             
                  /* Reset ---> List */
                 var fila_selected = document.getElementById('cbMarca').getElementsByTagName('div')[pos_actual];
                     fila_selected.setAttribute('class','item');
                     pos_anterior = pos_actual = 0;
                     
                 setTimeout(function(){ $('div#cbMarca').addClass('hidden');},200);
                 
                 
            });
            
            /* KEY PRESS */
            $('div#frmProducto').on('keypress','input#txtSMarca',function(e){
                
            });
            /* KEY DOWN */
            $('div#frmProducto').on('keydown','input#txtSMarca',function(e){
                // alert(cantidad_items);
                /* Uso de teclas de dirección */
                updown_List(e,'cbMarca','div','txtSMarca','txtCodigo');
                
                    if(e.keyCode===37){
                        $('input#txtSGrupoProducto').focus();
                    }
                
                
                    if(e.keyCode===13 || e.keyCode===39 ){


                                    var marca = document.getElementById('txtSMarca').value;
                                    var grupo = document.getElementById('txtSGrupoProducto').value;
                                    var id_grupo =document.getElementById('txtSGrupoProducto').getAttribute('data-id');
                                    var id_marca = document.getElementById('txtSMarca').getAttribute('data-id');

                                    create_dataGrid_products_by_marca_and_grupo(marca,grupo,id_grupo,id_marca);

                                     $('input#txtCodigo').focus();
                            }

                
             });
             
             
               /* Selección de item en Combobox marca */
            $('div#frmProducto').on('click','div#cbMarca div.item',function(){
                
                
                /* Hacer invisible button delete */
                $('div#btnDelete_producto').addClass('hidden');
                                 
                  var marca = $(this).text();
                  var grupo = document.getElementById('txtSGrupoProducto').value;
                  var id_grupo =document.getElementById('txtSGrupoProducto').getAttribute('data-id');
                  var id_marca = $(this).attr('data-id');
                  
                  create_dataGrid_products_by_marca_and_grupo(marca,grupo,id_grupo,id_marca);
                    
                    
            });
            
            
            $('div#frmProducto').on('keydown','input#txtCodigo',function(e){
                
                if(e.keyCode === 39){
                    document.getElementById('txtDescripcion').focus();
                }else if(e.keyCode === 37){
                    document.getElementById('txtSMarca').focus();
                }
            });
            
             $('div#frmProducto').on('keydown','input#txtDescripcion',function(e){
                
                if(e.keyCode === 37){
                    document.getElementById('txtCodigo').focus();
                }
                
            });
            
            
            /* Busqueda de grupo de productos */
    $('div.contentFieldGrupo').on('keypress','input#txtproductoGrupo',function(e){
       
    });
     $('div.contentFieldGrupo').on('keydown','input#txtproductoGrupo',function(e){
       
       
        /* Búsqueda de grupos de producto */
         var texto = $(this).val()+e.key;/* Asigno el texto que hay dentro de la caja */
         
          if(e.keyCode==8){
                texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
            }
            
            
            if(e.keyCode!==37  && e.keyCode!==38 && e.keyCode!==39 && e.keyCode!==40){
                buscar_Grupos_configuracion(texto);
            }
       
       
    });
    
    
    /* Búsqueda grupo de productos */
       function buscar_Grupos_configuracion(valor){
        
        valor = valor.toLowerCase();
        
        /* Hago visible e invisibles a los items */
//         $("div#cbGrupoProducto div.item").remnoveClass('hidden');
//         $("div#cbGrupoProducto div.item").addClass('hidden'); 
//         
          var i = 0;
           $("div#dataGrupo div.row").each(function(){
               
               
                            var valor_item = $(this).html()
                            
                            valor_item = valor_item.toLowerCase();
                            
                            if (valor_item.indexOf(valor)!==-1) {/* Existen resultados*/
                                      $(this).removeClass('hidden');
                                    //$('div#sin_resultados').addClass('hidden');
                                    
                                    /* Solo puedo hacer visible a 14 Items */
                             /*       i = i + 1;
                                    if(i<=25){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    } */
                                    
                             }else{
                                 
                                   if(document.getElementById('txtproductoGrupo').value===''){/* Todas visibles */
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                 
                                    
                                    /* Control: No exiten resultados*/
                                    if(i==0){
                                      //  $('div#sin_resultados').removeClass('hidden');
                                    }
                                    
                             }
            });        
    }/* Fin método búsqueda productos */
    
});