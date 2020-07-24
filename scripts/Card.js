//--------------------------------------------------------------------------------------
// Модуль Card.js
// Класс Card
//--------------------------------------------------------------------------------------
import {openViewPopup} from './view.js';

export class Card {
  constructor(data, templateSelector, cardSelector) {
    this._templateSelector = templateSelector;
    this._className = cardSelector;
    this._title = data.name;
    this._link = data.link;
    this._isLiked = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._className)
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeEvent() {
    this._isLiked = !this._isLiked;
    this._likeBtn.classList.toggle('photo-grid__btn_clicked');
  }

  _handleViewEvent() {
    openViewPopup({link: this._link, name: this._title});
  }

  _handleDeleteEvent() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleLikeEvent());
    this._delBtn.addEventListener('click', () => this._handleDeleteEvent());
    this._image.addEventListener('click', () => this._handleViewEvent());
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.photo-grid__btn_action_like');
    this._delBtn = this._element.querySelector('.photo-grid__btn_action_del');
    this._image = this._element.querySelector('.photo-grid__image');

    this._setEventListeners();

    this._element.querySelector('.photo-grid__title').textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;
    return this._element;
  }

}


