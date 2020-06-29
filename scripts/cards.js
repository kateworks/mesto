//-------------------------------------------------------------------------------------
// Функции для работы с карточками
// Исходный массив находится в cards-init.js
//-------------------------------------------------------------------------------------

const cardsList = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('#card-template').content;

// -----   Форма просмотра карточки  -----
let viewPopup = document.querySelector('.popup_content_image');
let closeViewButton = viewPopup.querySelector('.popup__btn_action_close');

// Добавление карточки с фотографией
const addCard = function(newCard) {
  const listItem = document.createElement('li');
  listItem.classList.add('.photo-grid__item');

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-grid__title').textContent = newCard.name;

  const cardImage = cardElement.querySelector('.photo-grid__image');
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;
  cardImage.title = newCard.name;

  cardElement.querySelector('.photo-grid__btn_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.photo-grid__btn_action_del').addEventListener('click', deleteCard);
  cardElement.querySelector('.photo-grid__image').addEventListener('click', viewCard);

  listItem.append(cardElement);
  cardsList.prepend(listItem);
}

// Ставим отметку "Нравится"
const likeCard = function(evt) {
  const card = evt.target.closest('.photo-grid__card');
  const likeButton = card.querySelector('.photo-grid__btn_action_like');
  const title = likeButton.title;

  likeButton.classList.toggle('photo-grid__btn_clicked');
  likeButton.title = (title === 'Нравится') ? 'Больше не нравится' : 'Нравится';
}

// Удаление карточки
const deleteCard = function(evt) {
  const card = evt.target.closest('.photo-grid__card');
  const listItem = card.parentElement;
  card.remove();
  listItem.remove();
}

// Просмотр фотографии
const viewCard = function(evt) {
  const card = evt.target.closest('.photo-grid__card');
  const text = card.querySelector('.photo-grid__title').textContent;
  const imagePopup = viewPopup.querySelector('.popup__image');

  imagePopup.src = card.querySelector('.photo-grid__image').src;
  imagePopup.title = text;
  imagePopup.alt = text;
  viewPopup.querySelector('.popup__image-caption').textContent = text;
  
  viewPopup.classList.add('popup_opened');
}

// Добавление на страницу карточек из массива
const setInitialCards = function() {
  initialCards.forEach((item) => {
    addCard(item);
  });
}

setInitialCards();
closeViewButton.addEventListener('click', closePopup);
