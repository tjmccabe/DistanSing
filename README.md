View the [live site](https://distansing.herokuapp.com).

# DistanSing
<p align="center">
  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/splash.png" width="1200">
</p>
DistanSing is a virtual-event hosting app developed during the COVID-19 pandemic as a solution for artists/bands to continue catering to their fans/audience. It was implemented using the following technologies:

+ **Frontend**: React.js, Redux
+ **Backend**: MongoDB, Express.js
+ **Others**: JavaScript, Node.js, Socket.io, PeerJS, Amazon S3

## Table of Contents
+ [Event CRUD](https://github.com/tjmccabe/DistanSing#events)
+ [Live Streaming](https://github.com/tjmccabe/DistanSing#live-streaming)
+ [Live Chat](https://github.com/tjmccabe/DistanSing#live-chat)
+ [Dynamic Search](https://github.com/tjmccabe/DistanSing#dynamic-search)

## Events
### Artists
As an artist, host your own events by navigating to your profile page and click the <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/create_event_button.png" width="80"> button. 

<img src="https://distansing-dev.s3-us-west-1.amazonaws.com/create_event.png" width="500">

Fill in some basic information, such as an event name, the ticket price, and when the event will be held. *We don't need to worry about the 'where' since we will all be virtual!* Once the countdown reaches zero, click the <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/event_go_live.png" width="100"> button and start streaming!

### Users
As a user, feel free to browse and discover events that peak your interest. Log in to purchase a ticket and secure your spot! See a list of your purchased events (and even refund a ticket!) by navigating to your profile. Once the event countdown reaches zero, just wait for the artist to start streaming, and you will be redirected to the event!

## Live Streaming
<p align="center">
  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/live_stream.png" width="600">
</p>
DistanSing allows artists to live stream their event using only a webcam, or just a mobile device!
<br>
Live streaming is achieved through Peer.js. When an artist starts streaming, the `startPlaying()` function runs and the `stopPlaying()` function executes when the artist ends the event.

```
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
    
    const peer = new Peer(this.peerOptions);
    this.peer = peer;

    peer.on("connection", connection => {
      peer.call(connection.peer, this.localstream);
      this.connections.add(connection)
    })

    peer.on("error", err => {
      console.log(`Artist error has occurred: ${err}`);
    })
    
    this.socket.on("requestArtistConnect", userId => {
      peer.connect(userId);
    })
  });
  if (!this.props.featured) {
    setTimeout(() => this.endEvent(), 18000000)
  }
};
```
```
stopPlaying() {
  this.connections.forEach(conn => { conn.close() });
  if (this.peer) {
    this.peer.disconnect();
  }
  this.socket.close()
  if (this.localstream) { 
    this.localstream.getTracks().forEach(track => {
      track.stop();
    });
  }
};
```

## Live Chat
<p align="center">
  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/live_chat.png" width="400">
</p>
Interact with artist or your fans during an event using our real-time chat. Use the preloaded emojis to express your enjoyment!

## Dynamic Search
<p align="center">
  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/search.png" width="400">
</p>
Search artists or events using the search bar for quick navigation! See the first five artists/events that match, or view all results!

## Contact
+ TJ McCabe: 
[Github](https://github.com/tjmccabe/) 
[LinkedIn](https://www.linkedin.com/in/tj-mccabe/)
+ Darrick Yong: 
[Github](https://github.com/darrickyong/) 
[LinkedIn](https://www.linkedin.com/in/darrickyong/)
+ Danny Huang: 
[Github](https://github.com/DannyRH27) 
[LinkedIn](https://www.linkedin.com/in/dannyrhuang/)
+ Glen Park: 
[Github](https://github.com/glenpark00) 
[LinkedIn](https://www.linkedin.com/in/glen-park-20ab961a9/)