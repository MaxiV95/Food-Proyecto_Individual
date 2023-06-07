const diets = require("express").Router();

const getAllDiets = require("../controllers/diet/getAllDiets");

diets.get("/:idDiets", async (req, res) => {
  const { idDiets } = req.params;
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.stack });
  }
});

/*📍 GET | /diets
Obtiene un arreglo con todos los tipos de dietas existentes.
En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.*/
diets.get("/", async (req, res) => {
  try {
    //const diets = await getDietsDB();
    const diets = await getAllDiets();
    return res.status(200).json(diets);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.stack });
  }
});

diets.post("/", async () => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.stack });
  }
});

diets.put("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.stack });
  }
});

diets.delete("/", async (req, res) => {
  try {
    const response = { message: "It does not work" };
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.stack });
  }
});

module.exports = diets;
