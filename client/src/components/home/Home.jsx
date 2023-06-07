import { SearchBar, CardsContainer, Paginado } from "../";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getAllDiets } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const recipesSelect = useSelector((state) => state.recipesSelect);
  const diets = useSelector((state) => state.allDiets)
  const change = useSelector((state) => state.change)
  useEffect(() => {
    // Al montar el componente
    if(!diets.length){
      dispatch(getAllRecipes());
      dispatch(getAllDiets());
    }
    // eslint-disable-next-line
  }, [change, recipesSelect]);

  // Paginado!
  const page = useSelector((state) => state.page);
  const perPage = 9;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const max = Math.ceil(recipesSelect?.length / perPage);
  const recipes = recipesSelect?.slice(startIndex, endIndex);

  return (
    <div className={style.container}>
      <SearchBar />
      <br />
      <h1 className={style.title}>RECIPES</h1>
      <CardsContainer recipesAll={recipes} />
      <footer>
        <Paginado page={page} max={max} />
      </footer>
    </div>
  );
};

export default Home;
