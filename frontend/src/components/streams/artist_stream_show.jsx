import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

class ArtistStreamShow extends React.Component {
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
    this.getMedia = this.getMedia.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.eventId)
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
          this.localstream = stream;
          this.recStream(stream, "lVideo");
          const formData = new FormData()
          formData.append('id', this.props.eventId);
          formData.append('streaming', true);
          // debugger
          this.props.updateEvent(formData)
        },
        error: (err) => {
          alert("cannot access your camera");
          console.log(err);
        },
      });
      
      const peer = new Peer()
  
      peer.on("connection", connection => {
        peer.call(connection.peer, this.localstream);
      })
  
      peer.on("error", err => {
        alert(`An error has occurred: ${err}`);
        console.log(err);
      })
      
      this.socket.on("requestArtistConnect", userId => {
        peer.connect(userId);
      })
    });
    setTimeout(() => this.props.updateEvent({ id: this.props.eventId, streaming: false }), 300000)
  }

  render() {
    return this.state.playing ? (
      <div>
        <video id="lVideo" controls muted autoPlay={true} ></video>
        <p>Glen's bedroom is poppin!!!</p>
      </div>
    ) : (
      <button onClick={this.startPlaying}>LET'S FUCKING GET IT</button>
    );
  }
}

export default ArtistStreamShow;