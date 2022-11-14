import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <Link to='/' className="header__logo" />
      <Switch>
        <Route exact path={'/'}>
          <div className='header__link-container'>
            <p className='header__email'>{props.email}</p>
            <Link to={'/sign-in'} onClick={props?.handleExit} className='header__exit'>Выйти</Link>
          </div>
        </Route>
        <Route path={'/sign-up'}>
          <Link to={'/sign-in'} className={'header__menu'}>Войти</Link>
        </Route>
        <Route path={'/sign-in'}>
          <Link to={'/sign-up'} className={'header__menu'}>Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}