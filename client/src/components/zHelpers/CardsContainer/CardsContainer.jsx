import { Card } from "../../";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ recipesAll }) => {
  return (
    <div className={style.container}>
      {recipesAll && recipesAll.map((rec) => {
        return (
          <Card
            key={rec.id}
            id={rec.id}
            image={rec.image}
            title={rec.title}
            diets={rec.diets.join(", ")}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
