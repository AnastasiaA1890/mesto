export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  resetErrors() {
    this._inputList.forEach((item) => {
      this._hideInputError(item);
    })
}

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}
