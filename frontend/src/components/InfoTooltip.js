import Ok from '../images/ok.png'
import Err from '../images/err.png'

export default function InfoTooltip(props) {

  const className = `popup ${props.isOpen && 'popup_opened'}`;

  return (
    <div className={className}>
      <div className="popup__container-info popup_position_center">
        <button onClick={props.onClose} type="button" className="popup__closing-icon" />
        <div style={{ backgroundImage: `url(${props.success ? Ok : Err})` }} className="popup__img"></div>
        <h2 className="popup__title">{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  );
}