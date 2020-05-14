import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      video: ''
    };
    // Local variables
    this.socket = io();
    this.conn = "";
    this.peerId = "";
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  getMedia(callbacks) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia || 
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia;
    const constraints = { audio: true, video: true};
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error);
  }

  recStream(stream, elementId) {
    const video = document.getElementById(elementId);
    video.srcObject = stream;
    window.peerStream = stream;
  }

  startPlaying() {
    this.setState({ playing: true }, () => {
      this.getMedia({
        success: (stream) => {
          window.localstream = stream;
          this.recStream(stream, "lVideo");
        },
        error: (err) => {
          alert("cannot access your camera");
          console.log(err);
        },
      });
      // emit
      
      const peer = new Peer()
  
      peer.on("open", () => {
        document.getElementById("displayId").innerHTML = peer.id
      })
  
      peer.on("connection", connection => {
        this.conn = connection;
        this.peerId = connection.peer

        document.getElementById("connId").value = this.peerId;
      })
  
      peer.on("error", err => {
        alert(`An error has occurred: ${err}`);
        console.log(err);
      })
  
      document.getElementById("conn_button").addEventListener("click", () => {
        let peerId = document.getElementById("connId").value;
  
        if (peerId) {
          this.conn = peer.connect(peerId)
        } else {
          alert("Enter an ID");
          return false;
        }
      })
  
      peer.on("call", call => {
        let acceptCall = window.confirm("Do you want to answer this call");
  
        if (acceptCall) {
          call.answer(window.localstream)
  
          call.on("stream", stream => {
            window.peerStream = stream
  
            this.recStream(stream, "rVideo")
          })
        } else {
          console.log("call denied");
        }
      })
  
  
      document.getElementById("call_button").addEventListener("click", () => {
        console.log("calling a peer" + this.peerId)
        console.log(peer)
  
        let call = peer.call(this.peerId, window.localstream)
  
        call.on("stream", stream => {
          window.peerStream = stream
  
          this.recStream(stream, "rVideo")
        })
      })

    });


  }

  render() {
    const { video } = this.state;
    return this.state.playing ? (
      <div>
        <video id="lVideo" controls muted autoPlay={true} ></video>
        <video id="rVideo" controls muted autoPlay={true} ></video>
        <p id="displayId"></p>
        <p>Glen's bedroom is poppin!!!</p>
        <input type="text" id="connId" />
        <button id="conn_button">Connect</button>
        <button id="call_button">Call</button>
      </div>
    ) : (
      <button onClick={this.startPlaying}>LET'S FUCKING GET IT</button>
    );
  }
}

export default StreamShow;