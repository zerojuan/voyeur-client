
export default function bindCheckAuth( redux, notAuthorizedHandler ) {
  return ( nextState, transition ) => {
    const auth = redux.getState().auth;
    console.log( 'What is auth? ', auth );
    if ( !auth.isAuthorized ) {
      return notAuthorizedHandler( nextState, transition );
    }

    // authorized, do nothing
    return;
  };
}
