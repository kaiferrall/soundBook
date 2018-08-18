import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthHeader from "./utilities/setAuthHeader";
import { setLoggedInUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/Auth/PrivateRoute";
import store from "./store";
import PropTypes from "prop-types";
import axios from "axios";

import "./App.css";

//Import components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import ProfileForm from "./components/Profile/ProfileForm";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ViewProfile from "./components/ViewProfile/Profile";
import Search from "./components/Music/Search";
import FindProfiles from "./components/Find/FindProfiles";
import HomeFeed from "./components/HomeFeed/HomeFeed";
import Thread from "./components/Threads/Thread";
import ThreadsHome from "./components/Threads/ThreadsHome";

//Check if the token has expired then get logged out
//Token expires in 2 hours, will be longer in the

if (localStorage.myMusicAuth) {
  setAuthHeader(localStorage.myMusicAuth);
  //Decode jwt token
  let user = jwt_decode(localStorage.myMusicAuth);
  let auth = true;
  //Setting the user and auth status
  store.dispatch(setLoggedInUser(user, auth));
  //Check if the token has expired (Expires in one hour rn)
  const currentTime = Date.now() / 1000;

  if (user.exp < currentTime) {
    console.log("test");
    let userOut = {};
    let authOut = false;
    store.dispatch(logoutUser(userOut, authOut));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/home" component={HomeFeed} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute path="/view" component={ViewProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-create" component={ProfileEdit} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/music" component={Search} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/find" component={FindProfiles} />
            </Switch>
            <Switch>
              <PrivateRoute path="/thread/" component={Thread} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/threads" component={ThreadsHome} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
