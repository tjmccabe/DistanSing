const faker = require("faker");
const mongoose = require("mongoose");
const _ = require("lodash");
const User = require("./models/User");
const Event = require("./models/Event");
const Artist = require("./models/Artist");

const db = require("./config/keys").mongoURI;
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

function seed() {
  const artists = [];
  

  // for (let i = 0; i < 20; i++) {
  //   let username = faker.internet.userName();
  //   let email = faker.internet.email();
  //   let password = faker.internet.password();
  //   const user = new User({
  //     username: `${username}`,
  //     email: `${email}`,
  //     password: `$${password}`,
  //   });
  //   User.collection.insertOne(user);
  // }


  for (let i = 0; i < 6; i++) {
    let solo = faker.name.findName();
    let artistname = `${solo}`;
    let email = faker.internet.email();
    let password = faker.internet.password();
    let genres = ['None', 'Custom', 'Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Dancehall', 'Deep House', 'Disco', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Latin', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Reggaeton', 'Rock', 'Soundtrack', 'Techno', 'Trance', 'Trap', 'Triphop', 'World'];
    let genre = _.sample(genres);
    let bio = `Hello from ${artistname}! Consider this page your portal for some of the best ${genre} music around. We’re super excited to be a part of the DistanSing family, and we’re stoked you can finally experience our live music from the comfort of your own home during this challenging time. Check out the events below!`
    let imageurl = faker.image.avatar();
    
    let artist = new Artist({
      artistname: `${artistname}`,
      email: `${email}`,
      password: `${password}`,
      bio: `${bio}`,
      imageurl: `${imageurl}`,
      genre: `${genre}`
    });
    artists.push(artist)
    Artist.collection.insertOne(artist)
  }
   
  for (let i = 0; i < 16; i++) {
    let artist = _.sample(artists);
    let artistId = artist._id;
    let artistname = artist.artistname;
    let adjectives = ["Awesome", "Insane", "Poppin", "Lit", "Once-In-A-Lifetime"]
    let events = ["Palooza", "Party", "Celebration", "Jamboree", "Festival"]
    let adj = _.sample(adjectives);
    let event_name = _.sample(events);
    let name = `Join ${artistname} at the ${adj} ${event_name}`
    const current_date = new Date
    const month = current_date.getMonth() + 1
    const day = current_date.getDate() + 7
    const year = current_date.getFullYear()
    let date = faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    );
    const month_name = date.toString().slice(4, 7);

    let description = `Check out ${artistname} streaming to you live on ${month_name} ${day}th. Get your ticket now and come back to the event page at start time to tune in live!`
    let price = faker.random.number({
      min: 10,
      max: 50,
    });
    // let imageurl = `${faker.image.nightlife()}?random=${Date.now()}`;

    let event = new Event({
      name: `${name}`,
      description: `${description}`,
      date: `$${date}`,
      artist: artistId,
      price: price,
      imageurl: artist.imageurl
    });
    Event.collection.insertOne(event)
  }
}
seed();
module.exports = seed;
