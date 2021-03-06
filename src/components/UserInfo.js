export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._elementName = document.querySelector(name);
    this._elementDescription = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);
  }
  getUserInfo() {
    const data = {
      name: this._elementName.textContent,
      about: this._elementDescription.textContent,
    }
    return data;
  }

  setUserInfo({name, about, avatar}) {
    this._elementName.textContent = name;
    this._elementDescription.textContent = about;
    this._avatarElement.src = avatar;
  }

}
