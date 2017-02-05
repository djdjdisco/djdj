import React from 'react';
import ReactDOM from 'react-dom';

var AudioPlayer = (props) => {
   if (props.currentSong !== null) {
    return (
      <audio preload="auto" controls autoPlay="true" onEnded={props.playNextSong}>
        <source src={props.currentSong} type="audio/mp3"/>
      </audio>
    )
  }
  return null;
}



module.exports = AudioPlayer;
