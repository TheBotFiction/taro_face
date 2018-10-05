import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/papersheets/16">PaperSheet #16</Link>
        |
        <Link to="/papersheets/new">New PaperSheet</Link>
        |
        <Link to="/terms/new">New Term</Link>
        |
        <Link to="/conversations/new">New Conversation</Link>
      </div>
    );
  }
}

export default App;
