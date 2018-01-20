SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_Ventas_realizadas
	/* Par�metros */
	@pmtFecha date
AS
BEGIN
	SET NOCOUNT ON;

		select fv.Numero as Factura, c.Nombre as Cliente, 
			case fv.Forma_pago
				when 0 then 'Contado'
				when 1 then '8 d�as'
				when 2 then '15 d�as'
				when 3 then '30 d�as'
			end as Forma_pago
	, fv.Valor 
	from tblFacturaEncabezadoVenta as fv, tblCliente as c
	where fv.Id_cliente = c.Id and Fecha = @pmtFecha order by fv.Id desc;


END
GO
