import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Users session action
export const signupUser = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const loginUser = (userData) => {
  return axios.post("/api/users/login", userData);
};

// Artists
export const signupArtist = (artistData) => {
  return axios.post("/api/artists/register", artistData);
};

export const loginArtist = (artistData) => {
  return axios.post("/api/artists/login", artistData);
};