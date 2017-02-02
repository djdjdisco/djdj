import React from 'react';

var SongList = require('./SongList');
var PlayerControls = require('./PlayerControls.js')
var $ = require('jquery');


class App extends React.Component {
  constructor(props) {
    super(props);
    } 

//if we are not using Spotify's music player, we need volume controls...
  //control volume up
  // handleVolumeUpClick () {
  //   this.setState={
  //     console.log('turn up the beat')
  //     console.log('this.state.volume')
  //     this.state.volume++
  //   }
  // }
  //  //control volume down
  // handleVolumeUpClick () {
  //   this.setState={
  //     console.log('turn down for what')
  //     console.log('this.state.volume')
  //     this.state.volume--
  //   }
  // }
  //
  //need a function for searching?

  render() {
    return (
      <div>
        <SongList />
        <div>
      </div>
    )
  }
}

export default App;
