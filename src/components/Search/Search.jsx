import React, { Component } from 'react';
import './Search.css';

// Render input fields and run the search function when clicking the button
class Search extends Component {

  render() {
    return (
      <div id="search">
        <input
          type="text"
          value={this.props.name}
          onChange={this.props.updateInput}
          onKeyDown={this.props.hitEnter}
        />
        <button onClick={this.props.search}>SEARCH CITY OR COUNTRY</button>
      </div>
    );
  }
}


export default Search;
