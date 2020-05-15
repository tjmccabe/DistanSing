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
    let bio = faker.lorem.paragraph();
    let imageurl = faker.image.avatar();
    
    let artist = new Artist({
      artistname: `${artistname}`,
      email: `${email}`,
      password: `$${password}`,
      bio: `$${bio}`,
      imageurl: `${imageurl}`
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
    let description = faker.lorem.paragraph();
    let date = faker.date.between("2020-05-15", "2020-05-16");
    let artist = _.sample(artists)._id;
    let price = faker.random.number({
      min: 10,
      max: 50,
    });
    let imageurl = faker.image.imageUrl();


    
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
