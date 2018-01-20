package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;


public class Conexion {
    
    
    private Connection postgreSQLConexion;
    public Conexion() {
        
                
        
            try
               {
                   // String url ="jdbc:postgresql://192.168.1.20:8485/db_innova_semillas";
                     String url ="jdbc:postgresql://localhost:5432/paintSoft";
                    String user ="postgres";
                    String password ="abcd.1234";
                    Class.forName("org.postgresql.Driver");/* Driver */

                    this.postgreSQLConexion = DriverManager.getConnection(url, user,password);
                   
                     if (this.postgreSQLConexion != null) {
                             System.out.println("Conexión a postgres correcta.");
                         }
                
                }
             
            catch(SQLException e){
               System.out.println(e);
            }catch(ClassNotFoundException e){
               System.out.println(e);
            }catch(Exception e){
               System.out.println(e);
            }
                    
    }
    public Connection getConexion(){return this.postgreSQLConexion;}
    
    
    
    
}
