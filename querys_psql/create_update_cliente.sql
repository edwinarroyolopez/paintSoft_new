
CREATE FUNCTION spd_create_update_customer(
        pmt_id_cliente integer,
        pmt_nombre character varying,
        pmt_documento character varying,
        pmt_telefono character varying,
        pmt_direccion character varying,
        pmt_ciudad character varying,
        pmt_email character varying,
        pmt_estado integer,
        OUT out_result integer)
        RETURNS integer
    LANGUAGE plpgsql
    AS $$

DECLARE
		v_repeat_documento integer;
        v_result_user integer;
    BEGIN

            /* Create or Update */
            IF pmt_id_customer > 0 THEN
            	-- Update customer
                                UPDATE tblcliente
                                SET nombre = pmt_nombre,
                                    documento = pmt_documento,
                                    telefono = pmt_telefono,
                                    direccion = pmt_direccion,
                                    ciudad = pmt_ciudad,
                                    email = pmt_email,
                                    estado = pmt_estado,
                                    fecha_modificacion = current_date
                                 WHERE id_cliente = pmt_id_cliente;

                            -- Select this id_customer
                                SELECT pmt_id_cliente INTO out_result;
            ELSE

                        -- Verify that the nit is not repeated
                        select count(*) from tblcliente where
                        documento = pmt_documento into v_repeat_documento;

                        IF v_repeat_documento > 0 THEN /* Repeat nit */
							-- Error is repeat
                                out_result = -1;
                        ELSE
                        	-- Create new customer
                				  INSERT INTO public.tblcliente(nombre, documento, telefono, direccion, ciudad, email,estado, fecha_creacion)
                				  VALUES (pmt_nombre,pmt_documento,pmt_telefono,pmt_direccion,pmt_ciudad,pmt_email,pmt_estado,current_date);


                        END IF;/* repeat identification number */

            END IF; /* pmt_id_customer > 0 */



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
