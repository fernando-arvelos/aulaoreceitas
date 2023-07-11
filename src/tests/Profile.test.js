import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste a página de profile', () => {
  test('Testa se os botões de perfil, receitas feitas, receitas favoritas e sair estão na tela.', () => {
    renderWithRouterAndRedux(<Profile />);
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('local storage é limpo após o click', () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'user@example.com' }));

    renderWithRouterAndRedux(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);

    expect(localStorage.getItem('userEmail')).toBeNull();
  });

  test('Testa o redirecionamento para a tela de receitas feitas ao clicar no botão "Done Recipes"', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouterAndRedux(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
