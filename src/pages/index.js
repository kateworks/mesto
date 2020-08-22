//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------

import './index.css';

import {
  listSelector, 
  cardTemplateSelector, cardSelector, imageData,
  popupData, popupForm, popupListSelectors, 
  profileData, buttonEditProfileSelector,
  buttonNewCardSelector
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
const popupView = new PopupWithImage(popupListSelectors.viewCard, popupData, imageData);

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

const formNewCardSelector = `${popupListSelectors.createCard} ${popupForm.formSelector}`;
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(popupForm, formNewCard);

const buttonNewCard = document.querySelector(buttonNewCardSelector);
const buttonSubmitCard = formNewCard.querySelector(popupForm.submitButtonSelector);

const popupNewCard = new PopupWithForm( 
  popupListSelectors.createCard, popupData,
  { form: popupForm.formSelector, input: popupForm.inputSelector }, 
  (item) => {
    buttonSubmitCard.textContent = 'Сохранение...';
    api.postNewCard({name: item.title, link: item.link})
      .then((res) => {
        addListItem({title: res.name, link: res.link});
      })
      .catch((err) => {
        console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
      })
      .finally(() => {
        popupNewCard.close(); 
        buttonSubmitCard.textContent = 'Создать';
      });
  }
);

//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------

const formEditProfileSelector = `${popupListSelectors.editProfile} ${popupForm.formSelector}`;
const formChangeAvatarSelector = `${popupListSelectors.changeAvatar} ${popupForm.formSelector}`;

const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(popupForm, formEditProfile);
const buttonEditProfile = document.querySelector(buttonEditProfileSelector);
const buttonSubmitProfile = formEditProfile.querySelector(popupForm.submitButtonSelector);

const formChangeAvatar = document.querySelector(formChangeAvatarSelector);
const formChangeAvatarValidation = new FormValidator(popupForm, formChangeAvatar);
const buttonChangeAvatar = document.querySelector(profileData.avatarSelector);
const buttonSubmitAvatar = formChangeAvatar.querySelector(popupForm.submitButtonSelector);

const userProfile = new UserInfo(profileData);

const popupChangeAvatar = new PopupWithForm(
  popupListSelectors.changeAvatar, popupData,
  { form: popupForm.formSelector, input: popupForm.inputSelector },
  (data) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    api.patchNewAvatar(data)
      .then((res) => {
        userProfile.setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`Невозможно обновить аватар на сервере. ${err}.`);
      })
      .finally(() => {
        popupChangeAvatar.close();
        buttonSubmitAvatar.textContent = 'Сохранить';
      });
  }
);

const popupEditProfile = new PopupWithForm(
  popupListSelectors.editProfile, popupData,
  { form: popupForm.formSelector, input: popupForm.inputSelector },
  (userData) => {
    buttonSubmitProfile.textContent = 'Сохранение...';
    api.patchUserProfile(userData)
      .then((res) => {
        userProfile.setUserInfo(userData);
      })
      .catch((err) => {
        console.log(`Невозможно обновить профиль пользователя. ${err}.`);
      })
      .finally(() => { 
        popupEditProfile.close();
        buttonSubmitProfile.textContent = 'Сохранить';
      });

  }
);

api.getUserInfo()
  .then((res) => {
    console.log(`Информация о пользователе получена с сервера.`);
    userProfile.setUserInfo({name: res.name, info: res.about});
    userProfile.setUserAvatar(res.avatar);
    userProfile.setUserId(res._id);
  })
  .catch((err) => {
    console.log(`Невозможно прочитать профиль пользователя. ${err}.`);
  });

//--------------------------------------------------------------------------------------

// Обработка событий
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupView.setEventListeners();
popupChangeAvatar.setEventListeners();

// Включаем валидацию форм
formNewCardValidation.enableValidation();
formEditProfileValidation.enableValidation();
formChangeAvatarValidation.enableValidation();

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

buttonChangeAvatar.addEventListener('click', () => {
  const avatar = userProfile.getUserAvatar()
  popupChangeAvatar.open({avatar});
  formChangeAvatarValidation.setInitialState();
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
    console.log(`Невозможно получить карточки с сервера. ${err}.`);
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




