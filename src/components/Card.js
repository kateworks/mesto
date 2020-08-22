//--------------------------------------------------------------------------------------
// Модуль Card.js
// Класс Card
//--------------------------------------------------------------------------------------

export default class Card {
  constructor({ data, handleClick, handleLike, handleDelete }, 
      templateSelector, cardSelector) {
    this._templateSelector = templateSelector;
    this._className = cardSelector;
    this._title = data.title;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data.id;
    this._handleViewEvent = handleClick;
    this._handleLikeEvent = handleLike;
    this._handleDeleteEvent = handleDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._className)
      .cloneNode(true);
    return cardElement;
  }

  // _handleLikeEvent() {
  //   this._likeBtn.classList.toggle('card__btn_clicked');
  // }

  // _handleDeleteEvent() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleLikeEvent());
    this._delBtn.addEventListener('click', () => this._handleDeleteEvent());
    this._image.addEventListener( 'click', 
      () => this._handleViewEvent({ title: this._title, link: this._link })
    );
  }

  _toggleLikeButton() {
    this._likeBtn.classList.toggle('card__btn_clicked');
  }

  createCard(userId) {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__btn_action_like');
    this._delBtn = this._element.querySelector('.card__btn_action_del');
    this._image = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-num').textContent = String(this._likes.length);
    if (this._likes.length) this._toggleLikeButton();

    const isMine = (this._owner === userId);
    this._delBtn.disabled = !isMine;
    this._delBtn.hidden = !isMine;
    
    this._image.src = this._link;
    this._image.alt = this._title;
    return this._element;
  }

}

