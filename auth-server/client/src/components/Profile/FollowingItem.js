import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
//Functions
import followingStatus from "../../utilities/followingStatus";

class FollowingItem extends Component {
  render() {
    const { following } = this.props;
    const { profile } = this.props;

    return (
      <li id="profile-followers-li" className="list-group-item ">
        <img id="profile-followers-img" src="no-avatar.png" />
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
