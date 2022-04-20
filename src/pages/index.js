//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------
import { nanoid } from 'nanoid';
import './index.css';

import {
  listSelector, cardTemplateSelector, cardSelector, imageData,
  popupData, popupForm, popupSelectors, profileData, formData,
  btnEditProfileSelector, btnNewCardSelector,
} from '../utils/constants';

import initialCards from '../utils/cards-init';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
import FormValidator from '../components/FormValidator';

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'https://my-json-server.typicode.com/kateworks/data',
  headers: {
    // authorization: '963ba2cb-ffe5-4800-9828-03d0e9a57e68',
    'Content-Type': 'application/json',
  },
});

const userProfile = new UserInfo(profileData);
let cardsArray = [];
let cardsList = null;

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(popupSelectors.viewCard, popupData, imageData);

// Подтверждение удаления
const popupConfirm = new PopupWithSubmit(
  popupSelectors.confirm, popupData,
  (card) => { deleteCard(card); },
);

const btnSubmitDelSelector = `${popupSelectors.confirm} ${popupForm.submitBtnSelector}`;
const btnSubmitDel = document.querySelector(btnSubmitDelSelector);

// Добавление карточки с фотографией в список
const addListItem = (item) => {
  const card = new Card(
    {
      data: item,
      handleClick: (clickedItem) => { popupView.open(clickedItem); },
      handleLike: (likedItem) => { likeCard(likedItem); },
      handleDelete: (deletedItem) => { popupConfirm.open(deletedItem); },
    },
    cardTemplateSelector,
    cardSelector,
  );
  const cardElement = card.createCard(userProfile.getUserID());
  cardsList.addItem(cardElement);
};

// Постановка/снятие лайка
function likeCard(card) {
  const id = card.getCardId();
  const user = userProfile.getUserID();
  const { name, info } = userProfile.getUserInfo();
  const likeState = card.isLiked();
  // const likes = card.getLikes();

  const userData = {
    id: user,
    name,
    about: info,
    avatar: userProfile.getUserAvatar(),
  };

  const action = likeState ? 'удалить' : 'поставить';
  const likeFunc = likeState
    ? (cardId) => api.unlikeCard(cardId)
    : (cardId, userInfo) => api.likeCard(cardId, userInfo);

  likeFunc(id, userData)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(`Невозможно ${action} лайк. Ошибка ${err}.`);
      card.setLikes(!likeState ? [{ id: user }] : []);
    })
    .finally(() => {
      card.setLikeGroup(user);
    });
}

// Удаление карточки
function deleteCard(card) {
  btnSubmitDel.textContent = 'Удаление...';
  api.deleteCard(card.getCardId())
    .then(() => {
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
  (item) => { saveNewCard(item); },
);

function saveNewCard(item) {
  btnSubmitCard.textContent = 'Сохранение...';

  const newItem = {
    id: nanoid(),
    name: item.title,
    link: item.link,
    likes: [],
    ownerId: 0,
  };

  // api.postNewCard({ name: item.title, link: item.link })
  api.postNewCard(newItem)
    .then((res) => {
      addListItem({
        title: res.name,
        link: res.link,
        likes: res.likes,
        owner: res.ownerId,
        id: res.id,
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
  (data) => { saveUserAvatar(data); },
);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  popupSelectors.editProfile, popupData, formData,
  (data) => { saveUserProfile(data); },
);

// Сохранение аватара на сервере
function saveUserAvatar(data) {
  buttonSubmitAvatar.textContent = 'Сохранение...';
  api.patchNewAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
      userProfile.setUserId(res.id);
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
function saveUserProfile(userData) {
  buttonSubmitProfile.textContent = 'Сохранение...';
  api.patchUserProfile(userData)
    .then((res) => {
      userProfile.setUserInfo({ name: res.name, info: res.about });
      userProfile.setUserId(res.id);
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
  const avatar = userProfile.getUserAvatar();
  popupChangeAvatar.open({ avatar });
  formChangeAvatarValidation.setInitialState();
});

//--------------------------------------------------------------------------------------
// Получаем данные с сервера

api.getUserInfo()
  .then((res) => {
    console.log('Информация о пользователе получена с сервера.');
    userProfile.setUserInfo({ name: res.name, info: res.about });
    userProfile.setUserAvatar(res.avatar);
    userProfile.setUserId(res.id);
  })
  .catch((err) => {
    console.log(`Невозможно прочитать профиль пользователя. ${err}.`);
  })
  .finally(() => {
    api.getInitialCards()
      .then((res) => {
        console.log('Информация о карточках получена с сервера.');
        cardsArray = res.map((item) => ({
          title: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.ownerId,
          id: item.id,
        }));
      })
      .catch((err) => {
        console.log(`Невозможно получить карточки с сервера. ${err}.`);
        cardsArray = initialCards;
      })
      .finally(() => {
        // Создание контейнера
        cardsList = new Section(
          { items: cardsArray, renderer: (item) => addListItem(item) },
          listSelector,
        );
        // Отображение карточек
        cardsList.renderItems();
      });
  });
