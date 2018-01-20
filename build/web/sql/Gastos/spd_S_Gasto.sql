SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE spd_S_Gasto
	/* Parámetros */
	@pmtDescripcion varchar(100),
	@pmtTipo int,
	@pmtValor int

AS
BEGIN
	SET NOCOUNT ON;

		insert into tblGastos (Descripcion,Tipo,Valor,Fecha) values (@pmtDescripcion,@pmtTipo,@pmtValor,CONVERT (date, SYSDATETIME()));
		
		select max(Id) as Id from tblGastos;
END
GO
