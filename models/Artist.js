const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  artistname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageurl: {
    type: String,
    default: 'https://distansing-dev.s3-us-west-1.amazonaws.com/default_artist_image.jpg'
  },
  genre: {
    type: String,
    default: 'None'
  }
})

module.exports = Artist = mongoose.model('Artist', ArtistSchema);