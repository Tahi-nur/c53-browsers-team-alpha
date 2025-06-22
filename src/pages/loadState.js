export const loadQuizState = () => {
  const saved = localStorage.getItem('quizState');

  if (saved) {
    return JSON.parse(saved);
  } else {
    return {
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
    };
  }
};
export const clearQuizState = () => {
  localStorage.removeItem('quizState');
};
