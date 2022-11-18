import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const history = useHistory();
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    Promise.all([
      api.getUserInformation(),
      api.getCards()
    ])
      .then(([userData, cardData]) => {
        setLoggedIn(true);
        setCards(cardData);
        setCurrentUser(userData);
        setEmail(userData.email);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err); // выведем ошибку в консоль
      })
  }, [loggedIn])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.setUserInformation(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isFavourites = card.likes.some(item => item === currentUser._id);
    api.toggleCardLikes(isFavourites, card._id).then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleCardDelete(card) {
    api.deletCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api.addCard(name, link)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleRegistering(login, password) {

    api.setUser(login, password)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsInfoTooltipPopupOpen(true))
  }

  function handleLogin(login, password) {
    api.authUser(login, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(login);
          history.push('/');
        }

      })
      .catch((err) => {
        setSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleExit() {
    api.logout();
    setLoggedIn(false);
  }

  React.useEffect(() => {
    if (success && !isInfoTooltipPopupOpen) {
      history.push('/sign-in');
    }
  }, [isInfoTooltipPopupOpen, success, history])

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoTooltipPopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleExit={handleExit} email={email} />
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register handleRegistering={handleRegistering} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
        <EditProfilePopup isLoading={isLoading} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
        <AddPlacePopup isLoading={isLoading} onAddPlace={handleAddPlace} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />
        <EditAvatarPopup isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />
        <PopupWithForm name='window_confirmation' title='Вы уверены?' buttonText='Да' />
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip success={success} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;