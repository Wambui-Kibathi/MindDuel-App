import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

export function RegisterForm() {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    confirmPassword: ''  
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://mindduel-app-backend.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (!data.id) {
        throw new Error('Invalid user data received from server');
      }

      login({
        id: data.id,
        username: data.username,
      });
      
      navigate('/home', { replace: true });  
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">
        <div className="nested-card app-title-card">
          <h1 className="app-title">MIND DUEL</h1>
        </div>
        <div className="nested-card">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Register / Login</h2>
            {error && <p className="error-message">{error}</p>}
            
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              minLength={3}
              maxLength={20}
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
            />
            
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
            
            <button 
              type="submit" 
              disabled={loading || !formData.username || !formData.password || !formData.confirmPassword}
              className="button button-primary"
            >
              {loading ? 'Processing...' : 'Enter Mind Duel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
