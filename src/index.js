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
const popupForms = document.querySelectorAll('.popup__container');
const popups = document.querySelectorAll('.popup');
const placeSubmitButton = popupPlace.querySelector('.popup__button');
const changeAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup__avatar');
const avatarForm = document.forms.avatarForm;
const avatarSubmitButton = popupAvatar.querySelector('.popup__button');
const avatarLinkInput = popupAvatar.querySelector('.avatar__link');

const validationSettings = {
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
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
      if(profileForm.checkValidity()) {
        closePopup(popupProfile)
      }
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
  addCard(createGalleryItem(placeTitleInput.value, placeLinkInput.value, 0, false))
  addNewCard(placeTitleInput.value, placeLinkInput.value)
  .then(() => {
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
    result.forEach(res => {
    addCard(createGalleryItem(res['name'], res['link'], res['likes'].length, !isOwnerCard(user, res), res._id, isCardLiked(user, res)));
  })
  })
  .catch((err) => {
    console.log(err.status, err.mesage);
  });

function isCardLiked(user, card) {
  for(const like of card.likes) {
    if(like._id === user._id) {
      return true;
    }
  }
  return false
}

function isOwnerCard(user, card) {
  return user._id === card.owner._id;
}

export { gallerySection, popupPhoto, popupPhotoContent, popupPhotoName, validationSettings}