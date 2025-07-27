import { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../../App.css';

export default function LightDarkToggle() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  }, []);

  return (
    <button 
      className="icon-button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {document.body.classList.contains('dark-mode') ? (
        <FaSun className="theme-icon" />
      ) : (
        <FaMoon className="theme-icon" />
      )}
    </button>
  );

}