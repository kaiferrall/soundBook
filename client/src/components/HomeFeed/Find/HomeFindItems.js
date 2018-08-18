import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import store from "../../../store";

//Functions
import { followProfile } from "../../../actions/profileActions";
import { clearProfileSearch } from "../../../actions/profileActions";
import followingStatus from "../../../utilities/followingStatus";

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
    //If the search is the logged in user display no button
    if (this.props.profile2.user === this.props.profile.user) {
      this.setState({ me: true });
    }
    //IF there is a profile check if they follow the person
    if (this.props.profile2.following) {
      if (followingStatus(this.props.profile2, this.props.profile)) {
        this.setState({ followStatus: true });
      }
    }
  }
  componentWillReceiveProps(newProps) {
    //If the search is the logged in user display no button
    if (newProps.profile2.user === newProps.profile.user) {
      this.setState({ me: true });
    } else {
      this.setState({ me: false });
    }
    //IF there is a profile check if they follow the person
    if (newProps.profile2.following) {
      if (followingStatus(newProps.profile2, newProps.profile)) {
        this.setState({ followStatus: true });
      } else {
        this.setState({ followStatus: false });
      }
    }
  }
  componentWillUnmount() {
    store.dispatch(clearProfileSearch());
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
            href="#"
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
            href="#"
            id="albums-add-button"
            className="badge badge-primary"
          >
            Follow
          </a>
        );
      }
    } else {
      followButton = null;
    }
    return (
      <li
        id="profile-followers-li"
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div
          onClick={this.viewProfile}
          className="d-flex justify-content-start"
        >
          <img id="profile-followers-img" src={avatarURL} />
          {profile.username}
        </div>
        <div className="d-flex justify-content-end">{followButton}</div>
      </li>
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
