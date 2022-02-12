//Переменные блока Template
const template = document.querySelector('#elements-items').content;
const elements = document.querySelector('.elements');
//Переменные секции Profile
const profilePopupButton = document.querySelector('.profile__button');
const cardPopupButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//Переменные PopupEdit Form
const profilePopup = document.querySelector('#edit-profile');
const formEditProfile = document.forms.editProfile;
const popupFieldName = formEditProfile.elements.editName;
const popupFieldDescription = formEditProfile.elements.editAbout;
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
//Переменные PopupAddCard
const cardPopup = document.querySelector('#add-card');
const formAdd = document.forms.addCard;
const popupFieldSrc = formAdd.elements.cardLink;
const popupFieldTitle = formAdd.elements.cardName;
const cardPopupCloseButton = cardPopup.querySelector('#add-card  button.popup__close-button');
const popupAddCardSubmitButton = formAdd.querySelector('.popup__button');
//Переменные PopupPhoto
const photoPopup = document.querySelector('#open-photo');
const photoPopupImg = document.querySelector('.popup__img');
const photoPopupTitle = document.querySelector('.popup__photo-title');
const photoPopupCloseButton = photoPopup.querySelector('#open-photo button.popup__close-button')

//Массив карточек
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
    const elementPhoto = newCard.querySelector('.element__img');
    const elementText =  newCard.querySelector('.element__title');
    elementPhoto.src = item.link;
    elementText.textContent = item.name;
    elementPhoto.setAttribute('alt',  item.name);
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
    openPopup(profilePopup);
    fillPopup();
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
    popupAddCardSubmitButton.classList.add('popup__button_disabled');
    popupAddCardSubmitButton.setAttribute('disabled', true);
    
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
    elements.prepend(createCard(newCard));
    if (popupFieldSrc.value.length < 0 && popupFieldName.value.length< 0){
        cardPopupCloseButton.setAttribute('disabled', true);
    }else {
        cardPopupCloseButton.removeAttribute('disabled');
    }
    closePopup(cardPopup);
    formAdd.reset();
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
        photoPopupTitle.textContent = evt.target.alt;
        photoPopupImg.alt = evt.target.alt;
    }
}

//Функции вызовов
//Функция вызова элементов (удаление карточки, like, открытие картинки)
function addListeners(el) { //Будет передаваться элемент newCard из renderCards
    el.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    el.querySelector('.element__like-button').addEventListener('click', like);
    el.querySelector('.element__img').addEventListener('click', openPhotoPopup);
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