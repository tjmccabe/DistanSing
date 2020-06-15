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
  // const artists = [];
  
  
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

  // for (let i = 0; i < 6; i++) {
  //   let imageurl = faker.image.avatar();
  //   let solo = faker.name.findName();
  //   let artistname = `${solo}`;
  //   let email = faker.internet.email();
  //   let password = faker.internet.password();
  //   let genres = ['None', 'Custom', 'Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Dancehall', 'Deep House', 'Disco', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Latin', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Reggaeton', 'Rock', 'Soundtrack', 'Techno', 'Trance', 'Trap', 'Triphop', 'World'];
  //   let genre = _.sample(genres);
  //   let bio = `Hello from ${artistname}! Consider this page your portal for some of the best ${genre} music around. We’re super excited to be a part of the DistanSing family, and we’re stoked you can finally experience our live music from the comfort of your own home during this challenging time. Check out our upcoming events!`
    
  //   let artist = new Artist({
  //     artistname: `${artistname}`,
  //     email: `${email}`,
  //     password: `${password}`,
  //     bio: `${bio}`,
  //     imageurl: `${imageurl}`,
  //     genre: `${genre}`
  //   });
  //   artists.push(artist)
  //   Artist.collection.insertOne(artist)
  // }
  let CXCW = new Event({
    name: "Couch By Couchwest Festival",
    description:
      "Couch by Couchwest is an annual conglomeration of social distancing, human welfare, and music festivals organized jointly by DistanSing Corporation. It launched in 2020 in order to showcase the frontend skills of its organizers.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed72c0810435f4933a2a981",
    price: 30,
    imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/SXSW.png",
  });
  let EDC = new Event({
    name: "Electric DistanSing Carnival",
    description:
      "Electric DistanSing Carnival, commonly known as EDC, is the largest virtual electronic dance music festival in the world. The annual flagship event is now held weekly, put on by The Demo Artists.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 50,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/ElectricDaisyLogo-1024x463.png",
  });
  let Quaranchella = new Event({
    name: "Quaranchella",
    description:
      "The Quaranchella Valley Music and Arts Festival is a weekly music and arts festival held on the world's greatest virtual concert site based out of San Francisco, California. It was co-founded by Danny Huang, Glen Park, Darrick Yong, and TJ McCabe and has stood a monument to their humble beginnings ever since.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed72c0810435f4933a2a981",
    price: 40,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/Quaranchella.jpg",
  });
  let CageCoach = new Event({
    name: "CageCoach Festival",
    description:
      "The Cagecoach Festival is one of the biggest country music festivals in the world, taking place weekly on the DistanSing webapp. It is both a celebration of country music and software engineering skills.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 35,
    imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/Cagecoach.png",
  });
  let EZ = new Event({
    name: "Electric Zoom Festival",
    description:
      "Electric Zoom is a weekly electronic music festival held virtually on the DistanSing webapp. The festival represents all genres of electronic music, bringing top international DJs and live acts from multiple countries to four stages.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 45,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/electriczoom.png",
  });
  let splash_seeds = [CXCW, EZ, CageCoach, EDC, Quaranchella]
  Event.collection.insert(splash_seeds)


  const current_date = new Date
  const month = current_date.getMonth() + 1
  const day = current_date.getDate() + 7
  const year = current_date.getFullYear()
  const artists = 
    [["5ed72c0810435f4933a2a981", "DJ Sanitizee", "https://distansing-dev.s3.us-west-1.amazonaws.com/dj_sanitizzy-1591162884752.jpg"], 
      ["5ed7247de51f52f959016c5e", "The Demo Artists", "https://distansing-dev.s3-us-west-1.amazonaws.com/default_artist_image_mask_on.jpg"], 
      ["5edcddc8e983d90017165915", "Ruben Heller", "https://s3.amazonaws.com/uifaces/faces/twitter/mahmoudmetwally/128.jpg"], 
      ["5ed743f92449e20ea0502176", "Elsie Mosciski", "https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg"], 
      ["5ed7446ed226eb0efe0eb32d", "Elliott Johnston III", "https://s3.amazonaws.com/uifaces/faces/twitter/danillos/128.jpg"], 
      ["5ee61848a600800017efa967", "Maeve Wolff", "https://s3.amazonaws.com/uifaces/faces/twitter/fran_mchamy/128.jpg"], 
      ["5ed7479065cc90109a241221", "Juanita VonRueden", "https://s3.amazonaws.com/uifaces/faces/twitter/robinlayfield/128.jpg"], 
      ["5ed7436eb759170e19d357ba", "McKenna Robel", "https://s3.amazonaws.com/uifaces/faces/twitter/canapud/128.jpg"]]
  for (let i = 2; i < artists.length; i++) {
    let artistId = artists[i][0];
    let artistname = artists[i][1];
    let adjectives = ["Awesome", "Insane", "Poppin", "Lit", "Once-In-A-Lifetime"]
    let events = ["Palooza", "Party", "Celebration", "Jamboree", "Festival"]
    let adj = _.sample(adjectives);
    let event_name = _.sample(events);
    let name = `Join ${artistname} at the ${adj} ${event_name}`
    let date = current_date;
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
      date: faker.date.between(
        `${year}-0${month}-${day}`,
        `${year}-0${month}-${day + 1}`
      ),
      artist: artistId,
      price: price,
      imageurl: artists[i][2]
    });
    console.log(event)
    Event.collection.insertOne(event)
  }


}
module.exports = seed;
