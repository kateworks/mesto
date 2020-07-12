//--------------------------------------------------------------------------------------
// Функции для работы с карточками
// Исходный массив находится в cards-init.js
//--------------------------------------------------------------------------------------

const cardsList = document.querySelector('.photo-grid__list');

// -----   Всплывающее окно просмотра карточки  -----
const viewPopup = document.querySelector('.popup_content_image');
const imageView = viewPopup.querySelector('.popup__image');
const captionView = viewPopup.querySelector('.popup__image-caption');
const closeViewButton = viewPopup.querySelector('.popup__btn_action_close');

// -----   Всплывающее окно добавления карточки  -----
const newPlaceButton = document.querySelector('.profile__btn_action_add');
const newPlacePopup = document.querySelector('.popup_content_card'); 
const newPlaceForm = newPlacePopup.querySelector('.popup__form');

const titleInput = newPlaceForm.querySelector('.popup__item_type_name');
const linkInput = newPlaceForm.querySelector('.popup__item_type_info');

const newPlaceCloseButton = newPlacePopup.querySelector('.popup__btn_action_close');

//--------------------------------------------------------------------------------------
// Добавление карточки с фотографией в список
const addListItem = function(item) {
  const cardElement = createCard(item);
  cardsList.prepend(cardElement);
}

// Создание карточки
const createCard = function(newCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-grid__title').textContent = newCard.name;

  const cardImage = cardElement.querySelector('.photo-grid__image');
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;

  cardElement.querySelector('.photo-grid__btn_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.photo-grid__btn_action_del').addEventListener('click', deleteCard);
  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => viewCard(newCard));
  return cardElement;
}

// Добавление отметки "Нравится"
const likeCard = function(evt) {
  evt.target.classList.toggle('photo-grid__btn_clicked');
}

// Удаление карточки
const deleteCard = function(evt) {
  const card = evt.target.closest('.photo-grid__card');
  card.remove();
}

// Просмотр фотографии
const viewCard = function(card) {
  imageView.src = card.link;
  imageView.alt = card.name;
  captionView.textContent = card.name;
  togglePopup(viewPopup);
}

// Добавление на страницу карточек из массива
const createCardList = function() {
  initialCards.forEach((item) => {
    addListItem(item);
  });
}

const editNewCard = function(evt) {
  togglePopup(newPlacePopup);
  titleInput.value = '';
  linkInput.value = '';
  setInitialState(newPlaceForm, popupInfo);
}

const saveNewCard = function(evt) {
  evt.preventDefault();
  const newItem = {name: '', link: ''};
  newItem.name = titleInput.value;
  newItem.link = linkInput.value;
  addListItem(newItem);

  titleInput.value = '';
  linkInput.value = '';
  togglePopup(newPlacePopup);
}

//--------------------------------------------------------------------------------------

createCardList();

newPlacePopup.addEventListener('click', closeByClickingOverlay);

newPlaceForm.addEventListener('submit', saveNewCard);
newPlaceButton.addEventListener('click', editNewCard);
newPlaceCloseButton.addEventListener('click', () => togglePopup(newPlacePopup));

viewPopup.addEventListener('click', closeByClickingOverlay);
closeViewButton.addEventListener('click', () => togglePopup(viewPopup));
