const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

async function request(endpoint, options = {}) {
  if (!BASE_URL) {
    throw new Error('A URL da API não foi configurada.');
  }

  let response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Erro na requisição (${response.status}).`,
    );
  }

  return data;
}

export function signup({ name, email, password }) {
  return request('/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function signin({ email, password }) {
  return request('/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(token) {
  return request('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}