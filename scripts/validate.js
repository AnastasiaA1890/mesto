//Функция отображения ошибки
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

//Функция скрытия ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
