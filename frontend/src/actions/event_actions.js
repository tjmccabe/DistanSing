import * as EventApiUtil from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
// export const RECEIVE_ARTIST_EVENTS = "RECEIVE_ARTIST_EVENTS";
// export const RECEIVE_USER_EVENTS = "RECEIVE_USER_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";

const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
});

// const receiveArtistEvents = (events) => ({
//   type: RECEIVE_ARTIST_EVENTS,
//   events,
// });

// const receiveUserEvents = (events) => ({
//   type: RECEIVE_USER_EVENTS,
//   events,
// });

const receiveEvent = (event) => ({
  type: RECEIVE_EVENT,
  event,
});

const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId,
});

const receiveEventErrors = (errors) => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})

export const fetchEvents = () => (dispatch) =>
  EventApiUtil.getEvents()
    .then((events) => dispatch(receiveEvents(events)))
    .catch((err) => receiveEventErrors(err));

// export const fetchArtistEvents = (id) => (dispatch) =>
//   EventApiUtil.getArtistEvents(id)
//     .then((events) => dispatch(receiveArtistEvents(events)))
//     .catch((err) => console.log(err));

// export const fetchUserEvents = (id) => (dispatch) =>
//   EventApiUtil.getUserEvents(id)
//     .then((events) => dispatch(receiveUserEvents(events)))
//     .catch((err) => console.log(err));

export const fetchEvent = (eventId) => (dispatch) =>
  EventApiUtil.getEvent(eventId)
    .then((event) => dispatch(receiveEvent(event)))
    .catch((err) => receiveEventErrors(err));

export const createEvent = (event) => (dispatch) => 
  EventApiUtil.createEvent(event)
    .then((event) => dispatch(receiveEvent(event)))
    .catch((err) => dispatch(receiveEventErrors(JSON.parse(err.request.response))));

export const updateEvent = (event) => (dispatch) =>
  EventApiUtil.updateEvent(event)
    .then((event) => dispatch(receiveEvent(event)))
    .catch((err) => receiveEventErrors(err));

export const deleteEvent = (eventId) => (dispatch) =>
  EventApiUtil.deleteEvent(eventId)
  .then(() => dispatch(removeEvent(eventId)))
  .catch((err) => receiveEventErrors(err));
