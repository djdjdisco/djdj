import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import SearchSong from './SearchSong.js'
import SearchBar from './SearchBar.js'


class Search extends React.Component {
  constructor (props) {
    super(props);

    this.state={
      hovering:false
    }
  }

  onSearchSongMouseEnter() {
    this.setState({
      hovering:true
    })
  }

  onSearchSongMouseLeave () {
    this.setState({
      hovering:false
    })
  }


	render() {
    return (
      <div className="search-group">
        <SearchResults />
      </div>

    );
  }
}


module.exports = Search;
