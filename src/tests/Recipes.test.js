import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Recipes from '../pages/Recipes';

describe('Testa a página de receitas', () => {
  it('testa se as 5 categorias de Meals são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/meals');

    const filterCards = await screen.findAllByTestId(/-category-filter/);

    expect(filterCards.length).toBe(5);
  });

  it('testa se as 5 categorias de Drinks são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/drinks');

    const filterCards = await screen.findAllByTestId(/-category-filter/);

    expect(filterCards.length).toBe(5);
  });

  it('testa se as 12 primeiras receita de Meals são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/meals');

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    const singleCard = await screen.findByTestId('0-recipe-card');

    expect(singleCard).toBeInTheDocument();
    expect(recipeCards.length).toBe(12);
  });

  test('testa se as 12 primeiras receitas de Drinks são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/drinks');

    const singleCard = await screen.findByTestId('0-recipe-card');
    const drinkCards = await screen.findAllByTestId(/-recipe-card/);

    expect(singleCard).toBeInTheDocument();
    expect(drinkCards.length).toBe(12);
  });
});
