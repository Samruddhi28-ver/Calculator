 // Select all buttons and the input display
const buttons = document.querySelectorAll('.button');
const input = document.querySelector('.input');

// Initialize variables
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay(value) {
    input.value = value || '0';
}

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (!isNaN(buttonValue) || buttonValue === '.') {
        // Number or decimal
        if (buttonValue === '.' && currentInput.includes('.')) return; // Avoid multiple decimals
        currentInput += buttonValue;
        updateDisplay(currentInput);
    } else if (buttonValue === 'C') {
        // Clear everything
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    } else if (buttonValue === '+/-') {
        // Toggle sign
        currentInput = currentInput ? String(-1 * parseFloat(currentInput)) : '';
        updateDisplay(currentInput);
    } else if (buttonValue === '=') {
        // Calculate result
        if (previousInput && currentInput && operator) {
            currentInput = calculateResult(previousInput, currentInput, operator);
            previousInput = '';
            operator = '';
            updateDisplay(currentInput);
        }
    } else {
        // Operator buttons (+, -, *, /, %)
        if (currentInput) {
            if (previousInput && operator) {
                currentInput = calculateResult(previousInput, currentInput, operator);
            }
            operator = buttonValue;
            previousInput = currentInput;
            currentInput = '';
        }
    }
}

// Function to calculate results
function calculateResult(first, second, operation) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    switch (operation) {
        case '+':
            return String(num1 + num2);
        case '-':
            return String(num1 - num2);
        case '*':
            return String(num1 * num2);
        case '/':
            return num2 !== 0 ? String(num1 / num2) : 'Error'; // Prevent division by zero
        case '%':
            return String(num1 % num2);
        default:
            return second; // If no operation, return the second input as is
    }
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Set initial display value
updateDisplay('0');