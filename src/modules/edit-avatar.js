import {
  POPUPS, POPUP_DATA, FORM_CHECK, FORM_DATA, ERROR_DATA,
} from '../utils/selectors';
import { ErrorMessage, FormValidator, PopupWithForm } from '../components';
import * as messages from '../utils/messages';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formChangeAvatar = document.querySelector(`${POPUPS.changeAvatar} ${FORM_CHECK.formSelector}`);
const formChangeAvatarValidation = new FormValidator(FORM_CHECK, formChangeAvatar);

// Окно редактирования аватара пользователя
const popupChangeAvatar = new PopupWithForm(
  POPUPS.changeAvatar,
  POPUP_DATA,
  ERROR_DATA,
  FORM_DATA,
  (data) => { saveUserAvatar(data); },
);

function saveUserAvatar(data) {
  const buttonSubmitAvatar = formChangeAvatar.querySelector(FORM_CHECK.submitBtnSelector);
  const errorMessage = new ErrorMessage(formChangeAvatar, ERROR_DATA);

  buttonSubmitAvatar.textContent = messages.SAVING;
  api.patchNewAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
      userProfile.setUserId(res.id);
      errorMessage.toggle();
      popupChangeAvatar.close();
    })
    .catch((err) => {
      const message = `${messages.AVATAR_ERROR} ${messages.ERROR} ${err}.`;
      console.log(message);
      errorMessage.toggle(message);
    })
    .finally(() => {
      buttonSubmitAvatar.textContent = messages.SAVE;
    });
}

export { popupChangeAvatar, formChangeAvatarValidation };
