
import { getUserDetails } from './actions';
import { combineReducers } from 'redux';
import {
  LOGIN_USER,
  LOGOUT_USER,
  RECIEVED_USER_NOT_AUTHORIZED,
  RECIEVED_USER_UNKNOWN,
  REQUEST_LATEST_IMAGE,
  RECIEVED_LATEST_IMAGE,
  LOADED_USER_INFO
} from './actions';

function latestImage( state = '', action ) {
  switch ( action.type ) {
    case RECIEVED_LATEST_IMAGE:
      console.log( action );
      let data = action.data.replace( /"/g,"" );
      return data;
    default:
      return state;
  }
}

function auth( state = {
  isAuthorized: false
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

function users( state = [{
    name: 'Juan de la'
}], action ) {
    switch( action.type ) {
        case LOADED_USER_INFO:
            console.log( 'Loaded User here? ', action );
            return state;
        default:
            return state;
    }
}

const designerApp = combineReducers({
  auth,
  users,
  latestImage
});

export default designerApp;
