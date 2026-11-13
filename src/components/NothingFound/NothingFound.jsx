import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing-found" role="status">
      <span
        className="nothing-found__symbol"
        aria-hidden="true"
      >
        :(
      </span>

      <h2 className="nothing-found__title">
        Nenhum filme encontrado
      </h2>

      <p className="nothing-found__description">
        Parece que não encontramos nenhum filme.
        Que tal tentar outra busca?
      </p>
    </section>
  );
}

export default NothingFound;
