import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getAllRecipes,
  getRecipeById,
  deleteRecipeById,
} from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const recipe = await getRecipeById(id);
      setRecipeId(recipe);
    };
    fetchData();
  }, [id]);

  const dietsUpperCase = recipeId?.diets?.map((recipe) => {
    return recipe.charAt(0).toUpperCase() + recipe.slice(1);
  });
  const renderedSteps = recipeId?.steps?.map((step, index) => (
    <React.Fragment key={index}>
      {" -> " + step}
      <br />
    </React.Fragment>
  ));

  const deleteRecipe = async () => {
    await deleteRecipeById(id);
    dispatch(getAllRecipes());
    alert("successfully removed");
  };

  return (
    <div className={style.organicer}>
      <div className={style.container}>
        <div className={style.closeButtonContainer}>
          <Link to="/home">
            <button className={style.closeButton}>CLOSE</button>
          </Link>
          <Link to="/home">
            {isNaN(id) && (
              <button className={style.deleteButton} onClick={deleteRecipe}>
                DELETE
              </button>
            )}
          </Link>
          <Link to={`/upload/${id}`}>
            {isNaN(id) && (
              <button className={style.updateButton}>UPDATE</button>
            )}
          </Link>
        </div>
        <h1 className={style.title}>ID: {recipeId?.id}</h1>
        <img
          className={style.image}
          src={recipeId?.image}
          alt={recipeId?.title}
        />
        <h2 className={style.recipeName}>{recipeId?.title}</h2>
        <h3 className={style.subTitles}>Summary: </h3>
        <p className={style.paragraph}>{recipeId?.summary}</p>
        <h3 className={style.subTitles}>Steps: </h3>
        {recipeId?.steps && <p className={style.paragraph}>{renderedSteps}</p>}
        <h3 className={style.subTitles}>Diets: </h3>
        {dietsUpperCase && (
          <p className={style.paragraph}>{dietsUpperCase.join(", ")}</p>
        )}
        <div className={style.healthScore}>
          <h3 className={style.subTitles}>HealthScore: </h3>
        </div>
        <div>
          <p className={style.number}>{recipeId?.healthScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
