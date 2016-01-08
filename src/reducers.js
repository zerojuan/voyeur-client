import { combineReducers } from 'redux';
import {
  LOGIN_USER,
  LOGOUT_USER
} from './actions';

function auth( state = {
  isAuthorized: true
}, action ) {
  switch ( action.type ) {
    case LOGIN_USER:
      return {
        isAuthorized: true
      };
    case LOGOUT_USER:
      return {
        isAuthorized: false
      };
    default:
      return state;
  }
}

const designerApp = combineReducers({
  auth
});

export default designerApp;
