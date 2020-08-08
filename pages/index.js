//--------------------------------------------------------------------------------------
// Модуль index.js
//--------------------------------------------------------------------------------------

import {
  listSelector, 
  cardTemplateSelector,
  cardSelector,
  popupData,
  popupViewSelector,
  popupNewCardSelector,
  buttonNewCardSelector
} from '../utils/constants.js';

import {initialCards} from '../utils/cards-init.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

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

// Обработка события submit
const saveNewCard = function(evt) {
  evt.preventDefault();
  addListItem( { name: titleInput.value, link: linkInput.value } );
  popupNewCard.close();
};

const popupNewCard = new PopupWithForm(
  {
    popupSelector: popupNewCardSelector,
    formSelector: popupData.formSelector,
    inputSelector: popupData.inputSelector
  }, 
  saveNewCard
);

const buttonNewCard = document.querySelector(buttonNewCardSelector);
const formNewCard = document.querySelector(formNewCardSelector);

const titleInput = formNewCard.querySelector('.popup__item_type_name');
const linkInput = formNewCard.querySelector('.popup__item_type_info');

const formNewCardValidation = new FormValidator(popupData, formNewCard);


//--------------------------------------------------------------------------------------

buttonNewCard.addEventListener('click', () => {
  formNewCardValidation.setInitialState();
  popupNewCard.open();
});

popupNewCard.setEventListeners();

formNewCardValidation.enableValidation();

cardsList.renderItems();








