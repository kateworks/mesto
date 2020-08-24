//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------
import './index.css';

import {
  listSelector, cardTemplateSelector, cardSelector, imageData,
  popupData, popupForm, popupSelectors, profileData, formData,
  btnEditProfileSelector, btnNewCardSelector
} from '../utils/constants.js';

import {initialCards} from '../utils/cards-init.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '963ba2cb-ffe5-4800-9828-03d0e9a57e68',
    'Content-Type': 'application/json'
  }
});

const userProfile = new UserInfo(profileData);

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(popupSelectors.viewCard, popupData, imageData);

// Подтверждение удаления
const popupConfirm = new PopupWithSubmit(
  popupSelectors.confirm, popupData,
  (card) => { deleteCard(card); }
);

const btnSubmitDelSelector = `${popupSelectors.confirm} ${popupForm.submitBtnSelector}`;
const btnSubmitDel = document.querySelector(btnSubmitDelSelector);

// Добавление карточки с фотографией в список
const addListItem = function(item) {
  const card = new Card(
    { data: item, 
      handleClick: (item) => { popupView.open(item); },
      handleLike: (card) => { console.log('Like', {card}); },
      handleDelete: (card) => { popupConfirm.open(card); }
    }, 
    cardTemplateSelector, 
    cardSelector
  );
  const cardElement = card.createCard(userProfile.getUserID());
  cardsList.addItem(cardElement);
};

// Удаление карточки
const deleteCard = (card) => {
  btnSubmitDel.textContent = 'Удаление...';
  api.deleteCard(card.getCardId())
    .then((res) => {
      card.delete();
    })
    .catch((err) => {
      console.log(`Невозможно удалить карточку. Ошибка ${err}.`);
    })
    .finally(() => {
      popupConfirm.close(); 
      btnSubmitDel.textContent = 'Да';
    });
}

//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------

const formNewCardSelector = `${popupSelectors.createCard} ${popupForm.formSelector}`;
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(popupForm, formNewCard);

const btnNewCard = document.querySelector(btnNewCardSelector);
const btnSubmitCard = formNewCard.querySelector(popupForm.submitBtnSelector);

const popupNewCard = new PopupWithForm( 
  popupSelectors.createCard, popupData, formData, 
  (item) => { saveNewCard(item); }
);

const saveNewCard = function(item) {
  btnSubmitCard.textContent = 'Сохранение...';
  api.postNewCard({name: item.title, link: item.link})
    .then((res) => {
      addListItem({ 
        title: res.name, 
        link: res.link, 
        likes: res.likes, 
        owner: res.owner._id, 
        id: res._id
      });
    })
    .catch((err) => {
      console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
    })
    .finally(() => {
      popupNewCard.close(); 
      btnSubmitCard.textContent = 'Создать';
    });
}

//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------

const formEditProfileSelector = `${popupSelectors.editProfile} ${popupForm.formSelector}`;
const formChangeAvatarSelector = `${popupSelectors.changeAvatar} ${popupForm.formSelector}`;

const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(popupForm, formEditProfile);
const buttonEditProfile = document.querySelector(btnEditProfileSelector);
const buttonSubmitProfile = formEditProfile.querySelector(popupForm.submitBtnSelector);

const formChangeAvatar = document.querySelector(formChangeAvatarSelector);
const formChangeAvatarValidation = new FormValidator(popupForm, formChangeAvatar);
const buttonChangeAvatar = document.querySelector(profileData.avatarSelector);
const buttonSubmitAvatar = formChangeAvatar.querySelector(popupForm.submitBtnSelector);

// Окно редактирования аватара пользователя
const popupChangeAvatar = new PopupWithForm(
  popupSelectors.changeAvatar, popupData, formData,
  (data) => { saveUserAvatar(data); }
);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  popupSelectors.editProfile, popupData, formData,
  (data) => { saveUserProfile(data); }
);

// Сохранение аватара на сервере
const saveUserAvatar = function(data) {
  buttonSubmitAvatar.textContent = 'Сохранение...';
  api.patchNewAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
      userProfile.setUserId(res._id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить аватар на сервере. ${err}.`);
    })
    .finally(() => {
      popupChangeAvatar.close();
      buttonSubmitAvatar.textContent = 'Сохранить';
    });
}

// Сохранение профиля на сервере
const saveUserProfile = function(userData) {
  buttonSubmitProfile.textContent = 'Сохранение...';
  api.patchUserProfile(userData)
    .then((res) => {
      userProfile.setUserInfo({ name: res.name, info: res.about });
      userProfile.setUserId(res._id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить профиль пользователя. ${err}.`);
    })
    .finally(() => { 
      popupEditProfile.close();
      buttonSubmitProfile.textContent = 'Сохранить';
    });
}

//--------------------------------------------------------------------------------------
// Обработка событий
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupView.setEventListeners();
popupChangeAvatar.setEventListeners();
popupConfirm.setEventListeners();

// Включаем валидацию форм
formNewCardValidation.enableValidation();
formEditProfileValidation.enableValidation();
formChangeAvatarValidation.enableValidation();

// Нажатие на кнопку "Добавить карточку"
btnNewCard.addEventListener('click', () => {
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

api.getUserInfo()
  .then((res) => {
    console.log(`Информация о пользователе получена с сервера.`);
    userProfile.setUserInfo({name: res.name, info: res.about});
    userProfile.setUserAvatar(res.avatar);
    userProfile.setUserId(res._id);
  })
  .catch((err) => {
    console.log(`Невозможно прочитать профиль пользователя. ${err}.`);
  })
  .finally(() => {
      api.getInitialCards()
      .then((res) => {
        console.log(`Информация о карточках получена с сервера.`);
        cardsArray = res.map(item => {
          return {
            title: item.name, 
            link: item.link, 
            likes: item.likes, 
            owner: item.owner._id,
            id: item._id
          };
        });
      })
      .catch((err) => {
        console.log(`Невозможно получить карточки с сервера. ${err}.`);
        cardsArray = initialCards;
      })
      .finally(() => {
          // Создание контейнера
          cardsList = new Section(
            { items: cardsArray, renderer: (item) => addListItem(item) }, 
            listSelector
          );
          // Отображение карточек
          cardsList.renderItems();
      });
  });





