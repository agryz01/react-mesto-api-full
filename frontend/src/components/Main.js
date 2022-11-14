import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        <div className="profile__profile-info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={props.onEditProfile} type="button" aria-label="редактирование профиля." className="profile__edit-button" />
        <button onClick={props.onAddPlace} type="button" aria-label="добавление карточки." className="profile__add-button" />
      </section>
      <section className="list-of-places">
        <ul className="elements">
          {props.cards.map((item) => (<Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={item} key={item._id} />))}
        </ul>
      </section>
    </main>);
}