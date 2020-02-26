import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import followingReducer from './following/followingReducer';
import followersReducer from './followers/followersReducer';

const reducers = combineReducers({
    auth: authReducer,
    following: followingReducer,
    followers: followersReducer
});

const middlewares = applyMiddleware(promise, thunk)

export default createStore(reducers, middlewares);
