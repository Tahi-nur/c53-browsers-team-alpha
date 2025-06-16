import { ANSWERS_LIST_ID } from '../constants.js';
import {SKIP_QUESTION_BUTTON_ID, NEXT_QUESTION_BUTTON_ID } from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
    <h1>${question}</h1>

    <div id="${ANSWERS_LIST_ID}" class="Answer-List">
    </div>
<div class="container-next-buttons">
    <button id="${NEXT_QUESTION_BUTTON_ID}" class="next-question">
      Next question
    </button>
    <button id="${SKIP_QUESTION_BUTTON_ID}" class="skip-question">
      Skip question
    </button>
    </div>
  `;

  return element;
};
