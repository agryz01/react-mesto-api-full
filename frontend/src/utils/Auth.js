export default class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._response = options.response;
  }

  setUser(email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._response(res));
  }

  authUser(email, password) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._response(res));
  }

  validityToken(token) {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => this._response(res));
  }
}

export const auth = new Auth({
  url: 'https://auth.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  response: res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${ res.status }`);
  }
})