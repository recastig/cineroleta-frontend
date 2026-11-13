import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";

function MovieCardList({
  movies,
  hasMore,
  isLoadingMore,
  onShowMore,
}) {
  return (
    <div className="movie-card-list">
      <div className="movie-card-list__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <button
          className="movie-card-list__button"
          type="button"
          onClick={onShowMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore
            ? "CARREGANDO..."
            : "MOSTRAR MAIS ↓"}
        </button>
      )}
    </div>
  );
}

export default MovieCardList;