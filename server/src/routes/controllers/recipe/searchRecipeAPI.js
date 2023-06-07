const axios = require("axios");

// Único AXIOS
const callSpoonacularAPI = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { "x-api-key": process.env.API_KEY },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// Formateo de la respuesta de la API
const formatRecipe = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    vegetarian: recipe.vegetarian,
    vegan: recipe.vegan,
    glutenFree: recipe.glutenFree,
    summary: recipe.summary.replace(/(<([^>]+)>)/gi, ""),
    healthScore: recipe.healthScore,
    steps: recipe.analyzedInstructions[0]?.steps.map((step) => step.step),
    diets: recipe.diets,
  };
};

// Búsqueda por ID
const getRecipeApiById = async (id) => {
  try {
    const data = await callSpoonacularAPI(
      `https://api.spoonacular.com/recipes/${id}/information`
    );

    if (!data.title) throw Error(`ID: ${id} Not found`);

    return formatRecipe(data);
  } catch (error) {
    throw error;
  }
};

// Búsqueda 100 primeras, if(name) filtrado por name en servidor
const getRecipesAPI = async (name) => {
  try {
    const data = await callSpoonacularAPI(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100`
    );

    const recipesAPI = data.results?.map((recipe) => formatRecipe(recipe));

    if (!name) return recipesAPI;

    if (typeof name !== "string" || !name.trim())
    throw Error("The name must be a non-empty string");
    
    // Si name es una cadena de texto no vacía, filtra por name
    return recipesAPI.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );
  } catch (error) {
    throw error;
  }
};

// Función principal
const searchRecipeAPI = async ({ id, name }) => {
  try {
    if (id) return await getRecipeApiById(id);

    return await getRecipesAPI(name);
  } catch (error) {
    throw error;
  }
};

module.exports = searchRecipeAPI;
