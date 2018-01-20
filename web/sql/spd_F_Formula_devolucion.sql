SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spd_F_formula_devolucion
	/* Parámetros */
		@pmtId_formula int
AS
BEGIN
	SET NOCOUNT ON;
		/* Selecciona la descripción de la fórmula relacionada con el id*/
		select Descripcion as Formula from tblFormula where Id = @pmtId_formula;
END
GO
