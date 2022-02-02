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
const elements = document.querySelector('.elements');
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

//Функция создания карточки
function createCard(item) {
    const newCard = template.cloneNode(true);
    newCard.querySelector('.element__img').src = item.link;
    newCard.querySelector('.element__title').textContent = item.name;
    addListeners(newCard);
    return newCard;
}

//Функция перебора карточек
function render() {
    initialCards.forEach((item)=>{
        elements.appendChild(createCard(item));
    });
}

//Вызов функции отображение списка карточек
render();

//Общие функции
//Функция открытия окна Popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Функция закрытия окна Popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup () {
    openPopup(profilePopup);
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
    closePopup(profilePopup);
}

//Окно AddCardPopup
//Функция открытия и очистки полей окна AddCardPopup после закрытия
function openAddCardPopup() {
    openPopup(cardPopup);
    popupFieldSrc.value = '';
    popupFieldTitle.value = '';
}

//Также можно добавить данные из инпутов в массив таким способом
/*function initNewCard(name, link) {
    this.name = name;
    this.link = link;
}*/

//Функция добавления новой карточки из функции addCard
function renderAddedCard(evt) {
    evt.preventDefault();
    const newCard = {
        name: popupFieldTitle.value,
        link: popupFieldSrc.value}
    //const newCard = new initNewCard(popupFieldTitle.value, popupFieldSrc.value)  //относится к строке 109
    initialCards.push(newCard);
    elements.prepend(createCard(newCard));
    closePopup(cardPopup)
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
//Заполнение окна photoPopup данными
function openPhotoPopup(evt) {
    if(evt.target.classList.contains('element__img')){
        openPopup(photoPopup);
        photoPopupImg.src = evt.target.src;
        photoPopupTitle.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
    }
}

//Функции вызовов
//Функция вызова элементов (удаление карточки, like, открытие картинки)
function addListeners(el) { //Будет передаваться элемент newCard из renderCards
    el.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    el.querySelector('.element__like-button').addEventListener('click', like);
    el.querySelector('.element__img').addEventListener('click', openPhotoPopup);
}

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
//Вызов функции закрытия окна EditProfilePopup
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
//Вызов функции закрытия окна AddCardPopup
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
//Вызов функции закрытия окна PhotoPopup
photoPopupCloseButton.addEventListener('click', () => closePopup(photoPopup));
//Вызов функции сохранения данных полей формы Popup
popupForm.addEventListener('submit', submitEditFormHandler);
//Функция добавления новой карточки
submissionAddCardButton.addEventListener('submit', renderAddedCard);