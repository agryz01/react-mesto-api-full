export default function ImagePopup({ card, onClose, isOpen }) {

  const className = `popup popup_window_viev ${isOpen && 'popup_opened'}`;

  return (
    <div className={className}>
      <div className="popup__container-viev">
        <img src={card.link} alt={`картинка "${card.name}" в полный размер`} className="popup__image" />
        <button onClick={onClose} type="button" className="popup__closing-icon" />
        <h2 className="popup__title-viev">{card.name}</h2>
      </div>
    </div>
  )
}