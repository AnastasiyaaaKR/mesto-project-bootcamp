const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile_add');
const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__cuption');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const likeButton = document.querySelector('.gallery__button');
const templateItem = document
.querySelector('.template-item').content.querySelector('.gallery__item');
const gallerySection = document.querySelector('.gallery');


popupName.value = profileName.textContent;
popupAbout.value = profileAbout.textContent;

// function showPopup (popup) {
//   popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }

// addButton.addEventListener('click', showPopup(popup));
// addButton.addEventListener('click', closePopup(popup));

function LikePhoto () {
likeButton.classList.add('gallery__button_liked');
}
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

initialCards.forEach(obj => {
  addCard(createGalleryItem(obj['name'], obj['link']))
})
