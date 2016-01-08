import { combineReducers } from 'redux';
import {
  LOGIN_USER
} from './actions';

function auth( state = {
  isAuthorized: true
}, action ) {
  switch ( action.type ) {
    case LOGIN_USER:
      return {
        isAuthorized: true
      };
    default:
      return state;
  }
}

const designerApp = combineReducers({
  auth
});

export default designerApp;
