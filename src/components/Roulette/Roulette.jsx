import { useEffect, useRef, useState } from "react";
import mockMovies from "../../utils/mockMovies";
import "./Roulette.css";

const SPIN_DURATION = 4200;

// Notas demonstrativas para testar os filtros.
// Ainda não são avaliações reais do IMDb.
const DEMO_RATINGS = {
  1: 8.5,
  2: 6.5,
  3: 8.5,
  4: 8.5,
  5: 7.5,
  6: 8.0,
  7: 7.5,
  8: 8.0,
  9: 8.0,
};

const movies = mockMovies.map((movie) => ({
  ...movie,
  demoRating: DEMO_RATINGS[movie.id] ?? 0,
}));

const genres = [
  ...new Set(movies.map((movie) => movie.genre)),
].sort((a, b) => a.localeCompare(b, "pt-BR"));

function Roulette({ onClose }) {
  const [genre, setGenre] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const timerRef = useRef(null);

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      genre === "all" || movie.genre === genre;

    const matchesRating =
      movie.demoRating >= minRating;

    return matchesGenre && matchesRating;
  });

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

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll(
          "button:not(:disabled), select:not(:disabled), input:not(:disabled)"
        )
      );

      const first = focusableElements[0];
      const last = focusableElements[
        focusableElements.length - 1
      ];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timerRef.current);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
      previousFocus?.focus();
    };
  }, [onClose]);

  function handleGenreChange(event) {
    setGenre(event.target.value);
    setSelectedMovie(null);
  }

  function handleRatingChange(event) {
    setMinRating(Number(event.target.value));
    setSelectedMovie(null);
  }

  function handleSpin() {
    if (isSpinning || filteredMovies.length === 0) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * filteredMovies.length
    );

    const movie = filteredMovies[randomIndex];

    // A roda é decorativa: seus segmentos não
    // representam filmes específicos.
    // Cada filme elegível tem a mesma chance.
    const extraRotation = 1800 + Math.random() * 360;

    setSelectedMovie(null);
    setIsSpinning(true);

    setRotation((previous) => {
      return previous + extraRotation;
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setSelectedMovie(movie);
      setIsSpinning(false);
    }, prefersReducedMotion ? 50 : SPIN_DURATION);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="roulette"
      onMouseDown={handleOverlayClick}
    >
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
          <h2
            className="roulette__title"
            id="roulette-title"
          >
            DEIXE A SORTE DECIDIR
            <span className="roulette__title-dot">
              .
            </span>
          </h2>

          <p className="roulette__description">
            Escolha seus filtros e descubra seu
            próximo filme!
          </p>
        </header>

        <div className="roulette__filters">
          <div className="roulette__filter">
            <label
              className="roulette__filter-label"
              htmlFor="roulette-genre"
            >
              GÊNERO
            </label>

            <select
              id="roulette-genre"
              className="roulette__select"
              value={genre}
              onChange={handleGenreChange}
              disabled={isSpinning}
            >
              <option value="all">
                Todos os gêneros
              </option>

              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="roulette__filter">
            <label
              className="roulette__filter-label"
              htmlFor="roulette-rating"
            >
              NOTA MÍNIMA

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

        <p
          className="roulette__filter-count"
          role="status"
        >
          {filteredMovies.length}{" "}
          {filteredMovies.length === 1
            ? "filme disponível para o sorteio"
            : "filmes disponíveis para o sorteio"}
        </p>

        <div className="roulette__main">
          <div className="roulette__wheel-column">
            {filteredMovies.length > 0 ? (
              <div
                className="roulette__wheel-wrapper"
                aria-label="Roleta cinematográfica decorativa"
              >
                <span
                  className="roulette__pointer"
                  aria-hidden="true"
                />

                <div
                  className="roulette__wheel"
                  aria-hidden="true"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div className="roulette__wheel-center">
                    ☺
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="roulette__empty"
                role="status"
              >
                <h3 className="roulette__empty-title">
                  NENHUM FILME ENCONTRADO :(
                </h3>

                <p className="roulette__empty-description">
                  Experimente outro gênero ou
                  diminua a nota mínima.
                </p>
              </div>
            )}

            <button
              className="roulette__spin-button"
              type="button"
              onClick={handleSpin}
              disabled={
                isSpinning ||
                filteredMovies.length === 0
              }
            >
              {isSpinning
                ? "SORTEANDO..."
                : "GIRAR ROLETA ↻"}
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
                <span className="roulette__result-icon">
                  ✦
                </span>

                <p className="roulette__result-label">
                  SORTEANDO...
                </p>

                <p className="roulette__result-placeholder">
                  A sorte está escolhendo
                  seu próximo filme!
                </p>
              </div>
            ) : selectedMovie ? (
              <div className="roulette__result-content">
                <p className="roulette__result-label">
                  SEU PRÓXIMO FILME É
                </p>

                <h3 className="roulette__result-title">
                  {selectedMovie.title}
                </h3>

                <p className="roulette__result-meta">
                  {selectedMovie.year} •{" "}
                  {selectedMovie.genre}
                </p>

                <p className="roulette__result-rating">
                  ★ {selectedMovie.demoRating.toFixed(1)}
                  /10
                  <span> (nota demonstrativa)</span>
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
                <span className="roulette__result-icon">
                  ✦
                </span>

                <p className="roulette__result-label">
                  SEU PRÓXIMO FILME
                </p>

                <h3 className="roulette__result-placeholder">
                  UMA NOVA HISTÓRIA
                  ESTÁ TE ESPERANDO.
                </h3>

                <p className="roulette__result-description">
                  Ajuste os filtros e gire a roleta
                  para descobrir o que assistir.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="roulette__disclaimer">
          A roleta escolhe aleatoriamente entre todos
          os filmes que correspondem aos filtros.
        </p>
      </section>
    </div>
  );
}

export default Roulette;
