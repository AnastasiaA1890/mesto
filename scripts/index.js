const profileOpenPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let profileFieldName = document.querySelector('.popup__field-name');
let profileFieldDescription = document.querySelector('.popup__field-about');

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
    popupCloseButton.insertAdjacentText('afterbegin', profileFieldName.value);
    popupCloseButton.insertAdjacentText('afterbegin', profileFieldDescription.value);
    profileFieldName.value = '';
    profileFieldDescription.value = '';
}

//Вызов функции очистки полей после закрытия окна Popup
popupCloseButton.addEventListener('click', cleanPopup);