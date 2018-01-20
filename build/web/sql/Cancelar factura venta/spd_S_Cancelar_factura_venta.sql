USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Cancelar_factura_venta]    Script Date: 11/06/2017 02:20:09 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_S_Cancelar_factura_venta]
	/* Parámetro */
	@pmtId_factura_venta int
AS
BEGIN
	SET NOCOUNT ON;

		/* Variables */
			 declare @id_encabezado_venta int, 
					 @numero varchar(50),
					 @id_cliente int,
					 @forma_pago int,
					 @fecha date,
					 @saldo int,
					 @descuento float,
					 @iva float,
					 @valor int,
					 @estado bit
		/* Obtengo el encabezado de la factura */
			select @id_encabezado_venta=Id,@numero=Numero,@id_cliente=Id_cliente,@forma_pago=Forma_pago,
				   @fecha=Fecha,@saldo=Saldo,@descuento=Descuento,@iva=Iva,@valor=Valor,@estado=Estado 
			from tblFacturaEncabezadoVenta where Id = @pmtId_factura_venta;

		/* Elimino el registro de la tabla */
			delete from tblFacturaEncabezadoVenta where Id = @pmtId_factura_venta;
		
		/* Inserto en la tabla factura cancelada */
			insert into tblFacturaCanceladaVenta(Id_encabezado_venta,Numero,Id_cliente,Forma_pago,Fecha,Saldo,Descuento,Iva,Valor,Estado)
			values(@id_encabezado_venta,@numero,@id_cliente,@forma_pago,@fecha,@saldo,@descuento,@iva,@valor,@estado);
	
		/* Cambiar de "posicion" el detalle de la factura cancelada */
			update tblFacturaDetalleVenta set Posicion = 1 
			where Id_encabezado_venta = @pmtId_factura_venta; 

		/* Aumentar Stock en inventario de cada producto */


		/* Restar valor de ventas --- > Ganancia */

				/* Retorna ultimo id */
			select max(Id) as Id from tblFacturaCanceladaVenta;
END
