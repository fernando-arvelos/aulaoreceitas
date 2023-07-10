/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Login', () => {
  it('Testa se ocorre a renderização correta da pagina Login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  it('Testa se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByTestId('login-submit-btn');

    expect(buttonEnter).toBeDisabled();
  });

  it('Testa se ao preencher os campos o botão "Enter" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '1234567');

    expect(buttonEnter).toBeEnabled();
  });
});
