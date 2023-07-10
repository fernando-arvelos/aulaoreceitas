import React from 'react';

function Login() {
  return (
    <main>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
        />

        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
        />

        <button type="button" data-testid="login-submit-btn">
          Enter
        </button>
      </div>
    </main>

  );
}

export default Login;
