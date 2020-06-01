import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`);
};

export const updateUser = (user) => {
  return axios.patch(`/api/users/${user.id}`, user);
};

export const updateUserImage = data => {
  return axios.patch(`/api/users/${data.get('id')}/image`, data, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
  })
}