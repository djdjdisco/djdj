import React from 'react';
import ReactDOM from 'react-dom';


var Song = (props) => (
 	<li className="list-group-song">
 		<ul className="player-list-button">
	 		<li><button onClick={function() {props.handlePlay(props.index) } } className='playSong'><img class="player-button" src="static/images/play-button.png" /></button></li>
	    <li><button onClick={props.handleRemove} className='removeSong'><img class="player-button" src="static/images/delete-button.png" /></button></li>
 		</ul>
		<span className="list-group-item">{props.datum.snippet.title}</span>
    <img className="thumbnail" src={props.datum.snippet.thumbnails.default.url} />
  </li>
)
module.exports = Song;
