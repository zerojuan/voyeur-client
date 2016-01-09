
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser( response ) {
  return {
    type: LOGIN_USER,
    response: response
  };
};

export function logoutUser() {
  return {
    type: LOGOUT_USER
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
        console.log( 'Response: ', response );
        if ( response.status === 'connected' ) {
          
        } else if ( response.status === 'not_authorized' ) {

        } else {

        }
      });
  };
};
