
//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------
// -----   Всплывающее окно редактирования профиля  -----
const editProfilePopup = document.querySelector('.popup_content_profile');
const editProfileBtnOpen = document.querySelector('.profile__btn_action_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const editProfileValidation = new FormValidator(popupData, editProfileForm);
const editProfileBtnClose = editProfilePopup.querySelector('.popup__btn_action_close');

const nameInput = editProfileForm.querySelector('.popup__item_type_name');
const workInput = editProfileForm.querySelector('.popup__item_type_info');

// -----   Профиль пользователя   -----
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');

// Настройка окна редактирования
const setEditProfilePopup = function() {
  editProfileBtnOpen.addEventListener('click', editProfile);
  editProfileForm.addEventListener('submit', saveProfile);
  //setCloseEvents(editProfilePopup, editProfileBtnClose);
  editProfileValidation.enableValidation();
};

// Открытие окна редактирования профиля
const editProfile = function() {
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
  editProfileValidation.setInitialState();
  openPopup(editProfilePopup);
};

// Сохранение профиля
const saveProfile = function(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = workInput.value;
  closePopup();
};

//--------------------------------------------------------------------------------------


setEditProfilePopup();
