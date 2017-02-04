import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'

var Playlist = (props) => (
    <div>
      <ul className='list-group'>
        {props.data.map(function(datum, i) {
          return (
            <Song datum={datum} key={i} />
          );
        })}
      </ul>
    </div>
)

module.exports = Playlist;
