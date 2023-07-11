import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import tomate from '../images/tomate.png';
import logo from '../images/logoRecipesApp.png';

function Login() {
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);

    if (validator.isEmail(value)) {
      setEmailError('');
      setEmailValid(false);
    } else {
      setEmailError('Digite um e-mail válido!');
      setEmailValid(true);
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setPassword(
      value,
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const numberPass = 6;

  return (
    <main className="flex flex-col items-center h-screen bg-img">

      <div className="mt-20">
        <img src={ logo } alt="logo" className="w-[198px]" />
      </div>

      <div className="my-1">
        <img src={ tomate } alt="logo" className="w-[458px]" />
      </div>

      <div className="flex flex-col mt-1">

        <h1 className="title-login">
          Login
        </h1>

        <div>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              data-testid="email-input"
              className="input-login"
              onChange={ (e) => validateEmail(e) }
            />
            <p
              className="text-red-500 text-xs font-semibold italic"
            >
              {emailError}
            </p>

            <input
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              className="input-login my-2 "
              onChange={ handleChange }
            />

            <button
              type="submit"
              data-testid="login-submit-btn"
              className="button-login"
              disabled={ emailValid || password.length <= numberPass }
              onClick={ handleClick }
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </main>

  );
}

export default Login;
