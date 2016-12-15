import React, { Component } from 'react';
import './ItineraryList.css';

class ItineraryList extends Component {

// run the below two functions on click targeting the specific id in the database
  render() {
    return (

    <div className="your-itineraries">
      <h3>{this.props.title}</h3>
      <button onClick={() => this.props.updateItineraryTitle(this.props.id)}>Update</button>
      <button onClick={() => this.props.deleteFromDb(this.props.id)}>Delete</button>
    </div>
    )
  }
}

export default ItineraryList;

      // <button onClick={() => this.props.deleteFromDb(this.props.id)}>Delete</button>
