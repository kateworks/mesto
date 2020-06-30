
// -----   Профиль пользователя   -----
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');

// -----   Всплывающее окно редактирования профиля  -----
let editProfilePopup, editProfileForm; 
let nameInput, workInput;
let editProfileButton = document.querySelector('.profile__btn_action_edit');

//--------------------------------------------------------------------------------------
// Функция скрывает popup
// Используется в cards.js, script.js
const closePopup = function(evt) {
  let popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

//--------------------------------------------------------------------------------------
// Всплывающее окно редактирования профиля

const editProfile = function(evt) {
  editProfilePopup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
}

const saveProfile = function(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = workInput.value;
  closePopup(evt);
}

const createEditPopup = function() {
  const popupEditTemplate = document.querySelector('#popup-edit-template').content;
  const popupElement = popupEditTemplate.cloneNode(true);

  popupElement.querySelector('.popup__heading').textContent = 'Редактировать профиль';
  popupElement.querySelector('.popup__item_type_name').placeholder = 'Имя Фамилия';
  popupElement.querySelector('.popup__item_type_info').placeholder = 'Занятие';

  popupElement.querySelector('.popup__form').addEventListener('submit', saveProfile);
  popupElement.querySelector('.popup__btn_action_close').addEventListener('click', closePopup);

  popupElement.querySelector('.popup').classList.add('popup_content_profile');
  document.querySelector('.page').append(popupElement);

  return document.querySelector('.popup_content_profile');
}

//--------------------------------------------------------------------------------------

editProfileButton.addEventListener('click', editProfile);

editProfilePopup = createEditPopup();
editProfileForm = editProfilePopup.querySelector('.popup__form');
nameInput = editProfileForm.querySelector('.popup__item_type_name');
workInput = editProfileForm.querySelector('.popup__item_type_info');




