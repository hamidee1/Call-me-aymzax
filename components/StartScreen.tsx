
import React from 'react';
import { Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl md:text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
        تحدي كرة القدم
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl">
        هل تعتقد أنك خبير في كرة القدم؟ اختبر معلوماتك عبر خمسة مستويات من الصعوبة وأثبت أنك الأفضل!
      </p>
      <button
        onClick={onStart}
        className="flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg shadow-emerald-500/30 transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-400"
      >
        <Sparkles className="w-8 h-8" />
        إبدأ اللعب
      </button>
    </div>
  );
};

export default StartScreen;
