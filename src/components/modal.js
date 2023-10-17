import {editButton, addButton, ClosePopupbuttons} from './../index.js'

function showPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


export {showPopup, closePopup}
