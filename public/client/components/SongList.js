import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'
import Playlist from './Playlist.js'


var SongList = ({ data }) => (
	<div className="playlist-group">
		<h3 className="playlist-title">Playlist</h3>
			 <Playlist data={data} />
	</div>
)

module.exports = SongList;
