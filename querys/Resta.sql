USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Factura_ultimoid]    Script Date: 09/09/2016 11:02:08 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_F_Factura_ultimoid]

AS
BEGIN
SET NOCOUNT ON;


/* Eliminar Ids de detalles de facturas que no se guardaron: O retomarlas  */
			DECLARE @Cantidad int, @Id_producto int;  

			DECLARE FDetalle_cursor CURSOR FOR  
			SELECT Cantidad, Id_producto   
			FROM tblFacturaDetalle
			WHERE Estado = 0;  
			OPEN FDetalle_cursor;

			FETCH NEXT FROM FDetalle_cursor   
			INTO @Cantidad, @Id_producto  
 

			WHILE @@FETCH_STATUS = 0  
			   BEGIN  
				/* Se resta la cantidad agregada a inventario, porque la factura no se guardó */
				declare @pmtCompra int;
				select @pmtCompra = Compra from tblInventario where Estado = 0 and Id_producto = @Id_producto;
				
				set @pmtCompra = @pmtCompra - @Cantidad;

				/* Se actualiza*/
				  UPDATE tblInventario 
						SET Compra = @pmtCompra,
							Fecha_modificacion =  CONVERT (date, SYSDATETIME())
						WHERE Estado = 0 and Id_producto = @Id_producto;

				  select @Cantidad as Cantidad , @Id_producto as Id_p;
				  
				
				/* Elimino el item agregado */
				delete  from dbo.tblFacturaDetalle where Id_producto = @Id_producto;
						
				   FETCH NEXT FROM FDetalle_cursor  
				   INTO @Cantidad, @Id_producto;

			   END;  
			CLOSE FDetalle_cursor;  
			DEALLOCATE FDetalle_cursor;  





		/* Posibole error porque cuando se eliminan los detalles de factura los id's cambian */
	select max(fd.Id) + 1 as Id_detalle, max(fe.Id) + 1 as Id_encabezado from tblFacturaDetalle as fd, tblFacturaEncabezado as fe;

END


	