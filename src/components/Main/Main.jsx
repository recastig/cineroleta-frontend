import "./Main.css";
import { useState } from "react";
import Roulette from "../Roulette/Roulette";

function Main() {
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">GIRE E</span>
            <span className="hero__title-line">ASSISTA,</span>
            <span className="hero__title-line hero__title-italic">SIMPLES</span>
            <span className="hero__title-line hero__title-last">
              <span className="hero__title-italic">ASSIM</span>
              <span className="hero__smile" aria-hidden="true">
                ☺
              </span>
            </span>
          </h1>

          <p className="hero__description">
            <span className="hero__description-line">
              Uma roleta, milhares de filmes.
            </span>
            <span className="hero__description-line">
              Deixe a sorte decidir o que você vai assistir hoje!
            </span>
          </p>

          <button
            className="hero__button"
            type="button"
            onClick={() => setIsRouletteOpen(true)}
          >
            GIRAR AGORA ↻
          </button>
        </div>

        <div className="hero__visual">
          <img
            className="hero__image"
            src="/hero-statue.png"
            alt="Estátua clássica usando óculos 3D e envolvida por uma fita cinematográfica"
          />
        </div>
      </section>
      {isRouletteOpen && (
  <Roulette onClose={() => setIsRouletteOpen(false)} />
)}
    </main>
  );
}

export default Main;
