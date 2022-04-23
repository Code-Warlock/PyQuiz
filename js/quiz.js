'use strict';
const Questions = [{
  title: 'Who created the PEP20?',
  answers: ['Tim Berners Lee', 'Robert', 'John Murphy', 'Tim Peters'],
  value: 'A'
}, {
  title: 'PEP20 is also known as ...?',
  answers: ['The Zen of Python', 'The foobar to Python', 'PyDocs of PEP', 'Module Stratarium'],
  value: 'A'
}, {
  title: 'Who created Python?',
  answers: ['Van der Waals', 'Guido van Rossum', 'Denis Ritchie', 'Bell Laboratories'],
  value: 'B'
}, {
  title: 'Python was named from ...?',
  answers: ['JAVA', 'CoffeeScript', 'A comedy show', 'A snake'],
  value: 'C'
},{
  title: 'What keyword is used to create a variable',
  answers: ['JAVA', 'CoffeeScript', 'A comedy show', 'A snake'],
  value: 'C'
}];


let correctAnswers = ['A'].concat(Questions.map(item => item.value));
let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers'));
const WRAPPER = document.querySelector('.quiz-content');
let quizGroup = WRAPPER.querySelector('.quiz-group');
let quizheader = quizGroup.querySelector('.quiz-heading');
let result = [];

const FORM = document.querySelector('form');
let answerDivs = FORM.querySelectorAll('.answer-group');
const BUTTON = FORM.querySelector('button');
var count = 0;
FORM.addEventListener('submit', e => {
  e.preventDefault();
  userAnswers.splice(count, 1, FORM.one.value);
  e.target.action = '';
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  if (count <= Questions.length) {
    if (!(count < 0)) {
      if (FORM.one.value == correctAnswers[count]) {
        result.push(FORM.one.value);
      }
      answerDivs.forEach((div, index) => {
        let label = div.querySelector('label');
        let input = div.querySelector('input');
        let eachAnswerList = Questions[count].answers;
        quizheader.textContent = Questions[count].title;
        label.textContent = eachAnswerList[index]
      });
      console.log(userAnswers);
      ++count;
      console.log(count);
    }
  }
});
BUTTON.addEventListener('click', e => {
  count = count - 1;
  if (count > 0) {
    answerDivs.forEach((div, index) => {
      let label = div.querySelector('label');
      let input = div.querySelector('input');
      let eachAnswerList = Questions[count - 1].answers;
      quizheader.textContent = Questions[count - 1].title;
      label.textContent = eachAnswerList[index]
    })
    console.log(count);
    sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    userAnswers.splice(count + 1, 1, FORM.one.value);
  } else if (count == 0) {
    userAnswers.splice(count + 1, 1, FORM.one.value);
    sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    sessionStorage.setItem('count', count);
    window.location.href = '';
    count = sessionStorage.getItem('count');
  }
  console.log(userAnswers);
});

// setTimeout(() => {
  
// }, 1000);