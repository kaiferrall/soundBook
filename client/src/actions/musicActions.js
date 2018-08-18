import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_MUSIC_ALBUMS,
  PROFILE_MUSIC_ARTISTS,
  CLEAR_MUSIC
} from "./types";
import axios from "axios";

export const addAlbum = albumData => dispatch => {
  axios
    .post("http://localhost:5000/api/albums/add", albumData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addArtist = artistData => dispatch => {
  axios
    .post("http://localhost:5000/api/artists/add", artistData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getProfileAlbums = profileId => dispatch => {
  axios
    .get(`http://localhost:5000/api/albums/profile/${profileId}`)
    .then(res => {
      dispatch({
        type: PROFILE_MUSIC_ALBUMS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getProfileArtists = profileId => dispatch => {
  axios
    .get(`http://localhost:5000/api/artists/profile/${profileId}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: PROFILE_MUSIC_ARTISTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const clearMusic = () => {
  return {
    type: CLEAR_MUSIC
  };
};
