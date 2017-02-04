import React from 'react';
import ReactDOM from 'react-dom';
import SearchSong from './SearchSong.js';

var SearchResults = (props) => (
	<div>
		<h3 className="search-title">Search Results</h3>
			<ul className='list-group'>
				// {props.searchResults.map(function(song) {
				//
				// })}
		 		<SearchSong />
			</ul>
	</div>
)

module.exports = SearchResults;
