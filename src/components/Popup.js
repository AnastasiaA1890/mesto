import {profilePopupCloseButton, cardPopupCloseButton, photoPopupCloseButton} from "../utils/canstants.js"
export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    })
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if(evt.key==='Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    profilePopupCloseButton.addEventListener('click', () => {
      this.close();
    });
   cardPopupCloseButton.addEventListener('click', () => {
      this.close();
    });
    photoPopupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    })
  }
}
