//--------------------------------------------------------------------------------------
// Модуль UserInfo.js
// Класс UserInfo
//--------------------------------------------------------------------------------------

export default class UserInfo {
  constructor({ name, info, avatar }) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
    this._userId = 0;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  getUserID() { return this._userId; }

  getUserAvatar() {
    return this._avatar.src;
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

  setUserAvatar(link) { this._avatar.src = link; }

  setUserId(id) { this._userId = id; }
}
