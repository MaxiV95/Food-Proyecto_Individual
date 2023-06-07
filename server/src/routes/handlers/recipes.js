const recipes = require("express").Router();
const searchRecipeAPI = require("../controllers/recipe/searchRecipeAPI");
const searchRecipeDB = require("../controllers/recipe/searchRecipeDB");
const updateRecipeDB = require("../controllers/recipe/updateRecipeDB");
const deleteRecipeDB = require("../controllers/recipe/deleteRecipeDB");

/*📍 GET | /recipes/:id
Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto 
con la información pedida en el detalle de una receta.
La receta es recibida por parámetro (ID).
Tiene que incluir los datos de los tipos de dietas asociados a la receta.
Debe funcionar tanto para las recetas de la API como para las de la base de datos.*/
recipes.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = isNaN(id)
      ? await searchRecipeDB({ id: id })
      : await searchRecipeAPI({ id: id });

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json({ error: error.stack });
  }
});

/*📍 GET | /recipes/name?="..."
Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido 
por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarla independientemente de mayúsculas o minúsculas.
Si no existe la receta, debe mostrar un mensaje adecuado.
Debe buscar tanto las de la API como las de la base de datos.*/
recipes.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    // Busca por 'name' en la API y Base de datos
    const [allRecipesDB, allRecipesAPI] = await Promise.all([
      searchRecipeDB({ name: name }),
      searchRecipeAPI({ name: name }),
    ]);

    const allRecipes = []; // Incorpora las respuestas si son arreglos válidos
    if (Array.isArray(allRecipesDB)) allRecipes.push(...allRecipesDB);
    if (Array.isArray(allRecipesAPI)) allRecipes.push(...allRecipesAPI);

    if (allRecipes.length === 0)
      // Si no encontró maches devuelve el aviso
      return res
        .status(400)
        .json({ message: `No matching recipes found for '${name}'` });

    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(404).json({ error: error.stack });
  }
});

/*📍 POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y 
relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con 
los tipos de dieta indicados (al menos uno).*/
recipes.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newRecipe = await updateRecipeDB(data);

    return res.status(200).json(newRecipe);
  } catch (error) {
    return res.status(404).json({ error: error.stack });
  }
});

// Editar receta
recipes.put("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const recipe = await updateRecipeDB(data);

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json({ error: error.stack });
  }
});

// Eliminar receta
recipes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) return await deleteRecipeDB(id);

    return res
      .status(400)
      .json({ message: `No matching recipes found for '${id}'` });
  } catch (error) {
    return res.status(404).json({ error: error.stack });
  }
});

module.exports = recipes;
