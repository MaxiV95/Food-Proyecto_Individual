import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.btn}>
            <span>HOME PAGE</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
