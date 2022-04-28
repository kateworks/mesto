//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------
import { nanoid } from 'nanoid';
import '../styles/index.css';

import {
  listSelector, cardTemplateSelector, cardSelector,
  IMAGE, POPUPS, POPUP_DATA, FORM_CHECK, FORM_DATA, ERROR_DATA,
  PROFILE_SELECTORS, PROFILE_BUTTONS,
} from '../utils/selectors';

import initialCards from '../utils/cards-init';
import * as messages from '../utils/messages';
import api from '../utils/api';
import userProfile from '../utils/profile';
import like from './like-card';
import popupConfirm from './delete-card';
import { popupChangeAvatar, formChangeAvatarValidation } from './edit-avatar';
import { popupEditProfile, formEditProfileValidation } from './edit-profile';

import {
  Card, ErrorMessage, FormValidator, PopupWithImage, PopupWithForm, Section,
} from '../components';

let cardsArray = [];
let cardsList = null;

//--------------------------------------------------------------------------------------
// Работа с карточками
//--------------------------------------------------------------------------------------

// Просмотр карточки
const popupView = new PopupWithImage(POPUPS.viewCard, POPUP_DATA, IMAGE);

// Добавление карточки с фотографией в список
const addListItem = (item) => {
  const card = new Card(
    {
      data: item,
      handleClick: (clickedItem) => { popupView.open(clickedItem); },
      handleLike: (likedItem) => { like(likedItem); },
      handleDelete: (deletedItem) => { popupConfirm.open(deletedItem); },
    },
    cardTemplateSelector,
    cardSelector,
  );
  const cardElement = card.createCard(userProfile.getUserID());
  cardsList.addItem(cardElement);
};

//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------

const formNewCardSelector = `${POPUPS.createCard} ${FORM_CHECK.formSelector}`;
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(FORM_CHECK, formNewCard);
const errorMessage = new ErrorMessage(formNewCard, ERROR_DATA);

const btnNewCard = document.querySelector(PROFILE_BUTTONS.add);
const btnSubmitCard = formNewCard.querySelector(FORM_CHECK.submitBtnSelector);

const popupNewCard = new PopupWithForm(
  POPUPS.createCard,
  POPUP_DATA,
  ERROR_DATA,
  FORM_DATA,
  (item) => { saveNewCard(item); },
);

function saveNewCard(item) {
  btnSubmitCard.textContent = messages.SAVING;

  const newItem = {
    id: nanoid(),
    name: item.title,
    link: item.link,
    likes: [],
    ownerId: 0,
  };

  api.postNewCard(newItem)
    .then((result) => {
      const {
        name, link, likes, ownerId, id,
      } = result;

      const savedItem = {
        title: name, link, likes, owner: ownerId, id,
      };

      addListItem(savedItem);
      errorMessage.toggle();
      popupNewCard.close();
    })
    .catch((error) => {
      const message = `${messages.SAVE_ERROR} ${messages.ERROR} ${error}.`;
      console.log(message);
      errorMessage.toggle(message);
    })
    .finally(() => {
      btnSubmitCard.textContent = messages.CREATE;
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

const buttonEditProfile = document.querySelector(PROFILE_BUTTONS.edit);

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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((result) => {
    const [user, cards] = result;
    if (user) {
      const {
        id, name, about, avatar,
      } = user;

      console.log(messages.USER_OK);
      userProfile.setUserInfo({ name, info: about });
      userProfile.setUserAvatar(avatar);
      userProfile.setUserId(id);
    } else {
      console.log(messages.USER_NO_DATA);
    }

    if (cards) {
      console.log(messages.CARDS_OK);

      cardsArray = cards.map((item) => {
        const {
          name, link, likes, ownerId, id,
        } = item;

        return {
          title: name, link, likes, owner: ownerId, id,
        };
      });
    } else {
      console.log(messages.CARDS_NO_DATA);
      cardsArray = initialCards;
    }
  })
  .catch((err) => {
    console.log(`${messages.DATA_ERROR} ${err}.`);
    cardsArray = initialCards;
  })
  .finally(() => {
    // Создание контейнера
    const sectionData = { items: cardsArray, renderer: (item) => addListItem(item) };
    cardsList = new Section(sectionData, listSelector);
    // Отображение карточек
    cardsList.renderItems();
  });
