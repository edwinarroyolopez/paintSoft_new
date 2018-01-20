/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

public class FacturaDetalleVO {

    /* Variables */
        private int id;
        private int id_encabezado;
        private int id_producto;
        private int id_unidad;
        private int cantidad;
        private float precio_unidad;
        private float descuento;
        private float iva;
        private float precio_venta;
        private float margen_ganancia;
        private boolean estado;
 
        /* Parámetros de Venta */
        private int tipo;
        private int id_fraccion;
        private float restante;
        private int resta_inventario;
        
/* Factura detalle de Compra */        
public FacturaDetalleVO(int id, int id_encabezado, int id_producto, int id_unidad, int cantidad, float precio_unidad, float descuento, float iva, float precio_venta, float margen_ganancia,  boolean estado){
    this.id = id;
    this.id_encabezado = id_encabezado;
    this.id_producto = id_producto; 
    this.id_unidad = id_unidad;
    this.cantidad = cantidad;
    this.precio_unidad = precio_unidad;
    this.descuento = descuento;
    this.iva = iva;
    this.precio_venta = precio_venta;
    this.margen_ganancia = margen_ganancia;
    this.estado = estado;
}

/* Factura detalle de Venta */        
public FacturaDetalleVO(int id, int id_encabezado, int id_producto, int id_unidad,int tipo,int id_fraccion ,int cantidad, float precio_unidad,
        float descuento, float iva,  boolean estado, float restante, int resta_inventario){
    this.id = id;
    this.id_encabezado = id_encabezado;
    this.id_producto = id_producto; 
    this.id_unidad = id_unidad;
    this.tipo = tipo;
    this.id_fraccion = id_fraccion;
    this.cantidad = cantidad;
    this.precio_unidad = precio_unidad;
    this.descuento = descuento;
    this.iva = iva;
    this.estado = estado;
    this.restante = restante;
    this.resta_inventario = resta_inventario;
}




/* Setters */
public void setId(int id){this.id = id;}
public void setId_encabezado(int id_encabezado){this.id_encabezado = id_encabezado;}
public void setId_producto(int id_producto){this.id_producto = id_producto;}
public void setId_unidad(int id_unidad){this.id_unidad = id_unidad;}
public void setCantidad(int cantidad){this.cantidad = cantidad;}
public void setPrecio_unidad(float precio_unidad){this.precio_unidad = precio_unidad;}
public void setDescuento(float descuento){this.descuento = descuento;}
public void setIva(float iva){this.iva = iva;}
public void setPrecio_venta(float precio_venta){this.precio_venta = precio_venta;}
public void setMargen_ganancia(float margen_ganancia){this.margen_ganancia = margen_ganancia;}
public void setEstado(boolean estado){this.estado = estado;}

/* Venta */
public void setTipo(int tipo){this.tipo=tipo;}
public void setId_fraccion(int id_fraccion){this.id_fraccion = id_fraccion;}
public void setRestante(float restante){this.restante = restante;}
public void setResta_inventario(int resta_inventario){this.resta_inventario = resta_inventario;}  



/* Getters */
public int getId(){return this.id;}
public int getId_encabezado(){return this.id_encabezado;}
public int getId_producto(){return this.id_producto;}
public int getId_unidad(){return this.id_unidad;}
public int getCantidad(){return this.cantidad;}
public float getPrecio_unidad(){return this.precio_unidad;}
public float getDescuento(){return this.descuento;}
public float getIva(){return this.iva;}
public float getPrecio_venta(){return this.precio_venta;}
public float getMargen_ganancia(){return this.margen_ganancia;}
public boolean getEstado(){return this.estado;}

/* Venta */
public int getTipo(){return this.tipo;}
public int getId_fraccion(){return this.id_fraccion;}
public float getRestante(){return this.restante;}
public int getResta_inventario(){return this.resta_inventario;}    
    
}
