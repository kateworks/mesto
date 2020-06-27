//-------------------------------------------------------------------------------------
// Функции для работы с карточками
// Исходный массив находится в cards-init.js
//-------------------------------------------------------------------------------------

const cardsList = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('#card-template').content;

// Ставим отметку "Нравится"
const likeCard = function(evt) {
  const card = evt.target.closest('.photo-grid__card');
  const likeButton = card.querySelector('.photo-grid__btn_action_like');
  const title = likeButton.title;

  likeButton.classList.toggle('photo-grid__btn_clicked');
  likeButton.title = (title === 'Нравится') ? 'Больше не нравится' : 'Нравится';
}

// Добавление карточек с фотографиями
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
  // delete card

  listItem.append(cardElement);
  cardsList.prepend(listItem);
}

// Добавление на страницу карточек из массива
const setInitialCards = function() {
  initialCards.forEach((item) => {
    addCard(item);
  });
}

setInitialCards();