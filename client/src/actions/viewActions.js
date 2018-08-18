import {
  GET_ERRORS,
  VIEW_PROFILE,
  VIEW_PROFILE_LOADING,
  VIEW_FOLLOWING,
  VIEW_FOLLOWERS,
  VIEW_ALBUMS,
  VIEW_ARTISTS,
  CLEAR_VIEW_MUSIC
} from "./types";
import axios from "axios";

export const viewProfile = username => dispatch => {
  dispatch(viewProfileLoading());
  axios
    .get(`http://localhost:5000/api/profiles/view/${username}`)
    .then(res => {
      dispatch({
        type: VIEW_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const viewFollowing = userId => dispatch => {
  axios
    .post(`http://localhost:5000/api/profiles/view/following`, userId)
    .then(res => {
      dispatch({
        type: VIEW_FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const viewFollowers = userId => dispatch => {
  axios
    .post(`http://localhost:5000/api/profiles/view/followers`, userId)
    .then(res => {
      dispatch({
        type: VIEW_FOLLOWERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getViewAlbums = profileId => dispatch => {
  axios
    .get(`http://localhost:5000/api/albums/profile/${profileId}`)
    .then(res => {
      dispatch({
        type: VIEW_ALBUMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getViewArtists = profileId => dispatch => {
  axios
    .get(`http://localhost:5000/api/artists/profile/${profileId}`)
    .then(res => {
      dispatch({
        type: VIEW_ARTISTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearViewMusic = () => {
  return {
    type: CLEAR_VIEW_MUSIC
  };
};

export const viewProfileLoading = () => {
  return {
    type: VIEW_PROFILE_LOADING
  };
};
