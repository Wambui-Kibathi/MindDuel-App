import { useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

export function ResultsPage() {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  if (!state) {
    return (
      <div className="page-container">
        <div className="main-card">
          <h2>No Results Found</h2>
          <p>Complete a quiz to see your results</p>
          <div className="back-to-start">
            <Link to="/home" className="button button-secondary">
              Back to Topics
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Destructure with fallbacks
  const {
    topic = 'Unknown Topic',
    difficulty = 'unknown',
    score = 0,
    total = 1,
    timestamp = new Date().toISOString()
  } = state;

  const percentage = Math.round((score / total) * 100);
  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <div className="page-container">
      <div className="main-card">
        <h2>Quiz Results</h2>
        <div className="results-container">
          <div className="nested-card">
            <h3>{topic} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h3>
            
            <div className="score-display">
              <p className="score-text">{score}/{total}</p>
              <p className="percentage-text">{percentage}%</p>
            </div>

            <div className="results-details">
              <p><strong>User:</strong> {user?.username || 'Guest'}</p>
              <p><strong>Completed:</strong> {formattedDate}</p>
            </div>

            <div className="results-actions">
              <Link to={`/difficulty/${topic.toLowerCase().replace(' ', '-')}`} 
                className="button button-secondary">
                Try Again
              </Link>
              <Link to="/home" className="button button-primary">
                New Topic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}