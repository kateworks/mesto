import PopupWithSubmit from '../components/PopupWithSubmit';
import { FORM_CHECK, POPUPS, POPUP_DATA } from '../utils/selectors';
import * as messages from '../utils/messages';
import api from '../utils/api';

// Подтверждение удаления
const popupConfirm = new PopupWithSubmit(
  POPUPS.confirm,
  POPUP_DATA,
  (card) => { deleteCard(card); },
);

const btnSubmitDelSelector = `${POPUPS.confirm} ${FORM_CHECK.submitBtnSelector}`;
const btnSubmitDel = document.querySelector(btnSubmitDelSelector);

// Удаление карточки
function deleteCard(card) {
  btnSubmitDel.textContent = messages.DELETION;
  api.deleteCard(card.getCardId())
    .then(() => {
      card.delete();
    })
    .catch((err) => {
      console.log(`${messages.DELETE_ERROR} ${messages.ERROR} ${err}.`);
    })
    .finally(() => {
      popupConfirm.close();
      btnSubmitDel.textContent = messages.YES;
    });
}

export default popupConfirm;
