export {elements, profilePopupButton, cardPopupButton, profileName, profileDescription, profilePopup, formEditProfile, popupFieldName,
  popupFieldDescription, profilePopupCloseButton, cardPopup, formAdd, popupFieldTitle, cardPopupCloseButton, popupFieldSrc,
  photoPopup, photoPopupImg, photoPopupTitle, photoPopupCloseButton, initialCards, validationList}

//Переменные блока Template
const elements = document.querySelector('.elements');
//Переменные секции Profile
const profilePopupButton = document.querySelector('.profile__button');
const cardPopupButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//Переменные PopupEdit Form
const profilePopup = document.querySelector('#edit-profile');
const formEditProfile = document.forms.editProfile;
const popupFieldName = formEditProfile.elements.editName;
const popupFieldDescription = formEditProfile.elements.editAbout;
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
//Переменные PopupAddCard
const cardPopup = document.querySelector('#add-card');
const formAdd = document.forms.addCard;
const popupFieldSrc = formAdd.elements.cardLink;
const popupFieldTitle = formAdd.elements.cardName;
const cardPopupCloseButton = cardPopup.querySelector('#add-card  button.popup__close-button');
//Переменные PopupPhoto
const photoPopup = document.querySelector('#open-photo');
const photoPopupImg = document.querySelector('.popup__img');
const photoPopupTitle = document.querySelector('.popup__photo-title');
const photoPopupCloseButton = photoPopup.querySelector('#open-photo button.popup__close-button')

//Массив карточек
const initialCards = [
  {
    name: 'Йосемити Парк',
    link: './images/yosemite_park.jpg'
  },
  {
    name: 'Парк Секвойя',
    link: './images/sequoia_park.jpg'
  },
  {
    name: 'Пляж Кэннон',
    link: './images/cannon_beach.jpg'
  },
  {
    name: 'Озеро Крейтер',
    link: './images/crater_lake.jpg'
  },
  {
    name: 'Долина смерти',
    link: './images/death_valley.jpg'
  },
  {
    name: 'Гора Маунт Худ',
    link: './images/mount_hood.jpg'
  }
];

const validationList = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
});
