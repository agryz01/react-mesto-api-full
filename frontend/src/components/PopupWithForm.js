export default function PopupWithForm(props) {

  const className = `popup popup_${props.name} ${props.isOpen && 'popup_opened'}`;

  return (
    <div className={className}>
      <form onSubmit={props.onSubmit} name={props.name} method="post" className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__closing-icon" />
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__button">{props.buttonText}</button>
      </form>
    </div>
  );
}