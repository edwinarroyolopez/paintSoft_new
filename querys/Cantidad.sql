USE [paintSoft]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_F_Stock_producto]
	
	@pmtId_producto int,
	@pmtId_unidad int
	 
AS
BEGIN
	
	SET NOCOUNT ON;
	/* Identifica el maximo Id del producto a buscar */
			declare @maxId int;
				
			select @maxId = max(Id) from tblInventario where Id_producto=@pmtId_producto and Id_unidad_medida=@pmtId_unidad  and Estado=1;
			
			If(@maxId=0)
				BEGIN
					select @maxId as Stock;
				END
			ELSE
				BEGIN
					SELECT Stock from tblInventario 
					where Id_producto=@pmtId_producto and Id_unidad_medida=@pmtId_unidad and Id = @maxId;
			END

END