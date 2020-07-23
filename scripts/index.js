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

// -----   Всплывающее окно редактирования профиля  -----
const editProfilePopup = document.querySelector('.popup_content_profile');;
const editProfileBtnOpen = document.querySelector('.profile__btn_action_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');

const editProfileBtnSave = editProfileForm.querySelector('.popup__btn_action_submit');
const editProfileBtnClose = editProfilePopup.querySelector('.popup__btn_action_close');

const nameInput = editProfileForm.querySelector('.popup__item_type_name');
const workInput = editProfileForm.querySelector('.popup__item_type_info');

// -----   Профиль пользователя   -----
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');

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

const setCloseEvents = function(popup, closeButton) {
  popup.addEventListener('click', closePopupByOverlay);
  closeButton.addEventListener('click', closePopup);  
}

//--------------------------------------------------------------------------------------
// Добавление новой карточки

// Настройка окна добавления карточки
const setAddCardPopup = function() {
  addCardBtnOpen.addEventListener('click', editNewCard);
  addCardForm.addEventListener('submit', saveNewCard);
  setCloseEvents(addCardPopup, addCardBtnClose) ;
}

const emptyInputs = function() {
  titleInput.value = '';
  linkInput.value = '';
}

// Открытие окна добавления карточки
const editNewCard = function(evt) {
  openPopup(addCardPopup);
  emptyInputs();
  //setInitialState(newPlaceForm, popupInfo);
}

// Добавление карточки с фотографией в список
const addListItem = function(item, templateSelector, cardSelector) {
  const card = new Card(item, templateSelector, cardSelector);
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
}

// Сохранение данных карточки
const saveNewCard = function(evt) {
  evt.preventDefault();
  const newItem = {name: titleInput.value, link: linkInput.value};
  addListItem(newItem,'#card-template', '.photo-grid__card');
  emptyInputs();
  closePopup();
}

//--------------------------------------------------------------------------------------
// Добавление на страницу карточек из массива
const createCardList = function(templateSelector, cardSelector) {
  initialCards.forEach((item) => {
    addListItem(item, templateSelector, cardSelector);
  });
}

//--------------------------------------------------------------------------------------
// Просмотр фотографии

// Настройка окна просмотра
const setViewPopup = function() {
  setCloseEvents(viewPopup, viewBtnClose);
}

// Открытие окна просмотра
export const openViewPopup = function(data) {
  const viewImage = viewPopup.querySelector('.popup__image');
  viewImage.src = data.link;
  viewImage.alt = data.name;
  viewPopup.querySelector('.popup__image-caption').textContent = data.name;
  openPopup(viewPopup);
}

//--------------------------------------------------------------------------------------
// Редактирование профиля

// Настройка окна редактирования
const setEditProfilePopup = function() {
  editProfileBtnOpen.addEventListener('click', editProfile);
  editProfileForm.addEventListener('submit', saveProfile);
  setCloseEvents(editProfilePopup, editProfileBtnClose);
}

// Открытие окна редактирования профиля
const editProfile = function(evt) {
  openPopup(editProfilePopup);
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
  //setInitialState(editProfileForm, popupInfo);
}

// Сохранение профиля
const saveProfile = function(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = workInput.value;
  closePopup();
}

//--------------------------------------------------------------------------------------
//console.log('--- index.js --- starts');
createCardList('#card-template', '.photo-grid__card');
setViewPopup();
setAddCardPopup();
setEditProfilePopup();
//console.log('--- index.js --- stops');



