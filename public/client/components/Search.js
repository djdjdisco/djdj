import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import SearchSong from './SearchSong.js'
import SearchBar from './SearchBar.js'

var Search = (props) => (
  <div className="search-group">
    <SearchResults searchResults={props.searchResults}/>
  </div>
)

module.exports = Search;
