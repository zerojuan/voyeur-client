import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  handleLoginResponse
} from './actions';

import AppBar from 'material-ui/lib/app-bar';

const App  = React.createClass({
  displayName: 'LoginPage',
  componentDidMount() {
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
    const { dispatch } = this.props;
    handleLoginResponse( dispatch )( response );
  },
  render() {
    return (
      <div>
        <h1>Voyeur Cam</h1>
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
