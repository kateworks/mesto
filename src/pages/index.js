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
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '963ba2cb-ffe5-4800-9828-03d0e9a57e68',
    'Content-Type': 'application/json'
  }
});

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(popupViewSelector, popupData, imageData);

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
    api.postNewCard({name: item.title, link: item.link})
      .then((res) => {
        addListItem({title: res.name, link: res.link});
      })
      .catch((err) => {
        console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
      })
      .finally(() => {
        popupNewCard.close();  
      });
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

// Обработка событий
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupView.setEventListeners();

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

//--------------------------------------------------------------------------------------
// Получаем данные с сервера

let cardsArray = [];
let cardsList = null;

api.getInitialCards()
  .then((res) => {
    console.log(`Информация о карточках получена с сервера.`);
    // создадим массив карточек из результирующего массива
    cardsArray = res.map(serverItem => {
      return {title: serverItem.name, link: serverItem.link};
    });
    console.log(res);
  })
  .catch((err) => {
    console.log(`Невозможно прочитать данные. Ошибка ${err}.`);
    // создадим массив карточек из резервного массива
    cardsArray = initialCards;
  })
  .finally(() => {
      // Создание контейнера
      cardsList = new Section({
        items: cardsArray, 
        renderer: (item) => addListItem(item)
      }, listSelector);
      // Отображение карточек
      cardsList.renderItems();
  });




