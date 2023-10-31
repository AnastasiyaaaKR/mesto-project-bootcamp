import { gallerySection, popupPhoto, popupPhotoContent, popupPhotoName } from './../index.js'
import { showPopup } from './modal.js';
import { deleteOwnerCard, likeCard as apiLikeCard, unlikeCard as apiUnlikeCard } from './api.js'

function deleteCard(id, item) {
  deleteOwnerCard(id)
  .then(() => {
    item.remove();
  })
.catch((err) => {
    console.log(err.status, err.message);
  });
}

function likeCard(id, evt, likes) {
  apiLikeCard(id)
  .then((card) => {
    evt.target.closest('.gallery__button').classList.add('gallery__button_liked');
    likes.textContent = card.likes.length;
  })
  .catch((err) => {
    console.log(err.status, err.mesage);
  });
}

function unlikeCard(id, evt, likes) {
  apiUnlikeCard(id)
  .then((card) => {
      evt.target.closest('.gallery__button').classList.remove('gallery__button_liked');
      likes.textContent = card.likes.length;
    })
    .catch((err) => {
      console.log(err.status, err.message);
    });
}

function toggleCardLike (id, evt, likes) {
  const button = evt.target.closest('.gallery__button');
  if(button.classList.contains('gallery__button_liked')) {
    unlikeCard(id, evt, likes);
  } else {
    likeCard(id, evt, likes);
  }
}

function isOwnerCard(user, card) {
  return user._id === card.owner._id;
}

function isCardLiked(user, card) {
  for(const like of card.likes) {
    if(like._id === user._id) {
      return true;
    }
  }
  return false
}

function createGalleryItem(card, user) {
  const templateItem = document.querySelector('.template-item').content.querySelector('.gallery__item');
  const newGalleryItem = templateItem.cloneNode(true);
  const galleryHeader = newGalleryItem.querySelector('.gallery__header');
  galleryHeader.textContent = card.name;
  const galleryImage = newGalleryItem.querySelector('.gallery__image');
  galleryImage.src = card.link;
  galleryImage.alt = card.name;
  const galleryDeleteButton = newGalleryItem.querySelector('.gallery__trash');
  galleryDeleteButton.disabled = !isOwnerCard(user, card);
  galleryDeleteButton.addEventListener('click', () => deleteCard(card._id, newGalleryItem));
  const likes = newGalleryItem.querySelector('.gallery__likes');
  likes.textContent = card.likes.length;
  const likeButton = newGalleryItem.querySelector('.gallery__button');
  if(isCardLiked(user, card)) {
    likeButton.classList.add('gallery__button_liked');
  } else {
    likeButton.classList.remove('gallery__button_liked');
  }
  likeButton.addEventListener('click', (evt) => toggleCardLike (card._id, evt, likes));
  galleryImage.addEventListener('click', () => {
  popupPhotoContent.src = galleryImage.src;
  popupPhotoContent.alt = galleryImage.alt;
  popupPhotoName.textContent = galleryHeader.textContent;
  showPopup(popupPhoto)
  });
  return newGalleryItem;
}

function addCard(element) {
  gallerySection.prepend(element);
}


export { createGalleryItem, addCard };