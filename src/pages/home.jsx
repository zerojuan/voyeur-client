import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { logoutUser, fetchLatestImage } from '../actions';

const Home = React.createClass({
  displayName: 'HomePage',
  componentDidMount() {
    this.interval = setInterval( this.loadLatest, 5000 );
    this.loadLatest();
  },
  componentWillUnmount() {
    // remove setInterval
    clearInterval( this.interval );
  },
  handleLogout() {
    const { dispatch } = this.props;
    dispatch( logoutUser() );
  },
  loadLatest() {
    const { dispatch } = this.props;
    dispatch( fetchLatestImage() );
  },
  render() {
    const img = this.props.latestImage || './images/default.png';
    return (
      <div>
        <img src={img} width="352" height="288"></img>
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
