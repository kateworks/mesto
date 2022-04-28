import PopupWithMessage from './PopupWithMessage';

export default class PopupWithSubmit extends PopupWithMessage {
  constructor(selector, classes, errorClasses, submitHandler) {
    super(selector, classes, errorClasses);
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
