//--------------------------------------------------------------------------------------
// Модуль PopupWithForm.js
// Класс PopupWithForm
//--------------------------------------------------------------------------------------

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListeners('submit', () => {this._submitHandler} );
  }

  close() {
    // reset form
    super.close();
  }
}
