const navLinks = document.querySelectorAll(".nav-link");
const operatorDisplay = document.querySelector("#operator");
const numberBtns = document.querySelectorAll(".number");
const backBtn = document.querySelector("#back");
const checkBtn = document.querySelector("#check");

const numDisplay = document.querySelector("#numberOne");
const denDisplay = document.querySelector("#numberTwo");
const answerDisplay = document.querySelector("#answer");

let lastActive = navLinks[0];
let operator = "+";
let equations = []; // keeps a list of equations to do
let answerTime = 3000; // amount of time allowed to answer the equation
let answeredInTime = true; // keeps track of equation being answered within a time frame
let answerTimeout;

makeEquations(operator);
numDisplay.textContent = equations[0].num;
denDisplay.textContent = equations[0].den;


navLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    // toggles active
    lastActive.classList.toggle("active");
    lastActive.classList.toggle("text-secondary");
    this.classList.toggle("active");
    this.classList.toggle("text-secondary");
    lastActive = this;

    // gets current operator
    operator = this.dataset.op;
    operatorDisplay.textContent = this.textContent;

    answerDisplay.textContent = "";
    
    makeEquations(operator);
    numDisplay.textContent = equations[0].num;
    denDisplay.textContent = equations[0].den;
  });
});

numberBtns.forEach(button => {
  button.addEventListener("click", function() {
    answerDisplay.textContent += this.textContent;
  });
});

backBtn.addEventListener("click", () => {
  answerDisplay.textContent = answerDisplay.textContent.slice(0, -1);
});

function timeToAnswer() {
  answeredInTime = false;
}

checkBtn.addEventListener("click", async function() {
  if (Number(answerDisplay.textContent) === equations[0].answer) {
    clearTimeout(answerTimeout);
    if (!answeredInTime) {
      equations.push(equations[0]);
    } else {
      equations.push(getEquation(operator));
    }
    equations.shift();
    answerDisplay.textContent = "???";
    await setTimeout(function() {
      numDisplay.textContent = equations[0].num;
      denDisplay.textContent = equations[0].den;
      answerDisplay.textContent = "";
      answerTimeout = setTimeout(timeToAnswer, answerTime);
    },500);
  } else {
    equations.push(equations[0]);
    equations.shift();
    answerDisplay.textContent = "???";
    await setTimeout(function() {
      numDisplay.textContent = equations[0].num;
      denDisplay.textContent = equations[0].den;
      answerDisplay.textContent = "";
      answerTimeout = setTimeout(timeToAnswer, answerTime);
    },500);
  }
  answeredInTime = true;
});

function makeEquations(operator) {
  equations = [];
  for (let i = 0; i < 4; i++) {
    equations.push(getEquation(operator));
  }
}

function getEquation(operator) {
  let equation = {};
  if (operator === "/") {
    let numOne = Math.floor(Math.random() * 13);
    let numTwo = Math.floor(Math.random() * 12) + 1;
    let answer = numOne * numTwo;
    equation.num = answer;
    equation.den = numTwo;
    equation.answer = numOne;
  } else if (operator === "-") {    
    let numOne = Math.floor(Math.random() * 13);
    let numTwo = Math.floor(Math.random() * 13);
    equation.num = numOne + numTwo;
    equation.den = numTwo;
    equation.answer = numOne;
  } else {
    equation.num = Math.floor(Math.random() * 13);
    equation.den = Math.floor(Math.random() * 13);
    equation.answer = eval(`${equation.num}${operator}${equation.den}`);
  }
  return equation;
}