import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username);

  const handleUpdate = () => {
    fetch(`https://mindduel-app-backend.onrender.com/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((updatedUser) => alert('Username updated to ' + updatedUser.username));
  };

  const handleDelete = () => {
    fetch(`https://mindduel-app-backend.onrender.com/users/${user.id}`, {
      method: 'DELETE',
    }).then(() => {
      logout();
      alert('Account deleted');
    });
  };

  return (
    <div className="profile-form nested-card">
      <div className="profile-field">
        <h2>User Profile</h2>
        <label>
          Username:
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button className="button button-primary" onClick={handleUpdate}>Update</button>
        <button className="button button-secondary" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}