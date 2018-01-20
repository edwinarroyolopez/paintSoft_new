
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE spd_F_Gastos_hoy
	/* Sin par�metros */
AS
BEGIN
	SET NOCOUNT ON;

    
		
		/* Gastos diarios */
			select distinct Id, Descripcion,
							CASE
								WHEN Tipo = 0 THEN 'Diario'
								WHEN Tipo = 1 THEN 'Mensual'
							END as Tipo
							, Valor, Fecha
			from tblGastos 
			where Fecha = CONVERT (date, SYSDATETIME()) and Tipo = 0
			UNION 
		/* Gastos mensuales */
			select distinct Id, Descripcion,
							CASE
								WHEN Tipo = 0 THEN 'Diario'
								WHEN Tipo = 1 THEN 'Mensual'
							END as Tipo
							, Valor, Fecha
			from tblGastos 
			where RTRIM(LTRIM(CONVERT(char(2),DATEPART(month,Fecha))))+'/'+CONVERT(char(4),DATEPART(Year,Fecha))  = RTRIM(LTRIM(CONVERT(char(2),DATEPART(month,GETDATE()))))+'/'+CONVERT(char(4),DATEPART(Year,GETDATE())) and Tipo = 1;
				

END
GO
