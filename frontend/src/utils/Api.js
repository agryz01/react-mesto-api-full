export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._response = options.response;
  }

  getUserInformation() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  setUserInformation(yourname, yourjob) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: yourname,
        about: yourjob
      })
    })
      .then(res => this._response(res));
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  addCard(placename, placeurl) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: placename,
        link: placeurl
      })
    })
      .then(res => this._response(res));
  }

  deletCard(idCard) {
    return fetch(`${this._url}cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  toggleCardLikes(isFavourites, idCard) {
    return fetch(`${this._url}cards/${idCard}/likes`, {
      method: isFavourites
        ? 'DELETE'
        : 'PUT',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  setAvatar(url) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => this._response(res));
  }

  setUser(email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._response(res));
  }

  authUser(email, password) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._response(res));
  }

  logout() {
    return fetch(`${this._url}users/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

}

export const api = new Api({
  url: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  response: res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
});