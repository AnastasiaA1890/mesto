import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selector) {
    super(selector);
    this._image= this._element.querySelector('.popup__img');
    this._title = this._element.querySelector('.popup__photo-title');
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;
  }

}
