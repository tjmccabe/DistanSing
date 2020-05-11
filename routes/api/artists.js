const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Artist = require('../../models/Artist')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/artist_register')
const validateLoginInput = require('../../validation/artist_login')
const passport = require('passport');

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

const artistImgUpload = multer({
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
}).single('artistImage');

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
  artistImgUpload(req, res, (error) => {
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

router.get("/test", (req, res) => {
  res.json({ msg: "This is the artist route" });
});

router.get(
  "/current",
  passport.authenticate("artist-rule", { session: false }),
  (req, res) => {
    console.log(req)
    res.json({
      id: req.user.id,
      artistname: req.user.artistname,
      email: req.user.email
    });
  }
)

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