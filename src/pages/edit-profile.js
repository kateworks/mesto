//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import * as messages from '../utils/messages';
import {
  POPUPS, POPUP_DATA, FORM_CHECK, FORM_DATA,
} from '../utils/selectors';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formEditProfileSelector = `${POPUPS.editProfile} ${FORM_CHECK.formSelector}`;
const formEditProfile = document.querySelector(formEditProfileSelector);

const formEditProfileValidation = new FormValidator(FORM_CHECK, formEditProfile);
const buttonSubmitProfile = formEditProfile.querySelector(FORM_CHECK.submitBtnSelector);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  POPUPS.editProfile, POPUP_DATA, FORM_DATA,
  (data) => { saveUserProfile(data); },
);

// Сохранение профиля на сервере
function saveUserProfile(userData) {
  buttonSubmitProfile.textContent = messages.SAVING;
  api.patchUserProfile(userData)
    .then((res) => {
      userProfile.setUserInfo({ name: res.name, info: res.about });
      userProfile.setUserId(res.id);
    })
    .catch((err) => {
      console.log(`${messages.PROFILE_ERROR} ${messages.ERROR} ${err}.`);
    })
    .finally(() => {
      popupEditProfile.close();
      buttonSubmitProfile.textContent = messages.SAVE;
    });
}

export { popupEditProfile, formEditProfileValidation };
