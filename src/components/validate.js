function showErorMessage(input, errorMessage, inputSelectorError) { 
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = errorMessage;
  input.classList.add(inputSelectorError);
}

function hideErrorMessage(input, inputSelectorError) {
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = '';
  input.classList.remove(inputSelectorError);
}

function checkFieldValidity(input, inputSelectorError) {
    if (input.validity.valid) {
    hideErrorMessage(input, inputSelectorError);
  } else {
    showErorMessage(input, input.validationMessage, inputSelectorError)
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

export { checkFormValidity, enableValidation, turnOfftheSubmitButton }; 