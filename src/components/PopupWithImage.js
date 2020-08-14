//--------------------------------------------------------------------------------------
// Модуль PopupWithImage.js
// Класс PopupWithImage
//--------------------------------------------------------------------------------------

import Popup from './Popup.js';
import { popupImageSelector, popupCaptionSelector} from '../utils/constants.js';

export default class PopupWithImage extends Popup {

  open({ title, link }) {
    this._image = this._popup.querySelector(popupImageSelector);
    this._image.src = link;
    this._image.alt = title;
    this._popup.querySelector(popupCaptionSelector).textContent = title;
    super.open();
  }
}
