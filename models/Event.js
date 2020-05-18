const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Add description",
  },
  date: {
    type: Date,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  imageurl: {
    type: String,
    default: 'https://distansing-dev.s3-us-west-1.amazonaws.com/default_event_image.jpg'
  },
  price: {
    type: Number,
    required: true,
  },
  streaming: {
    type: Boolean,
    default: false
  },
  over: {
    type: Boolean,
    default: false
  }
});

module.exports = Event = mongoose.model("Event", EventSchema);
