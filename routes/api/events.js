const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");

router.get("/", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((errors) =>
      res.status(404).json({ noeventsfound: "No events found" })
    );
});

router.get("/artist/:artist_id", (req, res) => {
  Event.find({ artistId: req.params.user_id })
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((errors) =>
      res.status(404).json({ noeventsfound: "No events found" })
    );
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((errors) =>
      res.status(404).json({ noeventfound: "No event found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      artistId: req.user,
    });
    newEvent.save().then((event) => res.json(event));
  }
);

router.patch(
  "/:id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Event.findbyId(req.params.id)
      .then((event) => {
        let updatedEvent = Object.assign(event, req.body);
        updatedEvent.save().then((event) => res.json(event));
      })
      .catch((errors) =>
        res.status(404).json({ noeventfound: "No event found with that ID" }))
  }
);

router.delete("/:id", (req, res) => {
  Event.findbyId(req.params.id)
    .then((event) => event.delete())
    .catch((errors) => {
        res.status(404).json({ noeventfound: "No event found with that ID" })
    })
});

module.exports = router;
