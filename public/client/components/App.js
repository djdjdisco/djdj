import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'
import SpotifyPlayer from './SpotifyPlayer.js'



var $ = require('jquery');

  console.log(SongList)

class App extends React.Component {
  constructor(props) {
    super(props);
    } 

  render() {
    return (
      <div>
        <SpotifyPlayer />
        <SongList />
        <Search />
      </div>
    )
  }
}

export default App;
