const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

module.exports = Event = mongoose.model("Event", EventSchema);
