//--------------------------------------------------------------------------------------
// Проверка корректности вводимых данных
//--------------------------------------------------------------------------------------

const popupInfo = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn_action_submit',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, popupData) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(popupData.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(popupData.errorClass);
};

const hideInputError = (formElement, inputElement, popupData) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(popupData.inputErrorClass);
  errorElement.classList.remove(popupData.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, popupData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupData);
  } else {
    hideInputError(formElement, inputElement, popupData);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

const setEventListeners = (formElement, popupData) => {
  const inputList = Array.from(formElement.querySelectorAll(popupData.inputSelector));
  const buttonElement = formElement.querySelector(popupData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, popupData);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Выполняем проверку вводимых данных
const enableValidation = (popupData) => {
  formList = Array.from(document.querySelectorAll(popupData.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, popupData);
  });
}

// При вызове формы убираем сообщения об ошибках, 
// которые могли остаться при выходе по <ESC>
const setInitialState = (formElement, popupData) => {
  const inputList = Array.from(formElement.querySelectorAll(popupData.inputSelector));
  const buttonElement = formElement.querySelector(popupData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, popupData);
    toggleButtonState(inputList, buttonElement);
  });
}

enableValidation(popupInfo);


