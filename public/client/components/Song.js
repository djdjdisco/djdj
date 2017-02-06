import React from 'react';
import ReactDOM from 'react-dom';


var Song = (props) => (
 	<li>
    <img className="thumbnail" src={props.datum.snippet.thumbnails.default.url} />
    <button onClick={function() {props.handlePlay(props.index) } } className='playSong'><img src="static/images/play-button.png" /></button>
    <button onClick={props.handleRemove} className='removeSong'><img src="static/images/delete-button.png" /></button>
		<span className="list-group-item song">{props.datum.snippet.title}
    </span>
	</li>
)
module.exports = Song;
