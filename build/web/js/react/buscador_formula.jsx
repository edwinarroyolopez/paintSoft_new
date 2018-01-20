
function inicializar_buscador_formula(){

              var Buscador_formula = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */

                                  },
                                  getInitialState: function() {
                                        return { customerList: 'cargando ...' };
                                  },
                                  //   componentWillMount() {}/* Se lanza antes de que se renderice el componente */
                                  //  componentDidMount(){} /* Se lanza despues de renderizado el componente */
                                  //  shouldComponentUpdate(){}/*  Devuelve con un valor si el componente debería actualizarse */
                                  //  componentWillUnMount(){}/*   Se lanza antes de que el componente se elimine. */

                                     /* Se lanza despues de renderizado el componente */
                                     componentDidMount:function(){
                                              /* Siguiente parte del componente */
                                     },
                                     read_formula_db:function(){
                                          formula_db();
                                     },
                                     read_formula_rapida:function(){
                                        formula_rapida();
                                     },
                                  render:function(){
                                      return(<div>
                                                      <div className="content_button">
                                                            <div className="button" id="btn_formula_db" onClick={this.read_formula_db}>
                                                                <div className="label">Base de datos</div>
                                                            </div>
                                                       </div>
                                                      <div className="content_button">
                                                            <div className="button" id="btn_formula_rapida" onClick={this.read_formula_rapida}>
                                                                <div className="label">Rápida</div>
                                                            </div>
                                                      </div>

                                                </div> );
                                  }
                              });
                              React.render(<Buscador_formula/>,document.getElementById('buscador_formula'));
}


function formula_db(){

              var Formula_db = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */

                                  },
                                  getInitialState: function() {
                                        return { customerList: 'cargando ...' };
                                  },
                                     /* Se lanza despues de renderizado el componente */
                                     componentDidMount:function(){
                                              /* Load last 10 formulas */
                                              read_formula(0,0,1);
                                     },
                                     read_all_formulas:function(){

                                        console.log("Ingresa foco a buscador de formula!");

                                                  var load = parseInt(document.getElementById('txt_buscador_formula').getAttribute('data-load_formulas'));

                                                        if(load==0){/* No se ha cargado */

                                                                    /* Load all formulas  10: Ya se han cargado */
                                                                      read_formula(10,1,1);
                                                                     /* Change state load formulas */
                                                                    document.getElementById('txt_buscador_formula').setAttribute('data-load_formulas',1);
                                                        }/* Load = 0 */

                                     },
                                     filter_formulas:function(e){

                                            console.log("Key: "+e.Key);

                                     },
                                  render:function(){
                                      return(<div>
                                                    <div className="textbox"><input id="txt_buscador_formula" data-load_formulas="0" placeholder="" onFocus={this.read_all_formulas}  onKeyPress={this.filter_formulas}/></div>
                                                    <div className="list" id="listFormula"></div>
                                                </div> );
                                  }
                              });
                              React.render(<Formula_db/>,document.getElementById('buscador_formula'));
}


function formula_rapida(){

              var Formula_rapida = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */

                                  },
                                  getInitialState: function() {
                                        return { customerList: 'cargando ...' };
                                  },

                                       /* Se lanza despues de renderizado el componente */
                                       componentDidMount:function(){
                                                /* Loading json productos a list colors formula */
                                                create_list_colors_fast_formula();
                                       },
                                    filter_colors:function(e){



                                                     var filter = document.getElementById('txt_color_formula').value+e.key;

                                                       if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                                                           e.preventDefault();
                                                       }
                                                          /*Busca filtro en cada fila de la lista */
                                                        buscar_texto_list('div#listColors_fast_formula div.row',filter,7);

                                    },
                                    read_colors:function(){
                                      /* do visible list colors formula */
                                          document.getElementById('listColors_fast_formula').classList.remove("hidden");

                                                  /* message */
                                                  var state = parseInt(document.getElementById('message_fast_formula').getAttribute('data-state'));
                                                  if(state>0){/* Clear color */
                                                      document.getElementById('txt_color_formula').value = '';
                                                  }
                                                  /* reset message  */
                                                  document.getElementById('message_fast_formula').classList.add("hidden");
                                                  document.getElementById('message_fast_formula').setAttribute('data-state',0);
                                    },
                                    hidden_ListColors_fast_formula:function(){

                                                setTimeout(function(){
                                                      /* do hidden */
                                                            document.getElementById('listColors_fast_formula').classList.add("hidden");
                                                 }, 200);

                                    },
                                    set_listColors:function(e){

                                             if(e.charCode===13){/* send to listColores  */
                                                  create_row_color_listcolores();
                                             }/* char code --> 13 */

                                    },
                                    delete_color_fast_formula:function(){
                                              var id_row =   document.getElementById('btn_delete_color_fast_formula').getAttribute('data-id_row');

                                              /* Remove value color of total value */
                                                var row = document.getElementById(id_row);
                                                var color_peso = parseInt(row.getAttribute('data-peso_color'));
                                                var precio_gramo = parseInt(row.getAttribute('data-precio_gramo'));
                                                var precio_color = color_peso*precio_gramo;/* calculate price color */
                                                var precio_formula = parseInt(document.getElementById('txtPrecio_formula').getAttribute('data-precio_formula'));
                                                     precio_formula = precio_formula - precio_color;/* remove price color */
                                                     /* reset price formula */
                                                     document.getElementById('txtPrecio_formula').setAttribute('data-precio_formula',precio_formula);
                                                     document.getElementById('txtPrecio_formula').value = precio_formula;
                                                     
                                              /* delete row  */
                                              document.getElementById(id_row).remove();

                                              /* does not visible content button delete formula */
                                              document.getElementById('content_button_delete_color').classList.add("hidden");
                                              /* Prepare button delete */
                                              document.getElementById('btn_delete_color_fast_formula').removeAttribute('data-id_row');
                                    },
                                  render:function(){
                                      return(<div>
                                                      <div className="field">
                                                            <div className="label">Descripción</div>
                                                            <div className="textbox">
                                                                  <input id="txt_description_formula"  />
                                                            </div>
                                                      </div>
                                                      <div className="field">
                                                            <div className="label">Color</div>
                                                            <div className="textbox">
                                                                  <input  id="txt_color_formula" onFocus={this.read_colors} onKeyPress={this.filter_colors} onBlur={this.hidden_ListColors_fast_formula} />
                                                            </div>
                                                            <div className="hidden" id="listColors_fast_formula"></div>
                                                      </div>
                                                      <div className="field">
                                                            <div className="label">Peso</div>
                                                            <div className="textbox">
                                                                  <input id="txt_weight_formula"  onKeyPress={this.set_listColors} />
                                                            </div>
                                                      </div>
                                                      <div className="field">
                                                            <div className="label hidden" id="message_fast_formula" data-state="0">No hay existencias de este producto, por favor selecciona otro!</div>
                                                      </div>
                                                      <div className="content_button hidden" id="content_button_delete_color">
                                                            <div className="button" id="btn_delete_color_fast_formula" onClick={this.delete_color_fast_formula}>
                                                                <div className="label">Eliminar color</div>
                                                            </div>
                                                      </div>
                                                </div> );
                                  }
                              });
                              React.render(<Formula_rapida/>,document.getElementById('buscador_formula'));
}
