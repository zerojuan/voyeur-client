import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {IndexLink, Link} from 'react-router';

import { logoutUser, fetchLatestImage } from '../actions';

import { Row, Col, Card } from 'elemental';

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
        <Row>
          <Card>
            <img src={img} width='352' height='288'></img>
          </Card>
        </Row>
        <Row>
          <Col>
            <p>Users:</p>
            <ul>
                {
                    this.props.users.map( ( user ) => {

                        return (
                            <li>{ user.name }</li>
                        );
                    })
                }
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to='/login' onClick={this.handleLogout}>Logout</Link>
          </Col>
        </Row>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    auth,
    users,
    latestImage
  } = state;

  return {
    auth,
    users,
    latestImage
  };
}

export default connect( mapStateToProps )( Home );
