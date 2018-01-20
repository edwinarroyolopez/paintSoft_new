
CREATE FUNCTION spd_create_update_fraccion(
        pmt_id_presentacion integer,
        pmt_fraccion character varying,
        pmt_proporcion real,
        OUT out_result integer)
        RETURNS integer
    LANGUAGE plpgsql
    AS $$

DECLARE
    BEGIN
                        	-- Create new fraccion
                				  INSERT INTO public.tblfraccion(id_presentacion, descripcion, proporcion)
                				  VALUES (pmt_id_presentacion, pmt_fraccion, pmt_proporcion);

                          SELECT max(id_fraccion) from tblfraccion INTO out_result;
    END;

$$;/* End spd */





    public String create_update_Cliente(int pmtId_cliente, String pmtNombre, String pmtDocumento,
                                         String pmtTelefono, String pmtDireccion,String  pmtCiudad,
                                         String pmtEmail, int pmtEstado){
                String id_cliente = new String();
                Conexion postgresql = new Conexion();

                try{
                           java.sql.Statement st = postgresql.getConexion().createStatement();

                           String sql = "select * FROM spd_create_update_customer("+pmtId_cliente+",'"+pmtNombre+"','"+pmtDocumento+"','"+pmtTelefono+"','"+pmtDireccion+"','"+pmtCiudad+"','"+pmtEmail+"',"+pmtEstado+");";

                           ResultSet r = st.executeQuery(sql);

                            while(r.next()){
                                id_customer = String.valueOf(r.getInt("out_result"));
                            }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_cliente;
    }

     public String create_update_Cliente_sql(int pmtId_cliente, String pmtNombre, String pmtDocumento,
                                         String pmtTelefono, String pmtDireccion,String  pmtCiudad,
                                         String pmtEmail, int pmtEstado){

            Conexion sql = new Conexion();
            String id_cliente = new String();

       try {

                PreparedStatement stm = sql.getConexion().prepareStatement("{call dbo.spd_create_update_Cliente(?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros de procedimiento */
                       stm.setInt(1,   pmtId_cliente);
                       stm.setString(2, pmtNombre);
                       stm.setString(3, pmtDocumento);
                       stm.setString(4, pmtTelefono);
                       stm.setString(5, pmtDireccion);
                       stm.setString(6, pmtCiudad);
                       stm.setString(7, pmtEmail);
                       stm.setInt(8, pmtEstado);

                ResultSet  r = stm.executeQuery();

                 while (r.next()) {
                    id_cliente = r.getString(1);
                }
                    stm.close();
                    sql.getConexion().close();

            } catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
                  return id_cliente;
    }/* create update cliente */
