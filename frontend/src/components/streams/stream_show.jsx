import React from 'react';
import io from 'socket.io-client';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      video: ''
    };
    this.socket = io();
    this.startPlaying = this.startPlaying.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  getMedia(callbacks) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.webkitGetUserMedia;
    const constraints = { audio: true, video: true };
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error);
  }

  recStream(stream, elementId) {
    const video = document.getElementById(elementId);
    video.srcObject = stream;
    video.play();
    window.peerStream = stream;

  }

  startPlaying() {
    this.setState({ playing: true });

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
  }

  render() {
    const { video } = this.state;
    return this.state.playing ? (
      <div>
        <video id="lVideo" src={video}></video>
        <p>Glen's bedroom is poppin!!!</p>
      </div>
    ) : (
      <button onClick={this.startPlaying}>LET'S FUCKING GET IT</button>
    );
  }
}

export default StreamShow;