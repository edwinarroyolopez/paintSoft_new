/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class MarcaDAO {


    public MarcaDAO(){}
    
    public String create_update_Marca(int pmtId_marca,String pmtDescripcion, int pmtEstado){
                String id_marca = new String();
                Conexion postgresql = new Conexion();

                try{
                    java.sql.Statement st = postgresql.getConexion().createStatement();
                    String sql = "select * FROM spd_create_update_marca("+pmtId_marca+",'"+pmtDescripcion+"',"+pmtEstado+");";
                    ResultSet r = st.executeQuery(sql);

                     while(r.next()){
                       id_marca = String.valueOf(r.getInt("out_result"));
                     }

                }catch(SQLException e){System.out.println(e.getMessage());}

                return id_marca;
    }/* ## Create update marca ##*/

    
      public String read_Marcas(){

            Conexion postgresql = new Conexion();
            JSONArray list_marcas = new JSONArray();/* Lista de marcas */

            try{
                       java.sql.Statement st = postgresql.getConexion().createStatement();
                       String sql = "SELECT * FROM tblmarca WHERE Estado<2 ORDER BY Id_marca DESC";
                       ResultSet r = st.executeQuery(sql);

                       while(r.next()){
                            /* Recibe marcas  */
                                JSONObject marca = new JSONObject();

                                marca.put("Id_marca",r.getInt("Id_marca"));
                                marca.put("Descripcion",r.getString("Descripcion"));
                                marca.put("Estado",r.getString("Estado"));
                                marca.put("Fecha_creacion",r.getString("Fecha_creacion"));

                                list_marcas.add(list_marcas.size(),marca);
                       }/* end while */

                       /* Close connection */
                            r.close();
                            st.close();
                            postgresql.getConexion().close();

            }catch(SQLException e){System.out.println(e.getMessage());}
            
            System.out.println(list_marcas.toJSONString());
            
         return list_marcas.toJSONString();

      }/* ## read marcas ##*/

    
      
      public String remove_Marca(int pmtId_marca){
      
          return "";
      }

}
