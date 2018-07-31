import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavBar extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let user;
    let auth = false;
    this.props.logoutUser(user, auth);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    //Logged in nav bar state
    const loggedIn = (
      <div id="navbar-tabs-auth" className="navbar-nav">
        <Link
          id="navbar-tabs"
          className="nav-item nav-link active text-white"
          to="/music"
        >
          Music
        </Link>
        <Link
          id="navbar-tabs"
          className="nav-item nav-link text-white"
          to="/threads"
        >
          Threads
        </Link>
        <Link
          id="navbar-tabs-user"
          className="nav-item nav-link text-white"
          to="/profile"
        >
          <img id="navbar-image" src="no-avatar.png" alt="" /> {user.username}
        </Link>
        <div className="btn-group">
          <button
            className="btn btn-dark btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i id="nav-dropdown" className="fas fa-ellipsis-h" />
          </button>
          <div className="dropdown-menu">
            <h6 className="dropdown-header">{user.username}</h6>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="/find">
              Find people
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="/edit-create">
              Edit Profile
            </a>
            <div className="dropdown-divider" />
            <a onClick={this.onClick} className="dropdown-item" href="#">
              Logout
            </a>
          </div>
        </div>
      </div>
    );
    //Not logged in nav bar status
    const notLoggedIn = (
      <div id="navbar-tabs-out" className="navbar-nav">
        <Link
          id="navbar-tabs"
          className="nav-item nav-link active text-white"
          to="/login"
        >
          Login
        </Link>
        <Link
          id="navbar-tabs"
          className="nav-item nav-link text-white"
          to="/register"
        >
          Register
        </Link>
      </div>
    );
    return (
      <nav
        id="nav-content"
        className="navbar navbar-expand-lg navbar-light bg-dark"
      >
        <Link id="navbar-logo" className="navbar-brand text-white" to="/">
          soundBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id="navbar-tabs"
          className="collapse navbar-collapse ml-10"
          id="navbarNavAltMarkup"
        >
          {isAuthenticated ? loggedIn : notLoggedIn}
        </div>
      </nav>
    );
  }
}
NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
