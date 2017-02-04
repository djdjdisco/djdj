import React from 'react';
import ReactDOM from 'react-dom';


var SearchBar = (props) => (
	(
		<form className="form-inline" onSubmit={props.getYoutubeSong}>
			<input type='text' className="form-control" placeholder="Add a song to the playlist!" onChange={props.handleChange}/>
			<input type='submit' value='Submit'/>
		</form>
	)
)

module.exports = SearchBar
