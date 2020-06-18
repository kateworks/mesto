
let editButton = document.querySelector('.profile__btn_action_edit');
let popupWindow = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__btn_action_close');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__item_type_name');
let workInput = formElement.querySelector('.popup__item_type_work');
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');

function openPopup() {
  popupWindow.classList.add('popup_opened');
  let nameInput = formElement.querySelector('.popup__item_type_name');
  let workInput = formElement.querySelector('.popup__item_type_work');

  let name = document.querySelector('.profile__name');
  let work = document.querySelector('.profile__work');

  nameInput.value = name.textContent;
  workInput.value = work.textContent;
}

function closePopup() {
  popupWindow.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    name.textContent = nameInput.value;
    work.textContent = workInput.value;
    closePopup();
  }

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
