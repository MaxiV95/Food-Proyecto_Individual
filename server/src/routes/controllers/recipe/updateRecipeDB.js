const { Recipe, conn } = require("../../../db");

const updateRecipeDB = async ({
  id,
  title,
  image,
  vegetarian,
  vegan,
  glutenFree,
  summary,
  healthScore,
  steps,
  diets,
}) => {
  // Inicia la transacción
  const transaction = await conn.transaction();

  const validatedData = control({
    title,
    image,
    vegetarian,
    vegan,
    glutenFree,
    summary,
    healthScore,
    steps,
    diets,
  });

  try {
    let recipe;
    if (id) {
      // Si llega id se actualiza la receta
      recipe = await Recipe.findByPk(id, { transaction });
      if (!recipe) throw new Error(`Recipe with id: ${id} not found.`);
      await recipe.update(validatedData, { transaction });
    } else {
      // Caso contrario se crea
      if (await Recipe.findOne({ where: { title: title } }))
        throw new Error("Recipe title already exists.");
      recipe = await Recipe.create(validatedData, { transaction });
    }
    // Agrega los tipos de dieta relacionados a la receta
    await recipe.setDiets(diets, { transaction });

    // Confirma la transacción
    await transaction.commit();

    return recipe;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    throw error;
  }
};

module.exports = updateRecipeDB;

const control = (data) => {
  const regexTitle = /^[a-zA-Z0-9]+$/;
  const regexURL = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

  if (!regexTitle.test(data.title)) {
    throw new Error(
      "The title of the recipe cannot contain special characters."
    );
  }
  if (!regexURL.test(data.image)) {
    throw new Error("Invalid image URL.");
  }
  if (data.healthScore < 0 || data.healthScore > 100) {
    throw new Error("Health score must be a number between 0 and 100.");
  }
  if (!data.summary) {
    throw new Error("Summary cannot be null or empty.");
  }
  if (!data.steps || data.steps.length === 0) {
    throw new Error("Steps cannot be an empty array.");
  }
  if (!data.diets || data.diets.length === 0) {
    throw new Error("Diets cannot be an empty array.");
  }

  return data;
};

/*
// Elimina las relaciones anteriores con las dietas
await recipe.removeDiets(undefined, { transaction });

// Agrega los tipos de dieta relacionados a la receta
for (const dietId of diets) {
  const diet = await Diet.findByPk(dietId.toString(), { transaction });

  await recipe.addDiet(diet, { transaction });
}

// Guarda los cambios en la base de datos
await recipe.save({ transaction });
*/
