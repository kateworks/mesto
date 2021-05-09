//--------------------------------------------------------------------------------------
// Модуль FormValidator.js
// Класс FormValidator
//      Проверка корректности вводимых данных
//--------------------------------------------------------------------------------------

export default class FormValidator {
  constructor(data, formElement) {
    this._form = formElement;
    this._submit = formElement.querySelector(data.submitBtnSelector);
    this._inputList = Array.from(formElement.querySelectorAll(data.inputSelector));

    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleSubmitState() {
    this._submit.disabled = this._hasInvalidInput();
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitState();
      });
    });
  }

  // При вызове формы убираем сообщения об ошибках
  // и при необходимости блокируем Submit
  setInitialState() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      this._toggleSubmitState();
    });
  }

  // Включаем валидацию формы
  enableValidation() {
    this._setEventListeners();
  }
}
