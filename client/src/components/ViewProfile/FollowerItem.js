import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
//Functions

class FollowerItem extends Component {
  constructor() {
    super();
  }

  render() {
    const { follower } = this.props;
    const { profile } = this.props;
    let badge;
    let avatarURL;
    if (follower.avatar) {
      avatarURL = `http://localhost:5000/avatars/${follower.avatar}`;
    }

    return (
      <li
        id="profile-followers-li"
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-start">
          <img id="profile-followers-img" src={avatarURL} />
          {follower.username}
        </div>
        <div className="d-flex justify-content-end">{badge}</div>
      </li>
    );
  }
}

FollowerItem.propTypes = {
  follower: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  {}
)(FollowerItem);
