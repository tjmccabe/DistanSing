const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
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
  date: {
    type: Date,
    default: Date.now
  },
  events: {
    type: Map,
    default: {}
  },
  imageurl: {
    type: String,
    default: 'https://distansing-dev.s3-us-west-1.amazonaws.com/default_artist_image_mask_on.jpg'
  }
})

module.exports = User = mongoose.model('User', UserSchema);