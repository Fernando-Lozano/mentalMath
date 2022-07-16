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

let num = Math.floor(Math.random() * 13);
let den = Math.floor(Math.random() * 13);
let answer = eval(`${num}${operator}${den}`);

numDisplay.textContent = num;
denDisplay.textContent = den;

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
    
    if (operator === "/") {
      num = Math.floor(Math.random() * 13);
      den = Math.floor(Math.random() * 13);
      answer = eval(`${num}*${den}`);
  
      numDisplay.textContent = answer;
      denDisplay.textContent = den;
    } else {
      num = Math.floor(Math.random() * 13);
      den = Math.floor(Math.random() * 13);
      answer = eval(`${num}${operator}${den}`);
  
      numDisplay.textContent = num;
      denDisplay.textContent = den;
    }
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

checkBtn.addEventListener("click", () => {
  if (Number(answerDisplay.textContent) === answer) {
    // add some animation for right answer
  } else {
    // add some animation for wrong answer
    // add equation to end of array
  }
});

// the idea for speeding up mental math here is to have ones you get wrong added to the list of upcoming equations
// I will have a list of 6 equations in an array at any given time
// for now, when operator is switched, the array will be re-populated