
// -----   Профиль пользователя   -----
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');

// -----   Всплывающее окно редактирования профиля  -----
const editProfileButton = document.querySelector('.profile__btn_action_edit');
const editProfilePopup = document.querySelector('.popup_content_profile');;
const editProfileForm = editProfilePopup.querySelector('.popup__form');

const nameInput = editProfileForm.querySelector('.popup__item_type_name');
const workInput = editProfileForm.querySelector('.popup__item_type_info');

const closeProfileButton = editProfilePopup.querySelector('.popup__btn_action_close');

//--------------------------------------------------------------------------------------

// Открытие/закрытие popup (используется в cards.js, script.js)
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
}

const editProfile = function(evt) {
  togglePopup(editProfilePopup);
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
}

const saveProfile = function(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = workInput.value;
  togglePopup(editProfilePopup);
}

//--------------------------------------------------------------------------------------

editProfileButton.addEventListener('click', editProfile);
editProfileForm.addEventListener('submit', saveProfile);
closeProfileButton.addEventListener('click', () => togglePopup(editProfilePopup))


