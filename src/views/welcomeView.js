import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @param {Function} onStart - callback to run when quiz starts with username
 * @returns {Element}
 */
export const createWelcomeElement = (onStart) => {
  const audio = document.getElementById('quizAudio');

  const element = document.createElement('div');
  element.classList.add('app');
  element.innerHTML = String.raw`
    <div class="start">
      <div class="content">
        <div class="wrapper">
          <input type="text" placeholder="Enter Your Name" id="usernameInput"/>
<code id="errorMsg" style="display: none;">Please enter your name!</code>          <div class="btn">
            <button id="${START_QUIZ_BUTTON_ID}">start quiz</button>
          </div>
        </div>
      </div>
    </div>`;

  const input = element.querySelector('#usernameInput');
  const errorMsg = element.querySelector('#errorMsg');
  const startButton = element.querySelector(`#${START_QUIZ_BUTTON_ID}`);

  // Play audio on input focus
  input.addEventListener('focus', () => {
    if (audio && audio.paused) {
      audio.play();
    }
  });

  // Handle click logic
  startButton.addEventListener('click', () => {
    const username = input.value.trim();

    if (username === '') {
      errorMsg.style.display = 'block';
    } else {
      errorMsg.style.display = 'none';

      // Stop background audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Call the callback to start the quiz
      if (typeof onStart === 'function') {
        onStart(username);
      }
    }
  });

  return element;
};
