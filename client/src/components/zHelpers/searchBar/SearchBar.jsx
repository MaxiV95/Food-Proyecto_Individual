import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getRecipeByName,
  updateSelect,
  updateState,
} from "../../../redux/actions";

import {} from "../../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  // Carga las dietas
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.allDiets).sort(
    (a, b) => a.name.localeCompare(b.name) // Ordenamiento alfabético
  );

  // Opciones de selección
  const byDiet = useSelector((state) => state.byDiet);
  const byCreated = useSelector((state) => state.byCreated);
  const byOrder = useSelector((state) => state.byOrder);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateState({ [name]: value }));
    dispatch(updateSelect());
  };

  // Buscar por nombre
  const [name, setName] = useState("");

  const onSearch = () => {
    try {
      dispatch(getRecipeByName(name));
      setName("");
    } catch (err) {
      window.alert("There are no recipes with that name");
    }
  };

  return (
    <div>
      <div className={style.container}>
        <input
          className={style.input}
          type="search"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button className={style.button} onClick={onSearch}>
          Search
        </button>

        <button
          className={style.button}
          onClick={() => dispatch(getAllRecipes())}
        >
          All Recipes
        </button>
      </div>

      <div className={style.filters}>
        {/* Filtrado */}
        <div>
          <select
            className={style.list}
            value={byDiet}
            name="byDiet"
            onChange={handleChange}
          >
            <option value="">Filter by diet</option>
            {diets?.map((diet) => (
              <option value={diet.name} key={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>

          <select
            className={style.list}
            value={byCreated}
            name="byCreated"
            onChange={handleChange}
          >
            <option value="">Filter by created</option>
            <option value="DB">Created by User</option>
            <option value="API">Created by App</option>
          </select>
        </div>

        {/* Ordenado */}
        <div>
          <select
            className={style.list}
            value={byOrder}
            name="byOrder"
            onChange={handleChange}
          >
            <option value="">Order by..</option>
            <option value="MinToMax">HealthScore largest</option>
            <option value="MaxToMin">HealthScore smallest</option>
            <option value="Ascending">Title ascending</option>
            <option value="Descending">Title descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
