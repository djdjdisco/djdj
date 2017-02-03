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
      srcs: [],
      data: [],
      currentSong: null
    }
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
      console.log('youtube search success!');
      var searchResult = youtubeResponse.data.items;
      var firstSongId = searchResult[0].id.videoId;
      console.log(firstSongId === undefined);
      if ( !firstSongId ) {
        return;
      }
      var firstSongUrl = 'https://www.youtube.com/watch?v=' + firstSongId;
      var directDownloadLink = 'https://www.youtubeinmp3.com/fetch/?video=' + firstSongUrl;
      var newSrcs = context.state.srcs;
      var newData = context.state.data;
      newSrcs.push(directDownloadLink);
      newData.push(searchResult[0]);
      context.setState({
        srcs: newSrcs,
        data: newData
      });
      if ( context.state.currentSong === null ) {
        console.log('set directDownloadLink');
        context.setState({
          currentSong: directDownloadLink
        });
      };
      console.log('new song : ', directDownloadLink);
    })
    .catch( function(err) {
      console.log('youtube search fail', err);
    });
  }
  
  playNextSong() {
    var currentSongIndex = this.state.srcs.indexOf(this.state.currentSong);
    console.log('currentSong Index : ', currentSongIndex);
    console.log('songs index - 1 : ', this.state.srcs.length - 1);
    console.log('songs : ', this.state.srcs);
    
    this.setState({
      currentSong: null
    });
    if ( currentSongIndex < this.state.srcs.length - 1 ) {
      var playNextSong = function() {
        this.setState({
          currentSong: this.state.srcs[currentSongIndex + 1]
        });
        console.log('play next song!');
      }.bind(this);
      setTimeout(playNextSong, 0);
    }
  }

  renderAudios() {
    if ( this.state.currentSong !== null ) {
      return  (
        <audio controls autoPlay="autoplay" onEnded={this.playNextSong.bind(this)}>
          <source src={this.state.currentSong} type="audio/mp3"/>
        </audio>
      );
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  renderPlayList(Song) {
    return (
      <ul className='list-group'>
        {this.state.data.map(function(data) {
          return (
            <Song data={data} />
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getYoutubeSong.bind(this)}>
          <input type='text' onChange={this.handleChange.bind(this)}/>
          <input type='submit' value='Submit'/>
        </form>
        <Audios renderAudios={this.renderAudios.bind(this)} />
        <SongList renderPlayList={this.renderPlayList.bind(this)} />
      </div>
    )
  }
}

export default App;
 