import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) return;

    onSearch(searchTerm);
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      role="search"
    >

      <div className="search-form__container">
        <input
          id="movie-search"
          className="search-form__input"
          type="search"
          name="movie"
          placeholder="Digite o nome de um filme..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          required
        />

        <button
          className="search-form__button"
          type="submit"
          disabled={!query.trim()}
        >
          BUSCAR
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
