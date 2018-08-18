import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WelcomeLogin from "./Auth/WelcomeLogin";

//components

class Welcome extends Component {
  render() {
    const Welcome = (
      <div>
        <div id="welcome-row" className="row">
          <div id="welcome-first-col" className="col-md-6">
            <h1 id="welcome-title">Welcome to SoundBook</h1>
            <h3 id="welcome-title-login">Login</h3>
            <WelcomeLogin />
          </div>
          <div className="col-md-4" />
          <div className="col-md-2" />
        </div>
        <div className="row">
          <div className="welcome-grey-line"> </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div id="welcome-cards-1" className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-code-branch" /> Threads
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Feature</h6>
                <p className="card-text">
                  Open or contribute to a thread of posts based on a topic.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div id="welcome-cards-2" className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-music" /> Music
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Feature</h6>
                <p className="card-text">
                  Add favorite artists, albums or playlists to your profile to
                  show what you are listening to.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div id="welcome-cards-3" className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-share-square" /> Create posts
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Feature</h6>
                <p className="card-text">
                  Make a post to share something to your followers about music.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img src="mockup.png" id="welcome-mockup" />
          </div>
          <div className="col-md-6">
            <div className="welcome-more-info-container">
              <h1 id="welcome-more-info">More Info Title</h1>
              <p id="welcome-more-info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return <div>{Welcome}</div>;
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Welcome);
