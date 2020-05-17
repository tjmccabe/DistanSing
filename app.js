const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const artists = require('./routes/api/artists');
const events = require('./routes/api/events');
const path = require('path');
const httpserver = require("http").createServer(app); //app is an http server
const io = require("socket.io")(httpserver);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport)

// app.get("/", (req, res) => res.send("Now, we are TJ and The Bois"));

// Socket IO Configuration
app.use(express.static('public'));
app.get('/stream', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
} )

io.on("connection", (socket) => {
  // callback function after connection is made to the client
  console.log('User has connected')
  // recieves a stream event, then sends the data to other sockets
  socket.on("stream", (data) => {
    io.sockets.emit("stream", data);
  });

  socket.on("userId", userId => {
    io.sockets.emit("requestArtistConnect", userId);
  })

  socket.on("chat", (message, name) => {
    io.sockets.emit("chat", message, name);
  })
}); 

// --------------------------

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/artists', artists);
app.use('/api/events', events);

const port = process.env.PORT || 6000;

httpserver.listen(port, () => console.log(`Server is running on port ${port}`));
