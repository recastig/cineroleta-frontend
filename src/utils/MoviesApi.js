const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

async function request(endpoint, token, options = {}) {
  if (!BASE_URL) {
    throw new Error("A URL da API não foi configurada.");
  }

  let response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Erro na requisição (${response.status}).`
    );
  }

  return data;
}

export function getSavedMovies(token) {
  return request("/movies", token);
}

export function saveMovie(movie, token) {
  return request("/movies", token, {
    method: "POST",
    body: JSON.stringify({
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.description,
      posterPath: movie.posterPath,
      releaseDate: movie.releaseDate,
      voteAverage: movie.rating,
    }),
  });
}

export function deleteSavedMovie(movieId, token) {
  return request(`/movies/${movieId}`, token, {
    method: "DELETE",
  });
}