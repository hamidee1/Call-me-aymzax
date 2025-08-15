
import React, { useState, useCallback } from 'react';
import { GameState, Difficulty, QuestionData } from './types';
import { LEVELS, QUESTIONS_PER_LEVEL, SCORE_TO_PASS } from './constants';
import { fetchFootballQuestions } from './services/geminiService';

import StartScreen from './components/StartScreen';
import LoadingSpinner from './components/LoadingSpinner';
import GameScreen from './components/GameScreen';
import LevelCompleteScreen from './components/LevelCompleteScreen';
import GameOverScreen from './components/GameOverScreen';
import WinScreen from './components/WinScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [lastScore, setLastScore] = useState(0);

  const loadQuestionsForLevel = useCallback(async (levelIndex: number) => {
    setGameState(GameState.LOADING);
    const level = LEVELS[levelIndex];
    try {
      const fetchedQuestions = await fetchFootballQuestions(level);
      setQuestions(fetchedQuestions);
      setGameState(GameState.PLAYING);
    } catch (error) {
      console.error("Failed to load questions, returning to menu.", error);
      setGameState(GameState.MENU);
      // Here you could add a user-facing error message
    }
  }, []);

  const handleStartGame = () => {
    setCurrentLevelIndex(0);
    loadQuestionsForLevel(0);
  };
  
  const handleRestart = () => {
    setGameState(GameState.MENU);
  };

  const handleLevelComplete = (score: number) => {
    setLastScore(score);
    if (score >= SCORE_TO_PASS) {
      if (currentLevelIndex >= LEVELS.length - 1) {
        setGameState(GameState.GAME_WON);
      } else {
        setGameState(GameState.LEVEL_COMPLETE);
      }
    } else {
      setGameState(GameState.GAME_OVER);
    }
  };
  
  const handleNextLevel = () => {
      const nextLevelIndex = currentLevelIndex + 1;
      setCurrentLevelIndex(nextLevelIndex);
      loadQuestionsForLevel(nextLevelIndex);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.MENU:
        return <StartScreen onStart={handleStartGame} />;
      case GameState.LOADING:
        return <LoadingSpinner />;
      case GameState.PLAYING:
        return <GameScreen questions={questions} level={LEVELS[currentLevelIndex]} onLevelComplete={handleLevelComplete} />;
      case GameState.LEVEL_COMPLETE:
        return <LevelCompleteScreen score={lastScore} totalQuestions={QUESTIONS_PER_LEVEL} onNextLevel={handleNextLevel} />;
      case GameState.GAME_OVER:
        return <GameOverScreen onRestart={handleRestart} />;
      case GameState.GAME_WON:
        return <WinScreen onPlayAgain={handleRestart} />;
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {renderContent()}
    </main>
  );
};

export default App;
