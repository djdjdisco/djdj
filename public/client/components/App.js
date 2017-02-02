import React from 'react';
var $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      happy: true,
      count: 0
    } 
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
      </div>
    )
  }
}

export default App;
// <a href="https://accounts.spotify.com/authorize?client_id=0ed3118ffbe840e994830826df162d78&response_type=code&redirect_uri=http://localhost:3000/callback&state=123">Spotify Authorization</a>
