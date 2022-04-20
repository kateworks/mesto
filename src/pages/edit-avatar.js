import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import {
  popupSelectors, POPUP_DATA, FORM_CHECK, FORM_DATA,
} from '../utils/selectors';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formChangeAvatarSelector = `${popupSelectors.changeAvatar} ${FORM_CHECK.formSelector}`;
const formChangeAvatar = document.querySelector(formChangeAvatarSelector);
const formChangeAvatarValidation = new FormValidator(FORM_CHECK, formChangeAvatar);
const buttonSubmitAvatar = formChangeAvatar.querySelector(FORM_CHECK.submitBtnSelector);

// Окно редактирования аватара пользователя
const popupChangeAvatar = new PopupWithForm(
  popupSelectors.changeAvatar, POPUP_DATA, FORM_DATA,
  (data) => { saveUserAvatar(data); },
);

// Сохранение аватара на сервере
function saveUserAvatar(data) {
  buttonSubmitAvatar.textContent = 'Сохранение...';
  api.patchNewAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
      userProfile.setUserId(res.id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить аватар на сервере. ${err}.`);
    })
    .finally(() => {
      popupChangeAvatar.close();
      buttonSubmitAvatar.textContent = 'Сохранить';
    });
}

export { popupChangeAvatar, formChangeAvatarValidation };
