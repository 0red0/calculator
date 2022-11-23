let operator: string = "";
let previousValue = "";
let currentValue: string = "";
const nums = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operator");
const backBtn = document.querySelector(".back");
const clrBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const decimal = <HTMLElement>document.querySelector(".decimal");
const previousScreen = <HTMLElement>document.querySelector(".previous");
const currentScreen = <HTMLElement>document.querySelector(".current");

/// Handle numbers input
nums.forEach((n) =>
   n.addEventListener("click", (e: any) => {
      handleNumber(e.target.textContent);
      currentScreen.innerText = currentValue;
   })
);

function handleNumber(num: number) {
   if (currentValue.length <= 12) {
      currentValue += num;
   }
}
/// Handle operators input
operands.forEach((op) =>
   op.addEventListener("click", (e: any) => {
      handleOperand(e.target.name);
      previousScreen.innerText = previousValue + " " + operator;
      currentScreen.innerText = currentValue;
   })
);
function handleOperand(op: string) {
   operator = op;
   previousValue = currentValue;
   currentValue = "";
}
// clear button
clrBtn?.addEventListener("click", () => {
   previousValue = "";
   currentValue = "";
   operator = "";
   previousScreen.textContent = currentValue;
   currentScreen.textContent = currentValue;
});
// Backspace button
backBtn?.addEventListener("click", backSpace);
function backSpace() {
   currentValue = currentValue.slice(0, -1);
   currentScreen.textContent = currentValue;
}
/// Equal button
equalBtn?.addEventListener("click", () => {
   if (currentValue != "" && previousValue != "") {
      calculating();
      previousScreen.innerText = "";
      if (previousValue.length <= 12) {
         currentScreen.innerText = currentValue;
      } else {
         currentScreen.innerText = currentValue.slice(0, 12) + "...";
      }
   }
});

// to Equal >>
function calculating() {
   previousValue = Number(previousValue);
   currentValue = Number(currentValue);
   if (operator === "+") {
      previousValue += currentValue;
   } else if (operator === "-") {
      previousValue -= currentValue;
   } else if (operator === "*") {
      previousValue *= currentValue;
   } else {
      previousValue /= currentValue;
   }
   previousValue = previousValue.toString();
   currentValue = previousValue.toString();
   console.log(previousValue);
}
// Decimal
decimal.addEventListener("click", function () {
   addDecimal();
});
function addDecimal() {
   if (currentValue.includes(".")) return;
   currentValue += ".";
}
