import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';

const loadApp = () => {
    initWelcomePage();
};

window.addEventListener('load', loadApp, { once: true }); // Ensure the app loads only once when the window is fully loaded
