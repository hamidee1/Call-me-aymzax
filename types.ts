
export enum GameState {
  MENU,
  LOADING,
  PLAYING,
  LEVEL_COMPLETE,
  GAME_OVER,
  GAME_WON,
}

export enum Difficulty {
  EASY = "سهل",
  MEDIUM = "متوسط",
  HARD = "صعب",
  EXPERT = "محترف",
  LEGENDARY = "أسطوري",
}

export interface QuestionData {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}
