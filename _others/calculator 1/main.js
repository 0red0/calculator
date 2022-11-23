var operator = "";
var previousValue = "";
var currentValue = "";
var nums = document.querySelectorAll(".number");
var operands = document.querySelectorAll(".operator");
var backBtn = document.querySelector(".back");
var clrBtn = document.querySelector(".clear");
var equalBtn = document.querySelector(".equal");
var decimal = document.querySelector(".decimal");
var previousScreen = document.querySelector(".previous");
var currentScreen = document.querySelector(".current");
/// Handle numbers input
nums.forEach(function (n) {
    return n.addEventListener("click", function (e) {
        handleNumber(e.target.textContent);
        currentScreen.innerText = currentValue;
    });
});
function handleNumber(num) {
    if (currentValue.length <= 12) {
        currentValue += num;
    }
}
/// Handle operators input
operands.forEach(function (op) {
    return op.addEventListener("click", function (e) {
        handleOperand(e.target.name);
        previousScreen.innerText = previousValue + " " + operator;
        currentScreen.innerText = currentValue;
    });
});
function handleOperand(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}
// clear button
clrBtn === null || clrBtn === void 0 ? void 0 : clrBtn.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
});
// Backspace button
backBtn === null || backBtn === void 0 ? void 0 : backBtn.addEventListener("click", backSpace);
function backSpace() {
    currentValue = currentValue.slice(0, -1);
    currentScreen.textContent = currentValue;
}
/// Equal button
equalBtn === null || equalBtn === void 0 ? void 0 : equalBtn.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
        //to stop NaN output
        calculating();
        previousScreen.innerText = "";
        if (previousValue.length <= 12) {
            currentScreen.innerText = currentValue;
        }
        else {
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
    }
    else if (operator === "-") {
        previousValue -= currentValue;
    }
    else if (operator === "*") {
        previousValue *= currentValue;
    }
    else {
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
    if (currentValue.includes("."))
        return;
    currentValue += ".";
}
