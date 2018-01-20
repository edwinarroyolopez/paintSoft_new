
/* Eliminar tabla factura encabezado */
drop table tblFacturaEncabezado;

/* Eliminar procedimiento spd_ factura encabezado */
drop procedure spd_S_Factura_encabezado;

/*
	DBCC CHECKIDENT(tblFacturaEncabezado,RESEED,0)
*/


delete table tblFacturaDetalle;

DBCC CHECKIDENT(tblFacturaDetalle,RESEED,0)
