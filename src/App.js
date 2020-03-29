import React, { Component } from 'react';
import logo from './icon.png';
import Results from './Results.js';
import './App.css';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Coronovirus Fact-Checking
        </h1>
        <div class="progress">
          <div class="progress-bar" />
        </div>
        <h2>
          Fighting the spread of misinformation.
        </h2>
        <Results/>
      </div>
    )
  }
}

export default App;
