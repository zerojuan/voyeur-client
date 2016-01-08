
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser() {
  return {
    type: LOGIN_USER
  };
};

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
};
