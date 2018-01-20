USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Factura_encabezado]    Script Date: 08/09/2016 02:00:05 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE spd_S_Inventario_Compra
	
	@pmtId_producto int,
	@pmtCompra int

AS
BEGIN
	
	SET NOCOUNT ON;

		DECLARE @Existe int;   
		SELECT  @Existe = count(*) from tblInventario where Id_producto = @pmtId_producto;

		IF(@Existe = 0)

			INSERT INTO dbo.tblInventario (Id_producto,Compra,Venta,Fecha,Fecha_modificacion)
						VALUES(@pmtId_producto,@pmtCompra,0, CONVERT (date, SYSDATETIME()), CONVERT (date, SYSDATETIME()))
		ELSE
			/* Tiene id_producto debo seleccionar el maximo id: */
			DECLARE @maxId int;
			SELECT @maxId = max(Id) from tblInventario where Id_producto = @pmtId_producto;

			DECLARE @Stock int;
			SELECT @Stock = Stock from tblInventario where Id = @maxId;

				IF (@Stock = NULL )
					/* Puedo actualizar compra */
					UPDATE tblInventario 
					SET Compra = @pmtCompra,
						Fecha_modificacion =  CONVERT (date, SYSDATETIME())
					WHERE Id = @maxId;
				ELSE 
					INSERT INTO dbo.tblInventario (Id_producto,Compra,Venta,Fecha,Fecha_modificacion)
						VALUES(@pmtId_producto,@pmtCompra,0, CONVERT (date, SYSDATETIME()), CONVERT (date, SYSDATETIME()))


END