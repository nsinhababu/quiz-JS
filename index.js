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
let arr = [];
const wrapper = document.querySelector('.wrapper');
const highScoreContainer = document.querySelector('.high-score-container');
const timerScreen = document.querySelector('.header__timer');

//buttons
const highScoreBtn = document.querySelector('.header__high-score-btn');
const goBackBtn = document.querySelector('.go-back-btn');
const startBtn = document.querySelector('.start-quiz');
const submitBtn = document.querySelector('.submit-btn');
const clrBtn = document.querySelector('.clear-score-btn');
const formInput = document.querySelector('.score__board-name-inp');
const submitForm = document.querySelector('.submit-form');
const main = document.querySelector('.main');
let time = 50;
let myScore = 0;
let questionNumber = 0;
let questionOptionContainer;
let answerStatusDiv;
let finalScore;
let scoreBoard = document.querySelector('.score__board');
const highScoreDisplay = document.querySelector('.high-scores');

let playerObj;

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

const setValues = () => {
  // Setting value of question

  const question = questionOptionContainer.children;
  question[0].innerText = questions[questionNumber].questionText;
  questions[questionNumber].options.forEach((item, index) => {
    question[index + 1].innerText = questions[questionNumber].options[index];
  });
};

// Creates new elements Fn: takes parent elem, tag and class as params
function elementCreator(elementType, ParentElem, newElemClass) {
  const newElem = document.createElement(elementType);
  ParentElem.appendChild(newElem);
  newElem.classList.add(newElemClass);
}

window.addEventListener('DOMContentLoaded', () => {
  timerScreen.innerText = `${time} s`;
  const users = localStorage.getItem('users');
  arr = users ? JSON.parse(users) : [];
});

contentController(highScoreBtn, wrapper, highScoreContainer);
contentController(goBackBtn, highScoreContainer, wrapper);

// start quiz
startBtn.addEventListener('click', () => {
  wrapper.style.display = 'none';
  if (!quizInterval) {
    quizInterval = setInterval(quizTimer, 1000);
  }

  // Creating container for questions and answers
  elementCreator('div', main, 'q-o-container');

  questionOptionContainer = document.querySelector('.q-o-container');
  questionOptionContainer.classList.add('quiz__border-shadow');

  // Question
  elementCreator('h3', questionOptionContainer, 'question-header');

  // //creating correct incorrect div
  // elementCreator('div', questionOptionContainer, 'answer-status');
  // answerStatusDiv = document.querySelector('.answer-status');

  // Adding event listeners to btn and setting value
  questions[questionNumber].options.forEach((item, index) => {
    elementCreator('button', questionOptionContainer, 'options-btn');

    const option = questionOptionContainer.childNodes[index + 1];
    option.addEventListener('click', (e) => {
      if (questionNumber === questions.length - 1) {
        questionOptionContainer.style.display = 'none';
        // scoreBoard = document.querySelector('.score__board');
        scoreBoard.style.display = 'flex';
        finalScore = document.querySelector('.score__board-score');
        finalScore.innerText = myScore;
        return;
      }
      const value = e.target.innerText.toLowerCase();
      const isCorrectAnswer = value === questions[questionNumber].answer;
      if (isCorrectAnswer) {
        myScore += 10;
        // answerStatusDiv.innerText = 'Correct';
        // answerStatusDiv.style.color = 'green';
      } else {
        time -= 10;
        timerScreen.innerText = `${time} s`;
        // answerStatusDiv.innerText = 'Incorrect';
        // answerStatusDiv.style.color = 'red';
      }
      questionNumber++;
      setValues();
    });
  });
  setValues();
});

// submit scores
submitForm.addEventListener('submit', (e) => {
  // debugger;
  e.preventDefault();

  let playerObj = {
    initials: formInput.value,
    score: myScore,
  };
  arr.push(playerObj);
  const arrString = JSON.stringify(arr);
  localStorage.setItem('users', arrString);
  arr = arr.sort((a, b) => {
    return b.score - a.score;
  });
  console.log(arr);
  highScoreContainer.style.display = 'block';
  highScoreDisplay.innerText = `${arr[0].initials} : ${arr[0].score}`;
  scoreBoard.style.display = 'none';
  // console.log(formInput.value);
  // localStorage.setItem('initials', `${formInput.value}:${myScore}`);
  // const score = localStorage.getItem('initials');
  // document.querySelector('.score__board').style.display = 'none';
});

// clear highscores
clrBtn.addEventListener('click', () => {
  localStorage.clear();
  highScoreDisplay.innerText = '';
  console.log(clrBtn);
});
// highScoreDisplay.innerText = `${arr[0].initials} : ${arr[0].score}`;
// console.log(clrBtn);
