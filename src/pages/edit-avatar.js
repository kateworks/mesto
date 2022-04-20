import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import * as messages from '../utils/messages';
import {
  POPUPS, POPUP_DATA, FORM_CHECK, FORM_DATA,
} from '../utils/selectors';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formChangeAvatarSelector = `${POPUPS.changeAvatar} ${FORM_CHECK.formSelector}`;
const formChangeAvatar = document.querySelector(formChangeAvatarSelector);

const formChangeAvatarValidation = new FormValidator(FORM_CHECK, formChangeAvatar);
const buttonSubmitAvatar = formChangeAvatar.querySelector(FORM_CHECK.submitBtnSelector);

// Окно редактирования аватара пользователя
const popupChangeAvatar = new PopupWithForm(
  POPUPS.changeAvatar, POPUP_DATA, FORM_DATA,
  (data) => { saveUserAvatar(data); },
);

// Сохранение аватара на сервере
function saveUserAvatar(data) {
  buttonSubmitAvatar.textContent = messages.SAVING;
  api.patchNewAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
      userProfile.setUserId(res.id);
    })
    .catch((err) => {
      console.log(`${messages.AVATAR_ERROR} ${messages.ERROR} ${err}.`);
    })
    .finally(() => {
      popupChangeAvatar.close();
      buttonSubmitAvatar.textContent = messages.SAVE;
    });
}

export { popupChangeAvatar, formChangeAvatarValidation };
