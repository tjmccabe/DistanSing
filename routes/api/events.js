const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");
const imageUpload = require('../../util/image_upload_util');

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
    .then((event) => {
      console.log(event)
      res.json(event)})
    .catch((errors) =>
      res.status(404).json({ noeventfound: "No event found with that ID" })
    );
});

router.post("/", passport.authenticate("artist-rule", { session: false }), (req, res) => {
    // const { errors, isValid } = validateEventInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
  let imageLocation;
  imageUpload(req, res, (error) => {
    if (error) {
      return res.status(400).json(error);
    } else {
      if (req.file) {
        imageLocation = req.file.location;
      }
      // console.log(req.user)
      // console.log('----------')

      // console.log(req.body)
      // console.log(req.params)
      const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        price: req.body.price,
        imageurl: imageLocation,
        artist: req.user,
      });
      newEvent.save()
        .then((event) => 
          res.json(event))
        .catch((errors) =>
          res.status(400).json({ eventcreatefailed: "This operation was unsuccessful. Please try again." }))
    }
  })
});

router.patch("/:id", passport.authenticate("artist-rule", { session: false }), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let imageLocation;
  imageUpload(req, res, (error) => {
    if (error) {
      res.json({ error: error });
    } else {
      if (req.file) {
        imageLocation = req.file.location;
      }
      Event.findById(req.params.id)
        .then((event) => {
          if (req.user === event.artist) {
            let updatedEvent = Object.assign(event, req.body, { imageurl: imageLocation });
            updatedEvent.save().then((event) => res.json(event));
          } else {
            res.status(404).json({ noteventcreator: "You are not the creator of this event"});
          }
        })
        .catch((errors) =>
          res.status(404).json({ noeventfound: "No event found with that ID" })
        )
      }
    }
  )}
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
