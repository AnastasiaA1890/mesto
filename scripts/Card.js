export default class Card {
  constructor(data, cardSelector, openPhotoPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPhotoPopup = openPhotoPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  
  _like(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }
  
  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._like(evt);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._openPhotoPopup(this._name, this._link);
    })
  }
}