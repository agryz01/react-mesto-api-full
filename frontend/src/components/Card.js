import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__delet-icon ${isOwn ? 'card__delet-icon_visible' : 'card__delet-icon_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__favourites ${isLiked && 'element__favourites_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }} className="element__image" />
      <div className="element__group">
        <button onClick={handleDeleteClick} type="button" aria-label="открытие окна подтверждения удаление карточки" className={cardDeleteButtonClassName} />
        <h2 className="element__title">{card.name}</h2>
        <div className="element__favourites-container">
          <button onClick={handleCardLikeClick} type="button" aria-label="добавление в избранное." className={cardLikeButtonClassName} />
          <span className="element__namber-of-favourites">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}