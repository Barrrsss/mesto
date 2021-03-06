export default class Card {
  constructor({data, openPopup, putLike, deleteLike, deleteCard}, cardSelector, userId) {
    this._cardImage = data.link;
    this._cardName = data.name;
    this._openPopup = openPopup;
    this._likes = data.likes;
    this._putLikes = putLike;
    this._deleteLikes = deleteLike;
    this._deleteCard = deleteCard;
    this._userId = userId;
    this._owner = (data.owner._id === userId);
    this._item = data._id;
    this._cardSelector = cardSelector;
    this._data = JSON.stringify(data.likes);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector);
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = this._cardImage;
    cardElement.querySelector('.element__name-title').textContent = this._cardName;

    return cardElement;
  }
  _putLike() {
    this._putLikes();
  }
  _deleteLike() {
    this._deleteLikes();
  }
  _like(evt) {
    if(evt.target.classList.contains('element__button-like_active')) {
      this._deleteLike();
      evt.target.classList.remove('element__button-like_active');
    } else {
      this._putLike();
      evt.target.classList.add('element__button-like_active');
    }
  }
  deleteCard () {
    this._element.remove();
    this._element = null;
  }
  _countNumberOfLikes() {
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.element__button-like');
    this._cardDeleteButton = this._element.querySelector('.element__button-trash');
    this._cardImage = this._element.querySelector('.element__image');
    if(this._owner) {
      this._cardDeleteButton.classList.add('element__button-trash_visible');
    }

    if(this._data.includes(this._userId)) {
      this._cardLikeButton.classList.add('element__button-like_active');
    }

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._like(evt);
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCard(() => this.deleteCard(), this._item);
    });

    this._cardImage.addEventListener('click', () => {
      this._openPopup();
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._countNumberOfLikes();
    return this._element;
  }

}
