import React from 'react';
import ReactDOM from 'react-dom';


var Song = (props) => (
 	<li className="list-group-song">
    <img className="thumbnail" src={props.datum.snippet.thumbnails.default.url} />
    <button onClick={function() {props.handlePlay(props.index) } } className='playSong'>Play</button>
    <button onClick={function() {props.handleRemove(props.index) } } className='removeSong'>Remove</button>
		<span className="list-group-item">{props.datum.snippet.title}
    </span>
	</li>
)
module.exports = Song;
