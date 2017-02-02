import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'

var SongList = (/*something goes in here*/) => (

//map song list??? how to get songlist from server

	<div className="playlist-group">
		<h3 className="playlist-title">Playlist</h3>
			<ul className='list-group'>
			 <Song />
			</ul>
	</div>
)

module.exports = SongList;