import { checkFormValidity } from './../components/validate.js'; 
const popups = document.querySelectorAll('.popup');
const popupForms = document.querySelectorAll('.popup__container');

popupForms.forEach(form => {
  const formButton = form.querySelector('.popup__button');
  checkFormValidity(form, formButton);
})

function showPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
}

popups.forEach(popup => {
  popup.addEventListener("mousedown", (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

export {showPopup, closePopup}
