//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------

import './index.css';

import {
  listSelector, 
  cardTemplateSelector,
  cardSelector,
  popupData,
  popupForm,
  imageData,
  profileData,
  popupViewSelector,
  popupNewCardSelector,
  popupEditProfileSelector,
  buttonNewCardSelector,
  buttonEditProfileSelector
} from '../utils/constants.js';

import {initialCards} from '../utils/cards-init.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(popupViewSelector, popupData, imageData);
popupView.setEventListeners();

// Добавление карточки с фотографией в список
const addListItem = function(item) {
  const card = new Card(
    { data: item, handleCardClick: (item) => { popupView.open(item); }}, 
    cardTemplateSelector, 
    cardSelector
  );
  const cardElement = card.createCard();
  cardsList.addItem(cardElement);
};

// Создание контейнера для карточек
const cardsList = new Section({
  items: initialCards, 
  renderer: (item) => addListItem(item)
}, listSelector);

//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------

const formNewCardSelector = `${popupNewCardSelector} ${popupForm.formSelector}`;

const buttonNewCard = document.querySelector(buttonNewCardSelector);
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(popupForm, formNewCard);

const popupNewCard = new PopupWithForm( 
  popupNewCardSelector, popupData,
  { form: popupForm.formSelector, input: popupForm.inputSelector }, 
  (item) => {
    addListItem(item);
    popupNewCard.close();  
  }
);

//--------------------------------------------------------------------------------------
// Форма редактирования профиля
//--------------------------------------------------------------------------------------
const formEditProfileSelector = `${popupEditProfileSelector} ${popupForm.formSelector}`;

const userProfile = new UserInfo(profileData);

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector, popupData,
  { form: popupForm.formSelector, input: popupForm.inputSelector },
  (userData) => {
    userProfile.setUserInfo(userData);
    popupEditProfile.close();  
  }
);

const buttonEditProfile = document.querySelector(buttonEditProfileSelector);
const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(popupForm, formEditProfile);

//--------------------------------------------------------------------------------------
// Отображение начального набора карточек
cardsList.renderItems();

// Обработка событий
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

// Включаем валидацию форм
formNewCardValidation.enableValidation();
formEditProfileValidation.enableValidation();

// Нажатие на кнопку "Добавить карточку"
buttonNewCard.addEventListener('click', () => {
  popupNewCard.open();
  formNewCardValidation.setInitialState();
});

// Нажатие на кнопку "Редактировать профиль"
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open(userProfile.getUserInfo());
  formEditProfileValidation.setInitialState();
});

