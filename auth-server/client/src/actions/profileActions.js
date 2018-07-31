import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  FIND_PROFILES,
  GET_FOLLOWERS,
  GET_FOLLOWING
} from "./types";
import axios from "axios";

export const getProfile = () => dispatch => {
  dispatch(profileIsLoading());
  axios
    .get("http://localhost:5000/api/profiles")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        profile: "No profile yet"
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

export const createProfile = newProfile => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles/create", newProfile)
    .then(res => {
      window.location.href = "/profile";
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getProfiles = searchData => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles/search", searchData)
    .then(res => {
      dispatch({
        type: FIND_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS
      });
    });
};

export const followProfile = profileId => dispatch => {
  axios
    .post(`http://localhost:5000/api/profiles/follow/${profileId}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Get followers
export const getFollowers = () => dispatch => {
  axios
    .get("http://localhost:5000/api/profiles/followers")
    .then(res => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
//Get following
export const getFollowing = () => dispatch => {
  axios
    .get("http://localhost:5000/api/profiles/following")
    .then(res => {
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const profileIsLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
