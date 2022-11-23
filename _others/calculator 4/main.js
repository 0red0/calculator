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

decimal.addEventListener("click", () => {
   addDecimal();
});

numberButtons.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
   });
});
function handleNumber(number) {
   if (previousNum !== "" && currentNum !== "" && operator === "") {
      previousNum = "";
      currentDisplayNumber.textContent = currentNum;
   }
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
   if (previousNum === "") {
      previousNum = currentNum;
      operatorCheck(op);
   } else if (currentNum === "") {
      operatorCheck(op);
   } else {
      calculate();
      operatorCheck(op);
   }
}

function operatorCheck(text) {
   operator = text;
   previousDisplayNumber.textContent = `${previousNum} ${operator}`;
   currentDisplayNumber.textContent = "0";
   currentNum = "";
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
   previousDisplayNumber.textContent = "";
   operator = "";
   currentNum = "";
}

function clearCalculator() {
   currentNum = "";
   previousNum = "";
   operator = "";
   currentDisplayNumber.textContent = "0";
   previousDisplayNumber.textContent = "";
}

function addDecimal() {
   if (!currentNum.includes(".")) {
      currentNum += ".";
      currentDisplayNumber.textContent = currentNum;
   }
}

// keyboard usage

window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
   e.preventDefault();
   if (e.key >= 0 && e.key <= 9) {
      handleNumber(e.key);
   }
   if (
      e.key === "Enter" ||
      (e.key === "=" && currentNum != "" && previousNum != "")
   ) {
      calculate();
   }
   if (e.key === "+" || e.key === "-" || e.key === "/") {
      handleOperator(e.key);
   }
   if (e.key === "*") {
      handleOperator("x");
   }
   if (e.key === ".") {
      addDecimal();
   }
   if (e.key === "Backspace") {
      currentNum = currentNum.slice(0, -1);
      currentDisplayNumber.textContent = currentNum;
   }
}
