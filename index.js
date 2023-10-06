const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile_add');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup__profile')
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__cuption');
const popupPlace = document.querySelector('.popup__place');
const placeTitleInput = popupPlace.querySelector('.place__title');
const placeLinkInput = popupPlace.querySelector('.place__link');
const buttonClosePopup = popup.querySelector('.popup__close');
const popupName = popup.querySelector('.popup__name');
const popupAbout = popup.querySelector('.popup__about');
const likeButton = document.querySelector('.gallery__button');
const templateItem = document.querySelector('.template-item').content.querySelector('.gallery__item');
const gallerySection = document.querySelector('.gallery');
const profileForm = document.querySelector('.profile__form');
const placeForm = document.querySelector('.place__form');

popupName.value = profileName.textContent;
popupAbout.value = profileAbout.textContent;

function showPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => showPopup(popupProfile));
buttonClosePopup.addEventListener('click', () => closePopup(popupProfile));
addButton.addEventListener('click', () => showPopup(popupPlace));
buttonClosePopup.addEventListener('click', () => closePopup(popupPlace));

function createGalleryItem(galleryName, galleryPhoto) {
  const newGalleryItem = templateItem.cloneNode(true);
  const galleryHeader = newGalleryItem.querySelector('.gallery__header');
  galleryHeader.textContent = galleryName;
  const galleryImage = newGalleryItem.querySelector('.gallery__image');
  galleryImage.src = galleryPhoto;
  return newGalleryItem;
}

function addCard(element) {
  gallerySection.prepend(element);
}

// function LikePhoto () {
// likeButton.classList.add('gallery__button_liked');
// }
// likeButton.addEventListener('click', LikePhoto);

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
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupProfile)
}

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault(); 
  addCard(createGalleryItem(placeTitleInput.value, placeLinkInput.value))
  closePopup(popupPlace)
}

profileForm.addEventListener('submit', handleFormSubmitProfile);
placeForm.addEventListener('submit', handleFormSubmitNewPlace)