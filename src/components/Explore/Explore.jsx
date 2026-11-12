import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import NothingFound from "../NothingFound/NothingFound";
import Preloader from "../Preloader/Preloader";
import { searchMovies } from "../../utils/TmdbApi";
import "./Explore.css";

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(query) {
    setSearchQuery(query);
    setIsLoading(true);
    setError("");
    setMovies([]);
  }

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const controller = new AbortController();

    searchMovies(searchQuery, controller.signal)
      .then((results) => {
        if (!controller.signal.aborted) {
          setMovies(results);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [searchQuery]);

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
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className="explore__status" role="alert">
            {error}
          </p>
        ) : !searchQuery ? (
          <p className="explore__status">
            Pesquise um filme para começar.
          </p>
        ) : movies.length === 0 ? (
          <NothingFound />
        ) : (
          <>
            <h2 className="explore__results-title">
              RESULTADOS PARA "{searchQuery}"
            </h2>

            <MovieCardList
              key={searchQuery}
              movies={movies}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default Explore;
