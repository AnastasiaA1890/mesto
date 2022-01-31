const editProfilePopupButton = document.querySelector('.profile__button');
const addCardPopupButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('#edit-profile');
const addCardPopup = document.querySelector('#add-card');
const editProfilePopupCloseButton = document.querySelector('.popup__close-button');
const addCardPopupCloseButton = document.querySelector('#add-card  button.popup__close-button');
let popupFieldName = document.querySelector('.popup__input_field_name');
let popupFieldDescription = document.querySelector('.popup__input_field_about');
let popupFieldSrc = document.querySelector('.popup__input_src');
let popupFieldTitle = document.querySelector('.popup__input_title');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');
const template = document.querySelector('#elements-items').content;
const cardsList = document.querySelector('.elements');
const submitAddCardButton = document.querySelector('#add-card .popup__form');


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

//Функция отображения списка карточек, лайки
function renderCards(element) {
    const newCard = template.cloneNode(true);
    newCard.querySelector('.element__img').src = element.link;
    newCard.querySelector('.element__title').textContent = element.name;
    addListeners(newCard);
    cardsList.appendChild(newCard);
}

//Функция перебора карточек через функцию renderCards
function render() {
    initialCards.forEach(renderCards);
}
//Вызов функции отображение списка карточек
render();

//Функция добавления нового объекта в массив initialCards
function addCard() {
    let newCard = {
        name: popupFieldTitle.value,
        link: popupFieldSrc.value
    }
    initialCards.unshift(newCard);
}

//Функция добавления новой карточки из функции addCard
function renderAddedCard(evt) {
    evt.preventDefault();
    const card = template.cloneNode(true);
    card.querySelector('.element__img').src = popupFieldSrc.value;
    card.querySelector('.element__title').textContent = popupFieldTitle.value;
    addCard(card);
    addListeners(card)
    cardsList.prepend(card);
    closePopup();
}

//Функция удаления карточки Elements
function deleteCard(event) {
    event.target.closest('.element').remove();
}

//Функция проставления like
function like(event) {
    event.target.classList.toggle('element__like-button_active');
}

//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    editProfilePopup.classList.add('popup_opened');
    fillPopup();
}

//Функция открытия окна AddCardPopup
function openAddCardPopup() {
    addCardPopup.classList.add('popup_opened');
}

//Функция заполнения формы EditProfilePopup
function fillPopup() {
    popupFieldName.value = profileName.textContent;
    popupFieldDescription.value = profileDescription.textContent;
}

//Функция закрытия окн EditProfilePopup или AddCardPopup
function closePopup () {
    editProfilePopup.classList.remove('popup_opened');
    addCardPopup.classList.remove('popup_opened');
    submitAddCardButton.classList.remove('popup_opened');
}

//Функция сохранения данных полей формы EditProfilePopup
function submitEditFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileDescription.textContent = popupFieldDescription.value;
    closePopup();
}

//Функция очистки полей после закрытия окна Popup
function cleanPopup() {
    popupFieldSrc.value = '';
    popupFieldTitle.value = '';
}

//Функция вызова элементов (удаление карточки, like)
function addListeners(el) { //Будет передаваться элемент newCard из renderCards
    el.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    el.querySelector('.element__like-button').addEventListener('click', like);
}

//Вызов функции открытия окна EditProfilePopup
editProfilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
addCardPopupButton.addEventListener('click', openAddCardPopup);
//Вызов функции закрытия окна EditProfilePopup
editProfilePopupCloseButton.addEventListener('click', closePopup);
//Вызов функции закрытия окна AddCardPopup
addCardPopupCloseButton.addEventListener('click', closePopup);
//Вызов функции сохранения данных полей формы Popup
popupForm.addEventListener('submit', submitEditFormHandler);
//Функция добавления новой карточки
submitAddCardButton.addEventListener('submit', renderAddedCard);
//Вызов функции очистки полей после закрытия окна Popup
addCardPopupButton.addEventListener('click', cleanPopup);

