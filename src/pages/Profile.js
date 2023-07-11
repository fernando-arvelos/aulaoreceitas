import React from 'react';

function Profile() {
  return (
    <div>
      <h1>Perfil</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <span id="email" data-testid="profile-email">usuário@example.com</span>
      </div>

      <div>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
