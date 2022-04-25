'use strict';
const Questions = [{
  title: 'Who created the PEP20?',
  answers: ['Tim Berners Lee', 'Robert', 'John Murphy', 'Tim Peters'],
  value: 'D'
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
}, {
  title: 'What keyword is used to create a variable',
  answers: ['var', 'datatype variable name', 'val', 'no keyword is used'],
  value: 'D'
}];


const correctAnswers = ['A'].concat(Questions.map(item => item.value));
const userAnswers = [];
const WRAPPER = document.querySelector('.quiz-content');
const quizGroup = WRAPPER.querySelector('.quiz-group');
const quizheader = quizGroup.querySelector('.quiz-heading');
const divScore = document.querySelector('.score');
const result = [];

const FORM = document.querySelector('form');
const answerDivs = FORM.querySelectorAll('.answer-group');
const PREV = FORM.querySelector('button');
const NEXT = FORM.querySelector('button[type*="mit"');
var count = 0;
const SCORETEXT = document.querySelector('.score-reveal');
FORM.addEventListener('submit', e => {
  e.preventDefault();
  userAnswers.splice(count, 1, FORM.one.value);
  e.target.action = '';
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  if (count < Questions.length) {
    if (!(count < 0)) {
      if (FORM.one.value == correctAnswers[count]) {
        result.push(FORM.one.value);
      }
      answerDivs.forEach((div, index) => {
        const label = div.querySelector('label');
        const input = div.querySelector('input');
        const eachAnswerList = Questions[count].answers;
        quizheader.textContent = Questions[count].title;
        label.textContent = eachAnswerList[index]
      });
      ++count;
    }
  } else if (count == Questions.length) {
    NEXT.textContent = 'Submit';
    localStorage.setItem('result', result.length);
  } else {
    document.location.reload();
  }
});
PREV.addEventListener('click', e => {
  count = count - 1;
  if (count > 0) {
    answerDivs.forEach((div, index) => {
      const label = div.querySelector('label');
      const input = div.querySelector('input');

      const eachAnswerList = Questions[count - 1].answers;
      quizheader.textContent = Questions[count - 1].title;
      label.textContent = eachAnswerList[index]
    })
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    userAnswers.splice(count + 1, 1, FORM.one.value);
    NEXT.textContent = 'Next';
  } else if (count == 0) {
    userAnswers.splice(count + 1, 1, FORM.one.value);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('count', count);
    window.location.reload();
    count = localStorage.getItem('count');
  }
});
NEXT.addEventListener('click', e => {
  if (e.target.textContent.toLowerCase() == 'submit') {
    divScore.classList.add('score');
    divScore.classList.remove('remove');

    divScore.style.cssText = 'display: flex;'
    console.log(localStorage.getItem('result'))
    SCORETEXT.textContent = Math.round((localStorage.getItem('result') / Questions.length) * 100);
  }

});
divScore.addEventListener('click', e => {
  divScore.classList.remove('score');
  divScore.classList.add('remove');
  setTimeout(() => {
    divScore.style.cssText = 'display: none;'
  }, 800)
});