import React, { Component } from 'react';
import { connect } from 'react-redux';

const App  = React.createClass({
  displayName: 'LoginPage',
  onComponentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1696899793858404',
        xfbml: true,
        version: 'v2.5'
      });

      FB.getLoginStatus(function( response ) {
        this.statusChangeCallback( response );
      }.bind( this ) );
    }.bind( this );

    (function( d, s, id ) {
       var js, fjs = d.getElementsByTagName( s )[ 0 ];
       if ( d.getElementById( id ) ) {
         return;
       }
       js = d.createElement( s );
       js.id = id;
       js.src = '//connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore( js, fjs );
     }( document, 'script', 'facebook-jssdk' ));
  },
  statusChangeCallback( response ) {
    console.log( 'statusChangeCallback' );
    console.log( response );
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if ( response.status === 'connected' ) {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if ( response.status === 'not_authorized' ) {
      // The person is logged into Facebook, but not your app.
      document.getElementById( 'status' ).innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById( 'status' ).innerHTML = 'Please log ' +
      'into Facebook.';
    }
  },
  render() {
    return (
      <div>
        You have to login
        { this.props.children }
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    auth
  } = state;

  return {
    auth
  };
}

export default connect( mapStateToProps )( App );
