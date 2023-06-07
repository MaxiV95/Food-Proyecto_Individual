import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/">
        <button className={style.button}>LANDING</button>
      </Link>
      <Link to="/home">
        <button className={style.button}>HOME</button>
      </Link>
      <Link to="/form">
        <button className={style.button}>CREATE</button>
      </Link>
      <Link to="/about">
        <button className={style.button}>ABOUT</button>
      </Link>
    </div>
  );
};

export default NavBar;
