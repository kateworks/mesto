//--------------------------------------------------------------------------------------
// Редактирование профиля
//--------------------------------------------------------------------------------------
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import {
  popupSelectors, POPUP_DATA, FORM_CHECK, FORM_DATA,
} from '../utils/selectors';

import api from '../utils/api';
import userProfile from '../utils/profile';

const formEditProfileSelector = `${popupSelectors.editProfile} ${FORM_CHECK.formSelector}`;
const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(FORM_CHECK, formEditProfile);
const buttonSubmitProfile = formEditProfile.querySelector(FORM_CHECK.submitBtnSelector);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  popupSelectors.editProfile, POPUP_DATA, FORM_DATA,
  (data) => { saveUserProfile(data); },
);

// Сохранение профиля на сервере
function saveUserProfile(userData) {
  buttonSubmitProfile.textContent = 'Сохранение...';
  api.patchUserProfile(userData)
    .then((res) => {
      userProfile.setUserInfo({ name: res.name, info: res.about });
      userProfile.setUserId(res.id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить профиль пользователя. ${err}.`);
    })
    .finally(() => {
      popupEditProfile.close();
      buttonSubmitProfile.textContent = 'Сохранить';
    });
}

export { popupEditProfile, formEditProfileValidation };
