export default class ErrorMessage {
  constructor(parentForm, { errorSelector, visibleClass }) {
    this._element = parentForm.querySelector(errorSelector);
    this._message = '';
    this._visibleClass = visibleClass;
  }

  _showMessage(message) {
    this._element.textContent = message;
    this._element.classList.add(this._visibleClass);
  }

  _hideMessage() {
    this._element.textContent = '';
    if (this._element.classList.contains(this._visibleClass)) {
      this._element.classList.remove(this._visibleClass);
    }
  }

  toggle(message = '') {
    if (message && message.length > 0) {
      this._showMessage(message);
      return;
    }
    this._hideMessage();
  }
}
