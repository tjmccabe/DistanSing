const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/user_register')
const validateLoginInput = require('../../validation/user_login')
const passport = require('passport');
const imageUpload = require('../../util/image_upload_util');

router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

router.get(
  "/current",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
)

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((data) => {
      let users = {};
      data.map((user) => {
        users[user.id] = user;
      });
      res.json(users);
    })
    .catch((errors) =>
      res.status(404).json({ nousersfound: "No users found" })
    );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      let keys = Array.from(user.events.keys());
      Event.find({ "_id": { $in: keys }})
        .then( events => {
          let payload = Object.assign({}, user._doc);
          let userEvents = {};
          events.map(event => userEvents[event._id] = event);
          payload["userEvents"] = userEvents;
          res.json(payload);    
        })
    })
    .catch((errors) =>
      res
        .status(404)
        .json({ nouserfound: "This user show page is under construction" })
    );
});

router.patch(
  "/:id/image",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    let imageLocation;
    imageUpload(req, res, (error) => {
      if (error) {
        res.json({ error: error });
      } else { 
        User.findById(req.params.id)
        .then((user) => {
          if (req.file) {
            imageLocation = req.file.location;
          } else {
            imageLocation = user.imageurl;
          }
          console.log(user)
          let updatedUser = Object.assign(user, req.body, { imageurl: imageLocation });
          updatedUser.save()
            .then((user) => res.json(user))
            .catch((errors) => {
              res.status(404).json({ nouserfound: "No user found with that ID" })
              console.log(errors)
            });
        })
      }
    })
  }
);

router.patch(
  "/:id",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        let updatedUser = Object.assign(user);
        updatedUser.events.set(req.body.events, true);
        updatedUser.save().then((user) => res.json(user));
      })
      .catch((errors) =>
        res.status(404).json({ nouserfound: "No user found with that ID" })
      );
  }
);

router.patch(
  "/:id/deleteEvent",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        let updatedUser = Object.assign(user);
        updatedUser.events.delete(req.body.events);
        updatedUser.save().then((user) => res.json(user));
      })
      .catch((errors) => 
        res.status(404).json({ nouserfound: "No user found with that ID" })
      );
  }
)

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = { id: user.id, username: user.username };

                jwt.sign(payload,
                  keys.secretOrKey,
                  { expiresIn: '24h' },
                  (err, token) => {
                    res.json({
                      user,
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

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, email: user.email };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '24h' },
              (err, token) => {
                res.json({
                  user,
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