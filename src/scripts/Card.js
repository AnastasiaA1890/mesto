export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    const elementPhoto = this._element.querySelector('.element__img');
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _like(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._like(evt);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this.handleCardClick({ name: this._name, link: this._link });
    })
  }
}
