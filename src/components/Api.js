//--------------------------------------------------------------------------------------
// Модуль Api.js
// Класс Api
//--------------------------------------------------------------------------------------

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item)
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

}
