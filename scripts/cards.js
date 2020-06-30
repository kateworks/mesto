//--------------------------------------------------------------------------------------
// Функции для работы с карточками
// Исходный массив находится в cards-init.js
//--------------------------------------------------------------------------------------

const cardsList = document.querySelector('.photo-grid__list');

// -----   Всплывающее окно просмотра карточки  -----
const viewPopup = document.querySelector('.popup_content_image');
const closeViewButton = viewPopup.querySelector('.popup__btn_action_close');

// -----   Всплывающее окно добавления карточки  -----
let newPlacePopup, newPlaceForm; 
const newPlaceButton = document.querySelector('.profile__btn_action_add');

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
  cardElement.querySelector('.photo-grid__image').addEventListener('click', viewCard);
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
const createCardList = function() {
  initialCards.forEach((item) => {
    addListItem(item);
  });
}

//--------------------------------------------------------------------------------------
// Всплывающее окно добавления карточки

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
  closePopup(evt);
}

const createAddPopup = function() {
  const popupEditTemplate = document.querySelector('#popup-edit-template').content;
  const popupElement = popupEditTemplate.cloneNode(true);

  popupElement.querySelector('.popup__heading').textContent = "Новое место";
  popupElement.querySelector('.popup__item_type_name').placeholder = "Название";
  popupElement.querySelector('.popup__item_type_info').placeholder = "Ссылка на картинку";

  popupElement.querySelector('.popup__form').addEventListener('submit', saveNewCard);
  popupElement.querySelector('.popup__btn_action_close').addEventListener('click', closePopup);

  popupElement.querySelector('.popup').classList.add('popup_content_card');
  document.querySelector('.page').append(popupElement);

  return document.querySelector('.popup_content_card');
}
//--------------------------------------------------------------------------------------

createCardList();

closeViewButton.addEventListener('click', closePopup);

newPlacePopup = createAddPopup();
newPlaceForm = newPlacePopup.querySelector('.popup__form');
newPlaceButton.addEventListener('click', function() {
  newPlacePopup.classList.add('popup_opened');
});
