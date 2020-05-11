import axios from "axios";

export const getArtists = () => {
  return axios.get("/api/artists");
};

export const getArtist = (id) => {
  return axios.get(`/api/artists/${id}`);
};

export const updateArtist = (data) => {
  return axios.patch(`/api/artists/${data.id}`, data);
};
// Commented out until merged with Glen's patch route
// export const updateArtist = (data) => {
//   return axios.patch(`/api/artists/${data.id}`, data);
// };
