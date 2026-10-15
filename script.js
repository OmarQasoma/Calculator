const screen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let firstOperand = null;
let pendingOperator = null;
let waitingForOperand = false;

function updateScreen(value) {
    screen.value = String(value);
}

function inputDigit(digit) {
    if (waitingForOperand || screen.value === '0' || screen.value === 'Error') {
        updateScreen(digit);
        waitingForOperand = false;
        return;
    }

    updateScreen(screen.value + digit);
}

function inputDecimal() {
    if (waitingForOperand || screen.value === 'Error') {
        updateScreen('0.');
        waitingForOperand = false;
    } else if (!screen.value.includes('.')) {
        updateScreen(screen.value + '.');
    }
}

function calculate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+': return firstNumber + secondNumber;
        case '-': return firstNumber - secondNumber;
        case '*': return firstNumber * secondNumber;
        case '/': return secondNumber === 0 ? null : firstNumber / secondNumber;
        default: return secondNumber;
    }
}

function showResult(result) {
    if (result === null || !Number.isFinite(result)) {
        updateScreen('Error');
        firstOperand = null;
        pendingOperator = null;
        waitingForOperand = true;
        return false;
    }

    updateScreen(Number(result.toPrecision(12)));
    return true;
}

function performCalculation() {
    if (pendingOperator === null || waitingForOperand) return;

    const result = calculate(firstOperand, Number(screen.value), pendingOperator);
    if (showResult(result)) firstOperand = result;
    pendingOperator = null;
    waitingForOperand = true;
}

function chooseOperator(operator) {
    if (screen.value === 'Error') return;

    const currentValue = Number(screen.value);
    if (pendingOperator !== null && !waitingForOperand) {
        const result = calculate(firstOperand, currentValue, pendingOperator);
        if (!showResult(result)) return;
        firstOperand = result;
    } else if (firstOperand === null || pendingOperator === null) {
        firstOperand = currentValue;
    }

    pendingOperator = operator;
    waitingForOperand = true;
}

function clearCalculator() {
    updateScreen('0');
    firstOperand = null;
    pendingOperator = null;
    waitingForOperand = false;
}

keys.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !keys.contains(button)) return;

    if (button.classList.contains('a-c')) clearCalculator();
    else if (button.classList.contains('operator')) chooseOperator(button.value);
    else if (button.classList.contains('equal-sign')) performCalculation();
    else if (button.value === '.') inputDecimal();
    else inputDigit(button.value);
});

document.addEventListener('keydown', event => {
    const key = event.key;

    if (/^[0-9]$/.test(key)) inputDigit(key);
    else if (key === '.') inputDecimal();
    else if (['+', '-', '*', '/'].includes(key)) chooseOperator(key);
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        performCalculation();
    } else if (key === 'Escape' || key === 'Delete') clearCalculator();
});
