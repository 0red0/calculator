class Calculator {
   constructor(previousOperandText, currentOperandText) {
      this.previousOperandText = previousOperandText;
      this.currentOperandText = currentOperandText;
      this.clear();
   }
   clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;
   }
   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }
   appendNumber(n) {
      if (n === "." && this.currentOperand.includes(".")) return;
      this.currentOperand = this.currentOperand.toString() + n.toString();
   }
   chooseOperation(operation) {
      if (this.currentOperand === "") return;
      if (this.previousOperand !== "") this.compute();
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
   }
   compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
         case "+":
            computation = prev + curr;
            break;
         case "-":
            computation = prev - curr;
            break;
         case "*":
            computation = prev * curr;
            break;
         case "/":
            computation = prev / curr;
            break;
         default:
            return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = "";
   }
   getDisplayNumber(n) {
      const stringNumber = n.toString();
      const intergerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let intergerDisplay;
      if (isNaN(intergerDigits)) {
         intergerDisplay = "";
      } else {
         intergerDisplay = intergerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
         });
      }
      if (decimalDigits != null) {
         return `${intergerDisplay}.${decimalDigits}`;
      } else {
         return intergerDisplay;
      }

      // const floatNumber = parseFloat(n);
      // if (isNaN(floatNumber)) return "";
      // return floatNumber.toLocaleString("en");
   }
   updateDisplay() {
      this.currentOperandText.innerText = this.getDisplayNumber(
         this.currentOperand
      );
      if (this.operation != null) {
         this.previousOperandText.innerText = `${this.getDisplayNumber(
            this.previousOperand
         )} ${this.operation}`;
      } else {
         this.previousOperandText.innerText = "";
      }
   }
}

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equal");
const allClearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".back");
const previousOperandText = document.querySelector("#screen .previous-operand");
const currentOperandText = document.querySelector("#screen .current-operand");

const calculator = new Calculator(previousOperandText, currentOperandText);

/// Handle numbers
numberBtns.forEach((btn) => {
   btn.addEventListener("click", () => {
      calculator.appendNumber(btn.innerText);
      calculator.updateDisplay();
   });
});

/// Handle operations
operatorBtns.forEach((btn) => {
   btn.addEventListener("click", () => {
      calculator.chooseOperation(btn.name);
      calculator.updateDisplay();
   });
});

/// Compute
equalsBtn.addEventListener("click", (btn) => {
   calculator.compute();
   calculator.updateDisplay();
});

/// Clear
allClearBtn.addEventListener("click", (btn) => {
   calculator.clear();
   calculator.updateDisplay();
});

/// Delete - backspace
deleteBtn.addEventListener("click", (btn) => {
   calculator.delete();
   calculator.updateDisplay();
});
document.addEventListener("keydown", (e) => {
   if (e.key == "Backspace") {
      calculator.delete();
      calculator.updateDisplay();
   }
});
