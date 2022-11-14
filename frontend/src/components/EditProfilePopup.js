import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='window_edit' title='Редактировать профиль'>
      <label className="popup__field">
        <input value={name || ''} onChange={handleChangeName} type="text" name="name" id="name-input" minLength={2} maxLength={40} required placeholder="Как вас зовут?" className="popup__input-text popup__input-text_input_name" />
        <span className="popup__input-error name-input-error" />
      </label>
      <label className="popup__field">
        <input value={description || ''} onChange={handleChangeDescription} type="text" name="about" id="activity-input" minLength={2} maxLength={200} required placeholder="Чем вы занимаетесь?" className="popup__input-text popup__input-text_input_activity" />
        <span className="popup__input-error activity-input-error" />
      </label>
    </PopupWithForm>
  )

}