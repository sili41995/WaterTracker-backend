import initialState from 'redux/initialState';

class WaterTrackerServiceApi {
  #BASE_URL = 'https://contacts-rest-api-dvg7.onrender.com/api';
  #TOKEN = initialState.auth.token;

  get token() {
    return this.TOKEN;
  }

  set token(newToken) {
    this.TOKEN = newToken;
  }

  signUpUser(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return fetch(`${this.#BASE_URL}/auth/signup`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        return data;
      });
  }

  signInUser({ data, signal }) {
    const options = {
      signal,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return fetch(`${this.#BASE_URL}/auth/signin`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        return data;
      });
  }

  signOutUser() {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.#TOKEN}`,
      },
    };

    return fetch(`${this.BASE_URL}/auth/signout`, options)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data?.message) {
          throw Error(data.message);
        }
      });
  }

  refreshUser() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${this.#TOKEN}`,
      },
    };

    return fetch(`${this.#BASE_URL}/auth/current`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        return data;
      });
  }

  updateUserAvatar(data) {
    const options = {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: `Bearer ${this.#TOKEN}`,
      },
    };

    return fetch(`${this.#BASE_URL}/auth/avatars`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        return data;
      });
  }

  updateUserProfile(data) {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${this.#TOKEN}`,
      },
    };

    return fetch(`${this.#BASE_URL}/auth/profile`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        return data;
      });
  }

  updateDailyWaterRequirement;
}

const waterTrackerServiceApi = new WaterTrackerServiceApi();

export default waterTrackerServiceApi;
