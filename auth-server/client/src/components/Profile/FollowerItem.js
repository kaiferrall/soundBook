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
      Id: props.profile.user
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.followProfile(this.state.Id);
  }
  render() {
    const { follower } = this.props;
    const { profile } = this.props;
    let badge;
    if (followingStatus(profile, follower)) {
      badge = (
        <span
          id="profile-followers-pill"
          className="badge badge-primary badge-pill"
        >
          <i className="fas fa-check" />
        </span>
      );
    } else {
      badge = (
        <span
          id="profile-followers-pill"
          className="badge badge-primary badge-pill"
          onClick={this.onClick}
        >
          Follow
        </span>
      );
    }
    return (
      <li
        id="profile-followers-li"
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <img id="profile-followers-img" src="no-avatar.png" />
        {follower.username}
        {badge}
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
