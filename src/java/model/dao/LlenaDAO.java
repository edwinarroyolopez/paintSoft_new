/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;


import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import static com.itextpdf.text.pdf.PdfName.URI;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import java.awt.Desktop;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map.Entry;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Zero
 */
public class LlenaDAO {
    
    public LlenaDAO(){
        
    }
    
    public String Setter(String ingresos, String egresos){
            
        
        try {
            
            Desktop.getDesktop().browse(new URI("../"));
            
        } catch (URISyntaxException e) {
            System.out.println(e);
        } catch(IOException ie){
            System.out.println("Error");
        }
        
    
        return "";
    }
}
