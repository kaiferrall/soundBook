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
  }
  componentWillMount() {
    if (this.props.profile2.user === this.props.profile.user) {
      this.setState({ me: true });
    }
    if (followingStatus(this.props.profile2, this.props.profile)) {
      this.setState({ followStatus: true });
    }
  }

  onClick() {
    this.props.followProfile(this.state.Id);
    this.setState({ followStatus: true });
  }

  render() {
    const { profile } = this.props;
    const { index } = this.props;
    let followButton;
    if (!this.state.me) {
      if (this.state.followStatus) {
        followButton = (
          <a
            onClick={this.onClick}
            href="#"
            id="albums-add-button"
            className="badge badge-success"
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
            className="badge badge-success"
          >
            Follow
          </a>
        );
      }
    }
    return (
      <div name="Id" id="find-results-item" className="card">
        <img
          id="find-profiles-img"
          className="card-img-top"
          src="no-avatar.png"
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
