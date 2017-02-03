import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'
import axios from 'axios'


var $ = require('jquery');

var Audios = ({ renderAudios }) => (
  <div>
    {renderAudios()}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      srcs: []
    }
  } 
  addSongDJ() {
    axios({
      url: '/addSongDJ',
      method: 'post'
    })
    .then( function(res) {
      console.log(res);
    })
    .catch( function(err) {
      console.log(err);
    });
  }
  getYoutubeSong(e) {
    e.preventDefault();
    var context = this;
    axios({
       url: 'https://www.googleapis.com/youtube/v3/search',
       method: 'get',
       params: {
        part: 'snippet',
        key: 'AIzaSyCqOGwWGNq5ZncRXMRupT5aOn0yadXvi78',
        q: this.state.value
      }
    })
    .then( function(youtubeResponse) {
      var searchResult = youtubeResponse.data.items;
      var firstSongId = searchResult[0].id.videoId;
      var firstSongUrl = 'https://www.youtube.com/watch?v=' + firstSongId;
      var directDownloadLink = 'https://www.youtubeinmp3.com/fetch/?video=' + firstSongUrl;
      var newSrcs = context.state.srcs;
      newSrcs.push(directDownloadLink);
      context.setState({
        srcs: newSrcs
      });
      console.log('youtube search success', directDownloadLink);
    })
    .catch( function(err) {
      console.log('youtube search fail', err);
    });
  }
  renderAudios() {
    return this.state.srcs.map( function(src, i) {
      return  (
        <audio controls key={i}>
          <source src={src} type="audio/mp3"/>
        </audio>
      );
    });
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    console.log(this.state.value);
  }
  render() {
    return (
      <div>
        <Audios renderAudios={this.renderAudios.bind(this)} />
        <form onSubmit={this.getYoutubeSong.bind(this)}>
          <input type='text' onChange={this.handleChange.bind(this)}/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default App;
 