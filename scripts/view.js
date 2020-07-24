//--------------------------------------------------------------------------------------
// Модуль view.js
// Просмотр фотографии
//--------------------------------------------------------------------------------------

import {openPopup, setCloseEvents} from './popup.js';

const viewPopup = document.querySelector('.popup_content_image');
const viewBtnClose = viewPopup.querySelector('.popup__btn_action_close');

// Настройка окна просмотра
export const setViewPopup = function() {
  setCloseEvents(viewPopup, viewBtnClose);
};

// Открытие окна просмотра
export const openViewPopup = function(data) {
  const viewImage = viewPopup.querySelector('.popup__image');
  viewImage.src = data.link;
  viewImage.alt = data.name;
  viewPopup.querySelector('.popup__image-caption').textContent = data.name;
  openPopup(viewPopup);
};


