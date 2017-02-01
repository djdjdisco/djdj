class Search extends React.Component {
	//search bar will be blank on default
	constructor(props) {
		super(props)
		this.state ={
			value : ''
		}
}
	//change state of search bar when searching for songs via Spotify API
	 handleSearch(e) {
    this.setState({
      value: e.target.value
    });
  }

  //render basic search bar, some bootstrap included
	render() {
    return (
      <div className="search-bar form-inline">
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}
        />
        <button className="btn hidden-sm-down">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}
