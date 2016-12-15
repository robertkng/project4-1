import React, { Component } from 'react';


// render a video from what is searched, and only when a search is made
export default class Images extends Component {

  render() {
    return (
      <div className="image">
      <h4>Results: {this.props.name}</h4>
       { this.props.source ?
          <video autoPlay loop>
            <source src={this.props.source} />
          </video>
           : null }

      </div>
    );
  }
}


        // { this.props.source ? <img src={this.props.source} /> : null }
