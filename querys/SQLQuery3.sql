USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Factura_ultimoid]    Script Date: 19/09/2016 09:58:02 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_F_Factura_ultimoid]

AS
BEGIN
SET NOCOUNT ON;


/* Eliminar Ids de detalles de facturas que no se guardaron: O retomarlas  */
			DECLARE @Cantidad int, @Id_producto int, @Id_unidad_medida int;  

			DECLARE FDetalle_cursor CURSOR FOR  
			SELECT Cantidad, Id_producto, Id_unidad   
			FROM tblFacturaDetalle
			WHERE Estado = 0;  
			OPEN FDetalle_cursor;

			FETCH NEXT FROM FDetalle_cursor   
			INTO @Cantidad, @Id_producto, @Id_unidad_medida ;
 

			WHILE @@FETCH_STATUS = 0  
			   BEGIN  
				/* Se resta la cantidad agregada a inventario, porque la factura no se guardó */
				declare @pmtCompra int;
				select @pmtCompra = Compra from tblInventario where Estado = 0 and Id_producto = @Id_producto and Id_unidad_medida = @Id_unidad_medida;
				
				set @pmtCompra = @pmtCompra - @Cantidad;

				/* Se actualiza el Id producto actual */
				  UPDATE tblInventario 
						SET Compra = @pmtCompra,
							Fecha_modificacion =  CONVERT (date, SYSDATETIME())
						WHERE Estado = 0 and Id_producto = @Id_producto and Id_unidad_medida = @Id_unidad_medida;;

				
				/* Elimino el item agregado */
				delete  from dbo.tblFacturaDetalle where Id_producto = @Id_producto and Id_unidad = @Id_unidad_medida;
						
				   FETCH NEXT FROM FDetalle_cursor  
				   INTO @Cantidad, @Id_producto, @Id_unidad_medida ;

			   END;  
			CLOSE FDetalle_cursor;  
			DEALLOCATE FDetalle_cursor;  

			/* Controlar si el detalle de factura es nulo */
			declare @countDetalle int;
			select @countDetalle = count(*) from tblFacturaDetalle; 
			
			If(@countDetalle=0)/* Primer inicio: No existe Encabezado ni Detalle */
				BEGIN
					/* Se deben resetear los contadores de las tablas: Factura detalle, Factura encabezado*/
					DBCC CHECKIDENT (tblFacturaDetalle, RESEED,0)
					DBCC CHECKIDENT (tblFacturaEncabezado, RESEED,0)

					select  1 as Id_detalle,1 as Id_encabezado;
				END
				ELSE /* Debe existir por lo menos una factura */
				BEGIN
						/* Corrije error  cuando se eliminan los detalles de factura los id's cambian */
						declare @maxId int;
						select @maxId = max(Id) from tblFacturaDetalle;
						DBCC CHECKIDENT (tblFacturaEncabezado, RESEED,@maxId);/* Conserva continuidad detalle */

						select max(fd.Id) + 1 as Id_detalle, max(fe.Id) + 1 as Id_encabezado from tblFacturaDetalle as fd, tblFacturaEncabezado as fe;

				END	

	
END


	