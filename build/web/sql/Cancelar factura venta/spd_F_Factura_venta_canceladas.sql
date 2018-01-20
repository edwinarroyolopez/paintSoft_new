SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE spd_F_Factura_venta_canceladas
AS
BEGIN
	SET NOCOUNT ON;
		

		select fvc.Id,fvc.Id_encabezado_venta,fvc.Numero as Factura,
			   C.Id as Id_cliente,c.Nombre as Cliente,c.Documento,
			   fvc.Forma_pago,fvc.Valor
		from tblFacturaCanceladaVenta as fvc, tblCliente as c 
		where c.Id = fvc.Id_cliente;

END
GO
