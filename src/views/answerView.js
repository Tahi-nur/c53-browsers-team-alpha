/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('button');
  element.classList.add('answer-button');
  element.id = `${key}`;
  element.innerHTML = `${answerText}`;
  return element;
};
