import React, { Component } from 'react';
import { connect } from 'react-redux';

const App  = React.createClass({
  displayName: 'LoginPage',
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
