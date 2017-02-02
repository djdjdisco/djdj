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
  findUser() {

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


// https://api.spotify.com/v1/search?q=I'm%20yours&type=track,artist