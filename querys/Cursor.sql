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
      select @Cantidad as Cantidad , @Id_producto as Id_p;
	  

	   FETCH NEXT FROM FDetalle_cursor  
	   INTO @Cantidad, @Id_producto;

   END;  
CLOSE FDetalle_cursor;  
DEALLOCATE FDetalle_cursor;  
GO  