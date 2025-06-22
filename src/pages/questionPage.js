import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SKIP_QUESTION_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { quizState } from '../data.js';
import { saveQuizState } from './savestate.js';
import { checkAnswers } from './checkAnswer.js';
import { clearQuizState } from './loadState.js';
import { initWelcomePage } from './welcomePage.js';
import { resetInMemoryState } from './resetMemory.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);
  console.log(questionElement);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  const skipQuestionButton = document.getElementById(SKIP_QUESTION_BUTTON_ID);
  const nextQuestionButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);

  quizData.hasAnswered
    ? (nextQuestionButton.disabled = false)
    : (nextQuestionButton.disabled = true);

  const answerButtons = answersListElement.querySelectorAll('button');
  answerButtons.forEach((answer) =>
    answer.addEventListener('click', (e) => {
      if (quizData.hasAnswered) return;
      quizData.hasAnswered = true;
      nextQuestionButton.disabled = false;
      handleAnswer(e); // ✅ use corrected function name
    })
  );

  skipQuestionButton.addEventListener('click', (e) => {
    if (quizData.hasAnswered) return;
    quizData.hasAnswered = true;
    skipQuestionButton.disabled = true;
    nextQuestionButton.disabled = false;
    checkAnswers(e, true);
  });

  nextQuestionButton.addEventListener('click', (e) => {
    if (quizData.hasAnswered) {
      nextQuestion();
      quizData.hasAnswered = false;
    }
  });
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  if (quizData.currentQuestionIndex >= quizData.questions.length) {
    clearQuizState();
    resetInMemoryState();
    initWelcomePage();
    return;
  }
  quizState.currentQuestionIndex = quizData.currentQuestionIndex;
  saveQuizState(quizState);
  console.log(quizState);
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

  const nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  if (nextButton) {
    nextButton.classList.remove('hidden');
    nextButton.disabled = false;
  }

  checkAnswers(e); // ✅ include logic from main branch
};
