package model;

import java.sql.Connection;
import java.sql.SQLException;


public class Conexion {
    
    
    private Connection sqlConexion;
    public Conexion() {
        
            try
               {
                Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");/* Driver */
                String url ="jdbc:sqlserver://localhost:1433;databaseName=paintSoft;selectMethod=cursor;";
                this.sqlConexion = java.sql.DriverManager.getConnection(url, "sa","abcd.1234");
                    
                         if (this.sqlConexion != null) {
                             System.out.println("Conexión correcta.");
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
    public Connection getConexion(){return this.sqlConexion;}
    
    
    
    
}
