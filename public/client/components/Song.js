import React from 'react';
import ReactDOM from 'react-dom';


var Song = ({ datum }) => (
 	<div>
    <img className="thumbnail" src={datum.snippet.thumbnails.default.url}/>
		<li className="list-group-item song">{datum.snippet.title}</li>
	</div>
)
module.exports = Song;
