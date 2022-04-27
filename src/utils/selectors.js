export const listSelector = '.photo-grid__list';
export const cardTemplateSelector = '#card-template';
export const cardSelector = '.card';

export const PROFILE_SELECTORS = {
  name: '.profile__name',
  info: '.profile__work',
  avatar: '.profile__image',
};

export const PROFILE_BUTTONS = {
  add: '.profile__btn_action_add',
  edit: '.profile__btn_action_edit',
};

// Используется при валидации форм
export const FORM_CHECK = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitBtnSelector: '.popup__btn_action_submit',
  submitErrorSelector: '.popup__error_submit',
  inputErrorClass: 'popup__item_type_error',
  errorVisibleClass: 'popup__error_visible',
};

export const POPUPS = {
  viewCard: '.popup_content_image',
  createCard: '.popup_content_card',
  editProfile: '.popup_content_profile',
  changeAvatar: '.popup_content_avatar',
  confirm: '.popup_content_confirm',
};

export const IMAGE = {
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption',
};

export const POPUP_DATA = {
  buttonClose: '.popup__btn_action_close',
  openedClass: 'popup_opened',
};

export const FORM_DATA = {
  form: FORM_CHECK.formSelector,
  input: FORM_CHECK.inputSelector,
  error: FORM_CHECK.submitErrorSelector,
};

export const ERROR_DATA = {
  selector: FORM_CHECK.submitErrorSelector,
  visibleClass: FORM_CHECK.errorVisibleClass,
};
