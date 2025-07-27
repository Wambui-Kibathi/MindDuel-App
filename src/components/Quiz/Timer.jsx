import { useEffect, useState } from 'react';

export default function Timer({ duration, onTimeUp }) {
    const [time, setTime] = useState(duration);
  
    useEffect(() => {
      if (time === 0) onTimeUp();
      const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }, [time]);
  
    return <div className="timer">Time left: {time}s</div>;
}