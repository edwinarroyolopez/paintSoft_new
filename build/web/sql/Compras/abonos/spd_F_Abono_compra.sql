USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Abono]    Script Date: 08/06/2017 10:41:10 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spd_F_Abono_compra]
	/* Parámtros */
		@pmtId_factura int
AS
BEGIN
	SET NOCOUNT ON;

		select * from tblAbono_compra where Id_encabezado_compra = @pmtId_factura order by Id asc;

END
