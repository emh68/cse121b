/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    return number1 + number2;
}

function addNumbers() {
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}

document.querySelector('#addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
function subtract(number1, number2) {
    return number1 - number2;
}

function subtractNumbers() {
    let subtractNumber1 = Number(document.querySelector('#subtract1').value);
    let subtractNumber2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(subtractNumber1, subtractNumber2)
}

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

const multiplyNumbers = () => {
    let factor1 = Number(document.querySelector('#factor1').value);
    let factor2 = Number(document.querySelector('#factor2').value);
    document.querySelector('#product').value = multiply(factor1, factor2);
}
document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (number1, number2) => number1 / number2;

const divideNumbers = () => {
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);
    document.querySelector('#quotient').value = divide(dividend, divisor);
}
document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);

/* Decision Structure */

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#getTotal').addEventListener('click', function () {
        // Get the value entered in the subtotal field and store it as the variable 'subtotal'
        let subtotal = Number(document.querySelector('#subtotal').value);

        // Check if the input is a valid numeric amount
        if (isNaN(subtotal)) {
            alert('Please enter a valid numeric amount for the subtotal.');
        } else {
            // Check if the member checkbox is checked
            let isMember = document.getElementById('member').checked;

            // Apply a 20% discount if the user is a member
            if (isMember) {
                subtotal *= 0.8; // 20% discount
            }

            // Set the 'total' value based on the conditional function
            let total = subtotal;

            // Output the total to the total span in the format shown with two decimals
            document.getElementById('total').textContent = `$ ${total.toFixed(2)}`;
        }
    });
});


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.getElementById('array').textContent = numsArray;
/* Output Odds Only Array */
let oddNums = numsArray.filter(num => num % 2 !== 0);
document.getElementById('odds').textContent = oddNums;
/* Output Evens Only Array */
let evenNums = numsArray.filter(num => num % 2 === 0);
document.getElementById('evens').textContent = evenNums;
/* Output Sum of Org. Array */
let sumOfArray = numsArray.reduce((sum, number) => sum + number);
document.getElementById('sumOfArray').textContent = sumOfArray
/* Output Multiplied by 2 Array */
let multipliedArray = numsArray.map(number => number * 2);
document.getElementById('multiplied').textContent = multipliedArray;
/* Output Sum of Multiplied by 2 Array */
let multiplyArray = numsArray.map(number => number * 2);
let sumOfMultiplied = multiplyArray.reduce((sum, number) => sum + number);
document.getElementById('sumOfMultiplied').textContent = sumOfMultiplied;