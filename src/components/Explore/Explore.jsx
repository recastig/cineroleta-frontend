import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Explore.css";

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <main className="explore">
      <section className="explore__hero">
        <h1 className="explore__title">
          BUSCA DE FILMES
          <span className="explore__dot">.</span>
        </h1>

        <p className="explore__description">
          Já sabe o que assistir? Pesquise por aqui!
        </p>

        <SearchForm onSearch={handleSearch} />
      </section>

      <section
        className="explore__results"
        aria-live="polite"
      >
        {searchQuery ? (
          <p className="explore__status">
            Busca por "{searchQuery}" preparada.
            Os resultados serão exibidos aqui
            após a integração com a API.
          </p>
        ) : (
          <p className="explore__status">
            Pesquise um filme para começar.
          </p>
        )}
      </section>
    </main>
  );
}

export default Explore;
