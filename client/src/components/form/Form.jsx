import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
import { getAllDiets, postRecipe, getAllRecipes } from "../../redux/actions";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.allDiets).sort(
    (a, b) => a.name.localeCompare(b.name) // Ordenamiento alfabético
    );
  const upperDiets = diets?.map((diet) => {
    // Primer letra en mayúscula
    return {
      id: diet.id,
      name:
      diet.name.charAt(0).toUpperCase() + diet.name.slice(1).toLowerCase(),
    };
  });
  
  useEffect(() => {
    // Al montar el componente
    (!diets.length && dispatch(getAllDiets()));
    // eslint-disable-next-line
  }, []);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    steps: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      // Cambia estado de los campos
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        // Cambia estado de los errores
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const checkHandle = (event) => {
    // Cambia la cantidad de dietas agregadas
    setForm({
      ...form,
      [event.target.name]: event.target.checked
        ? [...form.diets, event.target.value]
        : form.diets.filter((diet) => diet !== event.target.value),
    });
    setErrors(
      validate({
        // Cambia estado de los errores
        ...form,
        [event.target.name]: event.target.checked
          ? [...form.diets, event.target.value]
          : form.diets.filter((diet) => diet !== event.target.value),
      })
    );
  };

  const format = (recipe) => {
    // Ajusta el formato de valores
    return {
      title:
        recipe.title.charAt(0).toUpperCase() +
        recipe.title.slice(1).toLowerCase(),
      image: recipe.image,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      summary: recipe.summary.replace("\n", " "),
      healthScore: recipe.healthScore.toString(),
      steps: recipe.steps.split("\n"),
      diets: recipe.diets,
    };
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    // En caso de que no existan errores postea la receta
    if (!Object.keys(errors).length) await postRecipe(format(form));
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
              value={form.title}
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
              value={form.summary}
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
              value={form.value}
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
              value={form.steps}
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
              value={form.image}
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

export default Form;
