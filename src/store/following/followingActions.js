import database from '../../database';
import axios from 'axios';

export const getFollowing = (token) => ({
    type: actions.GET_FOLLOWING,
    payload: axios.get(
        `${database.url}/follower/get-followers-by-user-id`,
        {headers: {'Authorization': token}},
    )
});

export const actions = {
    GET_FOLLOWING: 'getFollowing',
};
