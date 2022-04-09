export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if(evt.key==='Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    })
  }

  _removeEventListeners() {
    this._element.removeEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    })
  }
}
