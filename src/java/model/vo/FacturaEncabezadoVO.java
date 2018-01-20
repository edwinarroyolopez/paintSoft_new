
package model.vo;


public class FacturaEncabezadoVO {
    
    private int id;
    private String numero;
    private int id_proveedor;
    private int id_cliente;
    private int forma_pago;
    private int anticipo;
    private String vencimiento;
    private int saldo;
    private float descuento;
    private float iva;
    private int total;
    private String fecha;
    private boolean estado;

    /* Constructor: --->>> COMPRA */
    public FacturaEncabezadoVO(int id, String numero, int id_proveedor, int forma_pago, int anticipo, String vencimiento, int saldo, float descuento, float iva, int total, String fecha, boolean estado) {
        this.id = id;
        this.numero = numero;
        this.id_proveedor = id_proveedor;
        this.forma_pago = forma_pago;
        this.anticipo = anticipo;
        this.vencimiento = vencimiento;
        this.saldo = saldo;
        this.descuento = descuento;
        this.iva = iva;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }
    
     /* Constructor: --->>> VENTA */
public FacturaEncabezadoVO(int id , String factura,int id_cliente, int forma_pago,int anticipo ,String vencimiento, int saldo, float descuento, float iva, int total, String fecha){
    
        this.id = id;
        this.numero = factura;
        this.id_cliente = id_cliente;
        this.forma_pago = forma_pago;
        this.anticipo = anticipo;
        this.vencimiento = vencimiento;
        this.saldo = saldo;
        this.descuento = descuento;
        this.iva = iva;
        this.total = total;
        this.fecha = fecha;
}



    public FacturaEncabezadoVO(){}
    
    /* Setters */
    public void setId(int id){this.id = id;}
    public void setNumero(String numero){this.numero = numero;}
    public void setId_proveedor(int id_proveedor){this.id_proveedor = id_proveedor;}
    public void setId_cliente(int id_cliente){this.id_cliente = id_cliente;}
    public void setForma_pago(int forma_pago){this.forma_pago = forma_pago;}
    public void setAnticipo(int anticipo){this.anticipo = anticipo;}
    public void setVencimiento(String vencimiento){this.vencimiento = vencimiento;}
    public void setSaldo(int saldo){this.saldo = saldo;}
    public void setDescuento(float descuento){this.descuento = descuento;}
    public void setIva(float iva){this.iva = iva;}
    public void setTotal(int total){this.total = total;}
    public void setFecha(String fecha){this.fecha = fecha;}
    public void setEstado(boolean estado){this.estado = estado;}
    
    /* Getters */
    public int getId(){return this.id;}
    public String getNumero(){return this.numero;}
    public int getId_proveedor(){return this.id_proveedor;}
    public int getId_cliente(){return this.id_cliente;}
    public int getForma_pago(){return this.forma_pago;}
    public float getAnticipo(){return this.anticipo;}
    public String getVecimiento(){return this.vencimiento;}
    public float getSaldo(){return this.saldo;}
    public float getDescuento(){return this.descuento;}
    public float getIva(){return this.iva;}
    public int getTotal(){return this.total;}
    public String getFecha(){return this.fecha;}
    public boolean getEstado(){return this.estado;}
    
}
