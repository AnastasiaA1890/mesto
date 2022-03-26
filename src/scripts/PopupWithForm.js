import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._element.querySelector('.popup__form');
    this._submitForm = this._submitForm.bind(this);
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formItems = {};
    this._inputList.forEach(item => {
      this._formItems[item.name] = item.value
    });
    return this._formItems;
  }

  _submitForm() {
    this._handleSubmitForm(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
