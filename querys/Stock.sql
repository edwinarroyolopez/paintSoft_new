USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Stock_producto]    Script Date: 25/11/2016 07:01:55 p.m. ******/
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
					SELECT i.Stock from tblInventario as i 
					where i.Id_producto=@pmtId_producto and i.Id_unidad_medida=@pmtId_unidad and i.Id = @maxId;


					SELECT DISTINCT i.Stock as Stock, um.Id as Id_unidad_medida, um.Valor as Unidad_medida
					FROM tblInventario as i, tblUnidadMedida as um
					WHERE i.Id_unidad_medida=um.Id and i.Id_producto=@pmtId_producto ;

			END

END