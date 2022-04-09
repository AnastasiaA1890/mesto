import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
  constructor(selector, handleDeleteCardSubmit) {
    super(selector);
    this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    this._submitButton = this._element.querySelector('.popup__button');
    this._submit = this._submit.bind(this)
  }

  _submit() {
    this._handleDeleteCardSubmit(this._id)
  }

  open(id) {
    super.open()
    this._id = id
  }
  _removeEventListeners() {
    super._removeEventListeners()
    this._submitButton.removeEventListener('click', this._submit)
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener('click', () => {
      this._submit();
      console.log("hello")
    })
  }
}
