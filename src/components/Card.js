export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    //this._count = 0;
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
    this._setLikes();
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete-button').style.display = 'none';
    }
    return this._element;
  }

  _setLikes() {
    const likeCountElement = this._element.querySelector('.element__like-counter');
    likeCountElement.textContent = this._likes.length;
  }

  /*_like() {
    this._likeButton.classList.toggle('element__like-button_active');
    this._likeCount
      .then((res) => {
        const like = res.forEach(item => {
          item.likes.length;
          return like
        })
    })
  }*/

  /*_likeCount() {
    this._count ++;
    this._element.querySelector('.element__like-counter').textContent = this._count;
    console.log(this._count)
  }*/

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      //this._like(evt);
     // this._likeCount();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    })
  }
}
