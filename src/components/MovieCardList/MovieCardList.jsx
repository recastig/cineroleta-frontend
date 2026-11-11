import { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";

const MOVIES_PER_PAGE = 3;

function MovieCardList({ movies }) {
  const [visibleCount, setVisibleCount] = useState(MOVIES_PER_PAGE);

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMoreMovies = visibleCount < movies.length;

  function handleShowMore() {
    setVisibleCount((previousCount) =>
      previousCount + MOVIES_PER_PAGE
    );
  }

  return (
    <div className="movie-card-list">
      <div className="movie-card-list__grid">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMoreMovies && (
        <button
          className="movie-card-list__button"
          type="button"
          onClick={handleShowMore}
        >
          MOSTRAR MAIS ↓
        </button>
      )}
    </div>
  );
}

export default MovieCardList;
