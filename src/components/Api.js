//--------------------------------------------------------------------------------------
// Модуль Api.js
// Класс Api
//--------------------------------------------------------------------------------------

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/profile`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res));
  }

  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item),
    })
      .then((res) => this._handleResponse(res));
  }

  patchNewAvatar(link) {
    return fetch(`${this._baseUrl}/profile`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link),
    })
      .then((res) => this._handleResponse(res));
  }

  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/profile`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.info }),
    })
      .then((res) => this._handleResponse(res));
  }

  likeCard(cardId, likes) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(likes),
    })
      .then((res) => this._handleResponse(res));
  }

  unlikeCard(cardId, likes) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(likes),
    })
      .then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res));
  }
}
