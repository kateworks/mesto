//--------------------------------------------------------------------------------------
// Модуль UserInfo.js
// Класс UserInfo
//--------------------------------------------------------------------------------------

export default class UserInfo {
  constructor( { name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    return { name: this._name, info: this._info};
  }

  setUserInfo( { name, info }) {
    this._name = name;
    this._info = info;
    // добавить данные на страницу
  }
}