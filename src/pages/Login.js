import React, { useState } from 'react';
import validator from 'validator';

function Login() {
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState('');

  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
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

  const numberPass = 6;

  return (
    <main>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="Email"
            data-testid="email-input"
            onChange={ (e) => validateEmail(e) }
          />
          <p
            style={ {
              fontWeight: 'bold',
              color: 'red',
            } }
          >
            {emailError}
          </p>

          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ handleChange }
          />

          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ emailValid || password.length <= numberPass }
          >
            Enter
          </button>
        </form>
      </div>
    </main>

  );
}

export default Login;
