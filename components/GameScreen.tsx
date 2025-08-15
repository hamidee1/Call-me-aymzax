
import React, { useState, useEffect, useMemo } from 'react';
import { QuestionData, Difficulty } from '../types';
import { QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from '../constants';
import AnswerButton from './AnswerButton';
import TimerBar from './TimerBar';

interface GameScreenProps {
  questions: QuestionData[];
  level: Difficulty;
  onLevelComplete: (score: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const GameScreen: React.FC<GameScreenProps> = ({ questions, level, onLevelComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffleArray([currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers]);
  }, [currentQuestion]);
  
  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS_PER_LEVEL - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimerKey(prev => prev + 1);
    } else {
      onLevelComplete(score);
    }
  };

  if (!currentQuestion) {
    return <div>تحميل السؤال...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-cyan-400">المستوى: {level}</div>
        <div className="text-2xl font-bold text-emerald-400">النقاط: {score}</div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
            <h2 className="text-xl font-bold text-gray-300">سؤال {currentQuestionIndex + 1} من {QUESTIONS_PER_LEVEL}</h2>
        </div>
        <TimerBar key={timerKey} duration={TIME_PER_QUESTION} isPaused={isAnswered} onTimeUp={handleTimeUp} />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg mb-8 min-h-[120px] flex items-center justify-center">
        <p className="text-2xl md:text-3xl font-semibold text-center text-white" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <AnswerButton
            key={index}
            text={answer}
            onClick={() => handleAnswer(answer)}
            disabled={isAnswered}
            isSelected={selectedAnswer === answer}
            isCorrect={isAnswered && answer === currentQuestion.correctAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
