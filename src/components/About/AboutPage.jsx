import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '' // Added confirmation field
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
        // Handle API error messages
        throw new Error(data.message || 'Registration failed');
      }

      // Ensure we have minimum required user data
      if (!data.id) {
        throw new Error('Invalid user data received from server');
      }

      login({
        id: data.id,
        username: data.username,
        // Add any other user data you want to store
      });

      navigate('/home', { replace: true }); // Prevent back navigation to register
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
          <h1 className="app-title">MIND DUEL</h