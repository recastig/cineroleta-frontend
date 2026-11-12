import { useEffect, useRef, useState } from "react";
import { getMovieGenres, discoverMovies } from "../../utils/TmdbApi";
import "./Roulette.css";

const SPIN_DURATION = 4200;
const MAX_DISCOVER_PAGE = 500;

function Roulette({ onClose }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [minYear, setMinYear] = useState("all");

  const currentYear = new Date().getFullYear();

  const availableYears = Array.from(
    { length: currentYear - 1888 + 1 },
    (_, index) => currentYear - index,
  );

  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoadingGenres, setIsLoadingGenres] = useState(true);

  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [error, setError] = useState("");
  const [filterError, setFilterError] = useState("");

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const spinControllerRef = useRef(null);
  const timerRef = useRef(null);

  const availableMovies = !isLoadingMovies && !filterError && totalResults > 0;

  const selectedGenre = genres.find((item) => String(item.id) === genre);

  // Carregar gêneros oficiais do TMDB.
  useEffect(() => {
    const controller = new AbortController();

    getMovieGenres(controller.signal)
      .then(setGenres)
      .catch((err) => {
        if (!controller.signal.aborted) {
          setFilterError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingGenres(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Consultar quantos filmes atendem aos filtros.
  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingMovies(true);
    setFilterError("");
    setTotalResults(0);
    setTotalPages(0);
    setSelectedMovie(null);
    setError("");

    discoverMovies({
      genreId: genre,
      minRating,
      minYear,
      page: 1,
      signal: controller.signal,
    })
      .then((data) => {
        if (controller.signal.aborted) return;

        setTotalResults(data.totalResults);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setFilterError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingMovies(false);
        }
      });

    return () => controller.abort();
  }, [genre, minRating, minYear]);

  // Gerenciar abertura, fechamento e foco do modal.
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          "button:not(:disabled), select:not(:disabled), input:not(:disabled)",
        ),
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      spinControllerRef.current?.abort();
      clearTimeout(timerRef.current);

      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      previousFocus?.focus();
    };
  }, [onClose]);

  function handleGenreChange(event) {
    setGenre(event.target.value);
  }

  function handleRatingChange(event) {
    setMinRating(Number(event.target.value));
  }

  async function handleSpin() {
    if (isSpinning || isLoadingMovies || !availableMovies) {
      return;
    }

    setIsSpinning(true);
    setSelectedMovie(null);
    setError("");

    const controller = new AbortController();
    spinControllerRef.current = controller;

    try {
      const maxPage = Math.min(totalPages, MAX_DISCOVER_PAGE);

      const randomPage = Math.floor(Math.random() * maxPage) + 1;

      const data = await discoverMovies({
        genreId: genre,
        minRating,
        minYear,
        page: randomPage,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      if (data.movies.length === 0) {
        throw new Error(
          "Não encontramos filmes nesta rodada. Tente girar novamente.",
        );
      }

      const randomIndex = Math.floor(Math.random() * data.movies.length);

      const movie = data.movies[randomIndex];

      const extraRotation = 1800 + Math.random() * 360;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      setRotation((previous) => {
        return previous + extraRotation;
      });

      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(
        () => {
          if (!controller.signal.aborted) {
            setSelectedMovie(movie);
            setIsSpinning(false);
          }
        },
        prefersReducedMotion ? 50 : SPIN_DURATION,
      );
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message);
        setIsSpinning(false);
      }
    }
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="roulette" onMouseDown={handleOverlayClick}>
      <section
        className="roulette__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roulette-title"
        ref={dialogRef}
      >
        <button
          className="roulette__close"
          type="button"
          aria-label="Fechar roleta"
          onClick={onClose}
          ref={closeButtonRef}
        >
          ×
        </button>

        <header className="roulette__header">
          <h2 className="roulette__title" id="roulette-title">
            DEIXE A SORTE DECIDIR
            <span className="roulette__title-dot">.</span>
          </h2>

          <p className="roulette__description">
            Escolha seus filtros e descubra seu próximo filme!
          </p>
        </header>

        <div className="roulette__filters">
          {/* GÊNERO */}
          <div className="roulette__filter">
            <label className="roulette__filter-label" htmlFor="roulette-genre">
              GÊNERO
            </label>

            <select
              id="roulette-genre"
              className="roulette__select"
              value={genre}
              onChange={handleGenreChange}
              disabled={isSpinning || isLoadingGenres}
            >
              <option value="all">Todos os gêneros</option>

              {genres.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* ANO MÍNIMO */}
          <div className="roulette__filter">
            <label className="roulette__filter-label" htmlFor="roulette-year">
              ANO MÍNIMO
            </label>

            <select
              id="roulette-year"
              className="roulette__select"
              value={minYear}
              onChange={(event) => setMinYear(event.target.value)}
              disabled={isSpinning}
            >
              <option value="all">Qualquer ano</option>

              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* NOTA MÍNIMA TMDB */}
          <div className="roulette__filter">
            <label className="roulette__filter-label" htmlFor="roulette-rating">
              NOTA MÍNIMA TMDB
              <span className="roulette__rating-value">
                {minRating.toFixed(1)}
              </span>
            </label>

            <input
              id="roulette-rating"
              className="roulette__range"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={handleRatingChange}
              disabled={isSpinning}
            />

            <div className="roulette__range-labels">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div className="roulette__main">
          <div className="roulette__wheel-column">
            {isLoadingMovies ? (
              <div className="roulette__empty" role="status">
                <p className="roulette__empty-description">
                  Preparando sua roleta...
                </p>
              </div>
            ) : availableMovies ? (
              <div
                className="roulette__wheel-wrapper"
                aria-label="Roleta cinematográfica decorativa"
              >
                <span className="roulette__pointer" aria-hidden="true" />

                <div
                  className="roulette__wheel"
                  aria-hidden="true"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div className="roulette__wheel-center">
                    <span className="roulette__smile">☺</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="roulette__empty" role="status">
                <h3 className="roulette__empty-title">
                  {filterError
                    ? "ERRO AO CARREGAR"
                    : "NENHUM FILME ENCONTRADO :("}
                </h3>

                <p className="roulette__empty-description">
                  {filterError ||
                    "Experimente outro gênero ou diminua a nota mínima."}
                </p>
              </div>
            )}

            <button
              className="roulette__spin-button"
              type="button"
              onClick={handleSpin}
              disabled={isSpinning || isLoadingGenres || !availableMovies}
            >
              {isSpinning ? "SORTEANDO..." : "GIRAR ROLETA ↻"}
            </button>
          </div>

          <div
            className="roulette__result"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {isSpinning ? (
              <div className="roulette__result-content">
                <span className="roulette__result-icon">✦</span>

                <p className="roulette__result-label">VEM AÍ UM FILMAÇO...</p>

                <p className="roulette__result-placeholder">
                  Já botou as pipocas pra estourar?
                </p>
              </div>
            ) : error ? (
              <div className="roulette__result-content">
                <p className="roulette__result-label">
                  NÃO FOI POSSÍVEL SORTEAR
                </p>

                <p className="roulette__result-description">{error}</p>
              </div>
            ) : selectedMovie ? (
              <div className="roulette__result-content">
                <p className="roulette__result-label">SEU PRÓXIMO FILME É</p>

                <h3 className="roulette__result-title">
                  {selectedMovie.title}
                </h3>

                <p className="roulette__result-meta">
                  {selectedMovie.year}
                  {selectedGenre ? ` • ${selectedGenre.name}` : ""}
                </p>

                <p className="roulette__result-rating">
                  ★ {selectedMovie.rating.toFixed(1)}
                  /10
                  <span> (TMDB)</span>
                </p>

                <p className="roulette__result-description">
                  {selectedMovie.description}
                </p>

                <p className="roulette__result-hint">
                  Não gostou? Gire novamente!
                </p>
              </div>
            ) : (
              <div className="roulette__result-content">

                <h3 className="roulette__result-placeholder">
                  RODA, RODA, RODA E AVISA 💫
                </h3>

                <p className="roulette__result-description">
                  Ajuste os filtros e gire a roleta para descobrir o que
                  assistir!
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="roulette__disclaimer">
          O sorteio utiliza uma página aleatória de filmes que correspondem aos
          filtros selecionados no TMDB.
        </p>
      </section>
    </div>
  );
}

export default Roulette;
