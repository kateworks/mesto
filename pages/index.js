//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------

import {
  listSelector, 
  cardTemplateSelector,
  cardSelector,
  popupData,
  profileData,
  cardData,
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
const popupView = new PopupWithImage(popupViewSelector);
popupView.setEventListeners();

// Добавление карточки с фотографией в список
const addListItem = function(item) {
  const card = new Card(
    { data: item, handleCardClick: () => popupView.open(item) }, 
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
// Создание карточки
//--------------------------------------------------------------------------------------

const formNewCardSelector = popupNewCardSelector + ' ' + popupData.formSelector;

const buttonNewCard = document.querySelector(buttonNewCardSelector);
const formNewCard = document.querySelector(formNewCardSelector);
const titleInput = formNewCard.querySelector(cardData.titleSelector);
const linkInput = formNewCard.querySelector(cardData.linkSelector);
const formNewCardValidation = new FormValidator(popupData, formNewCard);

const popupNewCard = new PopupWithForm(
  {
    popupSelector: popupNewCardSelector,
    formSelector: popupData.formSelector,
    inputSelector: popupData.inputSelector
  }, 
  (evt) => {
    evt.preventDefault();
    console.log(popupNewCard.getInputValues());
    addListItem( { name: titleInput.value, link: linkInput.value } );
    //addListItem(popupNewCard.getInputValues());
    popupNewCard.close();  
  }
);

//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------
const formEditProfileSelector = popupEditProfileSelector + ' ' + popupData.formSelector;

const userProfile = new UserInfo(profileData);

const popupEditProfile = new PopupWithForm(
  {
    popupSelector: popupEditProfileSelector,
    formSelector: popupData.formSelector,
    inputSelector: popupData.inputSelector
  },
  (evt) => {
    evt.preventDefault();
    userProfile.setUserInfo(popupEditProfile.getInputValues());
    popupEditProfile.close();  
  }
);

const buttonEditProfile = document.querySelector(buttonEditProfileSelector);
const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(popupData, formEditProfile);

//--------------------------------------------------------------------------------------

cardsList.renderItems();

popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

formNewCardValidation.enableValidation();
formEditProfileValidation.enableValidation();

buttonNewCard.addEventListener('click', () => {
  popupNewCard.open({title: '', link: ''});
  formNewCardValidation.setInitialState();
});

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open(userProfile.getUserInfo());
  formEditProfileValidation.setInitialState();
});

