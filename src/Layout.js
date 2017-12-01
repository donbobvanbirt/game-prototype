import React, { Component } from 'react';

import HeaderMenu from './HeaderMenu';

import './App.css';

class Layout extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <HeaderMenu />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Layout;
