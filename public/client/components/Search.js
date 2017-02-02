import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import SearchSong from './SearchSong.js'

class Search extends React.Component {
	//search bar will be blank on default
// 	constructor(props) {
// 		super(props)
// 		this.state ={
// 			value : ''
// 		}
// }
// 	//change state of search bar when searching for songs via Spotify API
// 	 handleSearch(e) {
//     this.setState({
//       value: e.target.value
//     });
//   }

  //render basic search bar, some bootstrap included
	render() {
    return (
      <div className="search-group">
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for music" />
          </div>
            <button className="btn hidden-sm-down">
              <span className="glyphicon glyphicon-search"></span>
            </button>
        </form>
        <SearchResults />
      </div>
      
    );
  }
}

module.exports = Search;