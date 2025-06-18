import { quizData,quizState } from "../data.js";
import { saveQuizState } from "./savestate.js";
export const checkAnswers=(e,isSkipe=false)=>{
    const keyCorrectAnswer=quizData.questions[quizData.currentQuestionIndex].correct;
    const correctAnswer=quizData.questions[quizData.currentQuestionIndex].answers[keyCorrectAnswer];
    const correctAnswerElement=document.getElementById(keyCorrectAnswer);
   
    
    

     if(isSkipe){
        correctAnswerElement.classList.add('correct');
        quizState.answers[quizState.currentQuestionIndex]='${keyCorrectAnswer) user skip this question';
        saveQuizState(quizState);
     }else if(e.target.textContent.trim()===correctAnswer){
      e.target.classList.add('correct');
      quizData.score++;
      quizState.answers[quizState.currentQuestionIndex]=keyCorrectAnswer;
      quizState.score++;
      saveQuizState(quizState);
      console.log(quizState);

     }else{
        correctAnswerElement.classList.add('correct');
        e.target.classList.add('wrong');
        quizState.answers[quizState.currentQuestionIndex]=keyCorrectAnswer;
        saveQuizState(quizState);
        console.log(quizState);
     }


}