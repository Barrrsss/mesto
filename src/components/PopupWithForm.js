import Popup from './PopUp.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitHandler}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._fields = this._popup.querySelector('.popup__fields');
    }

    _getInputValues() {
        this._input = Array.from(this._popup.querySelectorAll('.popup__field'));
        this._inputValues = {};
        this._input.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        console.log(this._inputValues);
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners()
        this._fields.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }
    open() {
        super.open();
        this._fields.reset();
    }
}
