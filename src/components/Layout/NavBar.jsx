import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // User icon
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LightDarkToggle from './LightDarkToggle';
import '../../App.css';

export function NavBar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="app-title">Mind Duel</h1>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <LightDarkToggle />
        {user && (
          <Link to="/profile" className="icon-link">
            <FaUserCircle className="user-icon" />
          </Link>
        )}
      </div>
    </nav>
  );
}