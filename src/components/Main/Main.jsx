import "./Main.css";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <p className="main__subtitle">
          O cinema decide por você
        </p>

        <h1 className="main__title">
          Menos procura. Mais cinema.
        </h1>

        <p className="main__description">
          Não sabe o que assistir hoje?
          Deixe a sorte escolher seu próximo filme.
        </p>

        <button className="main__button" type="button" disabled>
          Em breve: girar a roleta
        </button>
      </section>
    </main>
  );
}

export default Main;
