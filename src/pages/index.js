//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------
import { nanoid } from 'nanoid';
import './index.css';

import {
  listSelector, cardTemplateSelector, cardSelector, imageData, popupSelectors,
  PROFILE_SELECTORS, POPUP_DATA, FORM_CHECK, FORM_DATA,
  btnNewCardSelector, buttonEditProfileSelector,
} from '../utils/selectors';

import initialCards from '../utils/cards-init';
import api from '../utils/api';
import userProfile from '../utils/profile';
import { popupChangeAvatar, formChangeAvatarValidation } from './edit-avatar';
import { popupEditProfile, formEditProfileValidation } from './edit-profile';

import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
import FormValidator from '../components/FormValidator';

let cardsArray = [];
let cardsList = null;

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(popupSelectors.viewCard, POPUP_DATA, imageData);

// Подтверждение удаления
const popupConfirm = new PopupWithSubmit(
  popupSelectors.confirm, POPUP_DATA,
  (card) => { deleteCard(card); },
);

const btnSubmitDelSelector = `${popupSelectors.confirm} ${FORM_CHECK.submitBtnSelector}`;
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
  const likeState = card.isLiked();
  const likes = card.getLikes();
  const user = userProfile.getUserID();

  const action = likeState ? 'удалить' : 'поставить';
  const likeFunc = likeState
    ? (cardId, cardLikes) => api.unlikeCard(cardId, cardLikes)
    : (cardId, cardLikes) => api.likeCard(cardId, cardLikes);

  // const newLikes = likes

  likeFunc(id, likes)
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

const formNewCardSelector = `${popupSelectors.createCard} ${FORM_CHECK.formSelector}`;
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(FORM_CHECK, formNewCard);

const btnNewCard = document.querySelector(btnNewCardSelector);
const btnSubmitCard = formNewCard.querySelector(FORM_CHECK.submitBtnSelector);

const popupNewCard = new PopupWithForm(
  popupSelectors.createCard, POPUP_DATA, FORM_DATA,
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
// Обработка событий
//--------------------------------------------------------------------------------------

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

const buttonEditProfile = document.querySelector(buttonEditProfileSelector);

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open(userProfile.getUserInfo());
  formEditProfileValidation.setInitialState();
});

const buttonChangeAvatar = document.querySelector(PROFILE_SELECTORS.avatar);

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
