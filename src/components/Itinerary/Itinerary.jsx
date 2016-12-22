import React, { Component } from 'react';
import ItineraryList from '../ItineraryList/ItineraryList.jsx';
import './Itinerary.css';

class Itinerary extends Component {

// State prior to component changes
  constructor() {
    super();
    this.state = {
      itinTitle: [],
      itinName: '',
      itinDescription: '',
      itinId: '',
    };
    this.reset = this.reset.bind(this);
  }

// Access itinerary title and description when function is invoked
  editItinerary(id = '') {
    if (id) {
      fetch(`/itinerary/itinerary/${id}`)
      .then(r => r.json())
      .then((result) => {
        this.setState({
          itinName: result.title,
          itinDescription: result.itinerary,
        });
      })
      .catch(err => console.log(err));
    }
    this.setState({
      itinId: id,
    });
  }

// Clear itinerary id, title, and description when function is invoked
  reset() {
    this.setState({
      itinId: '',
      itinName: '',
      itinDescription: '',
    });
  }

// Change the value of the name of itinerary to whatever is being typed out
  updateName(e) {
    this.setState({
      itinName: e.target.value,
    });
  }

// Change the value of the description to whatever is being typed out
  updateDescription(e) {
    this.setState({
      itinDescription: e.target.value,
    });
  }

// Add the title and itinerary onto the database
  addToDb(e) {
    fetch('/itinerary/itinerary', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title: this.state.itinName,
        itinerary: this.state.itinDescription,
      })
    })
    .then((res) => {
      this.getAllItineraries();
    })
    .catch(err => console.log(err));
  }

// Render all saved itineraries
  getAllItineraries() {
    fetch(`/itinerary/itinerary`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        itinTitle: data,
      });
    })
    .catch(err => console.log(err));
  }

// delete any selected itineraries
  deleteFromDb(id) {
    // console.log('deleteFromDb');
    fetch(`/itinerary/itinerary/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
// filter and render any titles that do not match the id
      const title = this.state.itinTitle.filter((mov) => {
        return mov.id !==id;
      });
      this.setState({ title });
    })
    .then((res) => {
        this.getAllItineraries();
    })
    .catch(err => console.log(err));
  }

// When function is invoked, target specific itinerary and render all saved itineraries
  updateItinerary() {
    fetch(`/itinerary/itinerary/${this.state.itinId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.itinName,
        itinerary: this.state.itinDescription,
      })
    })
    .then((res) => {
      console.log(res.status);
      this.getAllItineraries();
      this.reset();
    })
    .catch(err => console.log(err));
  }

// Map through all the saved itineraries in the database and render its
// title along with an update and delete button for each
  renderAllItineraries() {
    if (this.state.itinTitle.length) {
      return this.state.itinTitle.map((mov, i) =>
        <ItineraryList
          title={mov.title}
          key={i}
          id={mov.id}
          editItinerary={this.editItinerary.bind(this)}
          updateItinerary={this.updateItinerary.bind(this)}
          deleteFromDb={this.deleteFromDb.bind(this)}
        />
      );
    }
  }

// Run the getAllItineraries function onload
  componentWillMount() {
    this.getAllItineraries();
  }

// Provide an input box to enter title and itinerary details and call the function
// to add to database when button is clicked
// If specific itinerary is updating, show update and cancel button, otherwise submit
// itinerary button
  render() {
    return (
      <div className="itinerary">
        <h3> Your Itinerary </h3>
        <input
          id="itinerary-title"
          type="text"
          maxLength="200"
          placeholder="Name of itinerary"
          value={this.state.itinName}
          onChange={this.updateName.bind(this)}
        />
        <br />
        <textarea
          id="user-itinerary"
          type="text"
          maxLength="20000"
          placeholder="You may type out or copy and paste your itinerary. Be as specific as you can with your flight schedule, if you need a hotel, pick up / drop off time and date, places you want to visit, or if you just want to be driven around. (No more than 20,000 characters)"
          value={this.state.itinDescription}
          onChange={this.updateDescription.bind(this)}
        />
        {
          this.state.itinId ?
            <div>
              <button onClick={this.updateItinerary.bind(this)}>UPDATE</button>
              <button onClick={() => this.reset()}>CANCEL</button>
            </div>
            :
            <button onClick={this.addToDb.bind(this)}>SUBMIT ITINERARY</button>
        }
        <h3> Saved Itineraries </h3>
        {this.renderAllItineraries()}
      </div>
    );
  }
  }
export default Itinerary;
