import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import NothingFound from "../NothingFound/NothingFound";
import mockMovies from "../../utils/mockMovies";
import "./Explore.css";

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const normalizedQuery = searchQuery
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(normalizedQuery)
  );

  return (
    <main className="explore">
      <section className="explore__hero">
        <h1 className="explore__title">
          BUSCA POR FILMES
          <span className="explore__dot">.</span>
        </h1>

        <p className="explore__description">
          Já recebeu indicação? Pesquise aqui sobre o filme!
        </p>

        <SearchForm onSearch={handleSearch} />
      </section>

      <section
        className="explore__results"
        aria-live="polite"
      >
        {!searchQuery ? (
          <p className="explore__status">
            Pesquise um filme para começar.
          </p>
        ) : filteredMovies.length === 0 ? (
          <NothingFound />
        ) : (
          <>
            <h2 className="explore__results-title">
              RESULTADOS PARA "{searchQuery}"
            </h2>

            <MovieCardList
              key={searchQuery}
              movies={filteredMovies}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default Explore;
