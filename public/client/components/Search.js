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
      <div class="search-group">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search for music" />
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
