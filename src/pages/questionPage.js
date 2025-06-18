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

//let hasAnswered=false;
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
      handelAnswer(e);
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
  //if(quizData.currentQuestionIndex>quizData.questions.length-1) return;

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
const handelAnswer = (e) => {
  checkAnswers(e);
};
