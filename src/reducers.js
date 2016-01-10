import { combineReducers } from 'redux';
import {
  LOGIN_USER,
  LOGOUT_USER,
  RECIEVED_USER_NOT_AUTHORIZED,
  RECIEVED_USER_UNKNOWN
} from './actions';

function auth( state = {
  isAuthorized: true
}, action ) {
  switch ( action.type ) {
    case LOGIN_USER:
      return {
        isAuthorized: true,
        accessToken: action.accessToken,
        signedRequest: action.signedRequest,
        userID: action.userID
      };
    case RECIEVED_USER_UNKNOWN:
      return {
        ...state,
        isAuthorized: false
      };
    case RECIEVED_USER_NOT_AUTHORIZED:
      return {
        ...state,
        isAuthorized: false
      };
    case LOGOUT_USER:
      return {
        ...state,
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
