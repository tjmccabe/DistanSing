import * as ArtistAPIUtil from '../util/artist_api_util'
export const RECEIVE_ARTIST = "RECEIVE_ARTIST";
export const RECEIVE_ARTISTS = "RECEIVE_ARTISTS";

const receiveArtist = (payload) => ({
  type: RECEIVE_ARTIST,
  payload,
});

const receiveArtists = (artists) => ({
  type: RECEIVE_ARTISTS,
  artists,
});

export const fetchArtist = (artistId) => (dispatch) => (
  ArtistAPIUtil.getArtist(artistId)
  .then((payload) => {dispatch(receiveArtist(payload))})
);

export const fetchArtists = () => (dispatch) => {
  return ArtistAPIUtil.getArtists()
    .then((artists) => dispatch(receiveArtists(artists)))
};

export const updateArtist = (artist) => (dispatch) =>
  ArtistAPIUtil.updateArtist(artist)
    .then((artist) => dispatch(receiveArtist(artist)))
