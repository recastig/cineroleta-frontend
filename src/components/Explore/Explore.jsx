import { useEffect, useRef, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import NothingFound from "../NothingFound/NothingFound";
import Preloader from "../Preloader/Preloader";
import { searchMovies } from "../../utils/TmdbApi";
import "./Explore.css";

const MOVIES_PER_CLICK = 3;

function Explore() {
  const [search, setSearch] = useState({
    query: "",
    id: 0,
  });

  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    MOVIES_PER_CLICK
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState("");
  const [paginationError, setPaginationError] = useState("");

  const paginationControllerRef = useRef(null);
  const searchVersionRef = useRef(0);

  const searchQuery = search.query;

  function handleSearch(query) {
    searchVersionRef.current += 1;
    paginationControllerRef.current?.abort();

    setMovies([]);
    setVisibleCount(MOVIES_PER_CLICK);
    setCurrentPage(0);
    setTotalPages(0);

    setError("");
    setPaginationError("");
    setIsLoading(true);
    setIsLoadingMore(false);

    setSearch({
      query,
      id: searchVersionRef.current,
    });
  }

  useEffect(() => {
    if (!search.query) return;

    const controller = new AbortController();
    const requestVersion = search.id;

    searchMovies(search.query, 1, controller.signal)
      .then((data) => {
        if (
          controller.signal.aborted ||
          requestVersion !== searchVersionRef.current
        ) {
          return;
        }

        setMovies(data.movies);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (
          controller.signal.aborted ||
          requestVersion !== searchVersionRef.current
        ) {
          return;
        }

        setError(err.message);
      })
      .finally(() => {
        if (
          !controller.signal.aborted &&
          requestVersion === searchVersionRef.current
        ) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [search]);

  async function handleShowMore() {
    if (isLoadingMore) return;

    setPaginationError("");

    const nextVisibleCount =
      visibleCount + MOVIES_PER_CLICK;

    // Ainda existem filmes carregados na memória.
    if (nextVisibleCount <= movies.length) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    // Não há mais páginas na API.
    if (currentPage >= totalPages) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    const controller = new AbortController();
    const requestVersion = searchVersionRef.current;

    paginationControllerRef.current = controller;
    setIsLoadingMore(true);

    try {
      const data = await searchMovies(
        searchQuery,
        currentPage + 1,
        controller.signal
      );

      if (
        controller.signal.aborted ||
        requestVersion !== searchVersionRef.current
      ) {
        return;
      }

      setMovies((previousMovies) => {
        const existingIds = new Set(
          previousMovies.map((movie) => movie.id)
        );

        const newMovies = data.movies.filter(
          (movie) => !existingIds.has(movie.id)
        );

        return [...previousMovies, ...newMovies];
      });

      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setVisibleCount(nextVisibleCount);
    } catch (err) {
      if (
        !controller.signal.aborted &&
        requestVersion === searchVersionRef.current
      ) {
        setPaginationError(err.message);
      }
    } finally {
      if (
        requestVersion === searchVersionRef.current
      ) {
        setIsLoadingMore(false);
        paginationControllerRef.current = null;
      }
    }
  }

  const visibleMovies = movies.slice(0, visibleCount);

  const hasMore =
    visibleCount < movies.length ||
    currentPage < totalPages;

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
          <p
            className="explore__status"
            role="alert"
          >
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
              movies={visibleMovies}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onShowMore={handleShowMore}
            />

            {paginationError && (
              <p
                className="explore__status"
                role="alert"
              >
                {paginationError}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Explore;