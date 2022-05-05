import {
  ERROR_DATA, FORM_CHECK, POPUPS, POPUP_DATA,
} from '../utils/selectors';
import { ErrorMessage, PopupWithSubmit } from '../components';
import * as messages from '../utils/messages';
import api from '../utils/api';

// Подтверждение удаления
const popupConfirm = new PopupWithSubmit(
  POPUPS.confirm,
  POPUP_DATA,
  ERROR_DATA,
  (card) => { deleteCard(card); },
);

function deleteCard(card) {
  const formConfirm = document.querySelector(`${POPUPS.confirm} ${FORM_CHECK.formSelector}`);
  const buttonConfirm = formConfirm.querySelector(FORM_CHECK.submitBtnSelector);
  const errorMessage = new ErrorMessage(formConfirm, ERROR_DATA);

  buttonConfirm.textContent = messages.DELETION;
  api.deleteCard(card.getCardId())
    .then(() => {
      card.delete();
      errorMessage.toggle();
      popupConfirm.close();
    })
    .catch((error) => {
      const message = `${messages.DELETE_ERROR} ${messages.ERROR} ${error}.`;
      console.log(message);
      errorMessage.toggle(message);
    })
    .finally(() => {
      buttonConfirm.textContent = messages.YES;
    });
}

export default popupConfirm;
