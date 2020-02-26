import { actions } from './authActions';

const INITIAL_STATE = {
  userLogin: undefined,
  fetching: false,
  fetched: false,
  error: undefined,
  auto: false,
};

export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${actions.LOGIN || actions.REGISTER}_PENDING`:
      return {
        ...state,
        fetching: true,
      }
    case `${actions.LOGIN || actions.REGISTER}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        userLogin: action.payload.data.data,
      }
    case `${actions.LOGIN || actions.REGISTER}_REJECTED`:
      return {
        ...state,
        fetching: false,
        error: action.payload.response.data,
      }
    case actions.AUTO_LOGIN:
      return {
        ...state,
        fetched: true,
        auto: true,
        userLogin: action.data,
      }
    default:
      return state;
  }
}
