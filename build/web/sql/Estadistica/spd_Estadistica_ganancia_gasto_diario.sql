SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE spd_Estadistica_ganancia_gasto_diario
AS
BEGIN
	SET NOCOUNT ON;


				declare @Ganancia int, @Gasto_diario int, @Gasto_mensual int, @Gastos int;

				/* Ganancia diaria */
				select @Ganancia = sum(Ganancia) 
				from tblGanancia 
				where Fecha = CONVERT(date, SYSDATETIME());

				/* Gasto diario */
				select @Gasto_diario = sum(Valor) 
				from tblGastos 
				where Fecha = CONVERT(date, SYSDATETIME()) and Tipo=0;

				select @Gasto_mensual = sum(Valor) from tblGastos 
				where RTRIM(LTRIM(CONVERT(char(2),DATEPART(month,Fecha))))+'/'+CONVERT(char(4),DATEPART(Year,Fecha))  = RTRIM(LTRIM(CONVERT(char(2),DATEPART(month,GETDATE()))))+'/'+CONVERT(char(4),DATEPART(Year,GETDATE())) and Tipo = 1;
				
				set @Gasto_mensual = @Gasto_mensual/26;

				set @Gastos = @Gasto_diario + @Gasto_mensual;


				select @Ganancia as Ganancia, @Gastos as Gasto;


END
GO
