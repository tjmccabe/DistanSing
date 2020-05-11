const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");

router.get("/", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then((data) => {
      let events = {};
      data.map((event) => {
        events[event.id] = event;
      });
      res.json(events);
    })
    .catch((errors) =>
      res.status(404).json({ noeventsfound: "No events found" })
    );
});

// router.get("/artist/:artist_id", (req, res) => {
//   Event.find({ artist: req.params.user_id })
//     .sort({ date: -1 })
//     .then((data) => {
//       let events = {};
//       data.map((event) => {
//         events[event.id] = event;
//       });
//       res.json(events);
//     })
//     .catch((errors) =>
//       res
//         .status(404)
//         .json({ noeventsfound: "No events found for that artist ID" })
//     );
// });

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((errors) =>
      res.status(404).json({ noeventfound: "No event found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("artist-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      price: req.body.price,
      artist: req.user,
    });
    newEvent.save().then((event) => res.json(event));
  }
);

router.patch(
  "/:id", 
  passport.authenticate("artist-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    Event.findById(req.params.id)
      .then((event) => {
        if (req.user === event.artist) {
          let updatedEvent = Object.assign(event, req.body);
          updatedEvent.save().then((event) => res.json(event));
        } else {
          res.status(404).json({ noteventcreator: "You are not the creator of this event"});
        }
      })
      .catch((errors) =>
        res.status(404).json({ noeventfound: "No event found with that ID" }));
  }
);

router.delete(
  "/:id",
  passport.authenticate("artist-rule", { session: false }),
  (req, res) => {
    Event.findById(req.params.id)
      .then((event) => {
        if (req.user === event.artist) {
          event.delete().then(() => res.json(event))
        } else {
          res.status(404).json({ noteventcreator: "You are not the creator of this event"});
        }
      })
      .catch((errors) => {
        res.status(404).json({ noeventfound: "No event found with that ID" });
      });
  }
);

module.exports = router;
