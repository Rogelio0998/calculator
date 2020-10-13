
const display = document.querySelector('#topDisplay');
const calculator = document.querySelector('#calculator');
const keys = document.querySelector('#keys');
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');

const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}
function inputDigit(number){
    const {displayValue, waitingForSecondOperand} = calc;
    if (waitingForSecondOperand === true){
        calc.displayValue = number;
        calc.waitingForSecondOperand = false;
    } else if (displayValue === '0'){
        calc.displayValue = number;
    } else calc.displayValue = displayValue + number;
    
}

function inputDecimal(dot){
    if(!calc.displayValue.includes(dot)){
        calc.displayValue += dot;
    } 
}

function handleOperator(nextOperator){
    const {firstOperand, displayValue, operator} = calc;
    const inputValue = parseFloat(displayValue);
    if (operator && calc.waitingForSecondOperand){
        calc.operator = nextOperator;
        console.log(calc);
        return;
    }
    if (firstOperand === null && !isNaN(inputValue)){
        calc.firstOperand = inputValue;
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        calc.displayValue = String(result);
        calc.firstOperand = result;
    }

    calc.waitingForSecondOperand = true;
    calc.operator = nextOperator;
    console.log(calc);

}
function reset(){
    calc.displayValue = '0';
    calc.firstOperand = null;
    calc.waitingForSecondOperand = false;
    calc.operator = null; 
}

function deleteNumber(){
    const {displayValue} = calc;
    let disArr = [...displayValue]
    calc.displayValue = disArr.slice(0, disArr.length - 1,).join('');
    if(calc.displayValue < 1){
        calc.displayValue = '0';
    }
}

function calculate(firstOperand, secondOperand, operator){
    if (operator === '+'){
        return firstOperand + secondOperand;
    } else if (operator === '-'){
        return firstOperand - secondOperand;
    } else if (operator === '*'){
        return firstOperand * secondOperand;
    } else if (operator = '/'){
        return firstOperand / secondOperand;
    } 
    return secondOperand;
}

function inputNeg (number){
    calc.displayValue = (parseFloat(calc.displayValue) * -1);
}


function updateDisplay(){
    const display = document.querySelector('#topDisplay');
    display.value = calc.displayValue;
}

updateDisplay();

keys.addEventListener('click', e =>{
    const key = e.target;
    const number = key.textContent
    const displayNum = display.textContent

    if(!key.matches('button')){
        return;
    } 
    if (key.classList.contains('negative')){
        inputNeg();
        updateDisplay();
    }
    if (key.classList.contains ('delete')){
        deleteNumber();
        updateDisplay();
    }
    if (key.classList.contains('operator')){
        handleOperator(key.value);
        updateDisplay();
        return
    }
    if(key.classList.contains('decimal')){
        inputDecimal(key.value);
        updateDisplay();
        return;
    }
    if(key.classList.contains('clear')){
        reset();
        updateDisplay();
        return;
    }
    inputDigit(key.value);
    updateDisplay();
});



