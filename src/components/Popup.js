//--------------------------------------------------------------------------------------
// Модуль Popup.js
// Класс Popup
//--------------------------------------------------------------------------------------

export default class Popup {
  constructor(popupSelector, { buttonClose, openedClass }) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(buttonClose);
    this._openedClass = openedClass;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => { this._handleOverlayClose(evt); });
    this._closeButton.addEventListener('click', () => { this.close(); });
  }

  open() {
    this._popup.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    if (this._popup.classList.contains(this._openedClass)) {
      this._popup.classList.remove(this._openedClass);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }
}
