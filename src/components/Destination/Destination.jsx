import React, { Component } from 'react';
import './Destination.css';

class Destination extends Component {

// render destinations once
  componentWillMount() {
    this.props.getAllDestinations();
  }

// function render the city, country, and activity from the database
  showDestinations(destinations) {
    return destinations.map((render, index) => {
      return (
        <ul key={index} className="results-container">
          <li>{render.city}, </li>
          <li>{render.country}</li>
          <li>{render.activity}</li>
        </ul>
      );
    });
  }

// render the items from the database from the showDestinations function
  render() {
    const destinations = this.props.destinations;

    return (
      <div className="destinations">
      <h3>Most popular destinations & activities</h3>
        {this.showDestinations(destinations)}
      </div>
    )
  };
}

export default Destination;
