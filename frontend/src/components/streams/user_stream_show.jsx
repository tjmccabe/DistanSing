import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import {withRouter} from 'react-router-dom'
import LiveChatContainer from './live_chat_container';

class UserStreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerCount: 0,
      video: false
    };
    // Local variables
    // this.socket = io('http://localhost:9000');
    this.socket = io({ transports: ['polling'] });

    this.socket.on("newVC", (viewerCount) => {
      this.setState({ viewerCount: viewerCount });
    })

    this.peerOptions =
      process.env.NODE_ENV === "production"
        ? {
            secure: true,
            host: "distansingpeerserver.herokuapp.com",
          }
        : {
            // secure: true,
            host: "localhost",
            port: 9000,
            path:'/peerjs',
            ssl: {
              key: "",
              cert: "",
            },
            proxied: true,
            // debug: 3,
          };
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
    this.recStream = this.recStream.bind(this);
    this.startPlaying();
  }

  componentDidMount() {
    // const vid = document.querySelector('#rVideo');
    // vid.addEventListener('canplay', e => {
    //   e.target.play()
    //   setTimeout(() => e.target.play(), 2000)
    // })
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentWillUnmount() {
    this.componentCleanup()
  }

  componentCleanup() {
    window.removeEventListener('beforeunload', this.componentCleanup);
    // console.log(this.peer)
    if (this.peer && this.peer.open) {
      this.peer.disconnect()
      this.peer.destroy()
    }
    // this.socket.emit("stoppedViewing")
    this.socket.close()
  }

  recStream(stream, elementId) {
    if (stream) {
      this.setState({ video: true });
    }
    const video = document.getElementById(elementId);
    video.srcObject = stream;
    window.peerStream = stream;
  }

  startPlaying() {
    const peer = new Peer(
      this.peerOptions
    //   "1234", {
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

    peer.on("open", () => {
      // console.log("user has opened " + peer.id)
      this.socket.emit("userId", peer.id);
    })

    peer.on("connection", connection => {
      // console.log("User received connection to artist")
      peer.connect(connection.peer);
      this.socket.emit("startedViewing")
    })

    peer.on("disconnected", () => {
      // console.log("User received connection to artist")
      this.socket.emit("stoppedViewing")
    })
    
    peer.on("call", call => {
      // console.log("User received call. Answering.")
      call.answer();
      call.on("stream", stream => {
        this.recStream(stream, "rVideo")
      })
    })

    peer.on("error", err => {
      // alert(`User error has occurred: ${err}`);
      console.log(`User error has occurred: ${err}`);
    })
  }

  render() {
    const {event, artist} = this.props

    const DescriptionBlock = event.description ? (
      <div className="stream-description">Event description: "{event.description}"</div>
    ) : <div className="stream-description">Enjoy the show!</div>

    const VideoContent = this.state.video ? <video id="rVideo" controls muted={true} autoPlay={true}></video> 
      : <div className="stream-video-error">
          <div>The artists's stream has been interrupted, please try refreshing the page in a moment</div>
        </div>

    return(
      <div className="streaming-container">
        <div className="user-stream-title">
          <div>
            <div>
              Welcome to "{event.name}"!
            </div>
            <div>
              Presented by {artist.artistname}
            </div>
          </div>
          <div className="viewer-count">Total Viewers: {this.state.viewerCount}</div>
        </div>
        <div className="stream-content">
          {VideoContent}
          <LiveChatContainer socket={this.socket} />
        </div>
        {DescriptionBlock}
        <div className="technical-difficulties">
          <div>
            Stream not showing? Try refreshing or
          </div>
          <button id="get-outta-here" onClick={() => this.props.history.push(`/artists/${event.artist}`)}>
            Head back to {artist.artistname}'s profile
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(UserStreamShow);