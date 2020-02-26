import database from '../../database';
import axios from 'axios';

export const getFollowers = token => ({
  type: actions.GET_FOLLOWERS,
  payload: axios.get(`${database.url}/follower/get-my-followers`, {
    headers: {Authorization: token},
  }),
});

export const actions = {
  GET_FOLLOWERS: 'getFollowers',
};
