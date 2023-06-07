import style from "./About.module.css";
import photo from "./img/MaxiV95.jpeg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function About() {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    setCopied(!copied);
  };

  return (
    <div className={style.about}>
      <div className={style.my}>
        <img src={photo} alt="Maximiliano Van Megroot" />
        <CopyToClipboard text="maximilianovanmegroot@gmail.com">
          <h3 className={style.email} onClick={onClick}>
            Click on me!! get the email
          </h3>
        </CopyToClipboard>
        {copied && <span className={style.span}>Copiado!</span>}
        <h3 className={style.a}>
          <a href="https://github.com/MaxiV95">Github MaxiV95</a>
        </h3>
      </div>
      <div className={style.container}>
        <h1>Sobre mi...</h1>

        <h2>🤔Quien soy?🤔</h2>
        <p>
          Dicen que definirse es limitarse... pero aquí hay un poco sobre mi:
        </p>

        <h2>🏅Estudios🏅</h2>
        <p>
          Siempre tuve interés sobre el área técnica, la resolución de
          rompecabezas y gusto por la tecnología.
          <br />
          Lo que me ha llevado a estudiar Tecnicatura en electrónica, Gasista,
          Electricista, Tec en AA y <br />
          Programación (Full Stack actualmente). ✅
        </p>

        <h2>🎭Intereses/Gustos🎭</h2>
        <ul>
          <li> 🚶 Senderismo montañoso.</li>
          <li>👨‍👩‍👦‍👧 Reuniones con familia y amistades.</li>
          <li> 🏊 Competencia de nado en aguas abiertas.</li>
        </ul>

        <h2>🔄En proceso...🔄</h2>
        <ul>
          <li>💻 Curso de programación en Henry.</li>
          <li> 🕺 Clases de bachata.</li>
          <li>🧐 búsqueda de nuevos desafíos.</li>
        </ul>
      </div>
    </div>
  );
};
