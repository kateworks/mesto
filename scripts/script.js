
let addButton = document.querySelector('.profile__btn_action_add');
let editButton = document.querySelector('.profile__btn_action_edit');
let popupWindow = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__btn_action_close');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let nameInput = formElement.querySelector('.popup__item_type_name');
    let workInput = formElement.querySelector('.popup__item_type_work');

    let name = document.querySelector('.profile__name');
    let work = document.querySelector('.profile__work');

    name.textContent = nameInput.value;
    work.textContent = workInput.value;

    popupWindow.classList.remove('popup_opened');
  }

function addProfile() {
  console.log("Add profile");
}

function editProfile() {
  popupWindow.classList.add('popup_opened');
  let nameInput = formElement.querySelector('.popup__item_type_name');
  let workInput = formElement.querySelector('.popup__item_type_work');

  let name = document.querySelector('.profile__name');
  let work = document.querySelector('.profile__work');

  nameInput.value = name.textContent;
  workInput.value = work.textContent;
}

function cancelChanges() {
  popupWindow.classList.remove('popup_opened');
}

addButton.addEventListener('click', addProfile);
editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', cancelChanges);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
