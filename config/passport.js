const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Artist = mongoose.model('Artist');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;



module.exports = passport => {
  passport.use('user-rule', new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));

  passport.use('artist-rule', new JwtStrategy(options, (jwt_payload2, done) => {
    Artist.findById(jwt_payload2.id)
      .then(artist => {
        if (artist) {
          return done(null, artist);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};
