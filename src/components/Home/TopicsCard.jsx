import { Link } from 'react-router-dom';
import { getSlugFromTopicName } from '../../utils/topics';
import '../../App.css';

export function TopicsCard() {
  const topics = ['General Knowledge', 'Literature', 'Art', 'Entertainment'];

  return (
    <div className="page-container">
      <div className="main-card">
        <h2>Select a Topic</h2>
        <div className="topics-grid">
          {topics.map((topic) => {
            const slug = getSlugFromTopicName(topic);
            return (
              <Link 
                key={topic} 
                to={`/difficulty/${slug}`} 
                className="topic-card"
              >
                {topic}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}