//--------------------------------------------------------------------------------------
// Модуль PopupWithForm.js
// Класс PopupWithForm
//--------------------------------------------------------------------------------------

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, formSelector, inputSelector }, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._submitHandler = submitHandler;
  }

  _emptyInputs() {
    this._inputList.forEach((input) => {
      input.value = '';
    });
  }

  getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => { this._submitHandler(evt); } );
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
