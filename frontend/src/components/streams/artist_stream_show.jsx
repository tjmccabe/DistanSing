import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { withRouter } from 'react-router-dom';
import LiveChatContainer from './live_chat_container';

class ArtistStreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      video: ''
    };
    // Local variables
    // this.socket = io('http://localhost:9000');
    this.socket = io({ transports: ['polling'] });

    this.connections = new Set();

    this.peerOptions =
      process.env.NODE_ENV === "production"
        ? {
            secure: true,
            host: "https://distansingpeerserver.herokuapp.com/",
            port: "",
            path: "",
          }
        : {
            // secure: true,
            host: "localhost",
            port: 9000,
            path: '/peerjs',
            ssl: {
              key: "",
              cert: "",
            },
            proxied: true,
            debug: 3,
          };
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.endEvent = this.endEvent.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.recStream = this.recStream.bind(this);
  }

  componentDidMount() {
    if (!this.props.featured) {
      this.props.fetchEvent(this.props.eventId)
    }
  }

  componentWillUnmount() {
    this.stopPlaying()
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
          if (!this.props.featured) {
            this.props.updateEvent(formData)
          }
        },
        error: (err) => {
          alert("cannot access your camera");
        },
      });
      
      const peer = new Peer(
        this.peerOptions
      //   "4321", {
      //   host: "localhost",
      //   port: 9000,
      //   iceServers: [
      //     { urls: "stun:stun.l.google.com:19302" },
      //     { urls: "stun:stun1.l.google.com:19302" },
      //     { urls: "stun:stun2.l.google.com:19302" },
      //   ],
      //   // path: "/peer",
      // }
      );
      this.peer = peer
  
      peer.on("connection", connection => {
        console.log("Artist received connection. Making call.")
        peer.call(connection.peer, this.localstream);
        this.connections.add(connection)
      })
  
      peer.on("error", err => {
        // alert(`Artist error has occurred: ${err}`);
        console.log(`Artist error has occurred: ${err}`);
      })
      
      this.socket.on("requestArtistConnect", userId => {
        peer.connect(userId);

        console.log("artist received user's request to connect " + userId)
        // console.log(userId)
      })
    });
    if (!this.props.featured) {
      setTimeout(() => this.endEvent(), 18000000)
    }
  }

  endEvent() {
    const formData = new FormData()
    formData.append('id', this.props.eventId);
    formData.append('streaming', false);
    formData.append('over', true);
    if (!this.props.featured) {
      this.props.updateEvent(formData)
    }
    this.stopPlaying()
    this.props.history.push(`/artists/${this.props.event.artist}`)
  }

  stopPlaying() {
    this.connections.forEach(conn => { conn.close() })
    if (this.peer) {
      this.peer.disconnect()
    }
    this.socket.close()
    if (this.localstream) {this.localstream.getTracks().forEach(track => {
      track.stop();
    });}
  }

  render() {
    const { event, artist } = this.props

    return this.state.playing ? (
      <div className="streaming-container">
        <div className="stream-header">
          <button id="stop-streaming" onClick={this.endEvent}>
            End Event
          </button>

          <div className="stream-title">
            <div>You're livestreaming {event.name}!</div>
            <div>Thank you, {artist.artistname}</div>
          </div> 
        </div>
        <div className="stream-content">
            <video id="lVideo" controls muted autoPlay={true}></video>
            <LiveChatContainer socket={this.socket} />
        </div>
      </div>
    ) : (
      <div className="stream-container">
        <div className="lets-fucking-get-it">
          <button id="start-streaming" onClick={this.startPlaying}>
            Start Streaming!
          </button>
          <div>(Only click when you are ready to begin your event)</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistStreamShow);