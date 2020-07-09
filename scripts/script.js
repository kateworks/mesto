
// -----   Профиль пользователя   -----
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');

// -----   Всплывающее окно редактирования профиля  -----
const editProfileButton = document.querySelector('.profile__btn_action_edit');
const editProfilePopup = document.querySelector('.popup_content_profile');;
const editProfileForm = editProfilePopup.querySelector('.popup__form');

const nameInput = editProfileForm.querySelector('.popup__item_type_name');
const workInput = editProfileForm.querySelector('.popup__item_type_info');

const saveProfileButton = editProfileForm.querySelector('.popup__btn_action_submit');
const closeProfileButton = editProfilePopup.querySelector('.popup__btn_action_close');

//--------------------------------------------------------------------------------------
// Открытие/закрытие popup (используется в cards.js, script.js)

const closeByPressingEsc = function(evt, popup) {
  if (evt.key === 'Escape') { togglePopup(popup); }
}

const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    popup.addEventListener('keydown', () => closeByPressingEsc(event, popup));
  } else {
    popup.removeEventListener('keydown', () => closeByPressingEsc(event, popup));
  }
}

const closeByClickingOverlay = function(evt, popup) {
  if (evt.target !== evt.currentTarget) { return; }
  togglePopup(popup);
}

//--------------------------------------------------------------------------------------

const editProfile = function(evt) {
  togglePopup(editProfilePopup);
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
  setInitialState(editProfileForm, popupInfo);
}

const saveProfile = function(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = workInput.value;
  togglePopup(editProfilePopup);
}

//--------------------------------------------------------------------------------------


editProfilePopup.addEventListener('click', () => closeByClickingOverlay(event, editProfilePopup));

editProfileForm.addEventListener('submit', saveProfile);
editProfileButton.addEventListener('click', editProfile);
closeProfileButton.addEventListener('click', () => togglePopup(editProfilePopup))


