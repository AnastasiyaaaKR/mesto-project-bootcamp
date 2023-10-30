import './pages/index.css';
import { checkFormValidity, enableValidation, turnOfftheSubmitButton } from './components/validate.js'; 
import { createGalleryItem, addCard } from './components/card.js';
import {showPopup, closePopup} from './components/modal.js';
import { getProfileInfo, getInitialCards, changeProfile, addNewCard, showAvatar } from './components/api.js'

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile_add');
const popupProfile = document.querySelector('.popup__profile');
const popupName = popupProfile.querySelector('.popup__name');
const popupAbout = popupProfile.querySelector('.popup__about');
const profileName = document.querySelector('.profile__name'); 
const profileAbout = document.querySelector('.profile__cuption');
const profileImg = document.querySelector('.profile__img')
const profileSubmitButton = popupProfile.querySelector('.popup__button');
const popupPlace = document.querySelector('.popup__place');
const placeTitleInput = popupPlace.querySelector('.place__title');
const placeLinkInput = popupPlace.querySelector('.place__link');
const closePopupbuttons = document.querySelectorAll('.popup__close');
const gallerySection = document.querySelector('.gallery');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoContent = document.querySelector('.popup__photo-content');
const popupPhotoName = document.querySelector('.popup__photo-name');
const profileForm = document.forms.profileForm; 
const placeForm = document.forms.placeForm;
const placeSubmitButton = popupPlace.querySelector('.popup__button');
const changeAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup__avatar');
const avatarForm = document.forms.avatarForm;
const avatarSubmitButton = popupAvatar.querySelector('.popup__button');
const avatarLinkInput = popupAvatar.querySelector('.avatar__link');

const validationSettings = {
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputSelectorError: 'popup__text_error',
  popupForms: '.popup__container',
};

closePopupbuttons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (evt) => {
    closePopup(popup)
  });
});

editButton.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  showPopup(popupProfile);
});

addButton.addEventListener('click', () => showPopup(popupPlace));
changeAvatarButton.addEventListener('click', () => showPopup(popupAvatar));

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  changeProfile(popupName.value, popupAbout.value)
    .then(() => {
      profileName.textContent = popupName.value;
      profileAbout.textContent = popupAbout.value;
      closePopup(popupProfile)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Создать'
    })
}

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault(); 
  placeSubmitButton.textContent = 'Сохранение...'
  addNewCard(placeTitleInput.value, placeLinkInput.value)
  .then((card) => { 
    addCard(createGalleryItem(card, user))
    closePopup(popupPlace);
    evt.target.reset();
    turnOfftheSubmitButton(placeSubmitButton)
  })
  .catch((err) => {
      console.log(err);
    })
  .finally(() => {
      placeSubmitButton.textContent = 'Создать'
  })
}

function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...'
  showAvatar(avatarLinkInput.value)
    .then(() => {
      profileImg.src = avatarLinkInput.value
      closePopup(popupAvatar)
      evt.target.reset()
      turnOfftheSubmitButton(avatarSubmitButton);
      }
    )
    .catch((err) => {
      console.log(err.status, err.mesage);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить'
    })
}

profileForm.addEventListener('submit', handleFormSubmitProfile);
placeForm.addEventListener('submit', handleFormSubmitNewPlace);
avatarForm.addEventListener('submit', handleFormSubmitNewAvatar);

enableValidation(validationSettings);

let user;

getProfileInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileImg.src = result.avatar;
    user = result;
  })
  .catch((err) => {
    console.log(err.status, err.mesage);
  });


getInitialCards()
  .then((result) => {
    result.forEach(card => {
    addCard(createGalleryItem(card, user));
  })
  })
  .catch((err) => {
    console.log(err.status, err.mesage);
  });

export { gallerySection, popupPhoto, popupPhotoContent, popupPhotoName, validationSettings }