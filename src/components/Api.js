class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._baseUrl, {headers: this._headers})
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/cards',
  headers: {
    authorization: '1dbb1df0-e71b-4917-a03e-8221c4080837',
    'Content-Type': 'application/json'
  }
});
