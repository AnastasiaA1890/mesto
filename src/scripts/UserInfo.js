import {popupFieldName, popupFieldDescription} from "../utils/canstants.js";

export default class UserInfo {
  constructor({ elementName, elementDescription }) {
    this._elementName = document.querySelector(elementName);
    this._elementDescription = document.querySelector(elementDescription);
  }
  getUserInfo() {
    const data = {
      name: this._elementName.textContent,
      description: this._elementDescription.textContent,
    }
    return data;
  }

  setUserInfo() {
    this._elementName.textContent = popupFieldName.value;
    this._elementDescription.textContent = popupFieldDescription.value;
  }
}
