import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Home = React.createClass({
  displayName: 'HomePage',
  render() {
    return (
      <div>
        Hello this is the homepage
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

export default connect( mapStateToProps )( Home );
