import { templateItem, gallerySection, popupPhoto, popupPhotoContent, popupPhotoName } from './../index.js'
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
  .then(() => {
    evt.target.closest('.gallery__button').classList.add('gallery__button_liked');
    likes.textContent = Number(likes.textContent) + 1;
  })
  .catch((err) => {
    console.log(err.status, err.mesage);
  });
}

function unlikeCard(id, evt, likes) {
  apiUnlikeCard(id)
  .then(() => {
      evt.target.closest('.gallery__button').classList.remove('gallery__button_liked');
      likes.textContent = Number(likes.textContent) - 1;
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

function createGalleryItem(galleryName, galleryPhoto, counterLikes, removeDisabled, id, liked) {
  const newGalleryItem = templateItem.cloneNode(true);
  const galleryHeader = newGalleryItem.querySelector('.gallery__header');
  galleryHeader.textContent = galleryName;
  const galleryImage = newGalleryItem.querySelector('.gallery__image');
  galleryImage.src = galleryPhoto;
  galleryImage.alt = galleryName;
  const galleryDeliteButton = newGalleryItem.querySelector('.gallery__trash');
  galleryDeliteButton.disabled = removeDisabled;
  galleryDeliteButton.addEventListener('click', () => deliteCard(id, newGalleryItem));
  const likes = newGalleryItem.querySelector('.gallery__likes');
  likes.textContent = counterLikes;
  const likeButton = newGalleryItem.querySelector('.gallery__button');
  if(liked) {
    likeButton.classList.add('gallery__button_liked');
  } else {
    likeButton.classList.remove('gallery__button_liked');
  }
  likeButton.addEventListener('click', (evt) => toggleCardLike (id, evt, likes));
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


export { createGalleryItem, addCard, deliteCard };