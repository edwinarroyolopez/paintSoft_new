
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_fraccion_devolucion
/* Par�metros */
	@pmtId_fraccion int
AS
BEGIN
	SET NOCOUNT ON;
		
		/* Busca la descripci�n de una fracci�n espec�fica*/
		select Fraccion from tblFraccionamiento where Id = @pmtId_fraccion;

END
GO
