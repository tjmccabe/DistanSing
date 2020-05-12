const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Artist = require('../../models/Artist')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/artist_register')
const validateLoginInput = require('../../validation/artist_login')
const passport = require('passport');
const imageUpload = require('../../util/image_upload_util');

router.get(
  "/current",
  passport.authenticate("artist-rule", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      artistname: req.user.artistname,
      email: req.user.email,
      body: req.user.body
    });
  }
)

router.get("/", (req, res) => {
  Artist.find()
    .sort({ date: -1 })
    .then((data) => {
      let artists = {}; 
      data.map(artist => {
        artists[artist.id] = artist
      })
      res.json(artists)
    })
    .catch((errors) =>
      res.status(404).json({ noartistsfound: "No artists found" })
    );
});

router.get("/:id", (req, res) => {
  Artist.findById(req.params.id)
    .then((artist) => res.json(artist))
    .catch((errors) =>
      res.status(404).json({ noartistfound: "This artist show page is under construction" })
    );
});

router.patch("/:id", passport.authenticate("artist-rule", { session: false }), (req, res) => {
  let imageLocation;
  imageUpload(req, res, (error) => {
    if (error) {
      res.json({ error: error });
    } else {
      if (req.file) {
        imageLocation = req.file.location;
      }
      Artist.findById(req.params.id)
        .then((artist) => {
          let updatedArtist = Object.assign(artist, req.user, { imageurl: imageLocation });
          updatedArtist.save().then((artist) => res.json(artist));
        })
        .catch((errors) =>
          res.status(404).json({ noartistfound: "No artist found with that ID" })
        )
      }
    }
  )}
);


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Artist.findOne({ email: req.body.email })
    .then(artist => {
      if (artist) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const newArtist = new Artist({
          artistname: req.body.artistname,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newArtist.password, salt, (err, hash) => {
            if (err) throw err;
            newArtist.password = hash;
            newArtist.save()
              .then(artist => {
                const payload = { id: artist.id, artistname: artist.artistname };

                jwt.sign(payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      artist,
                      success: true,
                      token: "Bearer " + token
                    })
                  })
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Artist.findOne({ email })
    .then(artist => {
      if (!artist) {
        errors.email = 'Artist not found'
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, artist.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: artist.id, email: artist.email };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  artist,
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors);
          }
        })
    })
})

module.exports = router;