import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { loginUser } from '../actions';

const LoginPage  = React.createClass({
  displayName: 'LoginPage',
  handleClick() {
    const { dispatch } = this.props;

    dispatch( loginUser() );
  },
  render() {
    return (
      <div>
        <IndexLink onClick={this.handleClick} to='/'> Login </IndexLink>
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
