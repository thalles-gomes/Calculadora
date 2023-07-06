function Calculadora() {
    const previousOperand = document.querySelector('[data-previousOperand]');
    const currentOperand = document.querySelector('[data-currentOperand]');
    const numbersButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalButton = document.querySelector('[data-equal]');
    const deleteButton = document.querySelector('[data-delete]');
    const clearAllButton = document.querySelector('[data-all-clear]');
    const classificationButton = document.querySelector('[data-classification]');

    let operation;
    let currentNumber;

    this.catchClicks = () => {
        numbersButtons.forEach(numbersButton => {
            numbersButton.addEventListener('click', () => {
                this.numberToDisplay(numbersButton.textContent);
            });
        });

        operationButtons.forEach(operationButtons => {
            operationButtons.addEventListener('click', () => {
                this.chooseOperation(operationButtons.textContent);
            });
        });

        equalButton.addEventListener('click', () => {
            this.doCalculation();
        });

        deleteButton.addEventListener('click', () => {
            this.delete();
        });

        clearAllButton.addEventListener('click', () => {
            this.clear();
        });

        classificationButton.addEventListener('click', () => {
            this.changeClassification();
        });
    }

    this.clear = () => {
        previousOperand.textContent = '';
        currentOperand.textContent = '';
        operation = undefined;
        currentNumber = '';
    }

    this.start = () => {
        this.catchClicks();
        this.clear();
    }

    this.numberToDisplay = (numberString) => {
        if (numberString === ',' && currentOperand.textContent.includes(',')) return;
        currentNumber += numberString;
        currentOperand.textContent = this.getNumberDisplay(currentNumber);
    }

    this.getNumberDisplay = (stringNumber) => {
        const integerDigits = parseFloat(stringNumber.split(',')[0]);
        const decimalDigits = stringNumber.split(',')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-BR', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay},${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    this.chooseOperation = (operand) => {
        if (currentOperand.textContent === '') return;
        if (previousOperand.textContent != '') {
            this.doCalculation();
        }
        operation = operand;
        previousOperand.textContent = `${currentOperand.textContent.replace(/\./g, '')} ${operation}`;
        currentOperand.textContent = '';
        currentNumber = '';
    }

    this.doCalculation = () => {
        let calculation;
        const previous = parseFloat(previousOperand.textContent.replace(',', '.'));
        const current = parseFloat(currentOperand.textContent.replace(/\./g, '').replace(',', '.'));

        if (isNaN(previous) || isNaN(current)) return;

        switch (operation) {
            case '+':
                calculation = previous + current;
                break;
            case '-':
                calculation = previous - current;
                break;
            case '*':
                calculation = previous * current;
                break;
            case '÷':
                calculation = previous / current;
                break;
            default:
                return;
        }

        currentOperand.textContent = calculation.toLocaleString('pt-BR');
        previousOperand.textContent = '';
        operation = undefined;
        currentNumber = '';
    }

    this.delete = () => {
        currentNumber = currentNumber.slice(0, -1);
        currentOperand.textContent = this.getNumberDisplay(currentNumber);
    }

    this.changeClassification = () => {
        if(currentOperand.textContent[0] != '-'){
            currentNumber = `-${currentNumber}`;
        }else{
            currentNumber = currentNumber.slice(1, currentNumber.length);
        }
        currentOperand.textContent = this.getNumberDisplay(currentNumber);
    }
}
const calculadora = new Calculadora();
calculadora.start();
