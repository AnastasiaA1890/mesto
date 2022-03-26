import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {elements, profilePopupButton, cardPopupButton, formEditProfile, popupFieldName, popupFieldDescription,
    formAdd, popupFieldTitle, popupFieldSrc, initialCards, validationList} from "../utils/canstants.js"

import '../pages/index.css';

const editProfileValidator = new FormValidator(validationList, formEditProfile);
const addCardValidator = new FormValidator(validationList, formAdd);
const popupImage = new PopupWithImage('#open-photo');
const popupEdit = new PopupWithForm('#edit-profile', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('#add-card', renderAddedCard);
const userInfo = new UserInfo({
    elementName: '.profile__name',
    elementDescription: '.profile__description'
});

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//Функция создания карточки
function createCard(item) {
    const newCard = new Card(item, '#elements-items', handleCardClick).generateCard();
    return newCard;
}

//Отрисовка элементов на странице
const defaultCardList = new Section({
    data: initialCards,
    renderer: createCard
  }, elements);

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    const userData = userInfo.getUserInfo();
    popupFieldName.value = userData.name;
    popupFieldDescription.value = userData.description;
    editProfileValidator.resetErrors();
    popupEdit.open();
}

//Функция сохранения данных полей формы EditProfilePopup
function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data);
    popupEdit.close();
}

//Окно AddCardPopup
function openAddCardPopup() {
    popupAdd.open();
    addCardValidator.disableButton();
}

//Функция добавления новой карточки из функции addCard
function renderAddedCard() {
    const newCard = {
        name: popupFieldTitle.value,
        link: popupFieldSrc.value};
    defaultCardList.addItem(createCard(newCard));
    popupAdd.close();
}

//Окно photoPopup
function handleCardClick(data) {
        popupImage.open(data);
}

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
//Вызов функции сохранения данных полей формы Popup
//formEditProfile.addEventListener('submit', handleProfileFormSubmit);
//Функция добавления новой карточки
//formAdd.addEventListener('submit', renderAddedCard);
defaultCardList.renderItems();
