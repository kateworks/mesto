//--------------------------------------------------------------------------------------
// Модуль PopupWithForm.js
// Класс PopupWithForm
//--------------------------------------------------------------------------------------

import { FORM_CHECK } from '../utils/selectors';
import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, classes, { form, input, error }, submitHandler) {
    super(selector, classes);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitErrorMessage = this._popup.querySelector(error);
    this._submitHandler = submitHandler;
  }

  _emptyInputs() {
    this._inputList.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _hideErrorMessage() {
    this._submitErrorMessage.classList.remove(FORM_CHECK.errorVisibleClass);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });

    this._inputList.forEach((input) => {
      input.addEventListener('click', () => {
        this._hideErrorMessage();
      });
    });
  }

  open(values = {}) {
    this._inputList.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = values[input.name] || '';
    });
    super.open();
  }

  close() {
    super.close();
    this._emptyInputs();
    this._hideErrorMessage();
  }
}
