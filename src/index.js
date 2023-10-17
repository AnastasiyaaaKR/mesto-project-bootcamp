import './pages/index.css';
import { checkFieldValidity, checkFormValidity } from './components/validate.js'; 
import { createGalleryItem, addCard, initialCards} from './components/card.js';
import {showPopup, closePopup} from './components/modal.js';

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile_add');
const popupProfile = document.querySelector('.popup__profile');
const popupName = popupProfile.querySelector('.popup__name'); //Имя пользователя
const popupAbout = popupProfile.querySelector('.popup__about'); //О себе
const profileName = document.querySelector('.profile__name'); 
const profileAbout = document.querySelector('.profile__cuption');
const popupPlace = document.querySelector('.popup__place');
const placeTitleInput = popupPlace.querySelector('.place__title');
const placeLinkInput = popupPlace.querySelector('.place__link');
const ClosePopupbuttons = document.querySelectorAll('.popup__close');
const templateItem = document.querySelector('.template-item').content.querySelector('.gallery__item');
const gallerySection = document.querySelector('.gallery');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoContent = document.querySelector('.popup__photo-content');
const popupPhotoName = document.querySelector('.popup__photo-name');
const profileForm = document.forms.profileForm; 
const placeForm = document.forms.placeForm;
const popupForms = document.querySelectorAll('.popup__container');

ClosePopupbuttons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (evt) => {
    console.log('ClosePopupbuttons');
    evt.preventDefault()
    closePopup(popup)
  });
});

editButton.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  showPopup(popupProfile);
});

addButton.addEventListener('click', () => showPopup(popupPlace));

initialCards.forEach(obj => {
  addCard(createGalleryItem(obj['name'], obj['link']))
})

function handleFormSubmitProfile(evt) {
  console.log('handleFormSubmitProfile')
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  if(profileForm.checkValidity()) {
  closePopup(popupProfile);
  }
}

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault(); 
  addCard(createGalleryItem(placeTitleInput.value, placeLinkInput.value));
  closePopup(popupPlace);
  evt.target.reset();
}

profileForm.addEventListener('submit', handleFormSubmitProfile);
placeForm.addEventListener('submit', handleFormSubmitNewPlace);

popupForms.forEach(form => {
 const formButton = form.querySelector('.popup__button');
  checkFormValidity(form, formButton);
})

popupForms.forEach(form => {
  const formsInputs = form.querySelectorAll('.popup__text');
  const formButton = form.querySelector('.popup__button');
  formsInputs.forEach(input => {
    input.addEventListener('input', () => {
    checkFormValidity(form, formButton);
    checkFieldValidity(input);
  })
})
});

export { templateItem, gallerySection, popupPhoto, popupPhotoContent, popupPhotoName, editButton, addButton, ClosePopupbuttons}