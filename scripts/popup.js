//--------------------------------------------------------------------------------------
// Модуль popup.js
// Функции для работы с popup
//--------------------------------------------------------------------------------------

// Функции закрытия popup
export const closePopup = function() {
  const popup = document.querySelector('.popup_opened');
  if (!popup) return;
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = function(evt) {
  if (evt.key !== 'Escape') return;
  closePopup();
}

const closePopupByOverlay = function(evt) {
  if (evt.target !== evt.currentTarget) return;
  closePopup();
}

export const setCloseEvents = function(popup, closeButton) {
  popup.addEventListener('click', closePopupByOverlay);
  closeButton.addEventListener('click', closePopup);  
}

// Функция открытия popup
export const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

