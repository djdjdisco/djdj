import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'



var $ = require('jquery');

  console.log(SongList)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
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

  //querying function for state.searchQuery
  handleQuery (event) {
    this.setState({searchQuery: event.target.value})
    console.log('changing...', this.state.searchQuery)
  }

  //function for searching to spotify's API
  handleSubmit () {

  }

  render() {
    return (
      <div>
        <SongList />
        <Search onQuery = {this.state.searchQuery} handleQuery = {this.handleQuery.bind(this)}/>
      </div>
    )
  }
}

export default App;
