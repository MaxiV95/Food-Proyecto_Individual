import axios from "axios";

import {
  GET_ALL_DIETS,
  GET_ALL_RECIPES,
  RESET_ALL_RECIPES,
  GET_RECIPES_NAME,
  UPDATE_SELECT,
  UPDATE_STATE,
  SET_PAGE,
} from "./action-types";

// Trae y guarda las dietas en allDiets
export const getAllDiets = () => {
  return async (dispatch) => {
    try {
      const dietas = await axios.get("/diets");
      const allDiets = dietas.data;
      dispatch({ type: GET_ALL_DIETS, payload: allDiets });
    } catch (error) {
      console.error(error);
    }
  };
};

// Trae y guarda las recetas en allRecipes y recipes
export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
      const recetas = await axios.get("/recipes");
      const allRecipes = recetas.data;
      dispatch({ type: GET_ALL_RECIPES, payload: allRecipes });
    } catch (error) {
      console.error(error);
    }
  };
};

// Recarga allRecipes con info de recipes para resetear todo y evitar consultar al back
export const resetAllRecipes = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_ALL_RECIPES });
  };
};

// Trae y guarda recetas por name en allRecipes
export const getRecipeByName = (name) => {
  return async (dispatch) => {
    try {
      const receta = await axios.get(`/recipes?name=${name}`);
      const recetaNombre = receta.data;
      dispatch({ type: GET_RECIPES_NAME, payload: recetaNombre });
    } catch (error) {
      console.error(error);
      alert(`There is no recipe named ${name}`);
    }
  };
};

// Actualiza el estado global
export const updateState = (options) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_STATE, payload: options });
  };
};

// Actualiza recipesAll según seleccionado
export const updateSelect = () => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SELECT });
  };
};

// Actualiza la pagina
export const setPage = (num) => {
  return (dispatch) => {
    dispatch({ type: SET_PAGE, payload: num });
  };
};

// Postea una nueva receta
export const postRecipe = async (data) => {
  await axios
    .post("/recipes", data)
    .then((res) => alert("Successfully Created"))
    .catch((err) => alert(err.response.data.error));
  return;
};

// Busca receta por id
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message + `There is no recipe with the ID: ${id}`);
  }
};

// Elimina receta por id
export const deleteRecipeById = async (id) => {
  try {
    const response = await axios.delete(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message + `There is no recipe with the ID: ${id}`);
  }
};

// Actualiza receta por id
export const uploadRecipeById = async (data) => {
  await axios
    .put("/recipes", data)
    .then((res) => alert("Successfully uploaded"))
    .catch((err) => alert(err.response.data.error));
  return;
};
