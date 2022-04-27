export default class ErrorMessage {
  constructor(parentForm, { selector, visibleClass }) {
    this._element = parentForm.querySelector(selector);
    this._message = '';
    this._visibleClass = visibleClass;
  }

  toggle(message = '') {
    if (message && message.length > 0) {
      this._element.textContent = message;
      this._element.classList.add(this._visibleClass);
      return;
    }
    this._element.textContent = '';
    this._element.classList.remove(this._visibleClass);
  }
}
