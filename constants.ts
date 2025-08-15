
import { Difficulty } from './types';

export const QUESTIONS_PER_LEVEL = 7;
export const SCORE_TO_PASS = 5;
export const TIME_PER_QUESTION = 10; // in seconds

export const LEVELS: Difficulty[] = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
  Difficulty.LEGENDARY,
];
