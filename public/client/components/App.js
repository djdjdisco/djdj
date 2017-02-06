import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'
import SearchBar from './SearchBar.js'
import AudioPlayer from './Audio.js'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


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

// var login = () => (
//   <div>
//     <h2>login</h2>
//   </div>
// )

// var signup = () => (
//   <div>
//     <h2>signup</h2>
//   </div>
// )

// var ExampleRouter = () => (
//   <Router>
//     <div>
//       <ul>
//         <li><Link to="/login">login</Link></li>
//         <li><Link to="/signup">signup</Link></li>
//       </ul>

//       <hr/>

//       <Route path="/login" component={login}/>
//       <Route path="/signup" component={signup}/>
//     </div>
//   </Router>
// )




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
      currentSong: null,
      // array of search results
      searchResults: [],
      //distance from HR
      distanceFrom: null
    };
    this.getGeolocation.call(this);
    // setInterval(this.getGeolocation.bind(this), 3000);

    this.getPlaylist.call(this);
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

      context.setState({searchResults: searchResult});

      console.log('This is youtubeResponse : ', youtubeResponse);

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
      setTimeout(setNextSong, 1000);
    }
  }

  postNewSong (src, data) {
    var context = this;
    axios({
      method: 'POST',
      url: '/api/songs',
      data: {
        src: src,
        data: JSON.stringify(data)
      }
    })
    .then(function(success) {
      console.log('song post sent')
      context.getPlaylist.call(context);
    })
    .catch(function(err) {
      console.log('error with post new song, ', err)
    })
  }

  deleteSong (src) {
    console.log('Sending to db, src :', src);
    var context = this;
    axios({
      method: 'DELETE',
      url: '/api/songs',
      data: {src: src}
    })
    .then(function(success) {
      console.log(success, 'delete successful');
      context.getPlaylist.call(context);
    })
    .catch(function(err) {
      console.log('error with delete: ', err);
    })
  }

  playSong(index) {
    this.setState({
      currentSong: null
    });

    var setNextSong = function() {
      this.setState({
        currentSong: this.state.srcs[index]
      });
    }.bind(this);
    // plat next song after 2 secs
    setTimeout(setNextSong, 1000);

  }

  getPlaylist () {
    var context = this;
    axios({
      method: 'GET',
      url: '/api/songs'
    })
    .then(function(success) {
      console.log('success in getPlaylist : ', success.data);
      //songs array from response
      var songs = success.data;
      var newSrc= [];
      var newData = [];

      songs.forEach(function(song) {
        newData.push(JSON.parse(song.data));
        newSrc.push(song.src);
      })

      // var newSrcs = context.state.srcs;
      // var newData = context.state.data;

      // push download link and data to the current src/data array
      // newSrcs.push(directDownloadLink);
      // newData.push(searchResult[index]);
      // console.log('searchResult : ', searchResult[index]);

      // set the state to the newSrc/newData
      context.setState({
        srcs: newSrc,
        data: newData
      });

      // if there is no current song,
      if ( context.state.currentSong === null ) {
        console.log('set directDownloadLink');
        // set the state to the current download link
        context.setState({
          currentSong: newSrc[0]
        });
      };
      // console.log('new song : ', directDownloadLink);
      console.log('get request was sent to the db songs endpoint')
    })
    .catch(function (err) {
      console.log('There was an error with the GET request to /api/songs, ', err);
    })
  }

  // handle search clicks
  handleSearchClicks (index) {
    //refrences the app instance => keyword "this"


    var context = this;

    var searchResult = this.state.searchResults;

    var selectedSongId = searchResult[index].id.videoId;
    // if the ID is undefined, no video exists
    console.log(selectedSongId === undefined);
    // end the request if the song doesn't exist
    // get youtube URL
    var selectedSongUrl = 'https://www.youtube.com/watch?v=' + selectedSongId;
    // create the direct DownloadLink, which requires the youtube URL
    var directDownloadLink = 'https://www.youtubeinmp3.com/fetch/?video=' + selectedSongUrl;

    // if ( !selectedSongId || context.state.srcs.indexOf(directDownloadLink) !== -1) {
    //   alert('This song is already on the playlist!')
    //   return;
    // }
    // get current srcs and data from state

    this.postNewSong.call(this, directDownloadLink, searchResult[index]);
    

  }

  handlePlay(index) {
    this.playSong(index);
  }

  handleRemove(index) {
    console.log('clicking remove')
    // var newSrc = this.state.srcs;
    // var newData = this.state.data;

    var target = this.state.srcs[index];
    console.log('target src in handleRemove : ', target, index);
    this.deleteSong.call(this, target);
    // var clickedSrc = newSrc[index];
    // newSrc.splice(index, 1)
    // newData.splice(index, 1)
    // console.log('newsrc', newSrc)
    // this.setState({
    //   srcs: newSrc,
    //   data: newData
    // });

    // if the index being removed is the current song playing
    // if (this.state.currentSong === target) {
    //   // play the next song
    //   this.playNextSong();
    // }

  }
  // updating state's value to the user's query
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  // Track user's geolocation
  getGeolocation() {
    var context = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('User latitude : ', position.coords.latitude);
      console.log('User longitude : ', position.coords.longitude);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log('Distance from HR (in km) : ', distance(lat, lng, HRlat, HRlng));
      var newDistance = distance(lat, lng, HRlat, HRlng)
      context.setState({distanceFrom: newDistance})
    });
  }

  render() {
    if (this.state.distanceFrom > .3 || this.state.distanceFrom === null) {
      return (
        <div> you arent at the party yet</div>
      )
    }
    return (
      <div>
        <img className="logo" src="static/images/DJ-DJ.png" />
        <SearchBar handleChange={this.handleChange.bind(this)} getYoutubeSong={this.getYoutubeSong.bind(this)}/>
        <AudioPlayer currentSong={this.state.currentSong} playNextSong={this.playNextSong.bind(this)} />
        <SongList data={this.state.data} srcs={this.state.srcs} handlePlay={this.handlePlay.bind(this)} handleRemove={this.handleRemove.bind(this)}/>
        <Search searchResults={this.state.searchResults} handleSearchClicks={this.handleSearchClicks.bind(this)}/>
    </div>
    )
  }
}

export default App;
