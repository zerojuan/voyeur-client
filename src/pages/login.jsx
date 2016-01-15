import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { loginUser, checkLoginState, handleLoginResponse } from '../actions';

import { Row, Col, Button } from 'elemental';

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
      <Row>
        <Col sm='1/3'>
          <p>Our privacy, for your facebook privacy. Fair is fair.</p>
          <Button type='primary' onClick={this.handleClick}> Facebook Login </Button>
        </Col>
      </Row>
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
