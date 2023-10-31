function showErrorMessage(input, errorMessage, inputSelectorError) { 
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = errorMessage;
  input.classList.add(inputSelectorError);
}

function hideErrorMessage(input, inputSelectorError) {
  const spanField = 'eror-' + input.id;
  const errorElement = document.getElementById(spanField);
  errorElement.textContent = '';
  input.classList.remove(inputSelectorError);
}

function checkFieldValidity(input, inputSelectorError) {
    if (input.validity.valid) {
    hideErrorMessage(input, inputSelectorError);
  } else {
    showErrorMessage(input, input.validationMessage, inputSelectorError)
  }
}

function turnOffTheSubmitButton (button) {
  button.disabled = true;
}

function turnOnTheSubmitButton(button) {
  button.disabled = false;
}

function checkFormValidity(form, button) {
  if(form.checkValidity()) {
      turnOnTheSubmitButton(button);
  } else {
    turnOffTheSubmitButton(button);
  }
}

function enableValidation(validationSettings) {
  const popupForms = document.querySelectorAll(validationSettings.popupForms);
  popupForms.forEach(form => {
    const formsInputs = form.querySelectorAll(validationSettings.inputSelector);
    const formButton = form.querySelector(validationSettings.buttonSelector);
      formsInputs.forEach(input => {
        input.addEventListener('input', () => {
        checkFormValidity(form, formButton);
        checkFieldValidity(input, validationSettings.inputSelectorError);
      })
    })
  });
}

export { checkFormValidity, enableValidation, turnOffTheSubmitButton }; 