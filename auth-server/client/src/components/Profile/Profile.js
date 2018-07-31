import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getProfile } from "../../actions/profileActions";
import PrivateRoute from "../Auth/PrivateRoute";
//Functions
import profileCompletion from "../../utilities/profileCompletion";
import { logoutUser } from "../../actions/authActions";
import { checkExpiration } from "../../actions/authActions";
//Import components
import Tags from "./Tags";
import Followers from "./Followers";
import Following from "./Following";
import ProfileForm from "./ProfileForm";
import Loading from "../Loading";

class Profile extends Component {
  componentWillMount() {
    this.props.checkExpiration();
    this.props.getProfile();
  }
  constructor() {
    super();
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let user;
    let auth;
    this.props.logoutUser(user, auth);
    window.location.href = "/";
  }
  render() {
    const { loading, profile } = this.props.profile;
    const { user } = this.props;
    //Component will either be loading or profile
    let profileComponent;
    if (profile === null || loading) {
      profileComponent = <Loading />;
    } else {
      //Tags logic
      if (profile) {
        let twitter;
        let facebook;
        let instagram;
        let percentage = profileCompletion(profile);
        let ProgressBar;
        let progressStyle = {
          width: percentage + "%"
        };
        if (percentage < 100) {
          ProgressBar = (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={progressStyle}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {percentage}%
              </div>
            </div>
          );
        } else ProgressBar = null;

        if (profile.socials.twitter) {
          twitter = (
            <a id="profile-socials" href={profile.socials.twitter}>
              <i className="fab fa-twitter fa-lg" />
            </a>
          );
        }
        if (profile.socials.facebook) {
          facebook = (
            <a id="profile-socials" href={profile.socials.facebook}>
              <i className="fab fa-facebook fa-lg" />
            </a>
          );
        }
        if (profile.socials.instagram) {
          instagram = (
            <a id="profile-socials" href={profile.socials.instagram}>
              <i className="fab fa-instagram fa-lg" />
            </a>
          );
        }
        let tagsItem;
        if (profile.tags.length > 0) {
          tagsItem = profile.tags.map(tag => <Tags key={tag} tag={tag} />);
        }
        profileComponent = (
          <div className="row">
            <div id="profile-banner" className="col-md-4">
              <div id="profile-side-card" className="card">
                <img
                  className="card-img-top"
                  src="no-avatar.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h4 className="card-title">{profile.name}</h4>
                  <p className="card-text">{profile.bio}</p>
                </div>
                <div className="card-body">
                  {profile.socials.twitter ? twitter : null}
                  {profile.socials.facebook ? facebook : null}
                  {profile.socials.instagram ? instagram : null}
                </div>
                <div id="profile-tags" className="card-body">
                  {tagsItem}
                </div>
                <div className="card-body">
                  <button
                    id="profile-followers-btn"
                    type="button"
                    className="btn btn-dark"
                    data-toggle="modal"
                    data-target="#followersModal"
                  >
                    Followers
                  </button>

                  <button
                    id="profile-followers-btn"
                    type="button"
                    className="btn btn-dark"
                    data-toggle="modal"
                    data-target="#followingModal"
                  >
                    Following
                  </button>
                  <Followers />
                  <Following />
                </div>
                <div className="card-body">{ProgressBar}</div>
              </div>
              <a id="profile-edit-profile" href="/edit-create">
                Edit Profile
              </a>
              <a id="profile-logout-profile" onClick={this.onClick} href="#">
                Logout
              </a>
            </div>
            <div id="profile-middle-col" className="col-md-6" />
            <div className="col-md-2" />
          </div>
        );
      } else {
        profileComponent = <ProfileForm />;
      }
    }

    return <div>{profileComponent}</div>;
  }
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  checkExpiration: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  profile2: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile, logoutUser, checkExpiration }
)(withRouter(Profile));
