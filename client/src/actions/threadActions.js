import { GET_ERRORS, SET_CURRENT_USER, GET_THREADS, GET_THREAD } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthHeader from "../utilities/setAuthHeader";

export const createThread = newThread => dispatch => {
  axios
    .post("http://localhost:5000/api/threads/create", newThread)
    .then()
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getThreads = () => dispatch => {
  axios
    .get("http://localhost:5000/api/threads/all")
    .then(res => {
      dispatch({
        type: GET_THREADS,
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

export const getThread = threadName => dispatch => {
  axios
    .get(`http://localhost:5000/api/threads/${threadName.name}`)
    .then(res => {
      dispatch({
        type: GET_THREAD,
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

export const threadComment = commentData => dispatch => {
  axios
    .post("http://localhost:5000/api/threads/comment", commentData)
    .then(res => {});
};
