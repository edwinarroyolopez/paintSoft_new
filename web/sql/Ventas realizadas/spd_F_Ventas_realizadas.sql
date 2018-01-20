SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_Ventas_realizadas
	/* Parámetros */
	@pmtFecha date
AS
BEGIN
	SET NOCOUNT ON;

		select fv.Numero as Factura, c.Nombre as Cliente, 
			case fv.Forma_pago
				when 0 then 'Contado'
				when 1 then '8 días'
				when 2 then '15 días'
				when 3 then '30 días'
			end as Forma_pago
	, fv.Valor 
	from tblFacturaEncabezadoVenta as fv, tblCliente as c
	where fv.Id_cliente = c.Id and Fecha = @pmtFecha order by fv.Id desc;


END
GO
