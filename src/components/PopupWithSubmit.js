//--------------------------------------------------------------------------------------
// Модуль PopupWithSubmit.js
// Класс PopupWithSubmit
//--------------------------------------------------------------------------------------

import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(selector, classes, submitHandler) {
    super(selector, classes);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._element);
    });
  }

  open(card) {
    this._element = card;
    super.open();
  }
}
