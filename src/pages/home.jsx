import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { logoutUser, fetchLatestImage } from '../actions';

const Home = React.createClass({
  displayName: 'HomePage',
  handleLogout() {
    const { dispatch } = this.props;
    dispatch( logoutUser() );
  },
  loadLatest() {
    const { dispatch } = this.props;
    dispatch( fetchLatestImage() );
  },
  render() {
    return (
      <div>
        Hello this is the homepage
        <img src={this.props.latestImage}></img>
        <a onClick={this.loadLatest}>Load Latest</a>
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
