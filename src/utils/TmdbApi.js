const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function checkResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.status_message ||
      `Não foi possível carregar os filmes. Erro ${response.status}.`
    );
  }

  return data;
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date
      ? movie.release_date.slice(0, 4)
      : "Ano desconhecido",
    description:
      movie.overview || "Sinopse não disponível.",
    rating: movie.vote_average,
    genreIds: movie.genre_ids || [],
    posterUrl: movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : null,
  };
}

export async function searchMovies(
  query,
  page = 1,
  signal
) {
  if (!API_KEY) {
    throw new Error(
      "Configure a chave da API TMDB no .env.local."
    );
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    language: "pt-BR",
    include_adult: "false",
    page: String(page),
  });

  const response = await fetch(
    `${API_URL}/search/movie?${params.toString()}`,
    { signal }
  );

  const data = await checkResponse(response);

  return {
    movies: data.results.map(normalizeMovie),
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}