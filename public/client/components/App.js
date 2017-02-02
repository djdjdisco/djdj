import React from 'react';
// <<<<<<< HEAD
var SongList = require('./SongList');
var PlayerControls = require('./PlayerControls.js')
// =======
var $ = require('jquery');
// >>>>>>> 64489a4a5d0bfa333788753b98c0e6a5cfee051c

class App extends React.Component {
  constructor(props) {
    super(props);
    } 
// >>>>>>> 64489a4a5d0bfa333788753b98c0e6a5cfee051c

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
// <a href="https://accounts.spotify.com/authorize?client_id=0ed3118ffbe840e994830826df162d78&response_type=code&redirect_uri=http://localhost:3000/callback&state=123">Spotify Authorization</a>
