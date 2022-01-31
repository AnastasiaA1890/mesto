const profilePopupButton = document.querySelector('.profile__button');
const cardPopupButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('#edit-profile');
const cardPopup = document.querySelector('#add-card');
const profilePopupCloseButton = document.querySelector('.popup__close-button');
const cardPopupCloseButton = document.querySelector('#add-card  button.popup__close-button');
const popupFieldName = document.querySelector('.popup__input_field_name');
const popupFieldDescription = document.querySelector('.popup__input_field_about');
const popupFieldSrc = document.querySelector('.popup__input_src');
const popupFieldTitle = document.querySelector('.popup__input_title');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');
const template = document.querySelector('#elements-items').content;
const cardsList = document.querySelector('.elements');
const submissionAddCardButton = document.querySelector('#add-card .popup__form');
const photoPopup = document.querySelector('#open-photo');
const photoPopupImg = document.querySelector('.popup__img');
const photoPopupTitle = document.querySelector('.popup__photo-title');
const photoPopupCloseButton = document.querySelector('#open-photo button.popup__close-button')

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
    newCard.querySelector('.element__img').alt = element.name;
    addListeners(newCard);
    cardsList.appendChild(newCard);
}

//Функция перебора карточек через функцию renderCards
function render() {
    initialCards.forEach(renderCards);
}

//Вызов функции отображение списка карточек
render();

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    profilePopup.classList.add('popup_opened');
    fillPopup();
}

//Функция заполнения формы EditProfilePopup
function fillPopup() {
    popupFieldName.value = profileName.textContent;
    popupFieldDescription.value = profileDescription.textContent;
}

//Функция сохранения данных полей формы EditProfilePopup
function submitEditFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileDescription.textContent = popupFieldDescription.value;
    closePopup();
}

//Окно AddCardPopup
//Функция открытия окна AddCardPopup
function openAddCardPopup() {
    cardPopup.classList.add('popup_opened');
}

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
    card.querySelector('.element__img').alt = popupFieldTitle.value;
    addCard(card);
    addListeners(card);
    cardsList.prepend(card);
    closePopup();
}

//Функция очистки полей после закрытия окна AddCardPopup
function cleanPopup() {
    popupFieldSrc.value = '';
    popupFieldTitle.value = '';
}

//Функция удаления карточки Elements
function deleteCard(event) {
    event.target.closest('.element').remove();
}

//Функция проставления like
function like(event) {
    event.target.classList.toggle('element__like-button_active');
}

//Окно photoPopup
//Открытие окна photoPopup
function openPhotoPopup(evt) {
    if(evt.target.classList.contains('element__img')){
        photoPopup.classList.add('popup_opened');
        photoPopupImg.src = evt.target.src;
        photoPopupTitle.textContent = evt.target.alt;
    }
}

//Общие функции
//Функция закрытия окн EditProfilePopup или AddCardPopup или PhotoPopup
function closePopup () {
    profilePopup.classList.remove('popup_opened');
    cardPopup.classList.remove('popup_opened');
    submissionAddCardButton.classList.remove('popup_opened');
    photoPopup.classList.remove('popup_opened');
}

//Функции вызовов
//Функция вызова элементов (удаление карточки, like)
function addListeners(el) { //Будет передаваться элемент newCard из renderCards
    el.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    el.querySelector('.element__like-button').addEventListener('click', like);
}

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
//Вызов функции закрытия окна EditProfilePopup
profilePopupCloseButton.addEventListener('click', closePopup);
//Вызов функции закрытия окна AddCardPopup
cardPopupCloseButton.addEventListener('click', closePopup);
//Вызов функции закрытия окна PhotoPopup
photoPopupCloseButton.addEventListener('click', closePopup);
//Вызов функции сохранения данных полей формы Popup
popupForm.addEventListener('submit', submitEditFormHandler);
//Функция добавления новой карточки
submissionAddCardButton.addEventListener('submit', renderAddedCard);
//Вызов функции очистки полей после закрытия окна Popup
cardPopupButton.addEventListener('click', cleanPopup);
//Вызов функции открытия окна OpenPopup
cardsList.addEventListener('click', openPhotoPopup);
