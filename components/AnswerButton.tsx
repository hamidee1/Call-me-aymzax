
import React from 'react';

interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  isCorrect?: boolean;
  isSelected?: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, onClick, disabled, isCorrect, isSelected }) => {
  const getButtonClass = () => {
    if (disabled && isCorrect) {
      return "bg-green-600 shadow-green-500/50";
    }
    if (disabled && isSelected && !isCorrect) {
      return "bg-red-600 shadow-red-500/50 animate-shake";
    }
    if (disabled) {
      return "bg-gray-700 opacity-60";
    }
    return "bg-gray-800 hover:bg-cyan-700 hover:shadow-cyan-500/40 transform hover:-translate-y-1";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-lg font-semibold text-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${getButtonClass()}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AnswerButton;
