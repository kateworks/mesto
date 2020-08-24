
export const listSelector = '.photo-grid__list';
export const cardTemplateSelector = '#card-template';
export const cardSelector = '.card';

// Используется при валидации форм
export const popupForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitBtnSelector: '.popup__btn_action_submit',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible',
};

export const popupSelectors = {
  viewCard: '.popup_content_image',
  createCard: '.popup_content_card',
  editProfile: '.popup_content_profile',
  changeAvatar: '.popup_content_avatar',
  confirm: '.popup_content_confirm'
}

export const imageData = {
  imageSelector: '.popup__image',
  captionSelector:'.popup__image-caption'  
};

export const popupData = {
  buttonClose: '.popup__btn_action_close',
  openedClass: 'popup_opened'
}

export const formData = { 
  form: popupForm.formSelector, 
  input: popupForm.inputSelector
};

export const btnEditProfileSelector = '.profile__btn_action_edit';
export const btnNewCardSelector = '.profile__btn_action_add';

export const profileData = {
  nameSelector: '.profile__name',
  infoSelector: '.profile__work',
  avatarSelector: '.profile__image'
};


