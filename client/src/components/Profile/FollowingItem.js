import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
//Functions
import followingStatus from "../../utilities/followingStatus";

class FollowingItem extends Component {
  constructor() {
    super();
    this.viewProfile = this.viewProfile.bind(this);
  }

  viewProfile() {
    if (this.props.profile.username === this.props.following.username) {
      window.location.href = "/profile";
    } else {
      window.location.href = `/view/${this.props.following.username}`;
    }
  }
  render() {
    const { following } = this.props;
    const { profile } = this.props;
    let avatarURL;
    if (following.avatar) {
      avatarURL = `http://localhost:5000/avatars/${following.avatar}`;
    }
    return (
      <li
        onClick={this.viewProfile}
        id="profile-followers-li"
        className="list-group-item "
      >
        <img id="profile-followers-img" src={avatarURL} />
        {"      "}
        {following.username}
      </li>
    );
  }
}

FollowingItem.propTypes = {
  following: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});
export default connect(mapStateToProps)(FollowingItem);
