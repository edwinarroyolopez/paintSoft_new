
select max(Id) from tblFacturaDetalle;


 DBCC CHECKIDENT (tblFacturaDetalle, RESEED,1145) 