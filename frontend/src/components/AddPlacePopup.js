import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceUrl(e) {
    setPlaceUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeUrl
    });
  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceUrl('');
}, [props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='window_add' title='Новое место' buttonText={props.isLoading ? 'Создание...' : 'Создать'}>
      <label className="popup__field">
        <input value={placeName} onChange={handleChangePlaceName} type="text" name="placename" id="place-input" minLength={2} maxLength={30} required placeholder="Название" className="popup__input-text popup__input-text_input_place" />
        <span className="popup__input-error place-input-error" />
      </label>
      <label className="popup__field">
        <input value={placeUrl} onChange={handleChangePlaceUrl} type="url" name="placeurl" id="url-input" required placeholder="ссылка на картинку" className="popup__input-text popup__input-text_input_url" />
        <span className="popup__input-error url-input-error" />
      </label>
    </PopupWithForm>
  )
}