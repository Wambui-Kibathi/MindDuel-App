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
        <div>

        </div>
    );
}