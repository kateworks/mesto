import Popup from './Popup';

export default class PopupWithMessage extends Popup {
  constructor(selector, classes, { errorSelector, visibleClass }) {
    super(selector, classes);
    // селектор сообщения об ошибке
    this._popupErrorMessage = this._popup.querySelector(errorSelector);
    this._errorVisibleClass = visibleClass;
  }

  hideErrorMessage() {
    const errorVisible = this._errorVisibleClass;
    if (this._popupErrorMessage.classList.contains(errorVisible)) {
      this._popupErrorMessage.classList.remove(errorVisible);
    }
  }

  close() {
    this.hideErrorMessage();
    super.close();
  }
}
