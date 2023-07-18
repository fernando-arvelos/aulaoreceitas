import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Recipes from '../pages/Recipes';
import { recipesReducerMeals } from './mocks/recipesMealsStore';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';
import { fetch } from '../../cypress/mocks/fetch';

const initialState = {
  exampleReducer: {},
  recipesReducer: {
    error: '',
    meals: [],
    drinks: [],
    mealCategories: [],
    drinkCategories: [],
    filteredMeals: [],
    filteredDrinks: [],
    filterStatus: false,
    lastClickedFilter: '',
  },
  recipeDetailsReducer: {
    error: '',
    recipeDetails: [],
    shareTextStatus: false,
  },
};

describe('Testa a página de receitas', () => {
  it('testa se as 6 categorias de Meals são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/meals');

    const filterCards = await screen.findAllByTestId(/-category-filter/);

    expect(filterCards.length).toBe(6);
  });

  it('testa se as 6 categorias de Drinks são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/drinks');

    const filterCards = await screen.findAllByTestId(/-category-filter/);

    expect(filterCards.length).toBe(6);
  });

  it.only('testa se as 12 primeiras receita de Meals são renderizadas', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(meals),
    // });
    global.fetch = fetch;
    renderWithRouterAndRedux(<App />, '/meals');

    // await waitFor(async () => {
    const singleCard = await screen.findByTestId('0-recipe-card');
    expect(singleCard).toBeInTheDocument();
    // });

    expect(singleCard).toBeInTheDocument();
    expect(recipeCards.length).toBe(12);
  });

  test('testa se as 12 primeiras receitas de Drinks são renderizadas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinks)
        .mockResolvedValue(drinkCategories),
    });
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/drinks');

    const singleCard = await screen.findByTestId('0-recipe-card');
    const drinkCards = await screen.findAllByTestId(/-recipe-card/);

    expect(singleCard).toBeInTheDocument();
    expect(drinkCards.length).toBe(12);
  });
});
