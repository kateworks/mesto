// -----   Профиль пользователя   -----
// Кнопка <Редактировать>
let editButton = document.querySelector('.profile__btn_action_edit');
// Поля "Имя" и "Занятие"
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');

// -----   Форма редактирования профиля  -----
let editPopup = document.querySelector('.popup_content_form');
let editForm = editPopup.querySelector('.popup__form');
let nameInput = editForm.querySelector('.popup__item_type_name');
let workInput = editForm.querySelector('.popup__item_type_info');
let closeButton = editPopup.querySelector('.popup__btn_action_close');

const editProfile = function () {
  editPopup.classList.add('popup_opened');
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

const closePopup = function(evt) {
  let popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

//--------------------------------------------------------------------------------------

editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closePopup);

editForm.addEventListener('submit', saveProfile);


