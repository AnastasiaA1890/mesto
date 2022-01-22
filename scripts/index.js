const profileOpenPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let popupFieldName = document.querySelector('.popup__input_field_name');
let popupFieldDescription = document.querySelector('.popup__input_field_about');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');

//Функция открытия окна Popup
function openPopup () {
    popup.classList.add('popup_opened');
    fillPopup();
}

//Функция заполнения формы popup
function fillPopup() {
    popupFieldName.value = profileName.textContent;
    popupFieldDescription.value = profileDescription.textContent;
}

//Функция закрытия окна Popup
function closePopup () {
    popup.classList.remove('popup_opened');
}

//Функция сохранения данных полей формы Popup
function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileDescription.textContent = popupFieldDescription.value;
    closePopup();
}

//Вызов функции открытия окна Popup
profileOpenPopupButton.addEventListener('click', openPopup);

//Вызов функции закрытия окна Popup
popupCloseButton.addEventListener('click', closePopup);

//Вызов функции сохранения данных полей формы Popup
popupForm.addEventListener('submit', submitFormHandler);


/*//Функция очистки полей после закрытия окна Popup
function cleanPopup() {
    popupCloseButton.insertAdjacentText('afterbegin', popupFieldName.value);
    popupCloseButton.insertAdjacentText('afterbegin', popupFieldDescription.value);
    popupFieldName.value = '';
    popupFieldDescription.value = '';
}

//Вызов функции очистки полей после закрытия окна Popup
popupCloseButton.addEventListener('click', cleanPopup);*/