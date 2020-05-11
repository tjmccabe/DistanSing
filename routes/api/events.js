const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");

// Image upload 
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

const s3 = new aws.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  Bucket: 'distansing-dev'
});

const eventImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'distansing-dev',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 1000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('eventImage');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post("/test", (req, res) => {
  eventImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      const imageLocation = req.file.location;
      // Save the file name into database into profile model
      res.json({
        imageUrl: imageLocation
      });
    }
  });
//

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
  passport.authenticate("artist-rule", { session: false }),
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
  passport.authenticate("artist-rule", { session: false }),
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
