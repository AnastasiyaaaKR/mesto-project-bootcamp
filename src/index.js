import './../pages/index.css';
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
const profileForm = document.forms.profileForm; //форма профиля
const placeForm = document.forms.placeForm; //форма карточки
const popupForms = document.querySelectorAll('.popup__container'); //вытаскиваю все формы попапа


function showPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

function deliteCard(item) {
  item.remove();
}

function likeCard(evt) {
  evt.target.closest('.gallery__button').classList.toggle('gallery__button_liked');
}

function createGalleryItem(galleryName, galleryPhoto) {
  const newGalleryItem = templateItem.cloneNode(true);
  const galleryHeader = newGalleryItem.querySelector('.gallery__header');
  galleryHeader.textContent = galleryName;
  const galleryImage = newGalleryItem.querySelector('.gallery__image');
  galleryImage.src = galleryPhoto;
  galleryImage.alt = galleryName;
  const galleryDeliteButton = newGalleryItem.querySelector('.gallery__trash');
  galleryDeliteButton.addEventListener('click', () => deliteCard(newGalleryItem))
  const likeButton = newGalleryItem.querySelector('.gallery__button');
  likeButton.addEventListener('click', likeCard);
  galleryImage.addEventListener('click', () => {
  popupPhotoContent.src = galleryImage.src;
  popupPhotoName.textContent = galleryHeader.textContent;
  showPopup(popupPhoto)
  });
  return newGalleryItem;
}

function addCard(element) {
  gallerySection.prepend(element);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

//код для форм

function showErorMessage(input, errorMessage) { //показываем сообщение об ошибке
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = errorMessage;
}

function hideErrorMessage(input) { //скрываем сообщение об ошибке
  const spanField = 'eror-' + input.id;
  const erorElement = document.getElementById(spanField);
  erorElement.textContent = '';
}

function checkFieldValidity(input) { // проверяем валидность инпута
    if (input.validity.valid) {
    hideErrorMessage(input);
  } else {
    showErorMessage(input, input.validationMessage)
  }
}

function turnOfftheSubmitButton (button) { //делаем кнопку неактивной
  button.disabled = true;
}

function turnOntheSubmitButton(button) { //делаем кнопку активной
  button.disabled = false;
}

function checkFormValidity(form, button) { //проверяем валидацию всей формы целиком
  if(form.checkValidity()) {
      turnOntheSubmitButton(button);
  } else {
    turnOfftheSubmitButton(button);
  }
}

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