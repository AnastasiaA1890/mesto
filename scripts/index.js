import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {elements, profilePopupButton, cardPopupButton, profileName, profileDescription, profilePopup, formEditProfile, popupFieldName,
    popupFieldDescription, profilePopupCloseButton, cardPopup, formAdd, popupFieldTitle, cardPopupCloseButton, popupFieldSrc,
    photoPopup, photoPopupImg, photoPopupTitle, photoPopupCloseButton, initialCards, validationList} from "../utils/canstants.js"

const editProfileValidator = new FormValidator(validationList, formEditProfile);
const addCardValidator = new FormValidator(validationList, formAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//Функция создания карточки
function createCard(item) {
    const newCard = new Card(item, '#elements-items', openPhotoPopup).generateCard();
    return newCard;
}

//Отрисовка элементов на странице
const defaultCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#elements-items', openPhotoPopup).generateCard();
        defaultCardList.addItem(card);
    }
  }, elements);


/*//Функция перебора карточек
function render() {
    initialCards.forEach((item)=>{
        elements.appendChild(createCard(item));
    });
}

//Вызов функции отображение списка карточек
render();*/

//Общие функции
//Функция открытия окна Popup
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    element.addEventListener('click', closePopupOverlay);
}

//Функция закрытия окна Popup
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    element.removeEventListener('click', closePopupOverlay);
}

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    editProfileValidator.resetErrors();
    fillPopup();
    openPopup(profilePopup);
}

//Функция заполнения формы EditProfilePopup
function fillPopup() {
    popupFieldName.value = profileName.textContent;
    popupFieldDescription.value = profileDescription.textContent;
}

//Функция сохранения данных полей формы EditProfilePopup
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileDescription.textContent = popupFieldDescription.value;
    closePopup(profilePopup);
}

//Окно AddCardPopup
//Функция открытия и очистки полей окна AddCardPopup после закрытия
function openAddCardPopup() {
    openPopup(cardPopup);
    addCardValidator.disableButton();
}

//Функция добавления новой карточки из функции addCard
function renderAddedCard(evt) {
    evt.preventDefault();
    const newCard = {
        name: popupFieldTitle.value,
        link: popupFieldSrc.value}
    elements.prepend(createCard(newCard));
    closePopup(cardPopup);
    formAdd.reset();
}

//Окно photoPopup
//Заполнение окна photoPopup данными
function openPhotoPopup(name, link) {
        openPopup(photoPopup);
        photoPopupImg.src = link;
        photoPopupTitle.textContent = name;
        photoPopupImg.alt = name;
}

//Закрытие окон Popup кликом на overlay
function closePopupOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

//Закрытие окон Popup на клавишу Escape
function closePopupEsc(evt) {
    if(evt.key==='Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции закрытия окна EditProfilePopup
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
//Вызов функции закрытия окна AddCardPopup
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
//Вызов функции закрытия окна PhotoPopup
photoPopupCloseButton.addEventListener('click', () => closePopup(photoPopup));
//Вызов функции сохранения данных полей формы Popup
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
//Функция добавления новой карточки
formAdd.addEventListener('submit', renderAddedCard);
defaultCardList.renderItems();