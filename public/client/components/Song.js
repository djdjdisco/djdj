import React from 'react';
import ReactDOM from 'react-dom';


var Song = ({ data }) => (
 	<div>    
    <img src={data.snippet.thumbnails.default.url}/>
		<li className="list-group-item song">{data.snippet.title}</li>
	</div>
)
module.exports = Song;