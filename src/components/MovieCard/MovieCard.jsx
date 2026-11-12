import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        {movie.posterUrl ? (
          <img
            className="movie-card__image"
            src={movie.posterUrl}
            alt={`Pôster de ${movie.title}`}
            loading="lazy"
          />
        ) : (
          <div className="movie-card__no-poster">
            <span>CINEROLETA</span>
            <strong>{movie.title}</strong>
          </div>
        )}
      </div>

      <div className="movie-card__content">
        <div className="movie-card__metadata">
          <span>{movie.year}</span>

          {typeof movie.rating === "number" && (
            <span>
              ★ {movie.rating.toFixed(1)}/10 TMDB
            </span>
          )}
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
