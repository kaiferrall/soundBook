import {
  GET_ERRORS,
  CREATE_POST,
  FEED_LOADING,
  GET_ALL_POSTS,
  CLEAR_POSTS
} from "./types";
import axios from "axios";

export const createPost = newPost => dispatch => {
  dispatch(feedIsLoading());
  axios
    .post("http://localhost:5000/api/posts/create", newPost)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
    .catch(err => console.log(err));
};

export const getAllPosts = () => dispatch => {
  dispatch(feedIsLoading());
  axios
    .get("http://localhost:5000/api/posts/all")
    .then(res => {
      dispatch({
        type: GET_ALL_POSTS,
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

export const feedIsLoading = () => {
  return {
    type: FEED_LOADING
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  };
};
