const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelector('.popup__close');
const addButton = document.querySelector('.profile_add');
// const galleryItem = document.querySelector['template-item'].content.querySelector('gallery__item');

function showPopup () {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
buttonClosePopup.addEventListener('click',closePopup);
editButton.addEventListener('click', showPopup);
addButton.addEventListener('click', showPopup);
