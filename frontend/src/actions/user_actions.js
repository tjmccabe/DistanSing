import * as UserAPIUtil from "../util/user_api_util";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))

export const fetchUsers = () => (dispatch) =>
  UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))

export const updateUser = user => dispatch =>
  UserAPIUtil.updateUser(user)
    .then(user => dispatch(receiveUser(user)))

export const updateUserImage = user => dispatch => 
  UserAPIUtil.updateUserImage(user)
    .then(user => dispatch(receiveUser(user)))

export const deleteEvent = user => dispatch => 
  UserAPIUtil.deleteEvent(user)
    .then(user => dispatch(receiveUser(user)))