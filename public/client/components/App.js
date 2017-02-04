import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'
import SpotifyPlayer from './SpotifyPlayer.js'
import axios from 'axios'

// Function calculates the distance between two lat/long points for our geolocation feature
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
const HRlat = 37.7836924;
const HRlng = -122.4111553;


//will probably go in spotifyplayer
var Audios = ({ renderAudios }) => (
  <div>
    {renderAudios()}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search query
      value: '',
      // array of downloadLinks
      srcs: [],
      // array of video data (image url and title)
      data: [],
      // current song being played
      currentSong: null
    }
  } 
    // calculating the current geolocation and distance of user every 5 seconds
    // setInterval(this.getGeolocation.bind(this), 5000); 

  // Function to send a GET request to youtube's api w/ user's query on submit
  getYoutubeSong(e) {
    // prevents page from refreshing
    e.preventDefault();
    // saving context of this for axios request 
    var context = this;
    // sending a GET request to youtube
    axios({
       url: 'https://www.googleapis.com/youtube/v3/search',
       method: 'get',
       params: {
        part: 'snippet',
        // remember to hide the key to a variable! 
        key: 'AIzaSyCqOGwWGNq5ZncRXMRupT5aOn0yadXvi78',
        q: context.state.value
      }
    })
    .then( function(youtubeResponse) {
    // wait for Youtube res to come back
      console.log('youtube search success!');
      // grab the array of videos, which live in data.items 
      var searchResult = youtubeResponse.data.items;
      console.log('This is youtubeResponse : ', youtubeResponse);
      // retrieve the video ID 
      var firstSongId = searchResult[0].id.videoId;
      // if the ID is undefined, no video exists
      console.log(firstSongId === undefined);
      // end the request if the song doesn't exist 
      if ( !firstSongId ) {
        return;
      }
      // get youtube URL 
      var firstSongUrl = 'https://www.youtube.com/watch?v=' + firstSongId;
      // create the direct DownloadLink, which requires the youtube URL
      var directDownloadLink = 'https://www.youtubeinmp3.com/fetch/?video=' + firstSongUrl;

      // get current srcs and data from state
      var newSrcs = context.state.srcs;
      var newData = context.state.data;

      // push download link and data to the current src/data array
      newSrcs.push(directDownloadLink);
      newData.push(searchResult[0]);
      console.log('searchResult : ', searchResult[0]);

      // set the state to the newSrc/newData
      context.setState({
        srcs: newSrcs,
        data: newData
      });

      // if there is no current song,
      if ( context.state.currentSong === null ) {
        console.log('set directDownloadLink');
        // set the state to the current download link
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
  
  // function to play next song
  playNextSong() {

    // get index of current song
    var currentSongIndex = this.state.srcs.indexOf(this.state.currentSong);
    console.log('currentSong Index : ', currentSongIndex);
    console.log('songs index - 1 : ', this.state.srcs.length - 1);
    console.log('songs : ', this.state.srcs);
    
    // reset state of current song to null for reasons?
    this.setState({
      currentSong: null
    });

    // make sure current song is not the last song
    if ( currentSongIndex < this.state.srcs.length - 1 ) {
      // function to set next song 
      var setNextSong = function() {
        this.setState({
          currentSong: this.state.srcs[currentSongIndex + 1]
        });
        console.log('play next song!', currentSongIndex);
      }.bind(this);
      // plat next song after 2 secs
      setTimeout(setNextSong, 2000);
    }
  }

  // CREATE AS COMPONENT 
  // render the music player with the current song's src
  renderAudios() {
    if ( this.state.currentSong !== null ) {
      return  (
        <audio preload="auto" controls autoPlay="autoplay" onEnded={this.playNextSong.bind(this)}>
          <source src={this.state.currentSong} type="audio/mp3"/>
        </audio>
      );
    }
  }

  // updating state's value to the user's query
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  // CREATE AS COMPONENT?
  // render playlist 
  renderPlayList(Song) {
    return (
      <ul className='list-group'>
        {this.state.data.map(function(data, i) {
          return (
            <Song data={data} key={i} />
          );
        })}
      </ul>
    );
  }

  // Track user's geolocation 
  getGeolocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('User latitude : ', position.coords.latitude);
      console.log('User longitude : ', position.coords.longitude);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log('Distance from HR (in km) : ', distance(lat, lng, HRlat, HRlng));
    });
  }

  render() {
    return (
      <div>

{/*        <SpotifyPlayer />
        <SongList />
        <Search />*/}
        <img className="logo" src="static/images/DJ-DJ.png" />
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
 