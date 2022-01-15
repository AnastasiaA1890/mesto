const profileOpenPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let popupFieldName = document.querySelector('.popup__field-name');
let popupFieldDescription = document.querySelector('.popup__field-about');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');

//Функция открытия окна Popup
function openPopup () {
    popup.classList.add('popup_opened');
}
//Вызов функции открытия окна Popup
profileOpenPopupButton.addEventListener('click', openPopup);

//Функция закрытия окна Popup
function closePopup () {
    popup.classList.remove('popup_opened');
}

//Вызов функции закрытия окна Popup
popupCloseButton.addEventListener('click', closePopup);

//Функция очистки полей после закрытия окна Popup
function cleanPopup() {
    popupCloseButton.insertAdjacentText('afterbegin', popupFieldName.value);
    popupCloseButton.insertAdjacentText('afterbegin', popupFieldDescription.value);
    popupFieldName.value = '';
    popupFieldDescription.value = '';
}

//Вызов функции очистки полей после закрытия окна Popup
popupCloseButton.addEventListener('click', cleanPopup);

//Функция сохранения данных полей формы Popup
function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileDescription.textContent = popupFieldDescription.value;
    closePopup();
}

//Вызов функции сохранения данных полей формы Popup
popupForm.addEventListener('submit', submitFormHandler);