import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiets,
  getRecipeById,
  uploadRecipeById,
  getAllRecipes,
} from "../../redux/actions";
import { useParams } from "react-router-dom";
import validate from "./validate";
import style from "./Upload.module.css";

const Upload = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // DIETAS
  const diets = useSelector((state) => state.allDiets).sort(
    (a, b) => a.name.localeCompare(b.name) // Ordenamiento alfabético
  );
  const upperDiets = diets?.map((diet) => {
    return {
      id: diet.id, // Primer letra en mayúscula
      name:
        diet.name.charAt(0).toUpperCase() + diet.name.slice(1).toLowerCase(),
    };
  });

  // Datos de la RECETA
  const [upload, setUpload] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    steps: "",
    image: "",
    diets: {},
  });
  const [errors, setErrors] = useState({});

  // Al montar el componente
  useEffect(() => {
    !diets.length && dispatch(getAllDiets());

    const fetchData = async () => {
      const recipeId = await getRecipeById(id);
      setUpload({
        ...upload,
        title: recipeId.title,
        summary: recipeId.summary,
        healthScore: recipeId.healthScore,
        steps: recipeId.steps ? recipeId.steps.join('\n') : '',
        image: recipeId.image,
        diets: {},
      });

      // Inicializa los valores de upload.diets con las claves correspondientes a los IDs de las dietas
      for (const diet of recipeId.diets) {
        const dietId = diets.find((dietFind) => dietFind.name === diet)?.id;
        if (dietId)
          setUpload((prevUpload) => ({
            ...prevUpload,
            diets: {
              ...prevUpload.diets,
              [dietId]: true,
            },
          }));
      }
    };
    !upload.title && fetchData();

    // eslint-disable-next-line
  }, [id, diets, upload.diets]);

  // Al cambiar algún campo
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpload({
      ...upload,
      [name]: value,
    });
    setErrors(
      validate({
        ...upload,
        [name]: value,
      })
    );
  };

  // Al cambiar algún check
  const checkHandle = (event) => {
    const { checked, value } = event.target;
    setUpload({
      ...upload,
      diets: {
        ...upload.diets,
        [value]: checked,
      },
    });
    setErrors(
      validate({
        ...upload,
        diets: {
          ...upload.diets,
          [value]: checked,
        },
      })
    );
  };

  // Ajusta el Formato de valores
  const Format = (recipe) => {
    return {
      id: id,
      title:
        recipe.title.charAt(0).toUpperCase() +
        recipe.title.slice(1).toLowerCase(),
      image: recipe.image,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      summary: recipe.summary.replace("\n", " "),
      healthScore: recipe.healthScore,
      steps: recipe.steps.split("\n"),
      diets: Object.entries(recipe.diets) // Array de matrices clave-valor
      .filter(([key, value]) => value === true) // Solo matrices con true
      .map(([key, value]) => key), // solo las keys (id de dietas)
    };
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    // En caso de que no existan errores postea la receta
    if (!Object.keys(errors).length) await uploadRecipeById(Format(upload));
    dispatch(getAllRecipes());
  };

  return (
    <div className={style.box}>
      <div className={style.container}>
        <form onSubmit={handlerSubmit}>
          <div>
            <label className={style.title}>Title: </label>
            <br />
            <input
              className={style.input}
              type="text"
              value={upload.title}
              name="title"
              onChange={handleChange}
            />
            <br />
            {errors.title && (
              <span className={style.errores}>{errors.title}</span>
            )}
          </div>
          <br />
          <div>
            <label className={style.title}>Summary: </label>
            <br />
            <textarea
              className={style.textBox}
              cols="30"
              rows="10"
              value={upload.summary}
              name="summary"
              onChange={handleChange}
            />
            <br />
            {errors.summary && (
              <span className={style.errores}>{errors.summary}</span>
            )}
          </div>
          <br />
          <div>
            <label className={style.title}>HealthScore: </label>
            <br />
            <input
              className={style.healthBox}
              min="0"
              max="100"
              type="number"
              value={upload.healthScore}
              name="healthScore"
              onChange={handleChange}
            />
            <br />
            {errors.healthScore && (
              <span className={style.errores}>{errors.healthScore}</span>
            )}
          </div>
          <br />
          <div>
            <label className={style.title}>Steps: </label>
            <br />
            <textarea
              className={style.textBox}
              cols="30"
              rows="10"
              value={upload.steps}
              name="steps"
              onChange={handleChange}
            />
            <br />
            {errors.steps && (
              <span className={style.errores}>{errors.steps}</span>
            )}
          </div>
          <br />
          <div>
            <label className={style.title}>Image URL: </label>
            <br />
            <input
              className={style.input}
              type="url"
              value={upload.image}
              name="image"
              onChange={handleChange}
            />
            <br />
            {errors.image && (
              <span className={style.errores}>{errors.image}</span>
            )}
          </div>
          <br />
          <div>
            <label className={style.title}>Select Diets</label>
            <br />
            <div className={style.allDiets}>
              {upperDiets.map((diet) => {
                return (
                  <React.Fragment key={diet.id}>
                    <input
                      type="checkbox"
                      value={diet.id}
                      name="diets"
                      checked={upload?.diets[diet.id] || false}
                      onChange={checkHandle}
                    />
                    <label className={style.diets}>{diet.name}</label>
                    <br />
                  </React.Fragment>
                );
              })}
            </div>
            <br />
            {errors.diets && (
              <span className={style.errores}>{errors.diets}</span>
            )}
          </div>
          <br />
          <button
            type="submit"
            className={style.button}
            disabled={Object.keys(errors).length}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
