
import createHashHistory from 'history/lib/createHashHistory';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECIEVED_USER_NOT_AUTHORIZED = 'RECIEVED_USER_NOT_AUTHORIZED';
export const RECIEVED_USER_UNKNOWN = 'RECIEVED_USER_UNKNOWN';
export const REQUEST_LATEST_IMAGE = 'REQUEST_LATEST_IMAGE';
export const RECIEVE_LATEST_IMAGE = 'RECIEVE_LATEST_IMAGE';

export const history = createHashHistory();

const AWS = window.AWS;
let Lambda;

function recievedUserUnknown( response ) {
  return {
    type: RECIEVED_USER_UNKNOWN,
    response: response
  };
}

function recievedUserNotAuthorized( response ) {
  return {
    type: RECIEVED_USER_NOT_AUTHORIZED,
    response: response
  };
}

function requestLatestImage() {
  return {
    type: REQUEST_LATEST_IMAGE
  };
}

function recievedLatestImage( json ) {
  return {
    type: RECIEVED_LATEST_IMAGE,
    data: json
  };
}

export function loginUser( response ) {
  history.replaceState( null, '/' );
  const { authResponse } = response;
  return {
    type: LOGIN_USER,
    accessToken: authResponse.accessToken,
    signedRequest: authResponse.signedRequest,
    userID: authResponse.userID
  };
};

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
};

export function fetchLatestImage() {
  return dispatch => {
    dispatch( requestLatestImage() );
    const p = new Promise(
      ( resolve, reject ) => {
        const params = {
          FunctionName: 'voyeur-getLatest',
          InvocationType: 'RequestResponse',
          LogType: 'None'
        };
        Lambda.invoke( params, function( err, data ) {
          if ( err ) {
            console.log( err, err.stack );
            reject( err );
          } else {
            console.log( data );
            resolve( data );
          }
        });
      }
    );
    return p
      .then( response => dispatch( recieveLatestImage( json ) ) );
  };
}

export function handleLoginResponse( dispatch ) {
  return response => {
    console.log( 'Response: ', response );
    if ( response.status === 'connected' ) {
      AWS.config.region = 'ap-northeast-1';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:47201f90-9ef7-4229-93cd-c14afcbe7adf',
        Logins: {
          'graph.facebook.com': response.authResponse.accessToken
        }
      });
      AWS.config.credentials.get(function() {
        console.log( 'Gotten creds...' );
        Lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });
        dispatch( loginUser( response ) );
      });
    } else if ( response.status === 'not_authorized' ) {
      dispatch( recievedUserNotAuthorized( response ) );
    } else {
      dispatch( recievedUserUnknown( response ) );
    }
  };
};

export function checkLoginState() {
  return dispatch => {
    const p = new Promise(
      ( resolve, reject ) => {
        FB.getLoginStatus(function( response ) {
          resolve( response );
        });
      }
    );
    return p
      .then( response => {
        handleLoginResponse( dispatch )( response );
      });
  };
};
