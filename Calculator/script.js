class Calculator{
    constructor(previousScreen, currentScreen){
        this.previousScreen = previousScreen
        this.currentScreen = currentScreen
        this.currentOperation = ""
        this.clear()
    }

    clear(){
        this.currentScreen.value = ''
        this.previousScreen.value = ''
        this.sign = ''
        this.currentOperation = ''
        this.previousOperation = ''
    }

    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0, -1)  

    }

    appendNumber(number){
        if (number === '.' && this.currentOperation.includes('.'))return
        console.log('current operation', this.currentOperation)
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    chooseSign(sign){
        if(this.currentOperation === '') return
        
        if(this.previousOperation !== ''){
            this.compute()
        }
        this.sign = sign
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute(){       
        let computation
        const prev = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
         switch(this.sign){
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            case "*":
                computation = prev * current
                break;
            case "÷":
            computation = prev / current
            break;
            default:
                return
        }

        if(this.sign === "+"){
            computation = prev + current
        }
        else if(this.sign === "-"){
            computation = prev - current
        }
        else if(this.sign === "*"){
            computation = prev * current
        }
        else if(this.sign === "÷"){
            computation = prev / current
        }
        else{
            return
        }
        this.currentOperation = computation
        this.sign = undefined
        this.previousOperation = ''

    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentScreen.value = this.getDisplayNumber(this.currentOperation)
        if(this.sign != null){
            this.previousScreen.value = `${this.getDisplayNumber(this.previousOperation)} ${this.sign}`
        }
        else{
            this.previousScreen.value = ''
        }
        
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousScreen = document.querySelector('[data-previous-screen]')
const currentScreen = document.querySelector('[data-calculator-screen]')

const calculator = new Calculator(previousScreen, currentScreen)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseSign(button.innerText)
      calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})