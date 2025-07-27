import { useParams, useNavigate } from 'react-router-dom';
import { getTopicNameFromSlug } from '../../utils/topics';
import '../../App.css';

export function DifficultySelector() {
  const { topic: topicSlug } = useParams();
  const topic = getTopicNameFromSlug(topicSlug);
  const navigate = useNavigate();

  const selectDifficulty = (level) => {
    navigate(`/quiz/${topicSlug}/play?level=${level.toLowerCase()}`);
  };

  return (
    <div className="page-container">
      <div className="main-card">
        <div className="nested-card">
          <h2>Select Difficulty for {topic}</h2>
          <div>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                className="difficulty-button"
                onClick={() => selectDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}