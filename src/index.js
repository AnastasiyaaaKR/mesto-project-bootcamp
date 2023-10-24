import './pages/index.css';
import { checkFormValidity, enableValidation, turnOfftheSubmitButton } from './components/validate.js'; 
import { createGalleryItem, addCard } from './components/card.js';
import {showPopup, closePopup} from './components/modal.js';
import { getProfileInfo, getInitialCards, changeProfile, addNewCard } from './components/api.js'

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile_add');
const popupProfile = document.querySelector('.popup__profile');
const popupName = popupProfile.querySelector('.popup__name');
const popupAbout = popupProfile.querySelector('.popup__about');
const profileName = document.querySelector('.profile__name'); 
const profileAbout = document.querySelector('.profile__cuption');
const profileImg = document.querySelector('.profile__img')
const popupPlace = document.querySelector('.popup__place');
const placeTitleInput = popupPlace.querySelector('.place__title');
const placeLinkInput = popupPlace.querySelector('.place__link');
const closePopupbuttons = document.querySelectorAll('.popup__close');
const templateItem = document.querySelector('.template-item').content.querySelector('.gallery__item');
const gallerySection = document.querySelector('.gallery');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoContent = document.querySelector('.popup__photo-content');
const popupPhotoName = document.querySelector('.popup__photo-name');
const profileForm = document.forms.profileForm; 
const placeForm = document.forms.placeForm;
const popupForms = document.querySelectorAll('.popup__container');
const popups = document.querySelectorAll('.popup');
const placeSubmitButton = popupPlace.querySelector('.popup__button');

const validationSettings = {
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
}; 

closePopupbuttons.forEach((button) => {
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

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  changeProfile(popupName.value, popupAbout.value)
    .catch((err) => {
      console.log(err);
    });
  if(profileForm.checkValidity()) {
    closePopup(popupProfile);
  }
}

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault(); 
  addCard(createGalleryItem(placeTitleInput.value, placeLinkInput.value));
  addNewCard(placeTitleInput.value, placeLinkInput.value)
  .catch((err) => {
      console.log(err);
    });
  closePopup(popupPlace);
  evt.target.reset();
  turnOfftheSubmitButton(placeSubmitButton);
}

profileForm.addEventListener('submit', handleFormSubmitProfile);
placeForm.addEventListener('submit', handleFormSubmitNewPlace);

popupForms.forEach(form => {
 const formButton = form.querySelector('.popup__button');
  checkFormValidity(form, formButton);
})

popups.forEach(popup => {
  popup.addEventListener("mousedown", (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

enableValidation(popupForms, validationSettings);

getProfileInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileImg.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
.then((result) => {
  result.forEach(res => {
    addCard(createGalleryItem(res['name'], res['link'], res['likes'].length));
  })
  })
  .catch((err) => {
    console.log(err);
  });


export { templateItem, gallerySection, popupPhoto, popupPhotoContent, popupPhotoName, editButton, addButton, closePopupbuttons, validationSettings}