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

/**
 *
 * @author Zero
 */
public class EstadisticaDAO {
    
    
    public EstadisticaDAO(){}
    
    /*
        spd_Estadistica_ganancia_gasto_diario
    */
    
    public String getGasto_Ganancia_diaria(){
    
            String json_gasto_ganancia = new String();

             Conexion sql = new Conexion();

                 try{

                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Estadistica_ganancia_gasto_diario()}",
                                               ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                             /* Parámetros IN */

                         ResultSet r = cstmt.executeQuery();

                         while(r.next()){

                                json_gasto_ganancia =  "[{\"Ganancia\":"+r.getString("Ganancia")+
                                                       ",\"Gasto\":"+r.getString("Gasto")+"}]";
                         }

                 }catch(SQLException e){System.out.println(e.getMessage());}


            return json_gasto_ganancia;
    }
    
}
