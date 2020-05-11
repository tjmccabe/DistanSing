import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`);
};

export const updateUser = (data) => {
  return axios.patch(`/api/users/${data.id}`, data);
};
