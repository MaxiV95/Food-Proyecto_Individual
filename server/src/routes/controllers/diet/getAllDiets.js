const { Diet } = require("../../../db");
const searchRecipeAPI = require("../recipe/searchRecipeAPI");

const getAllDietsAPI = async () => {
  // Carga de dietas solo si la base de datos esta vacía
  try {
    const data = await searchRecipeAPI({});
    console.log("API request executed.");

    if (!data) {
      throw new Error("No API results found.");
    }

    const dietArray = data.map((recipe) => recipe.diets).flat(); // Devuelve un array sin profundidad
    const apiDiets = [...new Set(dietArray)]; // Crea un array sin repeticiones

    await Promise.all(
      apiDiets.map(async (diet) => {
        await Diet.findOrCreate({ where: { name: diet } });
      })
    );

    const allDiets = await Diet.findAll();
    return allDiets;
  } catch (error) {
    throw error;
  }
};

// Función principal
const getAllDiets = async () => {
  try {
    let allDietsDB = await Diet.findAll();

    if (!allDietsDB.length) allDietsDB = await getAllDietsAPI();

    return allDietsDB;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllDiets;
