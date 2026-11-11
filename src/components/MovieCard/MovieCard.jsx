import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <div className={`movie-card__poster movie-card__poster--${movie.theme}`}>
        <span className="movie-card__poster-label">
          CINEROLETA
        </span>

        <span className="movie-card__poster-title">
          {movie.title}
        </span>
      </div>

      <div className="movie-card__content">
        <div className="movie-card__metadata">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>

        <h3 className="movie-card__title">
          {movie.title}
        </h3>

        <p className="movie-card__description">
          {movie.description}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
