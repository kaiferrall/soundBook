import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthHeader from "../utilities/setAuthHeader";

//Register User (if valid also logs them in)
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", newUser)
    .then(res => {
      const { token } = res.data;
      const auth = res.data.authorization;
      localStorage.setItem("myMusicAuth", token);
      //Set the authorization header to the token
      setAuthHeader(token);
      //Decode user data from the jwt token
      const user = jwt_decode(token);
      //Dispatch the user user data
      dispatch(setLoggedInUser(user, auth));
      window.location.href = "/profile";
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login User

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      const auth = true;
      localStorage.setItem("myMusicAuth", token);
      //Set the authorization header to the token
      setAuthHeader(token);
      //Decode user data from the jwt token
      const user = jwt_decode(token);
      //Dispatch the user user data
      dispatch(setLoggedInUser(user, auth));
      history.push("/profile");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setLoggedInUser = (user, auth) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      user: user,
      auth: auth
    }
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  };
};
export const logoutUser = (user, auth) => dispatch => {
  //Remove token from local localStorage
  localStorage.removeItem("myMusicAuth");
  setAuthHeader(false);
  const auth = false;
  const user = {};
  dispatch(setLoggedInUser(user, auth));
};

export const checkExpiration = () => dispatch => {
  if (localStorage.myMusicAuth) {
    setAuthHeader(localStorage.myMusicAuth);
    //Decode jwt token
    let user = jwt_decode(localStorage.myMusicAuth);
    let auth = true;
    //Setting the user and auth status
    dispatch(setLoggedInUser(user, auth));
    //Check if the token has expired (Expires in one hour rn)
    const currentTime = Date.now() / 1000;

    if (user.exp < currentTime) {
      let userOut = {};
      let authOut = false;
      dispatch(logoutUser(userOut, authOut));
    }
  }
};
