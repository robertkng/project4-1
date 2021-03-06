// ES6 syntax to require classes from files that props will be passed through
import React, { Component } from 'react';
import Search from '../Search/Search.jsx';
import Image from '../Image/Image.jsx';
import Destination from '../Destination/Destination.jsx';
import Itinerary from '../Itinerary/Itinerary.jsx';
import Socket from '../Socket/Socket.jsx';
import './App.css';

export default class App extends Component {

// State prior to any component changes
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      destinations: [],
      result: {},
    };
    this.reset = this.reset.bind(this);
  }

// Render all destinations from the database
  getAllDestinations() {
    fetch('/destinations')
    .then(r => r.json())
    .then((results) => {
      this.setState({
        destinations: results.data,
      });
      // console.log(this.state);
    })
    .catch(err => err);
  }

  // Change the value of the searchTerm to whatever is being typed out
  updateInput(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  // Clear searchTerm
  reset() {
    this.setState({
      searchTerm: '',
    });
  }

  searchImages() {
    // Set variable for API credentials
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    // In the context of a HTTP transaction, basic access authentication is a method
    // for a HTTP user agent to provide a user name and password when making a request.
    // window.btoa encodes API credentials just like .env.
    // source: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
    const authorization = () => `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;

    // Shutterstock API requires headers authorization to fetch data from the API
    const authParameters = {
      headers: {
        Authorization: authorization(),
      },
    };
    const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/videos/search?per_page=1&query=${this.state.searchTerm}`;
    fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
    .then(r => r.json())
    .then((result) => {
      this.setState({
        image: result.data[0].assets.preview_mp4.url,
        searchTerm: '',
      });
      this.reset();
    });
  }

  hitEnter(event){
    if(event.keyCode === 13){

    // Set variable for API credentials
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    // In the context of a HTTP transaction, basic access authentication is a method
    // for a HTTP user agent to provide a user name and password when making a request.
    // window.btoa encodes API credentials just like .env.
    // source: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa
    const authorization = () => `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;

    // Shutterstock API requires headers authorization to fetch data from the API
    const authParameters = {
      headers: {
        Authorization: authorization(),
      },
    };
    const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/videos/search?per_page=1&query=${this.state.searchTerm}`;

    fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
    .then(r => r.json())
    .then((result) => {
      this.setState({
        image: result.data[0].assets.preview_mp4.url,
        searchTerm: '',
      });
      this.reset();
    });
    }
  }


// Props to be passed through respective components
  render() {
    return (
      <div className="App">
        <div id="nav">
          <h2>Quotinerary</h2>
          <Search
            name={this.state.searchTerm}
            updateInput={this.updateInput.bind(this)}
            search={this.searchImages.bind(this)}
            result={this.state.result}
            hitEnter={this.hitEnter.bind(this)}
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
            <Itinerary />
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
          <button
            id="open-chat"
            onClick={() => {
              document.querySelector('.message-popup').style.display = 'block';
            }}
          >
            MESSAGES
          </button>
        </footer>
      </div>
    );
  }
}
