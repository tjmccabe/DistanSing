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
  
  
  console.log('please seed')
  // for (let i = 0; i < 20; i++) {
  //   let username = faker.internet.userName();
  //   let email = faker.internet.email();
  //   let password = faker.internet.password();
  //   const user = new User({
  //     username: `${username}`,
  //     email: `${email}`,
  //     password: `$${password}`,
  //   });
  //   console.log(user)
  //   User.collection.insertOne(user);
  // }
    let group = faker.name.title();
    // let artistname = `The ${group}s`;
    let solo = faker.name.findName();
    let artistname = `${solo}`;
  for (let i = 0; i < 1; i++) {
    // let solo = faker.name.findName();
    // let artistname = `The ${group}s`;
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
    console.log(artist);
    artists.push(artist)
    Artist.collection.insertOne(artist)
  }
   
  for (let i = 0; i < 1; i++) {
    // Adjectives
    let adj = faker.commerce.productAdjective();
    let group = faker.name.title();
    let name = `See ${artistname} LIVE!`;
    // let name = `${artistname} 2020 Virtual Tour!`;
    // let name = `Join ${solo} at the ${adj} Palooza `
    let date = faker.date.between("2020-05-18", "2020-05-19");
    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };
    const month = date.toString().slice(4, 7);
    const day = date.getDate()

    let description = `Check out ${artistname} streaming to you live on ${month} ${day}th. Get your ticket now and come back to the event page at start time to tune in live!`
    let artist = _.sample(artists)._id;
    let price = faker.random.number({
      min: 10,
      max: 50,
    });
    let imageurl = `${faker.image.nightlife()}?random=${Date.now()}`;


    
    let event = new Event({
      name: `${name}`,
      description: `${description}`,
      date: `$${date}`,
      artist: artist,
      price: price,
      imageurl: imageurl
    });
    console.log(event)
    Event.collection.insertOne(event)
  }
  console.log('finished seeding')
}
seed();
