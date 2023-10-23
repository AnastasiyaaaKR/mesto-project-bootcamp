import { validationSettings } from './../index.js';

function showErorMessage(input, errorMessage) { 
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = errorMessage;
}

function hideErrorMessage(input) {
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = '';
}

function checkFieldValidity(input) {
    if (input.validity.valid) {
    hideErrorMessage(input);
  } else {
    showErorMessage(input, input.validationMessage)
  }
}

function turnOfftheSubmitButton (button) {
  button.disabled = true;
}

function turnOntheSubmitButton(button) {
  button.disabled = false;
}

function checkFormValidity(form, button) {
  if(form.checkValidity()) {
      turnOntheSubmitButton(button);
  } else {
    turnOfftheSubmitButton(button);
  }
}

function enableValidation(popupForms, validationSettings) {
  popupForms.forEach(form => {
    const formsInputs = form.querySelectorAll(validationSettings.inputSelector);
    const formButton = form.querySelector(validationSettings.buttonSelector);
      formsInputs.forEach(input => {
        input.addEventListener('input', () => {
        checkFormValidity(form, formButton);
        checkFieldValidity(input);
      })
    })
  });
}

export { checkFieldValidity, checkFormValidity, enableValidation, turnOfftheSubmitButton }; 