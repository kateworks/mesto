//--------------------------------------------------------------------------------------
// Функции для работы с карточками
// Исходный массив находится в cards-init.js
//--------------------------------------------------------------------------------------

const cardsList = document.querySelector('.photo-grid__list');

// -----   Всплывающее окно просмотра карточки  -----
const viewPopup = document.querySelector('.popup_content_image');
const closeViewButton = viewPopup.querySelector('.popup__btn_action_close');

// -----   Всплывающее окно добавления карточки  -----
const newPlaceButton = document.querySelector('.profile__btn_action_add');
const newPlacePopup = document.querySelector('.popup_content_card'); 
const newPlaceForm = newPlacePopup.querySelector('.popup__form');
const newPlaceCloseButton = newPlacePopup.querySelector('.popup__btn_action_close');

//--------------------------------------------------------------------------------------
// Добавление карточки с фотографией в список
const addListItem = function(item) {
  const listItem = document.createElement('li');
  listItem.classList.add('.photo-grid__item');

  const cardElement = createCard(item);
  listItem.append(cardElement);
  cardsList.prepend(listItem);
}

// Создание карточки
const createCard = function(newCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-grid__title').textContent = newCard.name;

  const cardImage = cardElement.querySelector('.photo-grid__image');
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;
  cardImage.title = newCard.name;

  cardElement.querySelector('.photo-grid__btn_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.photo-grid__btn_action_del').addEventListener('click', deleteCard);
  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => viewCard(newCard));
  return cardElement;
}

// Добавление отметки "Нравится"
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
const viewCard = function(card) {
  const imagePopup = viewPopup.querySelector('.popup__image');
  imagePopup.src = card.link;
  imagePopup.alt = card.name;
  viewPopup.querySelector('.popup__image-caption').textContent = card.name;
  togglePopup(viewPopup);
}

// Добавление на страницу карточек из массива
const createCardList = function() {
  initialCards.forEach((item) => {
    addListItem(item);
  });
}

const saveNewCard = function(evt) {
  evt.preventDefault();

  const newItem = {name: '', link: ''};
  const nameInput = newPlaceForm.querySelector('.popup__item_type_name');
  const linkInput = newPlaceForm.querySelector('.popup__item_type_info');

  newItem.name = nameInput.value;
  newItem.link = linkInput.value;
  addListItem(newItem);

  nameInput.value = '';
  linkInput.value = '';
  togglePopup(newPlacePopup);
}

//--------------------------------------------------------------------------------------

createCardList();

closeViewButton.addEventListener('click', () => togglePopup(viewPopup));

newPlaceButton.addEventListener('click', () => togglePopup(newPlacePopup));
newPlaceForm.addEventListener('submit', saveNewCard);
newPlaceCloseButton.addEventListener('click', () => togglePopup(newPlacePopup));
