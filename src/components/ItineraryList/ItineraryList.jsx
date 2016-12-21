import React, { Component } from 'react';
import './ItineraryList.css';

class ItineraryList extends Component {

// Invoke editItinerary function when called upon
  updateItin() {
    const {
      id,
      editItinerary
    } = this.props;

    editItinerary(id);
  }

// Run the below two functions on click targeting the specific id in the database
  render() {
    return (
      <div className="your-itineraries">
        <h3>{this.props.title}</h3>
        <button onClick={this.updateItin.bind(this)}>UPDATE</button>
        <button onClick={() => this.props.deleteFromDb(this.props.id)}>DELETE</button>
      </div>
    )
  }
}

export default ItineraryList;
