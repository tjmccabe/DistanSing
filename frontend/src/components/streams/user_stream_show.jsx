import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

class UserStreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      video: ''
    };
    // Local variables
    this.socket = io();
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  recStream(stream, elementId) {
    const video = document.getElementById(elementId);
    video.srcObject = stream;
    window.peerStream = stream;
  }

  startPlaying() {
    this.setState({ playing: true }, () => {

      const peer = new Peer()

      peer.on("open", () => {
        this.socket.emit("userId", peer.id);
      })
  
      peer.on("connection", connection => {
        peer.connect(connection.peer);
        connection.on("data", data => {
          console.log(data);
        })
      })
      
      peer.on("call", call => {
        call.answer();
        call.on("stream", stream => {
          this.recStream(stream, "rVideo")
        })
      })

      peer.on("error", err => {
        alert(`An error has occurred: ${err}`);
        console.log(err);
      })
  
      peer.on("call", call => {
        call.answer();

        call.on("stream", stream => {
          this.recStream(stream, "rVideo")
        })
        
      })
    });
  }

  render() {
    return this.state.playing ? (
      <div>
        <video id="rVideo" controls muted autoPlay={true} ></video>
      </div>
    ) : (
      <button onClick={this.startPlaying}>LET'S FUCKING GET IT</button>
    );
  }
}

export default UserStreamShow;