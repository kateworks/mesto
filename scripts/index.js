//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------
import {initialCards} from './cards-init.js';
import {Card} from './Card.js';

const cardsList = document.querySelector('.photo-grid__list');

// -----   Всплывающее окно просмотра карточки  -----
const viewPopup = document.querySelector('.popup_content_image');
const viewBtnClose = viewPopup.querySelector('.popup__btn_action_close');

// -----   Всплывающее окно добавления карточки  -----
const addCardPopup = document.querySelector('.popup_content_card'); 
const addCardBtnOpen = document.querySelector('.profile__btn_action_add');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardBtnClose = addCardPopup.querySelector('.popup__btn_action_close');

const titleInput = addCardForm.querySelector('.popup__item_type_name');
const linkInput = addCardForm.querySelector('.popup__item_type_info');

//--------------------------------------------------------------------------------------
// Функции закрытия popup
const closePopup = function() {
  const popup = document.querySelector('.popup_opened');
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

//--------------------------------------------------------------------------------------
// Функция открытия popup
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const emptyInputs = function() {
  titleInput.value = '';
  linkInput.value = '';
}

const editNewCard = function(evt) {
  openPopup(addCardPopup);
  emptyInputs();
  //setInitialState(newPlaceForm, popupInfo);
}

const saveNewCard = function(evt) {
  evt.preventDefault();
  const newItem = {name: titleInput.value, link: linkInput.value};
  addListItem(newItem,'#card-template', '.photo-grid__card');
  emptyInputs();
  closePopup();
}

//--------------------------------------------------------------------------------------
// Открытие окна просмотра фотографии
export const openViewPopup = function(data) {
  const viewImage = viewPopup.querySelector('.popup__image');
  viewImage.src = data.link;
  viewImage.alt = data.name;
  viewPopup.querySelector('.popup__image-caption').textContent = data.name;
  openPopup(viewPopup);
}

const setViewPopup = function() {
  viewPopup.addEventListener('click', closePopupByOverlay);
  viewBtnClose.addEventListener('click', closePopup);  
}

const setAddCardPopup = function() {
  addCardBtnOpen.addEventListener('click', editNewCard);
  addCardForm.addEventListener('submit', saveNewCard);

  addCardPopup.addEventListener('click', closePopupByOverlay);
  addCardBtnClose.addEventListener('click', closePopup);  
}

//--------------------------------------------------------------------------------------
// Добавление карточки с фотографией в список
const addListItem = function(item, templateSelector, cardSelector) {
  const card = new Card(item, templateSelector, cardSelector);
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
}

//--------------------------------------------------------------------------------------
// Добавление на страницу карточек из массива
const createCardList = function(templateSelector, cardSelector) {
  initialCards.forEach((item) => {
    addListItem(item, templateSelector, cardSelector);
  });
}

//--------------------------------------------------------------------------------------
console.log('--- index.js ---');
createCardList('#card-template', '.photo-grid__card');
setViewPopup();
setAddCardPopup();



