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

makeEquations(operator);
numDisplay.textContent = equations[0].num;
denDisplay.textContent = equations[0].den;


navLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    // toggles active
    lastActive.classList.toggle("active");
    this.classList.toggle("active");
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

checkBtn.addEventListener("click", async function() {
  if (Number(answerDisplay.textContent) === equations[0].answer) {
    // add some animation for right answer
    equations.push(getEquation(operator));
    equations.shift();

    answerDisplay.textContent = "✔";
    await setTimeout(function() {
      numDisplay.textContent = equations[0].num;
      denDisplay.textContent = equations[0].den;
      answerDisplay.textContent = "";
    },500);

  } else {
    equations.push(equations[0]);
    equations.shift();

    answerDisplay.textContent = "✘";
    await setTimeout(function() {
      numDisplay.textContent = equations[0].num;
      denDisplay.textContent = equations[0].den;
      answerDisplay.textContent = "";
    },500);
  }
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
    let numTwo= Math.floor(Math.random() * 13);
    let answer = numOne * numTwo;
    equation.num = answer;
    equation.den = numTwo;
    equation.answer = numOne;
  } else if (operator === "-") {    
    let numOne = Math.floor(Math.random() * 13);
    let numTwo= Math.floor(Math.random() * 13);
    equation.num = Math.max(numOne, numTwo);
    equation.den = Math.min(numOne, numTwo);
    equation.answer = eval(`${equation.num}${operator}${equation.den}`);
  } else {
    equation.num = Math.floor(Math.random() * 13);
    equation.den = Math.floor(Math.random() * 13);
    equation.answer = eval(`${equation.num}${operator}${equation.den}`);
  }
  return equation;
}