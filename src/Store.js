import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Reducers/AuthReducer';
import {UserReducer} from './Reducers/UserReducer'
const rootReducer = combineReducers({
  auth: authReducer,
  user:UserReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
