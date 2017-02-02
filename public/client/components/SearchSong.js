import React from 'react';
import ReactDOM from 'react-dom';

var SearchSong = () => {
	//need to inherit song info from parent
	//two ways of making the song model - as a link and as a button
	return (
		<div>
			<li className="list-group-item song">Search Result Song</li>
		</div>
		
	)
}

module.exports = SearchSong;