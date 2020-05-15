import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { withRouter } from 'react-router-dom'

class ArtistStreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      video: ''
    };
    // Local variables
    this.socket = io();

    this.connections = new Set;
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.eventId)
  }

  componentWillUnmount() {
    this.connections.forEach(conn => {conn.close()})
    if (this.peer) {
      this.peer.disconnect()
      // this.peer.destroy()
    }
    this.socket.close()
    this.localstream.getTracks().forEach(track => {
      track.stop();
    });
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
          this.props.updateEvent(formData)
        },
        error: (err) => {
          alert("cannot access your camera");
          console.log(err);
        },
      });
      
      const peer = new Peer()
      this.peer = peer
  
      peer.on("connection", connection => {
        peer.call(connection.peer, this.localstream);
        this.connections.add(connection)
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

  stopPlaying() {
    this.connections.forEach(conn => { conn.close() })
    if (this.peer) {
      this.peer.disconnect()
      // this.peer.destroy()
    }
    this.socket.close()
    this.localstream.getTracks().forEach(track => {
      track.stop();
    });
    this.props.history.push(`/artists/${this.props.event.artist}`)
  }

  render() {
    const { event, artist } = this.props

    const ChatPlaceholder = null;

    return this.state.playing ? (
      <div className="stream-container">
        <div className="stream-title">
          <div>
            You're livestreaming {event.name}!
          </div>
          <div>
            Thanks, {artist.artistname}
          </div>
        </div>
        <div className="stream-content">
          <video id="lVideo" controls muted autoPlay={true} ></video>
          {ChatPlaceholder}
        </div>
        <button id="stop-streaming" onClick={this.stopPlaying}>Stop Streaming</button>
      </div>
    ) : (
      <div className="stream-container">
        <div className="lets-fucking-get-it">
          <button id="start-streaming" onClick={this.startPlaying}>Start Streaming!</button>
          <div>(Only click when you are ready to begin your event)</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistStreamShow);