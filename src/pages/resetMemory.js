import { quizData, quizState } from '../data.js';
export const resetInMemoryState = () => {
  quizData.currentQuestionIndex = 0;
  quizState.currentQuestionIndex = 0;
};
