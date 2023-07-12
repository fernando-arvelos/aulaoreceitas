import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchMealsByIngredients, fetchMealsByName,
  fetchMealsByFirstLetter, fetchDrinksByIngredients,
  fetchDrinksByName, fetchDrinksByFirstLetter } from '../services/Api';

function SearchBar() {
  const location = useLocation();
  const [radioOption, setRadioOption] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [myLocation] = useState(location.pathname);

  useEffect(() => {
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.'); // não conhecia o conceito dessa barra antes do apostrofo por causa do single quote
    }
  }, [recipes]);

  const mealHandleChange = async () => {
    let apiResponse;
    switch (radioOption) {
    case 'ingredient':
      apiResponse = await fetchMealsByIngredients(filterInput);
      break;
    case 'name':
      apiResponse = await fetchMealsByName(filterInput);
      break;
    case 'firstLetter':
      apiResponse = await fetchMealsByFirstLetter(filterInput);
      break;
    default:
    }
    setRecipes(apiResponse);
  };

  const drinkHandleChange = async () => {
    let apiResponse;
    switch (radioOption) {
    case 'ingredient':
      apiResponse = await fetchDrinksByIngredients(filterInput);
      break;
    case 'name':
      apiResponse = await fetchDrinksByName(filterInput);
      break;
    case 'firstLetter':
      apiResponse = await fetchDrinksByFirstLetter(filterInput);
      break;
    default:
    }
    setRecipes(apiResponse);
  };

  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search recipes"
        value={ filterInput }
        onChange={ ({ target }) => setFilterInput(target.value) }
      />
      <label htmlFor="Ingredient">
        <input
          id="Ingredient"
          type="radio"
          name="radioFilter"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setRadioOption(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="Name">
        <input
          id="Name"
          type="radio"
          name="radioFilter"
          value="name"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setRadioOption(target.value) }
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          id="firstLetter"
          type="radio"
          name="radioFilter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setRadioOption(target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ myLocation === '/meals' ? mealHandleChange : drinkHandleChange }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
