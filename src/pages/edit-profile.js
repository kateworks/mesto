import { ErrorMessage, FormValidator, PopupWithForm } from '../components';
import * as messages from '../utils/messages';
import {
  POPUPS, POPUP_DATA, FORM_CHECK, FORM_DATA, ERROR_DATA,
} from '../utils/selectors';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formEditProfileSelector = `${POPUPS.editProfile} ${FORM_CHECK.formSelector}`;
const formEditProfile = document.querySelector(formEditProfileSelector);
const errorMessage = new ErrorMessage(formEditProfile, ERROR_DATA);

const formEditProfileValidation = new FormValidator(FORM_CHECK, formEditProfile);
const buttonSubmitProfile = formEditProfile.querySelector(FORM_CHECK.submitBtnSelector);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  POPUPS.editProfile,
  POPUP_DATA,
  ERROR_DATA,
  FORM_DATA,
  (data) => { saveUserProfile(data); },
);

// Сохранение профиля на сервере
function saveUserProfile(userData) {
  buttonSubmitProfile.textContent = messages.SAVING;
  api.patchUserProfile(userData)
    .then((result) => {
      const { name, about, id } = result;
      userProfile.setUserInfo({ name, info: about });
      userProfile.setUserId(id);

      errorMessage.toggle();
      popupEditProfile.close();
    })
    .catch((err) => {
      const message = `${messages.PROFILE_ERROR} ${messages.ERROR} ${err}.`;
      console.log(message);
      errorMessage.toggle(message);
    })
    .finally(() => {
      buttonSubmitProfile.textContent = messages.SAVE;
    });
}

export { popupEditProfile, formEditProfileValidation };
