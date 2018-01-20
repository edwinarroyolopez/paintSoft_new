USE [paintSoft]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[spd_F_Abono]
	/* Parámtros */
		@pmtId_factura int
AS
BEGIN
	SET NOCOUNT ON;

		select * from tblAbono_venta where Id_encabezado_venta = @pmtId_factura order by Id asc;

END
