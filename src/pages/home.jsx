import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { logoutUser } from '../actions';

const Home = React.createClass({
  displayName: 'HomePage',
  handleLogout() {
    const { dispatch } = this.props;
    dispatch( logoutUser() );
  },
  render() {
    return (
      <div>
        Hello this is the homepage
        <Link to='/login' onClick={this.handleLogout}>Logout</Link>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    auth,
    latestImage
  } = state;

  return {
    auth,
    latestImage
  };
}

export default connect( mapStateToProps )( Home );
