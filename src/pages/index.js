import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  elements, profilePopupButton, cardPopupButton, formEditProfile, popupFieldName, popupFieldDescription,
  formAdd, validationList, formAvatarEdit, avatarPopupButton
} from "../utils/canstants.js";
import './index.css';
import {api} from "../components/Api.js";

const profileValidator = new FormValidator(validationList, formEditProfile);
const cardValidator = new FormValidator(validationList, formAdd);
const avatarValidator = new FormValidator(validationList, formAvatarEdit);
const popupImage = new PopupWithImage('#open-photo', openEditProfilePopup);
const popupEdit = new PopupWithForm('#edit-profile', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('#add-card', renderAddedCard);
const popupAvatar = new PopupWithForm('#avatar', handleAvatarSubmit);
const popupDelete = new PopupWithForm('#delete-card');
let userId;

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__avatar'
});

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

/*
api.getUserData()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res)
  })

api.getInitialCards()
  .then((res) => {
    const data = res.map((item) => {
      const newData = {
        name: item.name,
        link: item.link,
        id: item._id,
        likes: item.likes,
        userId: userId,
        ownerId: item.owner._id
      }
      return newData
    })
    defaultCardList.renderItems(data)
  })
*/

//Функция добавления новой карточки
function renderAddedCard(data) {
  api.addCard(data)
    .then((res) => {
      const newData = createCard({
        name: res.name,
        link: res.link,
        id: res._id,
        likes: res.likes,
        userId: userId,
        ownerId: res.owner._id
      })
      defaultCardList.addItem(newData);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAdd.renderLoading(false)
    })
}

//Функция создания карточки
function createCard(item) {
  const card = new Card(item, '#elements-items',
    handleCardClick,
    (id) => {
      popupDelete.open();
      popupDelete.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupDelete.renderLoading(false, '#delete-card');
            popupDelete.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  );
  return card.generateCard();
}

//Отрисовка элементов на странице
const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, elements);

//Окно EditProfilePopup
//Функция открытия окна EditProfilePopup
function openEditProfilePopup() {
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldDescription.value = userData.about;
  profileValidator.resetErrors();
  popupEdit.open();
}

//Функция сохранения данных полей формы EditProfilePopup
function handleProfileFormSubmit(data) {
  api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupEdit.renderLoading(false)
  })
}

//Окно AddCardPopup
function openAddCardPopup() {
  cardValidator.disableButton();
  cardValidator.resetErrors()
  popupAdd.open();
}

function openAvatarPopup() {
  avatarValidator.disableButton();
  avatarValidator.resetErrors();
  popupAvatar.open();
}

function handleAvatarSubmit(data) {
  api.editAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
  })
}

function handleCardClick(data) {
  popupImage.open(data);
}

function renderPage() {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      userInfo.setUserInfo(userData);
      const data = cards.map((item) => {
        const newData = {
          name: item.name,
          link: item.link,
          id: item._id,
          likes: item.likes,
          userId: userId,
          ownerId: item.owner._id
        }
        return newData
      })
      defaultCardList.renderItems(data)
    })
    .catch((err) => {
      console.log(err)
  })
}

renderPage()

//Вызов функции открытия окна EditProfilePopup
profilePopupButton.addEventListener('click', openEditProfilePopup);
//Вызов функции открытия окна AddCardPopup
cardPopupButton.addEventListener('click', openAddCardPopup);
avatarPopupButton.addEventListener('click', openAvatarPopup);

popupImage.setEventListeners()
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners()
popupAvatar.setEventListeners()

