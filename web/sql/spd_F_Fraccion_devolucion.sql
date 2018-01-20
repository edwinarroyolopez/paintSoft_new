
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_fraccion_devolucion
/* Parámetros */
	@pmtId_fraccion int
AS
BEGIN
	SET NOCOUNT ON;
		
		/* Busca la descripción de una fracción específica*/
		select Fraccion from tblFraccionamiento where Id = @pmtId_fraccion;

END
GO
