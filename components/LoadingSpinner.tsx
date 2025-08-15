
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="text-xl font-semibold text-cyan-300">جاري تحضير الأسئلة...</p>
    </div>
  );
};

export default LoadingSpinner;
