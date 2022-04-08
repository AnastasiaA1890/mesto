import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {elements, profilePopupButton, cardPopupButton, formEditProfile, popupFieldName, popupFieldDescription,
    formAdd, popupFieldTitle, popupFieldSrc, initialCards, validationList, avatarPopup, formAvatarEdit,avatarPopupButton} from "../utils/canstants.js";
import './index.css';
import {api} from "../components/Api.js";

api.getInitialCards()
  .then((res) => {
      const data = res.map((item) =>{
          const newData = {
              name: item.name,
              link: item.link,
              id: item._id
          }
          return newData
      })
      defaultCardList.renderItems(data)
  })

const profileValidator = new FormValidator(validationList, formEditProfile);
const cardValidator = new FormValidator(validationList, formAdd);
const avatarValidator = new FormValidator(validationList, formAvatarEdit)
const popupImage = new PopupWithImage('#open-photo', openEditProfilePopup);
const popupEdit = new PopupWithForm('#edit-profile', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('#add-card', renderAddedCard);
const popupAvatar = new PopupWithForm('#avatar', handleAvatarSubmit);
//const popupDelete = new Popup('#delete-card', openDeleteCardPopup)

const userInfo = new UserInfo({
    name: '.profile__name',
    about: '.profile__description',
    avatar: '.profile__avatar'
});

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation()

//Функция создания карточки
function createCard(item) {
    let newCard = new Card(item, '#elements-items', {
      handleCardClick,
      likeCount,
      handleDeleteCard: (id) => {
        api.deleteCard(id)
          .then((res) => {
            newCard.deleteCard()
          })
      },
    });
    const card = newCard.generateCard()
    return card;
}

function likeCount () {
  return api.likeCounter()
}

//Отрисовка элементов на странице
const defaultCardList = new Section({
    renderer: (item) => {
        defaultCardList.addItem(createCard(item));
    }
  }, elements);

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    const userData = userInfo.getUserInfo();
    popupFieldName.value = userData.name;
    popupFieldDescription.value = userData.about;
    profileValidator.resetErrors();
    popupEdit.open();
}

//Функция сохранения данных полей формы EditProfilePopup
function handleProfileFormSubmit(data) {
   api.editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      });
}

//Окно AddCardPopup
function openAddCardPopup() {
    cardValidator.disableButton();
    popupAdd.open();
}

//Функция добавления новой карточки
function renderAddedCard(data) {
    api.createCard(data)
      .then((res) => {
        const newCard = {
          name: data.name,
          link: data.link,
          id: data._id
        };
        defaultCardList.addItem(createCard(newCard));
        popupAdd.close();
      })
}

function openAvatarPopup() {
  avatarValidator.disableButton();
  popupAvatar.open();
}

function handleAvatarSubmit(data) {
  api.editAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
      popupAvatar.close();
    });
}

/*function openDeleteCardPopup(data) {
  popupDelete.open(createCard(data))
}*/

function handleCardClick(data) {
  popupImage.open(data);
}

  api.getUserData()
    .then((res) => {
      return res
    })

/*function handleDeleteCard(id) {
  api.deleteCard(id)
    .then((res) => {

      console.log(id)
    })
}*/

function renderPage() {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then((res) => {
      userInfo.setUserInfo(res[0]);
      userInfo.setAvatar(res[0]);
      defaultCardList.renderItems(res[1]);
    })
}

renderPage()

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
avatarPopupButton.addEventListener('click', openAvatarPopup);

popupImage.setEventListeners()
popupEdit.setEventListeners();
popupAdd.setEventListeners();
//popupDelete.setEventListeners()
popupAvatar.setEventListeners()

