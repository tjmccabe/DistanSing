const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
const artists = require('./routes/api/artists')

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport)

app.get("/", (req, res) => res.send("Hello Bois"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/artists', artists);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
