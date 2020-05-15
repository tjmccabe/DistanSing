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
    default: ""
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: ""
  },
  streaming: {
    type: Boolean,
    default: false
  }
});

module.exports = Event = mongoose.model("Event", EventSchema);
