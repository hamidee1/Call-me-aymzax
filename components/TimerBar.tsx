
import React from 'react';

interface TimerBarProps {
  duration: number;
  isPaused: boolean;
  onTimeUp: () => void;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, isPaused, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);

  React.useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  React.useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 0.05;
        if (newTime <= 0) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, [timeLeft, isPaused, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  
  const getColor = () => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 shadow-inner">
      <div
        className={`h-4 rounded-full transition-all duration-150 ease-linear ${getColor()}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default TimerBar;
