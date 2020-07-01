
// -----   Профиль пользователя   -----
const profileFields = ['Редактировать профиль', 'Имя', 'Занятие'];
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');

// -----   Всплывающее окно редактирования профиля  -----
let editProfilePopup, editProfileForm; 
let nameInput, workInput;
const editProfileButton = document.querySelector('.profile__btn_action_edit');

//--------------------------------------------------------------------------------------
// Закрытие popup (используется в cards.js, script.js)
const closePopup = function(evt) {
  let popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

// Создание popup из шаблона popup-edit-template
// (используется в cards.js, script.js)
const createEditPopup = function(className, submitListener, fields) {
  const popupEditTemplate = document.querySelector('#popup-edit-template').content;
  const popupElement = popupEditTemplate.cloneNode(true);

  popupElement.querySelector('.popup__heading').textContent = fields[0];
  popupElement.querySelector('.popup__item_type_name').placeholder = fields[1];
  popupElement.querySelector('.popup__item_type_info').placeholder = fields[2];

  popupElement.querySelector('.popup__form').addEventListener('submit', submitListener);
  popupElement.querySelector('.popup__btn_action_close').addEventListener('click', closePopup);

  popupElement.querySelector('.popup').classList.add(className);
  document.querySelector('.page').append(popupElement);

  return document.querySelector('.' + className);
}
//--------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------

editProfileButton.addEventListener('click', editProfile);

editProfilePopup = createEditPopup('popup_content_profile', saveProfile, profileFields);
editProfileForm = editProfilePopup.querySelector('.popup__form');
nameInput = editProfileForm.querySelector('.popup__item_type_name');
workInput = editProfileForm.querySelector('.popup__item_type_info');




