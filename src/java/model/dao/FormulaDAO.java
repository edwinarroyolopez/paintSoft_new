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
public class FormulaDAO {
    
    public FormulaDAO(){}
    
    
    
    public String insert_Formula(String pmtDescripcion,int pmtPeso, String pmtMedida){
        
        String max_Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Formula(?,?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setString(1, pmtDescripcion);
            cstmt.setInt(2, pmtPeso);
            cstmt.setString(3, pmtMedida);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                max_Id = String.valueOf(r.getInt("Id"));
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
        return max_Id;
    }
    public String insert_Formula_color(int pmtId_producto,int pmtPeso){        
        String max_Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Formula_color(?,?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            
            cstmt.setInt(1, pmtId_producto);
            cstmt.setInt(2, pmtPeso);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                max_Id = String.valueOf(r.getInt("Id"));
            }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
            return max_Id;
        }
    
    
    /* Obtener poliuretanos - bicapas */
    
    public String get_Poliuretano_Bicapa(){
        
        String json_pol_bic = new String();
        Conexion sql = new Conexion();
        
        try{
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_poliuretano_bicapa()}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            /* Sin parámetros */
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                    
                    
                    if(r.isFirst()){/* Concatenación de estructura json */
                        json_pol_bic = "[";
                    }
                
                    
                    json_pol_bic = json_pol_bic +"{" +"\"Id\":"+r.getInt("Id")+
                                                      ",\"Id_grupo\":"+r.getInt("Id_grupo")+
                                                      ",\"Id_marca\":"+r.getInt("Id_marca")+
                                                      ",\"Codigo\":\""+r.getString("Codigo")+
                                                      "\",\"Descripcion\":\""+r.getString("Descripcion")+"\""+"}";
                
                    
                    if(!r.isLast()){
                        json_pol_bic = json_pol_bic +",";/* Existe un item más*/
                    }
            }
              json_pol_bic = json_pol_bic +"]"; /* Cierre de estructura json */
        
        }catch(SQLException e){System.out.println(e.getMessage());}
        
    
        return json_pol_bic;
    } 
    
    public String read_formulas(int pmt_control){
    
        String json_formulas = new String();
        Conexion sql = new Conexion();
        
        
        
        try{
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_F_Formulas(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* into Parameter  */
                cstmt.setInt(1, pmt_control);
            
                ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                
                    /* Estructura json */
                    if(r.isFirst()){
                        json_formulas = "[";
                    }

                        json_formulas = json_formulas + "{" +"\"Id\":"+r.getInt("Id")+
                                                         ",\"Descripcion\":\""+r.getString("Descripcion")+
                                                         "\",\"Peso\":"+r.getInt("Peso")+
                                                         ",\"Medida\":\""+r.getString("Medida")+"\""+"}"; 

                    if(!r.isLast()){/* No es el último item ---> Se le da continuidad a la lista */
                        json_formulas = json_formulas + ",";
                    }
            }
                    json_formulas = json_formulas + "]";/* Cierre de estructura json */
            
        }catch(SQLException e){System.out.println(e.getMessage());}
         
    
        return json_formulas;
    }
    
    public String getFormula_by_id_maquina(int pmtId_maquina){
        
        String json_formulas = new String();
        Conexion sql = new Conexion();
        
        try{
            PreparedStatement pstmt = sql.getConexion().prepareStatement("{ call spd_f_Formula_by_maquina(?)}",
                                      ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros */
            pstmt.setInt(1, pmtId_maquina);
            
            ResultSet r = pstmt.executeQuery();
            
            while(r.next()){
            
               /* Estructura json */
                    if(r.isFirst()){
                        json_formulas = "[";
                    }

                        json_formulas = json_formulas + "{" +"\"Id\":"+r.getInt("Id")+
                                                         ",\"Descripcion\":\""+r.getString("Descripcion")+
                                                         "\",\"Peso\":"+r.getInt("Peso")+
                                                         ",\"Medida\":\""+r.getString("Medida")+"\""+"}"; 

                    if(!r.isLast()){/* No es el último item ---> Se le da continuidad a la lista */
                        json_formulas = json_formulas + ",";
                    }
            }
                    json_formulas = json_formulas + "]";/* Cierre de estructura json */
            
            
        
        }catch(SQLException e){System.out.println(e.getMessage());}
    
        return json_formulas;
    }
    
    
    
    public String getColores(int pmtId_formula){
    
        String json_color = new String();
        Conexion sql = new Conexion();
        
        try{
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_F_Colores(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            /* Parámetros IN */
            cstmt.setInt(1, pmtId_formula);
            
            ResultSet r = cstmt.executeQuery();
            
            while(r.next()){
                
                    /* Estructura json */
                    if(r.isFirst()){
                        json_color = "[";
                    }

                        json_color = json_color + "{" +"\"Id\":"+r.getInt("Id")+
                                                         ",\"Descripcion\":\""+r.getString("Descripcion")+
                                                         "\",\"Peso\":"+r.getInt("Peso")+
                                                         ",\"Id_producto\":\""+r.getString("Id_producto")+"\""+"}"; 

                    if(!r.isLast()){/* No es el último item ---> Se le da continuidad a la lista */
                        json_color = json_color + ",";
                    }
            }
                    json_color = json_color + "]";/* Cierre de estructura json */
            
        }catch(SQLException e){System.out.println(e.getMessage());}
         
    
        return json_color;
    }
    public String getColores_venta(int pmtId_formula) {

        String json_color = new String();
        Conexion sql = new Conexion();

        try {
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_F_Colores_venta(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            /* Parámetros IN */
            cstmt.setInt(1, pmtId_formula);

            ResultSet r = cstmt.executeQuery();

            while (r.next()) {

                /* Estructura json */
                if (r.isFirst()) {
                    json_color = "[";
                }

                json_color = json_color + "{" + "\"Id_color\":" + r.getInt("Id_color")
                        + ",\"Descripcion\":\"" + r.getString("Descripcion")
                        + "\",\"Peso\":" + r.getInt("Peso")
                        + ",\"Inventario\":"+r.getInt("Inventario")
                        + ",\"Peso_medida\":" + r.getInt("Peso_medida")
                        + ",\"Id_um_inventario\":" + r.getInt("Id_um_inventario")
                        + ",\"Cantidad_um_inventario\":" + r.getInt("Cantidad_um_inventario")
                        + ",\"Id_producto\":" + r.getInt("Id_producto") 
                        + ",\"Precio_gramo\":"+r.getInt("Precio_gramo")
                        + ",\"Empezado\":" + r.getInt("Empezado")
                        + ",\"Id_um_empezado\":" + r.getInt("Id_um_empezado")
                        + ",\"Cantidad_um_empezado\":" + r.getInt("Cantidad_um_empezado")+ "}"; 

                if (!r.isLast()) {/* No es el último item ---> Se le da continuidad a la lista */
                    json_color = json_color + ",";
                }
            }
            json_color = json_color + "]";/* Cierre de estructura json */

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return json_color;
    }

    public String read_info_color_fast_formula(int pmt_id_producto){
        
                String json_info_color = new String(); 
                 Conexion sql = new Conexion();

        try {
            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_read_info_color_fast_formula(?)}",
                    ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

                        /* Parámetros IN */
                        cstmt.setInt(1, pmt_id_producto);

                        ResultSet r = cstmt.executeQuery();

                        while (r.next()) {
                            json_info_color =  "{" + "\"Id_unidad_medida\":" + r.getInt("Id_unidad_medida")
                                    + ",\"Peso_medida\":" + r.getInt("Peso_medida")
                                    + ",\"Precio_gramo\":"+r.getInt("Precio_gramo")
                                    + ",\"Id_inventario\":"+r.getInt("Id_inventario")
                                    + ",\"Id_um_inventario\":" + r.getInt("Id_um_inventario")
                                    + ",\"Cantidad_um_inventario\":" + r.getInt("Cantidad_um_inventario")
                                    + ",\"Id_empezado\":" + r.getInt("Id_empezado")
                                    + ",\"Id_um_empezado\":" + r.getInt("Id_um_empezado")
                                    + ",\"Cantidad_empezado\":" + r.getInt("Cantidad_empezado")+ "}"; 
                           
                        }

                    } catch (SQLException e) {
                        System.out.println(e.getMessage());
                    }

                return json_info_color;
    }
    
     public String setRelacion_maquina_formula(int pmtId_formula, int pmtId_maquina){
        
        String id_relacion = new String();
        Conexion sql = new Conexion();
        
        try{
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_S_relacion_maquina_formula(?,?)}");
                /* Parámetros */
                cstmt.setInt(1, pmtId_formula);
                cstmt.setInt(2, pmtId_maquina);
                
                ResultSet r = cstmt.executeQuery();
                
                while(r.next()){
                    id_relacion = r.getString("Id");
                }
        
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        return id_relacion;
        
    }
     
     public String Eliminar_formula(int pmtId_formula) {
     
         String rs = new String();
            Conexion sql = new Conexion();

                try{
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_D_Eliminar_formula(?)}");
                        /* Parámetros */
                        cstmt.setInt(1, pmtId_formula);

                        ResultSet r = cstmt.executeQuery();

                        while(r.next()){
                            rs = r.getString("Id");
                        }

                }catch(SQLException e){System.out.println(e.getMessage());}
         
         return rs;
     }
     
     public String getFormula(int pmtId_formula) {
     
            String formula = new String();
            Conexion sql = new Conexion();

                try{
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("{call spd_F_formula(?)}");
                        /* Parámetros */
                        cstmt.setInt(1, pmtId_formula);

                        ResultSet r = cstmt.executeQuery();

                        while(r.next()){
                            formula = r.getString("Formula");
                        }

                }catch(SQLException e){System.out.println(e.getMessage());}
         
         return formula;
     }
    
}
