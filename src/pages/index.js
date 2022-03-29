import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {elements, profilePopupButton, cardPopupButton, formEditProfile, popupFieldName, popupFieldDescription,
    formAdd, popupFieldTitle, popupFieldSrc, initialCards, validationList} from "../utils/canstants.js"

import './index.css';

const profileValidator = new FormValidator(validationList, formEditProfile);
const cardValidator = new FormValidator(validationList, formAdd);
const popupImage = new PopupWithImage('#open-photo', openEditProfilePopup);
const popupEdit = new PopupWithForm('#edit-profile', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('#add-card', renderAddedCard);

const userInfo = new UserInfo({
    elementName: '.profile__name',
    elementDescription: '.profile__description'
});

profileValidator.enableValidation();
cardValidator.enableValidation();

//Функция создания карточки
function createCard(item) {
    const newCard = new Card(item, '#elements-items', handleCardClick).generateCard();
    return newCard;
}

//Отрисовка элементов на странице
const defaultCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        defaultCardList.addItem(createCard(item));
    }
  }, elements);

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    const userData = userInfo.getUserInfo();
    popupFieldName.value = userData.name;
    popupFieldDescription.value = userData.description;
    profileValidator.resetErrors();
    popupEdit.open();
}

//Функция сохранения данных полей формы EditProfilePopup
function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data);
    popupEdit.close();
}

//Окно AddCardPopup
function openAddCardPopup() {
    cardValidator.disableButton();
    popupAdd.open();
}

//Функция добавления новой карточки из функции addCard
function renderAddedCard(data) {
    const newCard = {
        name: data.cardName,
        link: data.cardLink};
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
popupImage.setEventListeners()
popupEdit.setEventListeners();
popupAdd.setEventListeners();
defaultCardList.renderItems();
