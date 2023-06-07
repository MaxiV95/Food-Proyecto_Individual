import {
  GET_ALL_DIETS,
  GET_ALL_RECIPES,
  RESET_ALL_RECIPES,
  GET_RECIPES_NAME,
  UPDATE_SELECT,
  UPDATE_STATE,
  SET_PAGE,
} from "./action-types";

const initialState = {
  recipesSelect: [],
  recipesName: [],
  recipesAll: [],
  allDiets: [],

  byDiet: "",
  byCreated: "",
  byOrder: "",

  page: 1,
  change: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: payload,
      };

    case GET_ALL_RECIPES:
      return {
        ...state,
        recipesSelect: payload,
        recipesName: "",
        recipesAll: payload,
        byDiet: "",
        byCreated: "",
        byOrder: "",
        page: 1,
      };

    case RESET_ALL_RECIPES:
      return {
        ...state,
        recipesSelect: state.recipesAll,
        recipesName: "",
        byDiet: "",
        byCreated: "",
        byOrder: "",
        page: 1,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        recipesSelect: payload,
        recipesName: payload,
        page: 1,
      };

    case UPDATE_STATE:
      return {
        ...state,
        ...payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };

    case UPDATE_SELECT:
      let selectRecipes = state.recipesName
        ? state.recipesName
        : state.recipesAll;

      // Por tipo de dieta
      if (state.byDiet.length)
        selectRecipes = selectRecipes.filter((recipe) =>
          recipe.diets.includes(state.byDiet)
        );
      // Por creacion
      if (state.byCreated.length)
        selectRecipes = selectRecipes.filter((recipe) =>
          state.byCreated === "DB" ? isNaN(recipe.id) : !isNaN(recipe.id)
        );
      // Healt Score
      if (state.byOrder === "MinToMax")
        selectRecipes.sort((a, b) => a.healthScore - b.healthScore);
      if (state.byOrder === "MaxToMin")
        selectRecipes.sort((a, b) => b.healthScore - a.healthScore);

      //Alfabeticamente
      if (state.byOrder === "Ascending")
        selectRecipes.sort((a, b) => a.title.localeCompare(b.title));
      if (state.byOrder === "Descending")
        selectRecipes.sort((a, b) => b.title.localeCompare(a.title));

      return {
        ...state,
        recipesSelect: selectRecipes,
        page: 1,
        change: !state.change,
      };

    default:
      return { ...state };
  }
};

export default reducer;
