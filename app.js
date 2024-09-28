
let num = [];

let operator = '';
let displayValue = 0;
let floating = 1;
let displayed = false;


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}


function operate(num1, num2, operator) {

    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);

        default:
            return num1;
    }
}


function getNumbers() {

    const numButtons = document.querySelectorAll(".number-btn");

    numButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            displayValue = displayValue || 0;

            if (displayed) {
                displayValue = 0;
                displayed = false;
            }

            if (displayValue < 1e9) {
                if (floating > 1) {

                    if (displayValue >= 0)
                        displayValue += parseFloat(event.target.textContent) / floating;

                    else
                        displayValue -= parseFloat(event.target.textContent) / floating;

                    floating *= 10;
                    displayValue = Math.round(displayValue * floating) / floating;
                }
                else {
                    displayValue *= 10;
                    displayValue += parseFloat(event.target.textContent);
                }
                console.log(displayValue);
            }
            populate();
        });
    });

    const dot = document.querySelector("#dot");

    dot.addEventListener('click', () => {
        if (floating == 1) floating = 10;

    });

    const percent = document.querySelector("#percentage");

    percent.addEventListener('click', () => {
        displayValue /= 100;
        populate();
    });

    const negation = document.querySelector("#negation");

    negation.addEventListener('click', () => {
        displayValue = -displayValue;
        populate();
    });
}

function populate() {
    if (displayValue == Infinity || isNaN(displayValue)) {
        document.querySelector("#display").textContent = "Oops";
    }
    else {
        document.querySelector("#display").textContent = Math.round(displayValue * 1e9) / 1e9;
    }
}


function getOperator() {
    const operatorBtns = document.querySelectorAll(".operation-btn");

    operatorBtns.forEach(button => {
        button.addEventListener('click', (event) => {

            floating = 1;

            num.push(displayValue);

            if (num.length == 2) {
                if (operator == '') operator = event.target.textContent;
                const num2 = num.pop();
                const num1 = num.pop();

                displayValue = operate(num1, num2, operator);
                num.push(displayValue);
                console.log(num1 + operator + num2);
            }

            operator = event.target.textContent;

            populate();
            displayValue = 0;
        });
    });
}

function calculate() {
    const equalBtn = document.querySelector("#equal");

    equalBtn.addEventListener('click', () => {

        floating = 1;

        if (num.length == 1) {
            const num1 = num.pop();
            const num2 = displayValue;

            displayValue = operate(num1, num2, operator);
            console.log(num1 + operator + num2);
            operator = '';
        }

        else if (num.length != 0) {
            const num2 = num.pop();
            const num1 = num.pop();

            displayValue = operate(num1, num2, operator);
            console.log(num1 + operator + num2);
            operator = '';
        }

        displayed = true;
        populate();
    });
}

function reset() {
    const clr = document.querySelector("#clear");

    clr.addEventListener('click', (event) => {
        num = [];
        operator = '';
        displayValue = 0;
        floating = 1;
        populate();
    });
}

function main() {
    getNumbers();
    getOperator();
    calculate();
    reset();
}

main();
