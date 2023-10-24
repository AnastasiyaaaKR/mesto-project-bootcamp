import { templateItem, gallerySection, popupPhoto, popupPhotoContent, popupPhotoName, counterLikes} from './../index.js'
import { showPopup } from './modal.js';

function deliteCard(item) {
  item.remove();
}

function likeCard(evt) {
  evt.target.closest('.gallery__button').classList.toggle('gallery__button_liked');
}


function createGalleryItem(galleryName, galleryPhoto, counterLikes) {
  const newGalleryItem = templateItem.cloneNode(true);
  const galleryHeader = newGalleryItem.querySelector('.gallery__header');
  galleryHeader.textContent = galleryName;
  const galleryImage = newGalleryItem.querySelector('.gallery__image');
  galleryImage.src = galleryPhoto;
  galleryImage.alt = galleryName;
  const likes = newGalleryItem.querySelector('.gallery__likes');
  likes.textContent = counterLikes;
  const galleryDeliteButton = newGalleryItem.querySelector('.gallery__trash');
  galleryDeliteButton.addEventListener('click', () => deliteCard(newGalleryItem));
  const likeButton = newGalleryItem.querySelector('.gallery__button');
  likeButton.addEventListener('click', likeCard);
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