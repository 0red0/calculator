let currentNum = "";
let previousNum = "";
let operator = "";
const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

equal.addEventListener("click", () => {
   if (currentNum != "" && previousNum != "") {
      calculate();
   }
});

clear.addEventListener("click", clearCalculator);

numberButtons.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
   });
});
function handleNumber(number) {
   if (currentNum.length > 11) return;
   currentNum += number;
   currentDisplayNumber.textContent = currentNum;
}

operators.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
   });
});
function handleOperator(op) {
   operator = op;
   previousNum = currentNum;
   previousDisplayNumber.textContent = `${previousNum} ${operator}`;
   currentNum = "";
   currentDisplayNumber.textContent = "";
}

function calculate() {
   previousNum = Number(previousNum);
   currentNum = Number(currentNum);
   if (operator === "+") previousNum += currentNum;
   if (operator === "-") previousNum -= currentNum;
   if (operator === "x") previousNum *= currentNum;
   if (operator === "/") previousNum /= currentNum;
   previousNum = roundNumber(previousNum);
   previousNum = previousNum.toString();
   previousDisplayNumber.textContent = "";
   currentDisplayNumber.textContent = previousNum;
   operator = ``;
   displayResults();
}

function roundNumber(num) {
   return Math.round(num * 100000) / 100000;
}

function displayResults() {
   if (previousNum.length <= 11) {
      currentDisplayNumber.textContent = previousNum;
   } else {
      currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
   }
}

function clearCalculator() {
   currentNum = "";
   previousNum = "";
   operator = "";
   currentDisplayNumber.textContent = "0";
   previousDisplayNumber.textContent = "";
}
