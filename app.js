
let num1 = 0;
let num2 = 0;
let operator = '';

let displayValue = 0;

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
    }
}

function populate() {
    const numButtons = document.querySelectorAll(".number-btn");

    numButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            
            displayValue = parseInt(document.querySelector("#display").textContent);
            if(displayValue < 1e9){
                displayValue *= 10;
                displayValue += parseInt(event.target.textContent);
            }
            document.querySelector("#display").textContent = displayValue;
        });
    });
    
}

populate();
