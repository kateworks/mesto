//--------------------------------------------------------------------------------------
// Модуль PopupWithForm.js
// Класс PopupWithForm
//--------------------------------------------------------------------------------------

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (selector, classes, { form, input }, submitHandler) {
    super(selector, classes);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitHandler = submitHandler;
  }

  _emptyInputs() {
    this._inputList.forEach((input) => {
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

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues()); 
    });
  }

  open(values = {}) {
    this._inputList.forEach((input) => {
      input.value = values[input.name] || '';
    });
    super.open();
  }

  close() {
    super.close();
    this._emptyInputs();
  }
}
