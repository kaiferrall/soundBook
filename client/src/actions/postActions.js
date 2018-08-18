import {
  GET_ERRORS,
  CREATE_POST,
  NEW_POST,
  FEED_LOADING,
  GET_ALL_POSTS,
  GET_POSTS,
  CLEAR_POSTS
} from "./types";
import axios from "axios";

export const createPost = newPost => dispatch => {
  dispatch(feedIsLoading());
  axios
    .post("http://localhost:5000/api/posts/create", newPost)
    .then(res => {
      dispatch({
        type: NEW_POST,
        payload: res.data
      });
    })
    .catch(err => {})
    .catch(err => console.log(err));
};

export const getAllPosts = range => dispatch => {
  dispatch(feedIsLoading());
  axios
    .post("http://localhost:5000/api/posts/all", range)
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

export const getProfilePosts = userId => dispatch => {
  axios
    .get(`http://localhost:5000/api/posts/profile/${userId}`)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addLike = postId => dispatch => {
  axios
    .post("http://localhost:5000/api/posts/like", postId)
    .then(() => {})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//This is not needed anymore
//Saving it just incase
export const newComment = commentData => dispatch => {
  axios
    .post("http://localhost:5000/api/posts/comment", commentData)
    .then(() => {})
    .catch(err => console.log(err));
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
