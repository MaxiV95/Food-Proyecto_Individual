const { Recipe } = require("../../../db");

// Función principal
const deleteRecipeDB = async (id) => {
  try {
    const recipe = await Recipe.destroy({where:{id: id}});

    return recipe;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = deleteRecipeDB;
