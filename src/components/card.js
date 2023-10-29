import { gallerySection, popupPhoto, popupPhotoContent, popupPhotoName } from './../index.js'
import { showPopup } from './modal.js';
import { deliteOwnerCard, likeCard as apiLikeCard, unlikeCard as apiUnlikeCard } from './api.js'

function deliteCard(id, item) {
  deliteOwnerCard(id)
  .then(() => {
    item.remove();
  })
.catch((err) => {
    console.log(err.status, err.mesage);
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
      console.log(err.status, err.mesage);
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
  const galleryDeliteButton = newGalleryItem.querySelector('.gallery__trash');
  galleryDeliteButton.disabled = !isOwnerCard(user, card);
  galleryDeliteButton.addEventListener('click', () => deliteCard(card._id, newGalleryItem));
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