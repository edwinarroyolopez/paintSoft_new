SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_formula_devolucion
	/* Par�metros */
		@pmtId_formula int
AS
BEGIN
	SET NOCOUNT ON;
		/* Selecciona la descripci�n de la f�rmula relacionada con el id*/
		select Descripcion as Formula from tblFormula where Id = @pmtId_formula;
END
GO
