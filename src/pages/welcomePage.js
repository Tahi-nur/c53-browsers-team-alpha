import { USER_INTERFACE_ID } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';

export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  // 👇 Pass a callback to handle the username
  const welcomeElement = createWelcomeElement((userName) => {
    // Store the username (could be in localStorage, or global variable if needed)
    console.log('Username received:', userName);

    // Then move to the quiz page
    initQuestionPage(userName);
  });

  userInterface.appendChild(welcomeElement);
};
