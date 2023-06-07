import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={style.link}>
      <div className={style.card}>
        <img className={style.image} src={props.image} alt={props.title} />
        <h2 className={style.recipeTitle}>{props.title}</h2>
        <h3 className={style.diets}>Diets: {props.diets}</h3>
      </div>
    </Link>
  );
};

export default Card;
