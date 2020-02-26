import {actions} from './followersActions';

const INITIAL_STATE = {
    users: undefined,
    fetching: false,
    fetched: false,
    error: undefined,
};

export default (followersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `${actions.GET_FOLLOWERS}_PENDING`:
            return {
                ...state,
                fetching: true,
            };
        case `${actions.GET_FOLLOWERS}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload.data.data,
            };
        case `${actions.GET_FOLLOWERS}_REJECTED`:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };
        default:
            return state;
    }
});
