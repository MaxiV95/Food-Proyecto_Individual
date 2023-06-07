const { Op } = require("sequelize");
const { Recipe, Diet } = require("../../../db");

const format = (recipe) => ({
  id: recipe.id,
  title: recipe.title,
  image: recipe.image,
  vegetarian: recipe.vegetarian,
  vegan: recipe.vegan,
  glutenFree: recipe.glutenFree,
  summary: recipe.summary,
  healthScore: recipe.healthScore,
  steps: recipe.steps,
  diets: recipe.Diets.map((diet) => diet.name),
});

const getRecipeDbById = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!recipe) {
      throw Error(`Recipe with id: ${id} not found.`);
    }

    return format(recipe);
  } catch (error) {
    throw Error(error.message);
  }
};

const getRecipeDb = async (name) => {
  let whereCondition = {};

  if (name) {
    if (typeof name !== "string" || !name.trim())
      throw Error("The name must be a non-empty string");

    whereCondition = { title: { [Op.iLike]: `%${name}%` } };
  }

  try {
    const recipesDB = await Recipe.findAll({
      where: whereCondition,
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const recipes = recipesDB.map(format);

    return recipes;
  } catch (error) {
    throw Error(error.message);
  }
};

const searchRecipeDB = async ({ id, name }) => {
  try {
    if (id) return await getRecipeDbById(id);

    return getRecipeDb(name);
  } catch (error) {
    throw error;
  }
};

module.exports = searchRecipeDB;
