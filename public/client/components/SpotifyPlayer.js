import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

class SpotifyPlayer extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div>
				<div className="header">
					<iframe src="https://embed.spotify.com/?uri=spotify:user:djkorean1:playlist:2aDsZ8ZIw5GGCPNfVsWDts&theme=black" width="600" height="75" frameborder="0" allowtransparency="true"></iframe>
					<SearchBar />
				</div>
			</div>
		)
	}
}

export default SpotifyPlayer
