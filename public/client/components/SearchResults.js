import React from 'react';
import ReactDOM from 'react-dom';
import SearchSong from './SearchSong.js'


var SearchResults = () => (
	(
		<div className="search-group">
			<h3 className="search-title">Search Results</h3>
			<ul className='list-group'>
		 	<SearchSong />
			</ul>
		</div>
	)
)

module.exports = SearchResults;