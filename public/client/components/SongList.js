import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'

var SongList = ({ renderPlayList }) => (
	<div className="playlist-group">
		<h3 className="playlist-title">Playlist</h3>
			 {renderPlayList(Song)}
	</div>
)

module.exports = SongList;