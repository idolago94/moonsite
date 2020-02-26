import database from '../../database';
import axios from 'axios';

export const login = (email, password) => ({
  type: actions.LOGIN,
  payload: axios.post(
    `${database.url}/usr/login`,
    JSON.stringify({email: email, password: password}),
    {headers: {'Content-Type': 'application/json', 'Content-Length': '*'}},
  ),
});

export const autoLogin = authData => ({
  type: actions.AUTO_LOGIN,
  data: authData,
});

export const register = (email, password) => ({
  type: actions.LOGIN,
  payload: axios.post(
    `${database.url}/usr/register`,
    JSON.stringify({email: email, password: password}),
    {headers: {'Content-Type': 'application/json', 'Content-Length': '*'}},
  ),
});

export const actions = {
  LOGIN: 'login',
  REGISTER: 'register',
  AUTO_LOGIN: 'autoLogin',
};
