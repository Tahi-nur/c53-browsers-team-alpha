import { quizData } from '../data.js';

/**
 * Create an Answer element
 * @param {string} key - the answer key (e.g., "A", "B")
 * @param {string} answerText - the text for the answer
 * @returns {HTMLElement}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.textContent = `${key}: ${answerText}`;
  element.classList.add('answer-item');

  element.addEventListener('click', () => {
    const correctKey =
      quizData.questions[quizData.currentQuestionIndex].correctAnswer;

    // Prevent multiple clicks
    const allAnswers = document.querySelectorAll('.answer-item');
    if ([...allAnswers].some((el) => el.classList.contains('disabled'))) return;

    allAnswers.forEach((el) => {
      el.classList.add('disabled');
      if (el.textContent.startsWith(correctKey)) {
        el.classList.add('correct');
      }
    });

    if (!element.textContent.startsWith(correctKey)) {
      element.classList.add('incorrect');
    }
  });

  return element;
};
