import {actions} from './followingActions';

const INITIAL_STATE = {
  users: undefined,
  fetching: false,
  fetched: false,
  error: undefined,
};

export default (followingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${actions.GET_FOLLOWING}_PENDING`:
      return {
        ...state,
        fetching: true,
      };
    case `${actions.GET_FOLLOWING}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload.data.data,
      };
    case `${actions.GET_FOLLOWING}_REJECTED`:
      console.log(action.payload.response.data)
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
});
