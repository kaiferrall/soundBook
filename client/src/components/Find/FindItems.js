import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PrivateRoute from "../Auth/PrivateRoute";
import classNames from "classnames";

//Functions
import { followProfile } from "../../actions/profileActions";
import followingStatus from "../../utilities/followingStatus";

class FindItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.profile.user,
      followStatus: false,
      me: false
    };
    this.onClick = this.onClick.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }
  componentWillMount() {
    if (this.props.profile2.user === this.props.profile.user) {
      this.setState({ me: true });
    }
    if (this.props.profile2.following) {
      if (followingStatus(this.props.profile2, this.props.profile)) {
        this.setState({ followStatus: true });
      }
    }
  }

  onClick() {
    if (this.props.profile2.following) {
      this.props.followProfile(this.state.Id);
      this.setState({ followStatus: true });
    } else {
      window.alert("You need a profile to follow people");
    }
  }
  viewProfile() {
    if (this.props.profile2.username === this.props.profile.username) {
      window.location.href = "/profile";
    } else {
      window.location.href = `/view/${this.props.profile.username}`;
    }
  }
  render() {
    const { profile } = this.props;
    const { index } = this.props;
    let followButton;
    let avatarURL;
    if (profile.avatar) {
      avatarURL = `http://localhost:5000/avatars/${profile.avatar}`;
    }
    if (!this.state.me) {
      if (this.state.followStatus) {
        followButton = (
          <a
            onClick={this.onClick}
            href="javascript:void(0)"
            id="albums-add-button"
            className="badge badge-primary"
          >
            <i className="fas fa-user" />
            {"   "}
            <i className="fas fa-check" />
          </a>
        );
      } else {
        followButton = (
          <a
            onClick={this.onClick}
            href="javascript:void(0)"
            id="albums-add-button"
            className="badge badge-primary"
          >
            Follow
          </a>
        );
      }
    }
    return (
      <div
        onClick={this.viewProfile}
        name="Id"
        id="find-results-item"
        className="card"
      >
        <img
          id="find-profiles-img"
          className="card-img-top"
          src={avatarURL}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            {profile.username}
            {followButton}
          </h5>
          <p className="card-text">{profile.bio}</p>
          <p className="card-text">
            <small className="text-muted">
              The users activity status will go here
            </small>
          </p>
        </div>
      </div>
    );
  }
}

FindItems.propTypes = {
  profile: PropTypes.object.isRequired,
  profile2: PropTypes.object.isRequired,
  followProfile: PropTypes.func.isRequired,
  index: PropTypes.number
};

const mapStateToProps = state => ({
  profile2: state.profile.profile
});

export default connect(
  mapStateToProps,
  { followProfile }
)(FindItems);
