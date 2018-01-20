
$(document).on('ready', function(){


           $('div#btnAlmacenar_presentacion').on('click',function(e){
                 create_update_Presentacion();
           });/* Almacena presentacion */

           $('div#btn_remove_presentacion').on('dblclick',function(){
              delete_Presentacion();
           });

});/* End document */

function create_content_add_fraccion(){

      var content_add = document.createElement('div');
          content_add.setAttribute('class','content_add');
                /* addFraccion */
                var addFraccion = document.createElement('div');
                    addFraccion.setAttribute('class','button_fraccion addFraccion');
                    addFraccion.onclick =  function() {enable_fieldFraccion(this)};
                var label_addFraccion = document.createElement('div');
                    label_addFraccion.setAttribute('class','label');
                    label_addFraccion.innerHTML = '+';
                    addFraccion.appendChild(label_addFraccion);
                /* head */
                var head = document.createElement('div');
                    head.setAttribute('class','head');
                var fraccion = document.createElement('div');
                    fraccion.setAttribute('class','fraccion');
                var label_fraccion = document.createElement('div');
                    label_fraccion.setAttribute('class','label');
                    label_fraccion.innerHTML = 'Fracción';
                    fraccion.appendChild(label_fraccion);
                var proporcion = document.createElement('div');
                    proporcion.setAttribute('class','proporcion');
                var label_proporcion = document.createElement('div');
                    label_proporcion.setAttribute('class','label');
                    label_proporcion.innerHTML = 'Proporción';
                    proporcion.appendChild(label_proporcion);
                    head.appendChild(fraccion);
                    head.appendChild(proporcion);
        content_add.appendChild(addFraccion);
        content_add.appendChild(head);

          return content_add;
}

function create_fieldFraccion(){

    console.log('Creando... campo para fraccion!');
              /* fieldFraccion */
          var fieldFraccion = document.createElement('div');
              fieldFraccion.setAttribute('class','fieldFraccion');
              fieldFraccion.setAttribute('id','fieldFraccion');
                  /* fraccion field */
                  var fraccion_field = document.createElement('div');
                      fraccion_field.setAttribute('class','fraccion');
                  var textbox_fraccion = document.createElement('div');
                      textbox_fraccion.setAttribute('class','textbox');
                  var input_fraccion = document.createElement('input');
                      input_fraccion.setAttribute('type','text');
                      input_fraccion.setAttribute('placeholder','...');
                      input_fraccion.setAttribute('id','txtFraccion');
                      textbox_fraccion.appendChild(input_fraccion);
                      fraccion_field.appendChild(textbox_fraccion);
                  /* proporcion field */
                  var proporcion_field = document.createElement('div');
                      proporcion_field.setAttribute('class','proporcion');
                  var textbox_proporcion = document.createElement('div');
                      textbox_proporcion.setAttribute('class','textbox');
                  var input_proporcion = document.createElement('input');
                      input_proporcion.setAttribute('type','text');
                      input_proporcion.setAttribute('placeholder','...');
                      input_proporcion.setAttribute('id','txtProporcion');
                      textbox_proporcion.appendChild(input_proporcion);
                      proporcion_field.appendChild(textbox_proporcion);
                  var btn_almacenar_fraccion = document.createElement('div');
                      btn_almacenar_fraccion.setAttribute('class','button_fraccion');
                      btn_almacenar_fraccion.setAttribute('id','btn_almacenar_fraccion');
                      btn_almacenar_fraccion.onclick =  function() {almacenar_Fraccion(this)};
                  var label_almacenar = document.createElement('div');
                      label_almacenar.setAttribute('class','label');
                      label_almacenar.innerHTML='almacenar';
                      btn_almacenar_fraccion.appendChild(label_almacenar);
            fieldFraccion.appendChild(fraccion_field);
            fieldFraccion.appendChild(proporcion_field);
            fieldFraccion.appendChild(btn_almacenar_fraccion);

            console.log('field: '+fieldFraccion.innerHTML);
            return fieldFraccion;
}

function enable_fieldFraccion(e){

        /* Elimina elementos */
        var fields = document.getElementsByClassName('fieldFraccion');

         while(fields.length > 0){/* Elimina elementos */
             fields[0].parentNode.removeChild(fields[0]);
         }

         e.parentElement.appendChild(create_fieldFraccion());

}

function select_Presentacion(e){

      let id_presentacion = e.parentNode.getAttribute('data-id');
      __('msgOperationPresentacion').innerHTML = 'Editar presentacion';
      __('txtPresentacion').value = e.innerHTML;
      __('txtPresentacion').setAttribute('data-id_presentacion',id_presentacion);

}
