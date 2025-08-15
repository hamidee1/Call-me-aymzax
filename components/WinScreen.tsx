
import React from 'react';
import { Trophy, Repeat } from 'lucide-react';

interface WinScreenProps {
  onPlayAgain: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ onPlayAgain }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
        <Trophy className="w-32 h-32 text-yellow-400 mb-6 drop-shadow-lg"/>
      <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 uppercase mb-4">
        أنت أسطورة!
      </h2>
      <p className="text-xl text-gray-300 mb-10">
        لقد تغلبت على جميع المستويات وأثبتت أنك خبير كرة القدم المطلق!
      </p>
      
      <button
        onClick={onPlayAgain}
        className="flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg shadow-emerald-500/30 transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-400"
      >
        <Repeat className="w-8 h-8"/>
        العب مرة أخرى
      </button>
    </div>
  );
};

export default WinScreen;
