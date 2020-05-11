import * as UserAPIUtil from "../util/user_api_util";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  events,
});


export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId).then((user) =>
    dispatch(receiveUser(user)).catch((err) => console.log(err))
);

export const fetchUsers = () => (dispatch) =>
  UserAPIUtil.getUsers().then((users) =>
    dispatch(receiveUsers(users)).catch((err) => console.log(err))
);
