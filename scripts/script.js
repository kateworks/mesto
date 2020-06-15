
let addButton = document.querySelector('.profile__btn_action_add');
let editButton = document.querySelector('.profile__btn_action_edit');
let popupWindow = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__btn_action_close');

// Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

// Находим поля формы в DOM
//     let nameInput = // Воспользуйтесь инструментом .querySelector()
//     let jobInput = // Воспользуйтесь инструментом .querySelector()

// Получите значение полей из свойства value

// Выберите элементы, куда должны быть вставлены значения полей

// Вставьте новые значения с помощью textContent
// }

function addProfile() {
  console.log("Add profile");
}

function editProfile() {
  popupWindow.classList.add('popup_opened');
}

function cancelChanges() {
  popupWindow.classList.remove('popup_opened');
}

addButton.addEventListener('click', addProfile);
editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', cancelChanges);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);