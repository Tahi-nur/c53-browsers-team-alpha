    import { quizData ,quizState} from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { loadQuizState } from './pages/loadState.js';
import { initQuestionPage } from './pages/questionPage.js';
import { clearQuizState } from './pages/loadState.js';
import { NEXT_QUESTION_BUTTON_ID } from './constants.js';

const loadApp = () => {
  const savedState = loadQuizState();
 
  quizState.currentQuestionIndex=savedState.currentQuestionIndex;
  quizState.answers=savedState.answers;
  quizState.score=savedState.score;
  quizData.currentQuestionIndex = quizState.currentQuestionIndex;
  clearQuizState();
  
console.log(quizState);
 

   const alreadyStarted = Object.keys(quizState.answers).length > 0;
  if (alreadyStarted) {
    if(quizState.answers.hasOwnProperty(quizState.currentQuestionIndex)){
      quizData.hasAnswered=true;
      //const nextButton=document.getElementById(NEXT_QUESTION_BUTTON_ID);
      //nextButton.disabled=false;


    }
 
    // Skip welcome page and go directly to question page
    initQuestionPage(); 
    // <-- You need to import this!
    
  } else {
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);


/*  const savedState = loadQuizState() || {};

  // Fallback to 0 if undefined
  quizData.currentQuestionIndex = savedState.currentQuestionIndex || 0;
  quizState.currentQuestionIndex = savedState.currentQuestionIndex || 0;
  quizState.answers = savedState.answers || {};
  quizState.score = savedState.score || 0;
  const alreadyStarted = Object.keys(quizState.answers).length > 0;
    if (alreadyStarted) {
 
    // Skip welcome page and go directly to question page
    initQuestionPage(); 
    // <-- You need to import this!
    
  } else {
    initWelcomePage();*/

/* import { quizData ,quizState} from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { loadQuizState } from './pages/loadState.js';

const loadApp = () => {
  const savedState = loadQuizState();

  quizData.currentQuestionIndex = 0;

  initWelcomePage();
};

window.addEventListener('load', loadApp);*/







/*  const savedState = loadQuizState();
    quizData.currentQuestionIndex = savedState.currentQuestionIndex;
  quizState.currentQuestionIndex = savedState.currentQuestionIndex;
  quizState.answers = savedState.answers || {};
  quizState.score = savedState.score || 0;
  const alreadyStarted = Object.keys(quizState.answers).length > 0;

  if (alreadyStarted) {
 
    // Skip welcome page and go directly to question page
    initQuestionPage(); 
    // <-- You need to import this!
    
  } else {
    initWelcomePage();
  }*/

    /*    import { quizData ,quizState} from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { loadQuizState } from './pages/loadState.js';

const loadApp = () => {
  const savedState = loadQuizState();

  quizData.currentQuestionIndex = 0;

  initWelcomePage();
};

window.addEventListener('load', loadApp);*/



