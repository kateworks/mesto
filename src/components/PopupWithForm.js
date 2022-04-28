import PopupWithMessage from './PopupWithMessage';

// Popup ---> PopupWithMessage ---> PopupWithForm

export default class PopupWithForm extends PopupWithMessage {
  constructor(selector, classes, errorClasses, { form, input }, submitHandler) {
    super(selector, classes, errorClasses);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitHandler = submitHandler;
  }

  _emptyInputs() {
    this._inputList.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
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

    this._inputList.forEach((input) => {
      input.addEventListener('click', () => {
        super.hideErrorMessage();
      });
    });
  }

  open(values = {}) {
    this._inputList.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = values[input.name] || '';
    });
    super.open();
  }

  close() {
    super.close();
    this._emptyInputs();
  }
}
