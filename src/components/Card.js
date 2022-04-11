export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerid = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector('.element__title').textContent = this._name;
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._likeButton = this._element.querySelector('.element__like-button');
    this._setEventListeners();
    this.setLikes(this._likes);
    if (this._ownerid !== this._userId) {
      this._element.querySelector('.element__delete-button').style.display = 'none';
    }
    return this._element;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.element__like-counter');
    likeCountElement.textContent = this._likes.length;
    if (this.isLiked()) {
      this._colorLike();
    } else {
      this._bleachLike();
    }
  }

  _colorLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _bleachLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    })
  }
}
