const questions = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    answer: '3. alerts',
  },
  {
    questionText: 'Arrays in JavaScript can be used to store ______.',
    options: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    answer: '4. all of the above',
  },
  {
    questionText:
      'String values must be enclosed within _____ when being assigned to variables.',
    options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
    answer: '3. quotes',
  },
  {
    questionText:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    options: [
      '1. JavaScript',
      '2. terminal/bash',
      '3. for loops',
      '4. console.log',
    ],
    answer: '4. console.log',
  },
  {
    questionText:
      'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
    options: ['1. break', '2. stop', '3. halt', '4. exit'],
    answer: '1. break',
  },
];

const wrapper = document.querySelector('.wrapper');
const highScoreContainer = document.querySelector('.high-score-container');
const timerScreen = document.querySelector('.header__timer');
const highScoreBtn = document.querySelector('.header__high-score-btn');
const goBackBtn = document.querySelector('.go-back-btn');
const startBtn = document.querySelector('.start-quiz');
const main = document.querySelector('.main');
let time = 10;
let questionNumber = 0;
let clickDecidingNumber = 0;
let questionOptionContainer;
let questionElement;
let optionElement;
let optionBtn;

function contentController(param1, param2, param3) {
  param1.addEventListener('click', () => {
    param2.style.display = 'none';
    param3.style.display = 'block';
  });
}

let quizInterval;

function quizTimer() {
  if (time === 0) {
    clearInterval(quizInterval);
    quizInterval = null;
    return;
  }
  time--;
  timerScreen.innerText = `${time} s`;
}

function elementCreator(elementType, newElem, ParentElem, newElemClass) {
  newElem = document.createElement(elementType);
  ParentElem.appendChild(newElem);
  newElem.classList.add(newElemClass);
}

window.addEventListener('DOMContentLoaded', (event) => {
  timerScreen.innerText = `${time} s`;
});

contentController(highScoreBtn, wrapper, highScoreContainer);
contentController(goBackBtn, highScoreContainer, wrapper);

startBtn.addEventListener('click', () => {
  wrapper.style.display = 'none';
  if (!quizInterval) {
    quizInterval = setInterval(quizTimer, 1000);
  }

  elementCreator('div', questionOptionContainer, main, 'q-o-container');
  questionOptionContainer = document.querySelector('.q-o-container');
  questionOptionContainer.classList.add('quiz__border-shadow');

  elementCreator(
    'p',
    questionElement,
    questionOptionContainer,
    'question-para'
  );

  document.querySelector('.question-para').innerText =
    questions[questionNumber].questionText;

  questions[questionNumber].options.forEach((item, index) => {
    elementCreator('p', optionElement, questionOptionContainer, 'options-para');

    document.querySelectorAll('.options-para')[index].innerText =
      questions[questionNumber].options[index];
  });
  clickDecidingNumber++;
});

if (clickDecidingNumber === 1) {
  optionBtn = document.querySelectorAll('.options-para');
  for (let i in optionBtn) {
    optionBtn[i].addEventListener('click', () => {
      questionNumber++;
      console.log(questionNumber);
    });
  }
}
