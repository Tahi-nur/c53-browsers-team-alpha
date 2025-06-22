import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};
const handleAnswer = (e) => {
  const clickedButton = e.target;
  const selectedKey = clickedButton.textContent[0]; // assumes "A: Answer text"
  const correctKey = quizData.questions[quizData.currentQuestionIndex].correctAnswer;

  const answerButtons = document.querySelectorAll(`#${ANSWERS_LIST_ID} button`);

  answerButtons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add('disabled');

    const btnKey = btn.textContent[0];
    if (btnKey === correctKey) {
      btn.classList.add('correct');
    } else if (btn === clickedButton && btnKey !== correctKey) {
      btn.classList.add('incorrect');
    }
  });

  // Show the "Next" button after answering
  const nextButton = document.getElementById(NEXT_BUTTON_ID);
  if (nextButton) {
    nextButton.classList.remove('hidden');
    nextButton.disabled = false;
  }
};
