import React, { Component } from 'react';
import './Socket.css';

// Credit to Sam for helping me out with socket.io
export default class Socket extends Component {
  componentWillMount() {
    this.socketFunction();
  }

// function to send message through socket.io server
  socketFunction() {
    // receive data from server through socket 'chatroom'
    const socket = io();
    socket.on('chatroom', msg => {
      console.log('data on frontend', msg);
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.innerHTML = msg.msg;
      messages.appendChild(li);
    });
  }

// function that sends the messages, then clears the input box afterwards
  handleSubmit(e) {
    e.preventDefault();
    const socket = io();
    const clear = document.getElementById('clear');
    // send data to server through socket 'server-chat'
    socket.emit('server-chat', clear.value);
    clear.value = '';
  }

// function to change the input values as message is typed out
  handleInputChange(e) {
    this.setState({
      msg: e.target.value,
    });
  }

  // pickUser: function() {
  //   const user = document.getElementById("user");
  //   this.setState({ user: user });
  // },

// render message box on the bottom right
  render() {
    return(
      <div className='message-popup'>
        <div
        className="message-header"
        onClick={()=>{document.querySelector('.message-popup').style.display = "none"}}
        ><span>CLOSE</span>
        </div>
        <div className="screen">
          <ul id="messages"></ul>
        </div>
        <div className='socket-form'>
          <form onSubmit={event => this.handleSubmit(event)}>
            <input id="clear" onChange={event => this.handleInputChange(event)}/>
            <button>Send</button><br/>
          </form>
        </div>
      </div>
    )
  }
}
            // <input id="user" type="text" placeholder="username" /> <button onClick={() =self.pickUser()}> select user </button>
