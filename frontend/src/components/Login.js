import React from 'react';

export default function Login({ handleLogin }) {

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeLogin(e) {
    setLogin(e.target.value);
  }

  function handleChangePasswosd(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(login, password);
  }

  return (
    <section className="auth">
      <form method="post" onSubmit={handleSubmit} className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <input value={login} onChange={handleChangeLogin} type="email" name="login" placeholder="Email" className="auth__input"></input>
        <input value={password} onChange={handleChangePasswosd} type="password" name="password" placeholder="Пароль" className="auth__input"></input>
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </section>
  )
}