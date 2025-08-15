
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LevelCompleteScreenProps {
  score: number;
  totalQuestions: number;
  onNextLevel: () => void;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ score, totalQuestions, onNextLevel }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-6xl font-black text-emerald-400 uppercase mb-4">أحسنت!</h2>
      <p className="text-2xl text-gray-200 mb-2">لقد أكملت المستوى بنجاح.</p>
      <p className="text-4xl font-bold text-white mb-8">
        نتيجتك: <span className="text-yellow-400">{score}</span> / {totalQuestions}
      </p>
      
      <button
        onClick={onNextLevel}
        className="flex items-center gap-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg shadow-cyan-500/30 transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-400"
      >
        المستوى التالي
        <ArrowRight className="w-8 h-8"/>
      </button>
    </div>
  );
};

export default LevelCompleteScreen;
