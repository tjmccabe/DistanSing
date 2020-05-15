import axios from "axios";

const searchArtists = fragment => {
  return axios.post("/api/artists/search", {fragment})
}

const searchEvents = fragment => {
  return axios.post("/api/events/search", {fragment})
}

const search = async function(fragment) {
  let results = {};
  searchArtists(fragment)
    .then(res => {
      results.artists = res.data;
      searchEvents(fragment)
        .then(res => {
          results.events = res.data;
          return results;
        })
    })
}

export default search;