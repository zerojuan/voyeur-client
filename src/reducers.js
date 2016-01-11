import { combineReducers } from 'redux';
import {
  LOGIN_USER,
  LOGOUT_USER,
  RECIEVED_USER_NOT_AUTHORIZED,
  RECIEVED_USER_UNKNOWN,
  REQUEST_LATEST_IMAGE,
  RECIEVED_LATEST_IMAGE
} from './actions';

function latestImage( state = '', action ) {
  switch ( action.type ) {
    case RECIEVED_LATEST_IMAGE:
      return action.data.url;
    default:
      return state;
  }
}

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
  auth,
  latestImage
});

export default designerApp;
