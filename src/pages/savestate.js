import { quizState } from '../data.js';
export function saveQuizState(state) {
  localStorage.setItem('quizState', JSON.stringify(state));
}
