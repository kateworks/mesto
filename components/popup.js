//--------------------------------------------------------------------------------------
// Модуль Popup.js
// Класс Popup
//--------------------------------------------------------------------------------------
const popupOpenedClass = 'popup_opened';
const buttonCloseSelector = '.popup__btn_action_close';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(buttonCloseSelector);
  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape') return;
    this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target !== evt.currentTarget) return;
    this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => { this._handleOverlayClose(evt); });
    this._closeButton.addEventListener('click', () => { this.close(); });  
  }

  open() {
    this._popup.classList.add(popupOpenedClass);
    document.addEventListener('keydown', (evt) => { this._handleEscClose(evt); });  
  }

  close() {
    if (this._popup.classList.contains(popupOpenedClass)) {
      this._popup.classList.remove(popupOpenedClass);
      document.removeEventListener('keydown',  () => { this._handleEscClose(); });
    } 
  }
}