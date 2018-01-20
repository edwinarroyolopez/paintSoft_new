/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

/**
 *
 * @author Zero
 */
public class ProveedorVO {
    
    private int id;
    private String razon_social;
    private String nit;
    private String contacto;
    private String ciudad;
    private String direccion;
    private String telefono_1;
    private String telefono_2;
    private String email;
    private String banco;
    private String tipo_cuenta;
    private String numero_cuenta;
    private String titular_cuenta;

    public ProveedorVO(){}
    
    public ProveedorVO(int id, String razon_social, String nit, String contacto, String ciudad, String direccion, String telefono_1, String telefono_2, String email, String banco, String tipo_cuenta, String numero_cuenta, String titular_cuenta) {
        this.id = id;
        this.razon_social = razon_social;
        this.nit = nit;
        this.contacto = contacto;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.telefono_1 = telefono_1;
        this.telefono_2 = telefono_2;
        this.email = email;
        this.banco = banco;
        this.tipo_cuenta = tipo_cuenta;
        this.numero_cuenta = numero_cuenta;
        this.titular_cuenta = titular_cuenta;
    }
    
    
    
    
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getRazon_social() {
        return razon_social;
    }

    public void setRazon_social(String razon_social) {
        this.razon_social = razon_social;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String dirección) {
        this.direccion = dirección;
    }

    public String getTelefono_1() {
        return telefono_1;
    }

    public void setTelefono_1(String telefono_1) {
        this.telefono_1 = telefono_1;
    }

    public String getTelefono_2() {
        return telefono_2;
    }

    public void setTelefono_2(String telefono_2) {
        this.telefono_2 = telefono_2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBanco() {
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getTipo_cuenta() {
        return tipo_cuenta;
    }

    public void setTipo_cuenta(String tipo_cuenta) {
        this.tipo_cuenta = tipo_cuenta;
    }

    public String getNumero_cuenta() {
        return numero_cuenta;
    }

    public void setNumero_cuenta(String numero_cuenta) {
        this.numero_cuenta = numero_cuenta;
    }

    public String getTitular_cuenta() {
        return titular_cuenta;
    }

    public void setTitular_cuenta(String titular_cuenta) {
        this.titular_cuenta = titular_cuenta;
    }
    
}
