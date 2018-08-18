import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
//Functions
import followingStatus from "../../utilities/followingStatus";
import { followProfile } from "../../actions/profileActions";

class FollowerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.follower.user,
      followStatus: false
    };
    this.onClick = this.onClick.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }

  viewProfile() {
    if (this.props.profile.username === this.props.follower.username) {
      window.location.href = "/profile";
    } else {
      window.location.href = `/view/${this.props.follower.username}`;
    }
  }

  onClick() {
    this.props.followProfile(this.state.Id);
    this.setState({ followStatus: true });
  }
  render() {
    const { follower } = this.props;
    const { profile } = this.props;
    let badge;
    let avatarURL;
    if (follower.avatar) {
      avatarURL = `http://localhost:5000/avatars/${follower.avatar}`;
    }
    if (followingStatus(profile, follower) || this.state.followStatus) {
      badge = (
        <a href="#" id="albums-add-button" className="badge badge-primary">
          <i className="fas fa-check" />
        </a>
      );
    } else {
      badge = (
        <a
          href="#"
          onClick={this.onClick}
          id="albums-add-button"
          className="badge badge-primary"
        >
          Follow
        </a>
      );
    }
    return (
      <li
        onClick={this.viewProfile}
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
  followProfile: PropTypes.func,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  { followProfile }
)(FollowerItem);
