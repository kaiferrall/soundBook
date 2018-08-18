import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getProfile } from "../../actions/profileActions";
import PrivateRoute from "../Auth/PrivateRoute";
import store from "../../store";
//Functions
import { logoutUser } from "../../actions/authActions";
import { checkExpiration } from "../../actions/authActions";
import { clearPosts } from "../../actions/postActions";
import { viewProfile } from "../../actions/viewActions";
//Import components
import Loading from "../Loading";
import Tags from "../Profile/Tags";
import Following from "./Following";
import Followers from "./Followers";
import AlbumsCarousel from "./Music/AlbumsCarousel";
import ArtistsCarousel from "./Music/ArtistsCarousel";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const username = window.location.href.split("/")[4];
    this.props.viewProfile(username);
  }
  render() {
    const { viewedProfile, loading } = this.props;
    let profileComponent;
    let twitter, facebook, instagram;
    let avatarURL;
    if (loading || viewedProfile === null) {
      profileComponent = <Loading />;
    } else {
      if (viewedProfile.avatar) {
        avatarURL = `http://localhost:5000/avatars/${viewedProfile.avatar}`;
      }
      if (viewedProfile.socials.twitter) {
        twitter = (
          <a id="profile-socials" href={viewedProfile.socials.twitter}>
            <i className="fab fa-twitter fa-lg" />
          </a>
        );
      }
      if (viewedProfile.socials.facebook) {
        facebook = (
          <a id="profile-socials" href={viewedProfile.socials.facebook}>
            <i className="fab fa-facebook fa-lg" />
          </a>
        );
      }
      if (viewedProfile.socials.instagram) {
        instagram = (
          <a id="profile-socials" href={viewedProfile.socials.instagram}>
            <i className="fab fa-instagram fa-lg" />
          </a>
        );
      }
      let tagsItem;
      if (viewedProfile.tags.length > 0) {
        tagsItem = viewedProfile.tags.map(tag => <Tags key={tag} tag={tag} />);
      }
      profileComponent = (
        <div className="row">
          <div id="profile-banner" className="col-md-4">
            <div id="profile-side-card" className="card">
              <img
                className="card-img-top"
                src={avatarURL}
                alt="Card image cap"
              />
              <div className="card-body">
                <h4 className="card-title">{viewedProfile.name}</h4>
                <p className="card-text">{viewedProfile.bio}</p>
              </div>
              <div className="card-body">
                {viewedProfile.socials.twitter ? twitter : null}
                {viewedProfile.socials.facebook ? facebook : null}
                {viewedProfile.socials.instagram ? instagram : null}
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
                <Following />
                <Followers />
              </div>
              <div className="card-body" />
            </div>
          </div>
          <div id="profile-middle-col" className="col-md-5">
            <h4 id="profile-music-type" className="text text-center">
              {viewedProfile.username + "'s"} Albums
            </h4>
            <br />
            <AlbumsCarousel />
            <h4 id="profile-music-type" className="text text-center">
              {viewedProfile.username + "'s"} Artists
            </h4>
            <ArtistsCarousel />
            <br />
            <h2 id="profile-myFeed-title">
              {viewedProfile.username + "'"}s Recent Posts
            </h2>

            <div />
          </div>
          <div className="col-md-3" />
        </div>
      );
    }
    return <div>{profileComponent}</div>;
  }
}

ViewProfile.propTypes = {
  viewProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  viewedProfile: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.viewProfile.loading,
  viewedProfile: state.viewProfile.profile
});

export default connect(
  mapStateToProps,
  { viewProfile }
)(ViewProfile);
