
import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameOverScreenProps {
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-7xl font-black text-red-500 uppercase mb-4">انتهت اللعبة</h2>
      <p className="text-xl text-gray-300 mb-8">حظ أوفر في المرة القادمة!</p>
      
      <div className="bg-gray-800 rounded-full p-3 shadow-2xl mb-8 border-4 border-red-500">
          <img 
            src={`https://picsum.photos/seed/laughing-player/300/300`} 
            alt="Laughing Football Player"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
          />
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-3 bg-gradient-to-br from-yellow-500 to-orange-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg shadow-orange-500/30 transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        <RotateCcw className="w-8 h-8"/>
        حاول مرة أخرى
      </button>
    </div>
  );
};

export default GameOverScreen;
