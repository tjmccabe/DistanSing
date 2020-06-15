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
const cron = require("node-cron");
const seed = require("./seed");
const { ExpressPeerServer } = require("peer");
// const cors = require("cors");
// const customGenerationFunction = () =>
//   (Math.random().toString(36) + "0000000000000000000").substr(2, 16);


let server;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
} else {
  server = app.listen(9000);
  const peerServer = ExpressPeerServer(server, {
    allow_discovery: true,
  });
  app.use('/peerjs', peerServer);
}

  
// app.options("localhost:9000/peerjs/myapp", cors());
// app.use(cors());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));



// const peerServer = ExpressPeerServer(httpserver, {
//   debug: true,
//   proxied: true,
//   path: "/peer",
//   allow_discovery: true,
//   debug: true,
//   // generateClientId: customGenerationFunction,
// });

//   app.use("/peerjs", peerServer);
app.use(passport.initialize());
require('./config/passport')(passport)


cron.schedule("30 12 * * 7", () => {
  seed();
});
// Socket IO Configuration
app.use(express.static('public'));
app.get('/stream', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
} )
io.on("connection", (socket) => {
  
  socket.on("room", (room) => {
    // console.log(room)
    socket.join(room);
    
      // callback function after connection is made to the client
      // console.log("User has connected");
      // recieves a stream event, then sends the data to other sockets
      socket.on("stream", (data) => {
        io.to(room).emit("stream", data);
      });
      socket.on("userId", (userId) => {
        io.to(room).emit("requestArtistConnect", userId);
      });
      socket.on("chat", (message, name) => {
        io.to(room).emit("chat", message, name);
      });
      socket.on("viewerCount", (count) => {
        io.to(room).emit("newVC", count);
      });
      socket.on("stoppedViewing", () => {
        io.to(room).emit("VC--");
      });
      socket.on("startedViewing", () => {
        io.to(room).emit("VC++");
      });
  });

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