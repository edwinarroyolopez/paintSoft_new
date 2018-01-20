
<%-- 
    Document   : cliente
    Created on : 08-jul-2016, 4:04:36
    Author     : Zero
--%>



<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lab: Forma de pago</title>
        <!-- Estilos -->
        <link rel="stylesheet" href="formaPago.css" title="Style"> 
        <!-- Estilos -->
                <script language="JavaScript" type="text/javascript" src="jquery-1.9.1.js"></script>
                <script type="text/javascript">
                    
                    $(document).on('ready', function(){
                        
                        $('div#fmPago').on('click',function(){
                                
                                var hijo = $(this).children();
                                var opcion = hijo.attr('data-value');
                         
                                
                                switch (opcion){
                                    case '0': 
                                        hijo.html('15 Días');
                                        hijo.attr('data-value',1);
                                        break;
                                    case '1': 
                                        hijo.html('30 Días');
                                        hijo.attr('data-value',2);
                                        break;
                                    case '2': 
                                        hijo.html('45 Días');
                                        hijo.attr('data-value',3);
                                        break;
                                    case '3': 
                                        hijo.html('Contado');
                                        hijo.attr('data-value',0);
                                       
                                }
                        });
                        
                        
                    });
                    
                </script>
    </head>
    <body>
        
        <div class="contenedor">
              <div class="field" id="fmPago" >
                  <div class="value"  data-value="0">Contado</div>
             </div>
        </div>
      
        
        
        
        
        
        
        
    </body>
</html>
