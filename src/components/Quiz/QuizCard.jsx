import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTopicNameFromSlug } from '../../utils/topics';
import Timer from './Timer';
import { FaFlagCheckered, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../../App.css';

export function QuizCard() {
  const { topic: topicSlug } = useParams();
  const topic = getTopicNameFromSlug(topicSlug);
  const location = useLocation();
  const level = new URLSearchParams(location.search).get('level')?.toLowerCase();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://mindduel-app-backend.onrender.com/questions?topic=${encodeURIComponent(topic)}&difficulty=${level}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.slice(0, 3)))
      .catch(error => console.error('Error loading questions:', error));
  }, [topic, level]);

  const postResults = async () => {
    try {
      const response = await fetch('https://mindduel-app-backend.onrender.com/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty: level,
          score,
          total: questions.length,
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving results:', error);
      throw error;
    }
  };

  const finishQuiz = async () => {
    try {
      await postResults();
      navigate('/results', {
        state: { 
          id: result.id,    // from backend response
          userId: result.userId,  // from backend response
          topic,
          difficulty: level,
          score, 
          total: questions.length,
          timestamp: result.timestamp || new Date().toISOString(),
          percentage: Math.round((score / questions.length) * 100)
        }
      });
    } catch (error) {
      // Fallback navigation if POST fails
      navigate('/results', {
        state: { 
          topic,
          difficulty: level,
          score,
          total: questions.length,
          percentage: Math.round((score / questions.length) * 100),
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const handleAnswer = (choiceIndex) => {
    if (answered) return;
    
    setSelectedAnswer(choiceIndex);
    setAnswered(true);
    
    if (choiceIndex === questions[index].answer) {
      setScore(prev => prev + 1);
    }
  };

  if (questions.length === 0) return <div className="loading">Loading questions...</div>;

  const question = questions[index];
  const isLastQuestion = index === questions.length - 1;

  return (
    <div className="page-container">
      <div className="main-card">
        <h2 className="quiz-title">{topic} Quiz - {level.charAt(0).toUpperCase() + level.slice(1)}</h2>
        <div className="nested-card">
          <Timer duration={30} onTimeUp={finishQuiz} />
          
          <h3>Question {index + 1} of {questions.length}</h3>
          <p className="question-text">{question.text}</p>
          
          <div className="choices-container">
            {question.choices.map((choice, i) => (
              <button
                key={i}
                className={`choice-button ${answered ? 
                  i === question.answer ? 'correct-answer' : 
                  selectedAnswer === i ? 'wrong-answer' : '' 
                  : ''}`}
                onClick={() => handleAnswer(i)}
                disabled={answered}
              >
                {choice}
              </button>
            ))}
          </div>

          <div className="quiz-navigation">
            <button 
              className="nav-button"
              onClick={() => {
                setIndex(prev => Math.max(0, prev - 1));
                setAnswered(false);
                setSelectedAnswer(null);
              }}
              disabled={index === 0}
            >
              <FaArrowLeft /> Previous
            </button>
            
            {!isLastQuestion ? (
              <button 
                className="nav-button"
                onClick={() => {
                  setIndex(prev => prev + 1);
                  setAnswered(false);
                  setSelectedAnswer(null);
                }}
                disabled={!answered}
              >
                Next <FaArrowRight />
              </button>
            ) : (
              <button 
                className="finish-button"
                onClick={finishQuiz}
                disabled={!answered && questions.length > 0}
              >
                <FaFlagCheckered /> Finish Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}