import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { loginUser, checkLoginState, handleLoginResponse } from '../actions';

const LoginPage  = React.createClass({
  displayName: 'LoginPage',
  handleClick() {
    const { dispatch } = this.props;

    // dispatch( loginUser() );
    FB.login(function( response ) {
      handleLoginResponse( dispatch )( response );
    });
  },
  render() {
    return (
      <div>
        <p>Our privacy, for your facebook privacy. Fair is fair.</p>
        <a onClick={this.handleClick}> Login </a>
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

export default connect( mapStateToProps )( LoginPage );
