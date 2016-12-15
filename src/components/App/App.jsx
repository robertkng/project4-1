// require classes from files that props will be passed through
import React, { Component } from 'react';
import Search from '../Search/Search.jsx';
import Image from '../Image/Image.jsx';
import Destination from '../Destination/Destination.jsx';
import Itinerary from '../Itinerary/Itinerary.jsx';
import Socket from '../Socket/Socket.jsx';
import './App.css';

export default class App extends Component {
// state prior to any component changes
    constructor() {
    super();

    this.state = {
      searchTerm: '',
      destinations: [],
      title: [],
      result: {},
      user: undefined
    };
  }

// render all saved itineraries
  getAllItineraries() {
    console.log(this.state.title)
    fetch(`/itinerary/itinerary`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        title: data
      });
      // console.log(this.state);
    })
    .catch(err => console.log(err));
  }

// delete any selected itineraries
  deleteFromDb(id) {
    // console.log('deleteFromDb');
    fetch(`/itinerary/itinerary/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
// filter and render any titles that do not match the id
      const title = this.state.title.filter((mov) => {
        return mov.id !==id;
      });
      this.setState({ title });
    })
    .catch(err => console.log(err));
  }

  updateItineraryTitle(id) {
    fetch(`/itinerary/itinerary/${id}`, {
      method: 'PUT'
    })
    .then(() => {
      const title = this.state.title.filter((mov) => {
        return mov.id !==id;
      });
      this.setState({ title });
    })
    .catch(err => console.log(err));
  }

// render all destinations from the database
  getAllDestinations() {
    fetch(`/destinations`)
    .then(r => r.json())
    .then((results) => {
      this.setState({
        destinations: results.data
      });
      // console.log(this.state);
    })
    .catch(err => console.log(err));
  }

// change the value of the searchTerm to whatever is being typed out
  updateInput(e) {
    this.setState({
      searchTerm: e.target.value
    })
    console.log(this.state.searchTerm);
  }

  searchImages(searchTerm) {
    // Set variable for API credentials
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    // In the context of a HTTP transaction, basic access authentication is a method
    // for a HTTP user agent to provide a user name and password when making a request.
    // window.btoa encodes API credentials just like .env.
    // source: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
    const authorization = () => 'Basic ' + (window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`));
    // console.log(CLIENT_ID, CLIENT_SECRET, authorization());

    // Shutterstock API requires headers authorization to fetch data from the API
    const authParameters = {
      headers: {
        Authorization: authorization()
      }
    };

    const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/videos/search?per_page=1&query=${this.state.searchTerm}`;
    // const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/images/search?per_page=1&query=${this.state.searchTerm}`;

    fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
    .then(r => r.json())
    .then(result => {
      // console.log(typeof result);
      console.log(result);
      // console.log(result.data[0].assets);
      this.setState({
        image: result.data[0].assets.preview_mp4.url
        // image: result.data[0].assets.preview.url,
      });
    });
  }

// change the value of the title to whatever is being typed out
  updateTitle(e) {
    this.setState({
      title: e.target.value
    })
    console.log(this.state.title);
  }

// change the value of the result to whatever is being typed out
  updateItinerary(e) {
    this.setState({
      result: e.target.value
    })
    console.log(this.state.result);
  }

// add the title and itinerary onto the database
  addToDb(e) {
    fetch('/itinerary/itinerary', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        itinerary: this.state.result,
      })
    })
    .catch(err => console.log(err));
  }


// props to be passed through respective components
  render() {
    return (
      <div className="App">

        <div id="nav">
        <h2>Quotinerary</h2>

        <Search
          name={this.state.searchTerm}
          userInput={this.updateInput.bind(this)}
          search={()=> this.searchImages()}
          result={this.state.result}
        />
        </div>

        <div id="container">

        <div className="destination">
          <Destination
            destinations={this.state.destinations}
            getAllDestinations={this.getAllDestinations.bind(this)}
          />
        </div>

        <div className="itinerary">
          <Itinerary
            title={this.state.title}
            userTitle={this.updateTitle.bind(this)}
            userInput={this.updateItinerary.bind(this)}
            addToDb={this.addToDb.bind(this)}
            getAllItineraries={this.getAllItineraries.bind(this)}
            updateItineraryTitle={this.updateItineraryTitle.bind(this)}
            deleteFromDb={this.deleteFromDb.bind(this)}
          />
        </div>

        <div className="image">
          <Image
            source={this.state.image}
            name={this.state.searchTerm}
          />
        </div>

        </div>

        <div className="socket-container">
          <Socket
          user={this.state.user}
          />
        </div>

        <footer>
        <div
            id="open-chat"
            onClick={() => {
                      document.querySelector('.message-popup').style.display='block';
                    }}
          >
          MESSAGES
        </div>
        </footer>

      </div>
    );
  }
}
