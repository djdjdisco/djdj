import React from 'react';
import ReactDOM from 'react-dom';


var SearchBar = () => (
	(
    <form className="form-inline">
	    <div className="form-group">
	      <input type="text" className="form-control" placeholder="Add a song to our playlist!" />
	      <button className="btn">Search
        
      </button>
	    </div>
  	</form>
	)
)

module.exports = SearchBar