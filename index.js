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
let time = 10;

const questionElement = document.querySelector('.question');
let optionsElementArr = Array.from(document.querySelectorAll('.options'));

function contentController(param1, param2, param3) {
  param1.addEventListener('click', () => {
    param2.style.display = 'none';
    param3.style.display = 'block';
  });
}

let quizInterval;

function quizTimer() {
  debugger;
  if (time === 0) {
    clearInterval(quizInterval);
    quizInterval = null;
    console.log('Time up!');
    return;
  }
  time--;
  timerScreen.innerText = `${time} s`;
}

window.addEventListener('DOMContentLoaded', (event) => {
  timerScreen.innerText = `${time} s`;
});

startBtn.addEventListener('click', () => {
  wrapper.style.display = 'none';
  debugger;
  if (!quizInterval) {
    quizInterval = setInterval(quizTimer, 1000);
  }
  questionElement.innerText = questions[0].questionText;
  optionsElementArr.forEach((item, index) => {
    // item.innerText = questions.options[index];
  });
});
contentController(highScoreBtn, wrapper, highScoreContainer);
contentController(goBackBtn, highScoreContainer, wrapper);
