import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";
import "../Explore/Explore.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Favorites({
  savedMovies,
  favoriteIds,
  favoriteLoadingIds,
  favoritesError,
  onFavoriteClick,
  isFavoritesLoading = false,
}) {
  const movies = savedMovies.map((movie) => ({
    id: movie.tmdbId,
    title: movie.title,
    year: movie.releaseDate
      ? movie.releaseDate.slice(0, 4)
      : "Ano desconhecido",
    description: movie.overview || "Sinopse não disponível.",
    rating: movie.voteAverage,
    posterUrl: movie.posterPath ? `${IMAGE_URL}${movie.posterPath}` : null,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
  }));

  return (
    <main className="explore">
      <section className="explore__hero">
        <h1 className="explore__title">
          FAVORITOS
          <span className="explore__dot">:</span>
        </h1>
      </section>

      <section className="explore__results" aria-live="polite">
        {favoritesError && (
          <p className="explore__status" role="alert">
            {favoritesError}
          </p>
        )}

        {isFavoritesLoading ? (
          <Preloader />
        ) : movies.length === 0 ? (
          <p className="explore__status">
            Você ainda não adicionou filmes aos favoritos.
          </p>
        ) : (
          <MovieCardList
            movies={movies}
            favoriteIds={favoriteIds}
            favoriteLoadingIds={favoriteLoadingIds}
            onFavoriteClick={onFavoriteClick}
          />
        )}
      </section>
    </main>
  );
}

export default Favorites;
