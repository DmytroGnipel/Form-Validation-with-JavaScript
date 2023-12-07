import './style.css'
import Image from './image.jpg'

//get needed elements
const errorFields = document.querySelectorAll('span')
const button = document.querySelector('button')
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')

//answers for different cases of validity violation or absence it
const answers = {
    0: 'Input is wrong! You should enter here your actual email',
    1: 'Input is wrong! You must put name of your coutry in this field',
    2: 'Wrong! Zip-code must contain only digits and uppercase letters',
    3: 'Wrong! Password must contain only digits and letters',
    4: 'First and second passwords are not the same',
    5: 'Password must contain at least 8 characters',
    6: 'Ok! First and second passwords match',
    7: 'First and second passwords do not match',
    8: 'Field filled up correctly',
    9: 'This field must be field',
    10: 'You are wrong! See the mistakes below corresponding fields',
}

//report error of the single iput with given input's ID
function reportErrorSingle (inputId) {
    const input = inputs[inputId]
    const errorField = errorFields[inputId]
    const report = answers[inputId]
    if (input.validity.valueMissing) {
        errorField.textContent = answers[9]
        errorField.classList.add("error")
    }   else if (input.validity.typeMismatch) { 
        errorField.textContent = report
        errorField.classList.add("error")
    }   else if (input.validity.patternMismatch)  {
        errorField.textContent = report
        errorField.classList.add("error")
    }
    else if (input.validity.tooShort) {
        errorField.textContent = answers[5]
        errorField.classList.add("error")
    }  else if (input.dataset.id == '4') {
        //matching first and second passwords
        const passwordValue = document.querySelector('input[type="password"]').value
        if (passwordValue === input.value) {
            errorField.textContent = answers[6]
            errorField.classList.add("correct")
        } else {
            errorField.textContent = answers[7]
            errorField.classList.add("error")
        }
    }    else {
        errorField.textContent = answers[8]
        errorField.classList.add("correct")
    }
}

//show error reports near the all inputs that is above the given one
const reportErrorAllAbove = (inputId) => { 
    for (let i = inputId; i >= 0; i--) {
        reportErrorSingle(inputs[i].dataset.id)
    }
}

//give all inputs propety to render validity report in corresponding spans when users leave this input
;(function reportAfterBlur () {
    for (const input of inputs) {
        input.addEventListener('blur', function () {
            cleaning()
            const inputId = input.dataset.id
            reportErrorAllAbove(inputId)
        })
    }
})()

//while user click on button SUBMIT all errors and succesfull validations renders
//like it would be if user leave the last input - see line 'else reportErrorAllAbove(4)'
//if validation of the all input is succesful then app give the user high five
//if not the button change class and text
;(function submit () {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        if (form.checkValidity()) giveHighFive()
        else {
    reportErrorAllAbove(4)
        button.textContent = answers[10]
        button.classList.add('wrong')
        }
    })
})()

//button should return to it's normal look after pressing it when inputs validation dont passes
//so here button loses class '.wrong' and acquires initial textContent, that is 'submit'
;(function turnButton () {
    for (const input of inputs) {
        input.addEventListener('focus', function() {
        button.textContent = 'Submit'
        button.className = ''
        })
    }
})()

//help change look of the fildes that show validation reports
//by remooving their textContents and classes
function cleaning () {
    for (const span of errorFields) {
        if (span.textContent) {
            span.textContent = ''
            span.className = ''
        }

    }
}

//give high five
function giveHighFive() {
    //remove entire body html
    const body = document.querySelector('body')
    body.innerHTML = ''
    //create button for subsequent page refresh 
    const button = document.createElement('button')
    button.textContent = 'Want more?'
    //litle correction of the body style
    body.style.flexDirection = 'column'
    body.style.gap = '30px'
    //hanging page refresh on just created button 
    button.addEventListener('click', function () {
        location.reload()
    })
    //creating image
    const myImage = document.createElement('img')
    myImage.src = Image
    //add image and button to the body
    body.append(myImage, button)
}









