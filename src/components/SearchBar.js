import React from 'react';

function SearchBar() {
  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
      />
      <label htmlFor="Ingredient">
        Ingredient
        <input
          type="radio"
          name="radioFilter"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          type="radio"
          name="radioFilter"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          type="radio"
          name="radioFilter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
